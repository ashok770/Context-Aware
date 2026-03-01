import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="public-nav">
      <div className="nav-container">
        <div className="logo-container" onClick={() => navigate('/')}>
          <img src="/images/logo.png" alt="StudyContext Logo" className="logo-img" />
          <div className="logo">StudyContext</div>
        </div>
        <div className="nav-menu">
          <button onClick={() => navigate('/')} className="nav-menu-link">Home</button>
          <button onClick={() => navigate('/features')} className="nav-menu-link">Features</button>
          <button onClick={() => navigate('/about')} className="nav-menu-link">About Us</button>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate('/login')} className="login-link">Login</button>
          <button onClick={() => navigate('/login')} className="signup-btn">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
