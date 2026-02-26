import React, { useState, useEffect } from "react";
import "./styles/global.css";
import "./App.css";
import ResumeHero from "./components/ResumeHero";
import ActiveTimer from "./components/ActiveTimer";
import Sidebar from "./components/Sidebar";
import Planner from "./components/Planner";
import SessionDetail from "./components/SessionDetail";
import Library from "./pages/Library.jsx";
import Workspaces from "./pages/Workspaces.jsx";
import Analytics from "./components/Analytics.jsx";
import Auth from "./pages/Auth.jsx";
import { mockSession } from "./data";

function App() {
  const [user, setUser] = useState(null);
  const [isStudying, setIsStudying] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeSubject, setActiveSubject] = useState("");
  const [activeTopic, setActiveTopic] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [resumeTime, setResumeTime] = useState(0);
  const [sessions, setSessions] = useState([]);

  // Check for existing token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: "Student" });
    }
  }, []);

  // Load sessions from the database when user is authenticated
  useEffect(() => {
    if (!user) return;
    
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/sessions", {
          headers: { 'x-auth-token': token }
        });
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (err) {
        console.error("Failed to load sessions:", err);
      }
    };
    fetchSessions();
  }, [user]);

  const handleResume = () => {
    if (sessions.length > 0) {
      const lastRealSession = sessions[0];
      setActiveSubject(lastRealSession.subject);
      setActiveTopic(lastRealSession.topic || "");
      setResumeTime(lastRealSession.seconds || 0);
      setIsStudying(true);
    } else {
      // fallback to mock
      setActiveSubject(mockSession.subject);
      setActiveTopic(mockSession.topic || "");
      setResumeTime(0);
      setIsStudying(true);
    }
  };

  const handleStartNew = () => {
    setActiveSubject(""); // Empty for first-time use
    setActiveTopic("");
    setResumeTime(0);
    setIsStudying(true);
  };
  const handleDeleteSession = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/sessions/${id}`, {
        method: "DELETE",
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        setSessions(sessions.filter((session) => session._id !== id));
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };
  const handleEndSession = async (sessionData) => {
    const sessionToSave = {
      subject: sessionData.subject || activeSubject || "New Subject",
      topic: sessionData.topic,
      notes: sessionData.notes,
      seconds: sessionData.seconds,
      resources: sessionData.resources || [],
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'x-auth-token': token
        },
        body: JSON.stringify(sessionToSave),
      });

      if (response.ok) {
        const savedSession = await response.json();
        setSessions([savedSession, ...sessions]);
        setIsStudying(false);
        setCurrentView("sessions");
      }
    } catch (err) {
      console.error("Failed to save session to cloud:", err);
      alert("Cloud save failed, but your session is still in local state!");
    }
  };

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  if (isStudying) {
    return (
      <ActiveTimer
        subject={activeSubject}
        initialTime={resumeTime}
        initialTopic={activeTopic}
        onEnd={handleEndSession}
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} setUser={setUser} />

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

        {currentView === "library" && <Library sessions={sessions} />}

        {currentView === "workspaces" && <Workspaces sessions={sessions} />}

        {currentView === "analytics" && <Analytics sessions={sessions} />}
      </main>
    </div>
  );
}

export default App;
