import React from "react";

const Sidebar = ({ currentView, setCurrentView, user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-logo-container">
        <img src="/images/logo.png" alt="StudyContext Logo" className="sidebar-logo-img" />
        <h1 className="logo">StudyContext</h1>
      </div>
      <ul>
        <li
          className={currentView === "dashboard" ? "active" : ""}
          onClick={() => setCurrentView("dashboard")}
        >
          🏠 Dashboard
        </li>
        <li
          className={currentView === "sessions" ? "active" : ""}
          onClick={() => setCurrentView("sessions")}
        >
          📚 Sessions
        </li>
        <li
          className={currentView === "planner" ? "active" : ""}
          onClick={() => setCurrentView("planner")}
        >
          ✅ Planner
        </li>
        <li
          className={currentView === "library" ? "active" : ""}
          onClick={() => setCurrentView("library")}
        >
          📁 Library
        </li>
        <li
          className={currentView === "workspaces" ? "active" : ""}
          onClick={() => setCurrentView("workspaces")}
        >
          🗂️ Workspaces
        </li>
        <li
          className={currentView === "analytics" ? "active" : ""}
          onClick={() => setCurrentView("analytics")}
        >
          📊 Analytics
        </li>
      </ul>
      <div className="sidebar-footer">
        <p className="user-name">👤 {user?.name || "Student"}</p>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
