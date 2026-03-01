import React from "react";
import { useNavigate } from "react-router-dom";
import "./Demo.css";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="demo-page">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="logo-container">
          <img src="/images/logo.png" alt="StudyContext Logo" className="logo-img" />
          <div className="logo">StudyContext</div>
        </div>
        <div className="nav-menu">
          <button onClick={() => navigate('/')} className="nav-menu-link">Home</button>
          <button onClick={() => navigate('/features')} className="nav-menu-link">Features</button>
          <button onClick={() => navigate('/demo')} className="nav-menu-link active">Demo</button>
          <button onClick={() => navigate('/about')} className="nav-menu-link">About Us</button>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/login')} className="login-link">Login</button>
          <button onClick={() => navigate('/login')} className="signup-btn">Get Started</button>
        </div>
      </nav>

      {/* Demo Video Section */}
      <section className="demo-main-section">
        <div className="demo-header">
          <h1>See StudyContext in Action</h1>
          <p>Watch how StudyContext helps you track, organize, and resume your study sessions effortlessly with AI-powered insights</p>
        </div>
        
        <div className="demo-video-wrapper">
          <video controls poster="/images/dashboard.png">
            <source src="/videos/demo.mp4" type="video/mp4" />
            Your browser doesn't support video playback.
          </video>
        </div>

        <div className="demo-cta">
          <h2>Ready to Transform Your Study Routine?</h2>
          <button onClick={() => navigate('/login')} className="cta-btn">Start Your Journey</button>
        </div>
      </section>
    </div>
  );
};

export default Demo;
