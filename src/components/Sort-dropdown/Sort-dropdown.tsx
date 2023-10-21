import { ChangeEvent, useState } from "react";
import { CardData } from "../../models/Repository.model";

const Options: Array<{ displayName: string; value: string }> = [
  { value: "starCount", displayName: "Stars" },
  { value: "score", displayName: "Score" },
  { value: "name", displayName: "Name" },
  { value: "createdAt", displayName: "Created Date" },
  { value: "updatedAt", displayName: "Updated Date" },
  { value: "watchersCount", displayName: "Watchers count" },
];

interface SortDropdownProps {
  repositories: CardData[];
  setRepoData: (repositories: CardData[]) => void;
}

interface RepoCard extends CardData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

export function SortDropdown({ repositories, setRepoData }: SortDropdownProps) {
  const [sortValue, setSortValue] = useState("");

  const onSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortedRepos: CardData[] = [...repositories];
    const sortKey = event.target.value;
    setSortValue(sortKey);
    if (["name", "createdAt", "updatedAt"].includes(sortKey)) {
      sortedRepos.sort(sortByString(sortKey));
    }
    if (["starCount", "watchersCount", "score"].includes(sortKey)) {
      sortedRepos.sort(sortByNumber(sortKey));
    }
    setRepoData(sortedRepos);
  };

  const sortByNumber = (param: string) => {
    return (a: RepoCard, b: RepoCard) => a[param] - b[param];
  };

  const sortByString = (param: string) => {
    return (a: RepoCard, b: RepoCard) => a[param].localeCompare(b[param]);
  };

  return (
    <div className="py-3">
      <label className="pr-2" htmlFor="sort-dropdown">
        Sort by
      </label>
      <select id="sort-dropdown" onChange={onSelectionChange} value={sortValue}>
        {Options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}
