import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { CardData, RepoCard } from "./components/Repo-card/Repo-card";

function App() {
  const client = axios.create({
    baseURL: "https://api.github.com/search/",
  });
  const [repositories, setRepositories] = useState<CardData[]>([]);

  useEffect(() => {
    client
      .get("repositories?q=react")
      .then((result) => {
        const repositories = parseResponse(result);
        setRepositories(repositories);
      })
      .catch((error) => console.log(error));
  }, []);

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

  return (
    <>
      Search Repositories <input type="text" />
      <ul className="card-wrapper">
        {repositories &&
          repositories.map((repository: CardData) => (
            <RepoCard key={repository.id} cardData={repository} />
          ))}
      </ul>
    </>
  );
}

export default App;
