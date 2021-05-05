import './SearchBar.css'


export default function SearchBar({search, setSearch}) {
  return (
    <>
    <input
      className="search-input"
      placeholder="Search albums, composers, or artist names..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      >
    </input>
    </>
  )
}
