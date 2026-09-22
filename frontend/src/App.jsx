import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
    }

    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Findex</div>
        <div className="tagline">Find. Explore. Discover.</div>
      </header>

      <main className="main">
        <h1>Search the Web</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search anything..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={search}>
            Search
          </button>
        </div>

        {loading && <p className="status">Searching...</p>}

        <div className="results">
          {results.map((result, index) => (
            <div className="result" key={index}>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.title}
              </a>

              <div className="url">{result.url}</div>

              <p>{result.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
