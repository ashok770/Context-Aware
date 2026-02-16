import React, { useState, useEffect } from "react";
import "../styles/ActiveSession.css";

const ActiveSession = ({ subject, onEnd }) => {
  const [seconds, setSeconds] = useState(0);

  // The Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval); // Cleanup when session ends
  }, []);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="active-session-container">
      <header className="session-header">
        <h2>Focusing on: {subject}</h2>
        <div className="timer-display">{formatTime(seconds)}</div>
        <button className="end-session-btn" onClick={onEnd}>
          Finish & Save
        </button>
      </header>

      <div className="session-body">
        <textarea
          placeholder="Start typing your session notes here..."
          className="notes-area"
        ></textarea>
      </div>
    </div>
  );
};

export default ActiveSession;
