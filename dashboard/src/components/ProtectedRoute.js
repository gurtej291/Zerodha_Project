import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Check if token came in the URL (direct redirect from frontend)
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      const name = params.get("name");
      const email = params.get("email");
      localStorage.setItem("token", urlToken);
      if (name) localStorage.setItem("userName", decodeURIComponent(name));
      if (email) localStorage.setItem("userEmail", decodeURIComponent(email));
      // Clean the URL
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "https://zerodha-project-8g6g.onrender.com/login";
      return;
    }

    // Verify token with backend
    fetch("https://zerodha-project-8g6g.onrender.com/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Invalid token");
      })
      .then((data) => {
        // Refresh name/email from server
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        setAuthed(true);
        setChecking(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        window.location.href = "http://localhost:3000/login";
      });
  }, []);

  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p style={{ color: "#387ed1", fontSize: "18px" }}>
          Loading your dashboard…
        </p>
      </div>
    );
  }

  return authed ? children : null;
};

export default ProtectedRoute;
