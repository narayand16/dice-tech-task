import { CardData } from "../../models/Repository.model";

interface RepositoryCardProps {
  cardData: CardData;
}

export function RepositoryCard({ cardData }: RepositoryCardProps) {
  return (
    <div className="w-72 h-48 p-4 rounded-lg border border-solid border-slate-400">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={cardData.avatar}
          alt="Avatar image"
        />
        <p className="pl-4 break-all">{cardData.name}</p>
      </div>
      <span
        className="text-xs line-clamp-2 truncate pt-3"
        title={cardData.description}
      >
        {cardData.description}
      </span>
      <div className="pt-8">
        <p>{cardData.language}</p>
        <p>Updated on {new Date(cardData.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
