import React from "react";
import "../styles/Planner.css";

const Planner = ({ sessions }) => {
  // Create an array for 30 days
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // Function to check if you studied on a specific day (Logic for tomorrow)
  const hasStudied = (day) => {
    // For now, we'll just return false until we link real dates
    return false;
  };

  return (
    <div className="planner-container">
      <header className="planner-header">
        <h1>30-Day Consistency Tracker</h1>
        <p>Build your streak for the next Hackathon!</p>
      </header>

      <div className="stats-bar">
        <div className="stat-card">
          <span>Current Streak</span>
          <h2>0 Days</h2>
        </div>
        <div className="stat-card">
          <span>Total Sessions</span>
          <h2>{sessions.length}</h2>
        </div>
      </div>

      <div className="grid-30">
        {days.map((day) => (
          <div
            key={day}
            className={`day-box ${hasStudied(day) ? "completed" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planner;
