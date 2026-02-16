import React from "react";

const Sidebar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="sidebar">
      <h1 className="logo">StudyContext</h1>
      <ul>
        <li
          className={currentView === "dashboard" ? "active" : ""}
          onClick={() => setCurrentView("dashboard")}
        >
          Dashboard
        </li>
        <li
          className={currentView === "sessions" ? "active" : ""}
          onClick={() => setCurrentView("sessions")}
        >
          Sessions
        </li>
        <li
          className={currentView === "planner" ? "active" : ""}
          onClick={() => setCurrentView("planner")}
        >
          Planner
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
