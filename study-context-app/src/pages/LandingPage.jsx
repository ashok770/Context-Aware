import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="logo-container">
          <img src="/images/logo.png" alt="StudyContext Logo" className="logo-img" />
          <div className="logo">StudyContext</div>
        </div>
        <div className="nav-menu">
          <a href="#home" className="nav-menu-link">Home</a>
          <button onClick={() => navigate('/features')} className="nav-menu-link">Features</button>
          <button onClick={() => navigate('/about')} className="nav-menu-link">About Us</button>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/login')} className="login-link">Login</button>
          <button onClick={() => navigate('/login')} className="signup-btn">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Stop Searching. <span className="highlight">Start Resuming.</span></h1>
            <p>
              The first context-aware study tracker for CSE students. 
              Integrated with Gemini AI to summarize your sessions and organize your project workspaces.
            </p>
            <div className="hero-btns">
              <button onClick={() => navigate('/login')} className="main-btn">Build Your Workspace</button>
              <button onClick={() => document.querySelector('.demo-section').scrollIntoView({ behavior: 'smooth' })} className="secondary-btn">Watch Demo</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/dashboard.png" alt="Dashboard Preview" />
          </div>
        </div>
      </header>

      {/* Demo Video Section */}
      <section className="demo-section">
        <h2>See StudyContext in Action</h2>
        <div className="video-container">
          <video controls poster="/images/dashboard.png">
            <source src="/videos/demo.mp4" type="video/mp4" />
            Your browser doesn't support video playback.
          </video>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="features" id="features">
        <div className="feature-card">
          <div className="icon">🧠</div>
          <h3>AI Insights</h3>
          <p>Gemini 1.5 Flash automatically summarizes your notes so you never lose your train of thought.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📂</div>
          <h3>Project Workspaces</h3>
          <p>Group sessions by subject like "DSA" or "AIML" to track your journey toward internship goals.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📚</div>
          <h3>Digital Vault</h3>
          <p>All your Cloudinary-hosted PDFs and screenshots organized in a searchable library.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
