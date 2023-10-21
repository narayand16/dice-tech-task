import axios from "axios";
import { useEffect, useState } from "react";
import { RepositoryCard } from "../Repository-card/Repository-card";
import {
  CardData,
  RepositoryDetailsResponse,
} from "../../models/Repository.model";
import { SortDropdown } from "../Sort-dropdown/Sort-dropdown";

const httpClient = axios.create({
  baseURL: "https://api.github.com/search/",
});

export function RepositoryList({ query }: Record<"query", string>) {
  const [repositories, setRepositories] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const parseResponse = (result: {
    data: { items: RepositoryDetailsResponse[] };
  }) => {
    return result.data.items.map((item: RepositoryDetailsResponse) => ({
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

  return (
    <>
      {isLoading && <p> Loading data ...</p>}

      {repositories.length > 0 && (
        <SortDropdown
          repositories={repositories}
          setRepoData={setRepositories}
        />
      )}

      <ul className="flex flex-wrap gap-4">
        {repositories.length > 0 &&
          repositories.map((repository: CardData) => (
            <RepositoryCard key={repository.id} cardData={repository} />
          ))}
      </ul>
    </>
  );
}
