export interface CardData {
  id: number;
  avatar: string;
  repoName: string;
  starCount: number;
  description: string;
  language: string;
  watchersCount: number;
  score: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface RepositoryDetailsResponse {
  id: number;
  language: string;
  name: string;
  score: number;
  description: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  updated_at: string;
  created_at: string;
  stargazers_count: number;
  watchers_count: number;
}
