import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Library.css";

const Library = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sessions");
        // Extracting resources from all sessions and flattening the array
        const allFiles = res.data.flatMap((session) =>
          session.resources.map((link) => ({
            url: link,
            topic: session.topic,
            date: new Date(session.date).toLocaleDateString(),
            type: link.match(/\.(jpeg|jpg|gif|png)$/) ? "image" : "document",
          })),
        );
        setResources(allFiles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching library:", err);
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

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
