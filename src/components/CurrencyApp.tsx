import { useEffect, useState } from "react";
import axios from "axios";

export default function CurrencyApp() {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("VND");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState<number | null>(null);
  const [converted, setConverted] = useState<number | null>(null);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  // Lấy dữ liệu tỉ giá theo đơn vị gốc
  useEffect(() => {
    axios
      .get(`https://open.er-api.com/v6/latest/${base}`)
      .then(res => setRates(res.data.rates))
      .catch(err => console.error(err));
  }, [base]);

  const handleConvert = () => {
    if (rates[target]) {
      const rateValue = rates[target];
      setRate(rateValue);
      setConverted(amount * rateValue);
    } else {
      setRate(null);
      setConverted(null);
    }
  };

  const currencyList = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CNY", "KRW", "VND"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Quy đổi tiền tệ</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap",
          background: "#f9f9f9",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <label>Đơn vị gốc:</label>
        <select value={base} onChange={e => setBase(e.target.value)}>
          {currencyList.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>Đơn vị đích:</label>
        <select value={target} onChange={e => setTarget(e.target.value)}>
          {currencyList.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label>Số tiền:</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          min="0"
          style={{ width: "100px", padding: "5px" }}
        />

        <button
          onClick={handleConvert}
          style={{
            backgroundColor: "#0078d7",
            color: "white",
            border: "none",
            padding: "6px 14px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Quy đổi
        </button>
      </div>

      {converted !== null && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          💵 {amount} {base} ={" "}
          <b>
            {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} {target}
          </b>
          <p style={{ color: "gray" }}>Tỉ giá hiện tại: 1 {base} = {rate?.toFixed(2)} {target}</p>
        </div>
      )}
    </div>
  );
}
