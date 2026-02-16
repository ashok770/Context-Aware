// src/components/ResumeHero.jsx
const ResumeHero = ({ lastSession, onStart }) => {
  return (
    <div className="resume-card">
      <h2>Ready to pick up {lastSession.subject}?</h2>
      <p>
        Continue from where you left off. Last topic:{" "}
        <strong>{lastSession.topic || "General"}</strong>
      </p>
      <button
        className="resume-btn"
        onClick={onStart} // <-- THIS MUST BE HERE
      >
        Resume Session
      </button>
    </div>
  );
};

export default ResumeHero; // <--- MAKE SURE THIS LINE IS HERE
