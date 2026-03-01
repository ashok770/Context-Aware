import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Auth = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData,
      );
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/dashboard");
      } else {
        setIsLogin(true);
        alert("Registration successful! Please login.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-to-home" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        {error && <p className="error-msg">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit" className="auth-btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
