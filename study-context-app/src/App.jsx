import React, { useState } from "react";
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
  const [selectedSession, setSelectedSession] = useState(null);

  // This array will store all your finished sessions
  const [sessions, setSessions] = useState([]);

  const handleResume = () => {
    // If user has history, use the last one. If not, use mock.
    const source = sessions.length > 0 ? sessions[0] : mockSession;
    setActiveSubject(source.subject);
    setIsStudying(true);
  };

  const handleStartNew = () => {
    setActiveSubject(""); // Empty for first-time use
    setIsStudying(true);
  };

  // This function runs when you click "End Session"
  const handleEndSession = (data) => {
    const newSession = {
      id: Date.now(),
      subject: data.subject || activeSubject || "New Subject",
      topic: data.topic,
      notes: data.notes,
      seconds: data.seconds,
      date: new Date().toLocaleDateString(),
    };
    setSessions([newSession, ...sessions]); // Save to the list
    setIsStudying(false);
    setCurrentView("sessions"); // Show history immediately
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
                    key={s.id}
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
                          {s.date}
                        </p>
                      </div>
                      <button
                        className="view-more-btn"
                        onClick={() => setSelectedSession(s)}
                      >
                        View More →
                      </button>
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

        {currentView === "planner" && <Planner />}
      </main>
    </div>
  );
}

export default App;
