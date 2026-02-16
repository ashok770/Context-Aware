import React, { useState, useEffect } from "react";
import "../styles/ActiveTimer.css";

const ActiveTimer = ({ subject, onEnd }) => {
  const [seconds, setSeconds] = useState(0);
  // NEW: State for the dynamic parts of the session
  const [localSubject, setLocalSubject] = useState(subject);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="timer-container">
      <div className="timer-header">
        <div className="subject-info">
          {/* If subject exists (Resume), show text. If not (New), show input */}
          {subject ? (
            <h1>{localSubject}</h1>
          ) : (
            <input
              type="text"
              placeholder="Enter Subject (e.g. DBMS)"
              className="subject-input"
              value={localSubject}
              onChange={(e) => setLocalSubject(e.target.value)}
            />
          )}

          <input
            type="text"
            className="topic-input"
            placeholder="What specific topic?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <button
          className="end-btn"
          onClick={() =>
            onEnd({ seconds, topic, notes, subject: localSubject })
          }
        >
          End Session
        </button>
      </div>

      <div className="clock-face">{formatTime(seconds)}</div>

      <textarea
        className="live-notes"
        placeholder="Type your notes here... they stay in context!"
        value={notes}
        onChange={(e) => setNotes(e.target.value)} // Now you can actually type!
      />
    </div>
  );
};

export default ActiveTimer;
