import './SearchBar.css'


export default function SearchBar({search, setSearch}) {
  return (
    <>
    <input
      type="text"
      className="search-input"
      placeholder="&#xF002;  Search albums, composers, songs, or artist names..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      >
    </input>
    </>
  )
}
