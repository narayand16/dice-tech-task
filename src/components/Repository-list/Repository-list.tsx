import axios from "axios";
import "./Repository-list.css";
import { useEffect, useState } from "react";
import { RepositoryCard } from "../Repository-card/Repository-card";
import { CardData } from "../../models/RepositoryCard";

export function RepositoryList({ query }) {
  const httpClient = axios.create({
    baseURL: "https://api.github.com/search/",
  });
  const [repositories, setRepositories] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    console.log(query);
    httpClient
      .get(`repositories?q=${query}`)
      .then((result) => {
        const repositories = parseResponse(result);
        setRepositories(repositories);
      })
      .catch((error) => {
        console.log(error);
        setRepositories([]);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const parseResponse = (result: Record<string, any>) => {
    return result.data.items.map((item) => ({
      id: item.id,
      language: item.language,
      repoName: item.name,
      score: item.score,
      description: item.description,
      name: item.full_name,
      avatar: item.owner.avatar_url,
      updatedAt: item.updated_at,
      createdAt: item.created_at,
      starCount: item.stargazers_count,
      watchersCount: item.watchers_count,
    }));
  };

  const onSelectionChange = (e) => {
    let sortedRepos: CardData[] = [];
    const sortKey = e.target.value;
    setSortValue(e.target.value);
    if (["name", "createdAt", "updatedAt"].includes(sortKey)) {
      sortedRepos = repositories.sort(sortByString(sortKey));
    }
    if (["starCount", "watchersCount", "score"].includes(sortKey)) {
      sortedRepos = repositories.sort(sortByNumber(sortKey));
    }
    setRepositories(sortedRepos);
  };

  const sortByNumber = (param: number) => {
    return (a, b) => {
      return a[param] < b[param] ? -1 : a[param] > b[param] ? 1 : 0;
    };
  };

  const sortByString = (param: string) => {
    return (a, b) => a[param].localeCompare(b[param]);
  };

  const Options: Array<{ displayName: string; value: string }> = [
    { value: "starCount", displayName: "Stars" },
    { value: "score", displayName: "Score" },
    { value: "name", displayName: "Name" },
    { value: "createdAt", displayName: "Created Date" },
    { value: "updatedAt", displayName: "Updated Date" },
    { value: "watchersCount", displayName: "Watchers count" },
  ];

  return (
    <>
      {isLoading && <p> Loading data ...</p>}

      {repositories.length > 0 && (
        <>
          <label htmlFor="">Sort by</label>
          <select onChange={onSelectionChange} value={sortValue}>
            {Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            ))}
          </select>
        </>
      )}

      <ul className="card-list-wrapper">
        {repositories &&
          repositories.map((repository: CardData) => (
            <RepositoryCard key={repository.id} cardData={repository} />
          ))}
      </ul>
    </>
  );
}
