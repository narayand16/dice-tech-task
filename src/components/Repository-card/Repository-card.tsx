import "./Repository-card.css";
import { CardData } from "../../models/RepositoryCard";

interface RepositoryCardProps {
  cardData: CardData;
}

export function RepositoryCard({ cardData }: RepositoryCardProps) {
  return (
    <div className="Card-container">
      <div className="card-header">
        <img className="Avatar" src={cardData.avatar} alt="Avatar image" />
        <p>{cardData.name}</p>
      </div>
      <span className="Description" title={cardData.description}>
        {cardData.description?.length > 30
          ? cardData.description.slice(0, 30) + "..."
          : cardData.description}
      </span>
      <div className="card-footer">
        <p>{cardData.language}</p>
        <p>Updated on {new Date(cardData.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
