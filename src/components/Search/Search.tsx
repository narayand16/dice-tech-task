import { ChangeEvent } from "react";

interface SearchProps {
  onQueryChange: (query: string) => void;
}

export function Search({ onQueryChange }: SearchProps) {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  return (
    <>
      <input
        className="w-full rounded-md block border-2 border-zinc-300 py-1.5 px-1.5"
        type="text"
        placeholder="Search Repositories"
        id="repo-search"
        onChange={onInputChange}
      />
    </>
  );
}
