import "./Repo-card.css";

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

interface ChildComponentProps {
  cardData: CardData;
}

export function RepoCard({ cardData }: ChildComponentProps) {
  return (
    <div className="Card-container">
      <div className="card-header">
        <img className="Avatar" src={cardData.avatar} alt="Avatar image" />
        <p className="pl-3">{cardData.name}</p>
      </div>
      <span>{cardData.description}</span>

      <p>
        {cardData.language} Updated on {cardData.updatedAt}
      </p>
    </div>
  );
}
