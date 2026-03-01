import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Features.css';

const Features = () => {
  const navigate = useNavigate();
  
  const featureList = [
    {
      title: "AI Context Resumption",
      desc: "Powered by Gemini 1.5 Flash. Our AI analyzes your last session's notes and code snippets to give you a 30-second briefing so you can hit 'Flow State' instantly.",
      icon: "🤖",
      tag: "Intelligence"
    },
    {
      title: "Project-Based Workspaces",
      desc: "Stop mixing your DSA prep with your AIML project. Create dedicated silos for every subject with unique timers and resource vaults.",
      icon: "📂",
      tag: "Organization"
    },
    {
      title: "Deep Work Analytics",
      desc: "Visualize your focus with Heatmaps and Distribution charts. See exactly which hours of the day you are most productive.",
      icon: "📊",
      tag: "Analytics"
    },
    {
      title: "The Cloud Library",
      desc: "Upload PDFs, Syllabus copies, and Research papers directly to Cloudinary. Access your study materials from any device, anywhere.",
      icon: "☁️",
      tag: "Storage"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="features-page">
      <header className="features-header">
        <span className="badge">Platform Capabilities</span>
        <h1>Engineered for <span className="highlight">Maximum Focus</span></h1>
        <p>Everything you need to bridge the gap between "Sitting Down" and "Getting Results."</p>
      </header>

      <section className="features-grid">
        {featureList.map((f, i) => (
          <div className="feature-item" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-text">
              <span className="feature-tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="cta-banner">
        <h2>Ready to regain your context?</h2>
        <button className="cta-btn" onClick={() => navigate('/login')}>Start Your First Session</button>
      </div>
    </div>
    </>
  );
};

export default Features;
