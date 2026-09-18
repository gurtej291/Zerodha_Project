import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const userName = localStorage.getItem("userName") || "User";
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios.get("http://localhost:3002/allHoldings", { headers }).then((r) => setHoldings(r.data)).catch(() => {});
    axios.get("http://localhost:3002/allPositions", { headers }).then((r) => setPositions(Array.isArray(r.data) ? r.data : [])).catch(() => {});
  }, []);

  const totalInvestment = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
  const currentValue = holdings.reduce((s, h) => s + h.price * h.qty, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPct = totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : "0.00";

  const fmt = (n) =>
    Math.abs(n) >= 1000
      ? (n / 1000).toFixed(2) + "k"
      : n.toFixed(2);

  return (
    <>
      <div className="username">
        <h6>Hi, {userName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>0.00</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>0.00</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span><p>Holdings ({holdings.length})</p></span>
        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {fmt(Math.abs(pnl))} <small>{pnl >= 0 ? "+" : "-"}{Math.abs(pnlPct)}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>{fmt(currentValue)}</span></p>
            <p>Investment <span>{fmt(totalInvestment)}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {positions.length > 0 && (
        <div className="section">
          <span><p>Positions ({positions.length})</p></span>
          <div className="data">
            <div className="first">
              <h3>{positions.length}</h3>
              <p>Open positions</p>
            </div>
          </div>
          <hr className="divider" />
        </div>
      )}
    </>
  );
};

export default Summary;
