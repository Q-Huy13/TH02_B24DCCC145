import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountryApp from "./components/CountryApp";
import CurrencyApp from "./components/CurrencyApp";
import MovieApp from "./components/MovieApp";
import CountryDetail from "./pages/CountryDetail";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", padding: "10px", background: "#f2f2f2" }}>
        <Link to="/countries">🌍 Quốc gia</Link>
        <Link to="/currency">💰 Tỉ giá</Link>
        <Link to="/movies">🎬 Phim</Link>
      </nav>

      <Routes>
        <Route path="/countries" element={<CountryApp />} />
        <Route path="/countries/:name" element={<CountryDetail />} />
        <Route path="/currency" element={<CurrencyApp />} />
        <Route path="/movies" element={<MovieApp />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
