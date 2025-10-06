import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=thewdb&i=${id}&plot=full`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.Title} ({movie.Year})</h2>
      <img src={movie.Poster} alt={movie.Title} width="200" />
      <p><b>Thể loại:</b> {movie.Genre}</p>
      <p><b>Đạo diễn:</b> {movie.Director}</p>
      <p><b>Tóm tắt:</b> {movie.Plot}</p>
      <p><b>IMDB Rating:</b> {movie.imdbRating}</p>
    </div>
  );
}
