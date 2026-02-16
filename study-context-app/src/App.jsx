import React, { useState, useEffect } from "react";
import "./styles/global.css";
import "./App.css";
import ResumeHero from "./components/ResumeHero";
import ActiveTimer from "./components/ActiveTimer";
import Sidebar from "./components/Sidebar";
import Planner from "./components/Planner";
import SessionDetail from "./components/SessionDetail";
import { mockSession } from "./data";

function App() {
  const [isStudying, setIsStudying] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeSubject, setActiveSubject] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialTime, setInitialTime] = useState(0);

  // This array will store all your finished sessions
  const [sessions, setSessions] = useState([]);

  // Load sessions from the database when the app starts
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sessions");
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (err) {
        console.error("Failed to load sessions:", err);
      }
    };
    fetchSessions();
  }, []);

  const handleResume = () => {
    if (sessions.length > 0) {
      const lastRealSession = sessions[0];
      setActiveSubject(lastRealSession.subject);
      setActiveTopic(lastRealSession.topic || "");
      setInitialTime(lastRealSession.seconds || 0);
      setIsStudying(true);
    } else {
      // fallback to mock
      setActiveSubject(mockSession.subject);
      setActiveTopic(mockSession.topic || "");
      setInitialTime(0);
      setIsStudying(true);
    }
  };

  const handleStartNew = () => {
    setActiveSubject(""); // Empty for first-time use
    setActiveTopic("");
    setInitialTime(0);
    setIsStudying(true);
  };
  const handleDeleteSession = async (id) => {
    // Optional: Add a confirmation popup
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/sessions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Filter out the deleted session from the local state
        setSessions(sessions.filter((session) => session._id !== id));
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };
  // This function runs when you click "End Session"
  const handleEndSession = async (sessionData) => {
    // 1. Prepare the payload for MongoDB — prefer subject from the timer
    const sessionToSave = {
      subject: sessionData.subject || activeSubject || "New Subject",
      topic: sessionData.topic,
      notes: sessionData.notes,
      seconds: sessionData.seconds,
    };

    try {
      // 2. Send the POST request to your Express server
      const response = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionToSave),
      });

      if (response.ok) {
        const savedSession = await response.json();
        // 3. Update the UI with the session returned from the DB
        setSessions([savedSession, ...sessions]);
        setIsStudying(false);
        setCurrentView("sessions"); // Take the user to their history
      }
    } catch (err) {
      console.error("Failed to save session to cloud:", err);
      alert("Cloud save failed, but your session is still in local state!");
    }
  };

  if (isStudying) {
    return <ActiveTimer subject={activeSubject} onEnd={handleEndSession} />;
  }

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="main-content">
        {currentView === "dashboard" && (
          <>
            <header>
              <h1>Student Dashboard</h1>
            </header>
            <ResumeHero
              lastSession={sessions.length > 0 ? sessions[0] : mockSession}
              onStart={handleResume}
            />
            <button
              className="start-btn"
              onClick={handleStartNew}
              style={{ marginTop: "20px" }}
            >
              + Start New Study Session
            </button>
          </>
        )}

        {currentView === "sessions" && (
          <div className="sessions-view">
            <h1>Study History</h1>
            {sessions.length === 0 ? (
              <p>No sessions saved yet.</p>
            ) : (
              <div className="sessions-list">
                {sessions.map((s) => (
                  <div
                    key={s._id}
                    className="session-card"
                    style={{
                      background: "#1e293b",
                      padding: "15px",
                      margin: "10px 0",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="session-card-header">
                      <div>
                        <h3>
                          {s.subject} - {s.topic || "General"}
                        </h3>
                        <p>
                          Duration: {Math.floor(s.seconds / 60)} mins | Date:{" "}
                          {s.date ||
                            (s.createdAt
                              ? new Date(s.createdAt).toLocaleDateString()
                              : "")}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="view-more-btn"
                          onClick={() => setSelectedSession(s)}
                        >
                          View More →
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteSession(s._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedSession && (
              <SessionDetail
                session={selectedSession}
                onClose={() => setSelectedSession(null)}
              />
            )}
          </div>
        )}

        {currentView === "planner" && <Planner sessions={sessions} />}
      </main>
    </div>
  );
}

export default App;
