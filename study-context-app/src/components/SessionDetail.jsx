import React from "react";

const SessionDetail = ({ session, onClose }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getSessionSummary = () => {
    const lines = session.notes ? session.notes.trim().split("\n") : [];
    return {
      totalLines: lines.length,
      firstLine: lines[0] || "No notes added",
      wordCount: session.notes ? session.notes.split(/\s+/).length : 0,
    };
  };

  const summary = getSessionSummary();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="session-detail">
          <div className="detail-header">
            <h2>{session.subject}</h2>
            <span className="detail-date">{session.date}</span>
          </div>

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <label>Topic</label>
              <p>{session.topic || "General Study"}</p>
            </div>
            <div className="detail-info-item">
              <label>Duration</label>
              <p>{formatTime(session.seconds)}</p>
            </div>
            <div className="detail-info-item">
              <label>Total Lines</label>
              <p>{summary.totalLines} lines</p>
            </div>
            <div className="detail-info-item">
              <label>Words Written</label>
              <p>{summary.wordCount} words</p>
            </div>
          </div>

          <div className="detail-section">
            <h3>Session Notes & Summary</h3>
            <div className="notes-container">
              {session.notes ? (
                <p className="session-notes">{session.notes}</p>
              ) : (
                <p className="empty-notes">
                  No notes were added in this session.
                </p>
              )}
            </div>
          </div>

          {session.resources && session.resources.length > 0 && (
            <div className="detail-section">
              <h3>Resources</h3>
              <div className="resources-grid">
                {session.resources.map((url, index) => (
                  <div key={index} className="resource-card">
                    {url.endsWith('.pdf') ? (
                      <div className="pdf-preview" onClick={() => window.open(url, '_blank')}>
                        <div className="pdf-icon">📄</div>
                        <span>View Study Note {index + 1}</span>
                      </div>
                    ) : (
                      <img
                        src={url}
                        alt="Resource"
                        className="img-preview"
                        onClick={() => window.open(url, '_blank')}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-footer">
            <button className="modal-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
