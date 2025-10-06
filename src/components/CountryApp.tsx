import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Country {
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
}

export default function CountryApp() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,population,region")
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌍 Danh sách Quốc gia</h2>
      <input
        type="text"
        placeholder="Tìm kiếm quốc gia..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "20px" }}>
        {filtered.map(c => (
          <Link to={`/countries/${c.name.common}`} key={c.name.common}>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
              <img src={c.flags.png} width="100%" alt={c.name.common} />
              <h4>{c.name.common}</h4>
              <p>Dân số: {c.population.toLocaleString()}</p>
              <p>Khu vực: {c.region}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
