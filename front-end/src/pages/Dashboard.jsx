import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KanbanBoard from "../components/KanbanBoard";
import TaskStatistics from "../components/TaskStatistics";
import AddTaskModal from "../components/AddTaskModal";
import api from "../api/axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.data.tasks);
    } catch (error) {
      toast.error("Failed to fetch tasks. Please try again later.");
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/tasks/stats");
      setStats(response.data.data.stats);
    } catch (error) {
      toast.error("Failed to fetch statistics. Please try again later.");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTasks();
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Successfully logged out!");
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      await api.put(`/tasks/${taskId}`, updates);
      await Promise.all([fetchTasks(), fetchStats()]);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      await api.post("/tasks", taskData);
      await Promise.all([fetchTasks(), fetchStats()]);
      setIsAddModalOpen(false);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task. Please try again.");
    }
  };

  const handleArchiveTask = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}/archive`);
      await Promise.all([fetchTasks(), fetchStats()]);
      toast.success("Task archived successfully!");
    } catch (error) {
      toast.error("Failed to archive task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      await Promise.all([fetchTasks(), fetchStats()]);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Task Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Add Task
              </button>
              <span>Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <TaskStatistics stats={stats} />
          <KanbanBoard
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onArchiveTask={handleArchiveTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </main>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleTaskCreate}
      />
    </div>
  );
};

export default Dashboard;
