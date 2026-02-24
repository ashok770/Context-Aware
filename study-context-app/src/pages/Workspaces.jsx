import React from "react";
import "./Workspaces.css";

const Workspaces = ({ sessions }) => {
  const groupedSessions = sessions.reduce((acc, session) => {
    const subject = session.subject || "Uncategorized";
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(session);
    return acc;
  }, {});

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
            <div key={subject} className="workspace-card">
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
