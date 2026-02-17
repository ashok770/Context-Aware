import React, { useState, useEffect } from "react";
import "../styles/ActiveSession.css";

const ActiveSession = ({ subject, onEnd }) => {
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState("");
  const [resources, setResources] = useState([]); // array of uploaded URLs

  // Cloudinary config
  const CLOUDINARY_CLOUD_NAME = "dtuocgtis";
  const CLOUDINARY_UPLOAD_PRESET = "study_context_preset"; // unsigned preset

  const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setResources((r) => [...r, uploadedUrl]);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

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
        <button
          className="end-session-btn"
          onClick={async () => {
            // package session data including resources and notes
            try {
              await fetch("http://localhost:5000/api/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  subject,
                  topic: "",
                  notes,
                  seconds,
                  resources,
                }),
              });
            } catch (err) {
              console.error("Failed to save session", err);
            }
            onEnd();
          }}
        >
          Finish & Save
        </button>
      </header>

      <div className="session-body">
        <textarea
          placeholder="Start typing your session notes here..."
          className="notes-area"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="resource-upload">
          <label>Add image resource:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="uploaded-list">
            {resources.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noreferrer">
                Resource {i + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSession;
