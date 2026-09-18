import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/allPositions", {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      })
      .then((res) => { setAllPositions(Array.isArray(res.data) ? res.data : []); setLoading(false); })
      .catch((err) => { setError(err.message || "Failed to fetch positions"); setLoading(false); });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading positions…</p>;

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th><th>Instrument</th><th>Qty.</th>
              <th>Avg.</th><th>LTP</th><th>P&L</th><th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0;
              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock.avg || 0).toFixed(2)}</td>
                  <td>{Number(stock.price || 0).toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                  <td className={stock.isLoss ? "loss" : "profit"}>{stock.day}</td>
                </tr>
              );
            })}
            {error && <tr><td colSpan={7} style={{ color: "red" }}>Error: {error}</td></tr>}
            {!loading && allPositions.length === 0 && !error && (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>No open positions</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
