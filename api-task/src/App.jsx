import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1); // Default to 1 to avoid 0 API calls
  const [livePrice, setLivePrice] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const apiUrl = import.meta.env.VITE_Access_key;

  function getRate() {
    if (!fromCurrency || !toCurrency || amount <= 0) {
      console.log("Invalid input values");
      return;
    }

    axios
      .get(
        //`https://api.metalpriceapi.com/v1/convert?api_key=5d4665a0dd6fdffc6a9ee772ba9710b1&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&date=2025-03-01`
        //`https://api.commoditypriceapi.com/v2/usage -H "x-api-key: 52d6b86d-9678-4bf9-a729-bb08c090bc47"&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&date=2025-03-01`
        `https://api.metalpriceapi.com/v1/convert?api_key=da66bfeb9864311b6db6472bd580c1de&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&date=2025-03-01`
      )
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && response.data.result) {
          setLivePrice(response.data.result);
        } else {
          console.error("Invalid API response:", response.data);
          setLivePrice("Error fetching data");
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        setLivePrice("Error fetching data");
      });
  }

  useEffect(() => {
    if (amount > 0) {
      getRate();
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <>
      <div>
        <h1>Currency Converter</h1>
        <div>
          <label>From</label>
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>

          <label>To</label>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
          </select>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))} // Convert to number
          />

          <label>Exchange Rate: </label>
          <p>{livePrice ? livePrice : "Fetching..."}</p>
        </div>
      </div>
    </>
  );
}

export default App;

