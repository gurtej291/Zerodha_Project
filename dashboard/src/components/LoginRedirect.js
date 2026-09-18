// This page handles the redirect from the frontend after login.
// It picks up ?token=... from the URL, saves to localStorage, then goes to dashboard.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name || "");
      localStorage.setItem("userEmail", email || "");
      navigate("/", { replace: true });
    } else {
      // No token — go back to frontend login
      window.location.href = "http://localhost:3000/login";
    }
  }, [navigate]);

  return null;
};

export default LoginRedirect;
