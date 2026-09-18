import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email";
    if (!formData.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || "Invalid credentials.");
      } else {
        // Redirect to dashboard with token so dashboard can authenticate
        window.location.href = `http://localhost:3001?token=${data.token}&name=${encodeURIComponent(data.user.name)}&email=${encodeURIComponent(data.user.email)}`;
      }
    } catch (err) {
      setServerError("Could not connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "440px" }}>
        <div className="text-center mb-4">
          <img src="media/images/logo.svg" alt="Zerodha" style={{ height: "40px" }} />
          <h4 className="mt-3 fw-bold">Welcome back</h4>
          <p className="text-muted small">Log in to your Zerodha account</p>
        </div>

        {serverError && <div className="alert alert-danger text-center">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email" name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email" value={formData.email} onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password" name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password" value={formData.password} onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
            {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status" />Logging in…</>) : "Log In"}
          </button>
        </form>

        <p className="text-center mt-3 small text-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary text-decoration-none fw-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
