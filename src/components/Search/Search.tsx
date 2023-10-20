export function Search({ onQueryChange }) {
  const onInputChange = (event) => {
    console.log(event.target.value);
    onQueryChange(event.target.value);
  };
  return (
    <>
      {/* <label htmlFor="repo-search">Search</label> */}
      <input
        type="text"
        placeholder="Search Repositories"
        id="repo-search"
        onChange={onInputChange}
      />
    </>
  );
}
