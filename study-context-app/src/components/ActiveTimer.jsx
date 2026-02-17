import React, { useState, useEffect } from "react";
import "../styles/ActiveTimer.css";

const ActiveTimer = ({
  subject,
  onEnd,
  initialTime = 0,
  initialTopic = "",
}) => {
  const [seconds, setSeconds] = useState(initialTime || 0);
  // NEW: State for the dynamic parts of the session
  const [localSubject, setLocalSubject] = useState(subject);
  const [topic, setTopic] = useState(initialTopic || "");
  const [notes, setNotes] = useState("");
  const [resources, setResources] = useState([]);

  const handleUpload = () => {
    if (!window.cloudinary) {
      console.error("Cloudinary widget not loaded");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dtuocgtis", // corrected Cloud Name
        uploadPreset: "study_context_preset", // Your unsigned preset
        sources: ["local", "camera", "url"],
        multiple: false,
        styles: {
          palette: {
            window: "#0F172A",
            sourceTabIcon: "#38BDF8",
            link: "#38BDF8",
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setResources((prev) => [...prev, result.info.secure_url]);
        }
      },
    );
  };

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
          {/* Always allow editing the subject (resume or new) */}
          <input
            type="text"
            placeholder="Enter Subject (e.g. DBMS)"
            className="subject-input"
            value={localSubject}
            onChange={(e) => setLocalSubject(e.target.value)}
          />

          <input
            type="text"
            className="topic-input"
            placeholder="What specific topic?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <button className="upload-btn" onClick={handleUpload}>
          📁 Add Resource (Image/Note)
        </button>
        <button
          className="end-btn"
          onClick={() =>
            onEnd({ seconds, topic, notes, subject: localSubject, resources })
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
      <div className="upload-row">
        <button className="upload-btn" onClick={handleUpload}>
          Upload Resource (image)
        </button>
        <div className="uploaded-resources">
          {resources.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer">
              Resource {i + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveTimer;
