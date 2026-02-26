import React from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Analytics.css";

const Analytics = ({ sessions }) => {
  // Focus Distribution by Subject
  const subjectData = sessions.reduce((acc, session) => {
    const subject = session.subject || "Uncategorized";
    if (!acc[subject]) {
      acc[subject] = 0;
    }
    acc[subject] += session.seconds / 60; // Convert to minutes
    return acc;
  }, {});

  const pieData = Object.keys(subjectData).map((subject) => ({
    name: subject,
    value: Math.round(subjectData[subject]),
  }));

  // Productivity Trend - Last 7 Days
  const last7Days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    last7Days.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: date.toDateString(),
      minutes: 0,
    });
  }

  sessions.forEach((session) => {
    const sessionDate = new Date(session.date || session.createdAt).toDateString();
    const dayData = last7Days.find((d) => d.fullDate === sessionDate);
    if (dayData) {
      dayData.minutes += Math.round(session.seconds / 60);
    }
  });

  const COLORS = ["#38bdf8", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  const totalMinutes = sessions.reduce((sum, s) => sum + s.seconds / 60, 0);
  const totalSessions = sessions.length;
  const avgSessionTime = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h1>📊 Deep Work Analytics</h1>
        <p>Your study patterns and productivity insights</p>
      </header>

      <div className="stats-overview">
        <div className="stat-box">
          <span className="stat-icon">⏱️</span>
          <div>
            <h3>{Math.round(totalMinutes)} mins</h3>
            <p>Total Study Time</p>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">📚</span>
          <div>
            <h3>{totalSessions}</h3>
            <p>Total Sessions</p>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon">⚡</span>
          <div>
            <h3>{avgSessionTime} mins</h3>
            <p>Avg Session</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>🎯 Focus Distribution</h2>
          <p className="chart-subtitle">Time spent per subject</p>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No data available</div>
          )}
        </div>

        <div className="chart-card">
          <h2>📈 Productivity Trend</h2>
          <p className="chart-subtitle">Study minutes over last 7 days</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155" }}
                labelStyle={{ color: "#38bdf8" }}
              />
              <Legend />
              <Line type="monotone" dataKey="minutes" stroke="#38bdf8" strokeWidth={3} dot={{ fill: "#38bdf8", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
