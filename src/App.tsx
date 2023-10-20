import { useState } from "react";
import "./App.css";
import { RepositoryList } from "./components/Repository-list/Repository-list";
import { Search } from "./components/Search/Search";

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Search onQueryChange={setSearchText} />
      <RepositoryList query={searchText} />
    </>
  );
}

export default App;
