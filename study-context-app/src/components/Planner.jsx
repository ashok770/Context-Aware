import React from "react";
import "../styles/Planner.css";

const Planner = ({ sessions = [] }) => {
  const [tasks, setTasks] = React.useState([]);
  const [taskInput, setTaskInput] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("general");
  const [selectedPriority, setSelectedPriority] = React.useState("medium");
  const [dueDateInput, setDueDateInput] = React.useState("");
  const [resourcesInput, setResourcesInput] = React.useState("");

  const categories = [
    { id: "general", label: "General", color: "#38bdf8" },
    { id: "urgent", label: "Urgent", color: "#ef4444" },
    { id: "review", label: "Review", color: "#f59e0b" },
    { id: "assignment", label: "Assignment", color: "#10b981" },
    { id: "project", label: "Project", color: "#8b5cf6" },
  ];

  const priorities = ["low", "medium", "high"];

  // Load tasks from backend on mount
  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!taskInput.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: taskInput,
          category: selectedCategory,
          priority: selectedPriority,
          dueDate: dueDateInput || null,
          resources: resourcesInput
            ? resourcesInput
                .split(",")
                .map((r) => r.trim())
                .filter(Boolean)
            : [],
        }),
      });
      if (res.ok) {
        const saved = await res.json();
        setTasks([saved, ...tasks]);
        setTaskInput("");
        setDueDateInput("");
        setResourcesInput("");
      }
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id || t.id === id);
      if (!task) return;
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      }
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks(tasks.filter((t) => t._id !== id && t.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const getCategoryColor = (categoryId) => {
    return categories.find((c) => c.id === categoryId)?.color || "#38bdf8";
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: { color: "#10b981", label: "Low" },
      medium: { color: "#f59e0b", label: "Medium" },
      high: { color: "#ef4444", label: "High" },
    };
    return badges[priority];
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="planner-view">
      <div className="planner-header">
        <h1>Study Planner</h1>
        {totalTasks > 0 && (
          <div className="planner-stats">
            <span>
              {completedCount} / {totalTasks} completed
            </span>
            <div
              className="progress-bar"
              style={{
                width: "100%",
                height: "6px",
                background: "#334155",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%`,
                  height: "100%",
                  background: "#38bdf8",
                  transition: "width 0.3s",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="planner-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="priority-select"
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDateInput}
          onChange={(e) => setDueDateInput(e.target.value)}
          className="due-date-input"
        />
        <input
          type="text"
          placeholder="Resources (comma-separated)"
          value={resourcesInput}
          onChange={(e) => setResourcesInput(e.target.value)}
          className="resources-input"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="planner-tasks">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>📚 No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <div>
            {sortedTasks.map((task) => {
              const priorityBadge = getPriorityBadge(task.priority);
              const categoryColor = getCategoryColor(task.category);
              return (
                <div
                  key={task._id}
                  className={`planner-task ${task.completed ? "completed" : ""}`}
                  style={{
                    background: task.completed ? "#0f172a" : "#1e293b",
                    borderLeft: `4px solid ${categoryColor}`,
                  }}
                >
                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    <div className="task-meta">
                      <span
                        className="priority-badge"
                        style={{ background: priorityBadge.color }}
                      >
                        {priorityBadge.label}
                      </span>
                      <span className="task-date">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      {task.resources && task.resources.length > 0 && (
                        <div className="task-resources">
                          {task.resources.map((r, i) => (
                            <a
                              key={i}
                              href={r}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {r}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => toggleTask(task._id)}
                      className={`toggle-btn ${task.completed ? "completed" : ""}`}
                      style={{
                        background: task.completed ? "#10b981" : "#6b7280",
                      }}
                    >
                      {task.completed ? "✓" : "○"}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="delete-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Planner;
