import { useState } from "react";
import { RepositoryList } from "./components/Repository-list/Repository-list";
import { Search } from "./components/Search/Search";
import "./App.css";

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
