import React, { useState, useEffect } from "react";
import "./Library.css";

const Library = ({ sessions }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract resources from sessions prop instead of fetching
    const allFiles = sessions.flatMap((session) =>
      session.resources.map((link) => ({
        url: link,
        topic: session.topic,
        date: new Date(session.date || session.createdAt).toLocaleDateString(),
        type: link.match(/\.(jpeg|jpg|gif|png)$/) ? "image" : "document",
      })),
    );
    setResources(allFiles);
    setLoading(false);
  }, [sessions]);

  return (
    <div className="library-container">
      <header className="library-header">
        <h1>Digital Library</h1>
        <p>All your uploaded screenshots and study materials in one place.</p>
      </header>

      {loading ? (
        <div className="loader">Loading Vault...</div>
      ) : (
        <div className="resource-grid">
          {resources.length > 0 ? (
            resources.map((file, index) => (
              <div key={index} className="resource-card">
                <div className="file-preview">
                  {file.type === "image" ? (
                    <img src={file.url} alt="Resource" />
                  ) : (
                    <div className="pdf-icon">📄 PDF / Doc</div>
                  )}
                </div>
                <div className="file-info">
                  <h4>{file.topic}</h4>
                  <span>{file.date}</span>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="view-btn"
                  >
                    View File
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-library">
              No resources found. Time to start a study session!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
