const Planner = ({ sessions }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Function to check if a specific day has any sessions
  const getStatusForDay = (day) => {
    return sessions.some((session) => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getDate() === day &&
        sessionDate.getMonth() === currentMonth &&
        sessionDate.getFullYear() === currentYear
      );
    });
  };

  // Calculate the current streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date().getDate();

    // Simple logic: check backwards from today
    for (let i = today; i > 0; i--) {
      if (getStatusForDay(i)) streak++;
      else break;
    }
    return streak;
  };

  return (
    <div className="planner-container">
      <div className="stats-bar">
        <div className="stat-card">
          <span>Current Streak</span>
          <h2>{calculateStreak()} Days 🔥</h2>
        </div>
        <div className="stat-card">
          <span>Total Sessions</span>
          <h2>{sessions.length}</h2>
        </div>
      </div>

      <div className="grid-30">
        {days.map((day) => (
          <div
            key={day}
            className={`day-box ${getStatusForDay(day) ? "completed" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
