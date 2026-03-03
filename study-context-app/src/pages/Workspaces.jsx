import React, { useState } from "react";
import API_URL from "../config";
import "./Workspaces.css";

const Workspaces = ({ sessions }) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [workspaceSummaries, setWorkspaceSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState(false);

  const groupedSessions = sessions.reduce((acc, session) => {
    const subject = session.subject || "Uncategorized";
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(session);
    return acc;
  }, {});

  const generateWorkspaceSummary = async (subject) => {
    if (workspaceSummaries[subject]) return; // Don't regenerate if already exists
    
    setLoadingSummary(true);
    const workspaceSessions = groupedSessions[subject];
    const allTopics = workspaceSessions.map(s => s.topic || "General").join(", ");
    const allNotes = workspaceSessions.map(s => s.notes || "").join(" ");
    const totalTime = workspaceSessions.reduce((sum, s) => sum + s.seconds, 0);

    try {
      const response = await fetch(`${API_URL}/api/workspace-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          topics: allTopics,
          notes: allNotes,
          sessionCount: workspaceSessions.length,
          totalTime: Math.floor(totalTime / 60)
        })
      });
      const data = await response.json();
      setWorkspaceSummaries(prev => ({ ...prev, [subject]: data.summary }));
    } catch (error) {
      console.error("Error generating workspace summary:", error);
      setWorkspaceSummaries(prev => ({ ...prev, [subject]: "Unable to generate summary at this time." }));
    }
    setLoadingSummary(false);
  };

  if (selectedWorkspace) {
    const workspaceSessions = groupedSessions[selectedWorkspace];
    return (
      <div className="workspace-detail">
        <button className="back-btn" onClick={() => setSelectedWorkspace(null)}>
          ← Back to Workspaces
        </button>
        <header className="detail-header">
          <h1>{selectedWorkspace}</h1>
          <p>{workspaceSessions.length} sessions</p>
          <button 
            className="summary-btn" 
            onClick={() => generateWorkspaceSummary(selectedWorkspace)}
            disabled={loadingSummary}
          >
            {loadingSummary ? "Generating..." : "🤖 Generate AI Workspace Summary"}
          </button>
        </header>
        {workspaceSummaries[selectedWorkspace] && (
          <div className="workspace-summary-box">
            <h3>📊 Workspace Progress Summary</h3>
            <div className="summary-content">{workspaceSummaries[selectedWorkspace]}</div>
          </div>
        )}
        <div className="sessions-list">
          {workspaceSessions.map((session) => (
            <div key={session._id} className="session-item">
              <h3>{session.topic || "General Study"}</h3>
              <p className="session-date">
                {new Date(session.date || session.createdAt).toLocaleDateString()}
              </p>
              <p className="session-time">
                Duration: {Math.floor(session.seconds / 60)} mins
              </p>
              {session.summary && (
                <div className="session-summary">
                  <strong>AI Summary:</strong>
                  <p>{session.summary}</p>
                </div>
              )}
              {session.notes && (
                <div className="session-notes">
                  <strong>Notes:</strong>
                  <p>{session.notes}</p>
                </div>
              )}
              {session.resources && session.resources.length > 0 && (
                <div className="session-resources">
                  <strong>Resources:</strong>
                  <div className="resource-links">
                    {session.resources.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noreferrer">
                        📎 Resource {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="workspaces-container">
      <header className="workspaces-header">
        <h1>🗂️ Workspaces</h1>
        <p>Your study sessions organized by subject</p>
      </header>

      <div className="workspace-grid">
        {Object.keys(groupedSessions).map((subject) => {
          const workspace = groupedSessions[subject];
          const totalSessions = workspace.length;
          const totalResources = workspace.reduce(
            (sum, s) => sum + (s.resources?.length || 0),
            0
          );
          const totalTime = workspace.reduce((sum, s) => sum + s.seconds, 0);

          return (
            <div 
              key={subject} 
              className="workspace-card"
              onClick={() => setSelectedWorkspace(subject)}
            >
              <div className="workspace-header">
                <h2>{subject}</h2>
                <span className="session-count">{totalSessions} sessions</span>
              </div>
              <div className="workspace-stats">
                <div className="stat">
                  <span className="stat-label">Total Time</span>
                  <span className="stat-value">
                    {Math.floor(totalTime / 3600)}h {Math.floor((totalTime % 3600) / 60)}m
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Resources</span>
                  <span className="stat-value">{totalResources}</span>
                </div>
              </div>
              <div className="recent-topics">
                <h4>Recent Topics:</h4>
                <ul>
                  {workspace.slice(0, 3).map((s, i) => (
                    <li key={i}>{s.topic || "General Study"}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(groupedSessions).length === 0 && (
        <div className="empty-workspaces">
          <p>No workspaces yet. Start a study session to create one!</p>
        </div>
      )}
    </div>
  );
};

export default Workspaces;
