import React from 'react';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
      <section className="about-hero">
        <h1>The Story Behind <span className="highlight">StudyContext</span></h1>
        <p>Built by students, for students who refuse to lose their train of thought.</p>
      </section>

      <section className="about-content">
        <div className="story-card">
          <h2>The Problem 🧠</h2>
          <p>
            As CSE students, we jump between LeetCode, Internship tasks, and Semester exams. 
            The biggest time-waster isn't the work—it's the 20 minutes it takes to remember 
            <b> "Where was I?"</b> every time we sit down to study.
          </p>
        </div>

        <div className="story-card">
          <h2>Our Solution 🚀</h2>
          <p>
            StudyContext uses <b>Gemini 1.5 Flash AI</b> to bridge the gap. By tracking 
            your sessions and generating "Context Briefs," our app ensures you resume 
            exactly where you left off, with all your files and logic fresh in your mind.
          </p>
        </div>
      </section>

      <section className="tech-stack">
        <h2>The Architecture</h2>
        <div className="stack-grid">
          <span>MongoDB Atlas</span>
          <span>Express.js</span>
          <span>React.js</span>
          <span>Node.js</span>
          <span>Google Gemini AI</span>
          <span>Cloudinary</span>
        </div>
      </section>
      </div>
    </>
  );
};

export default AboutUs;
