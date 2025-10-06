import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function MovieApp() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMovies = async () => {
    const res = await axios.get(`https://www.omdbapi.com/?apikey=thewdb&s=${search}`);
    setMovies(res.data.Search || []);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Tìm kiếm phim</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nhập tên phim..." />
      <button onClick={searchMovies}>Tìm kiếm</button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "10px" }}>
        {movies.map(m => (
          <Link to={`/movies/${m.imdbID}`} key={m.imdbID}>
            <div>
              <img src={m.Poster} alt={m.Title} width="100%" />
              <h4>{m.Title}</h4>
              <p>{m.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
