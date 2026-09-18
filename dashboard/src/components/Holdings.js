import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://zerodha-project-8g6g.onrender.com/allHoldings", {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      })
      .then((res) => {
        setAllHoldings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch holdings");
        setLoading(false);
      });
  }, []);

  const labels = allHoldings.map((s) => s.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((s) => s.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0,
  );
  const currentValue = allHoldings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPct =
    totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : 0;

  if (loading) return <p style={{ padding: "20px" }}>Loading holdings…</p>;
  if (error)
    return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0;
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={isProfit ? "profit" : "loss"}>{stock.net}</td>
                  <td className={stock.isLoss ? "loss" : "profit"}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnl >= 0 ? "profit" : "loss"}>
            {pnl.toFixed(2)} ({pnlPct}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
