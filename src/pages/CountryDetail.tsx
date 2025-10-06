import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(res => setCountry(res.data[0]));
  }, [name]);

  if (!country) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.name.common} width="200" />
      <p>Thủ đô: {country.capital?.[0]}</p>
      <p>Dân số: {country.population.toLocaleString()}</p>
      <p>Khu vực: {country.region}</p>
      <p>Ngôn ngữ: {Object.values(country.languages || {}).join(", ")}</p>
    </div>
  );
}
