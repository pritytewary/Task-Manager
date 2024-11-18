"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Star,
  Check,
  X,
  Filter,
  Calendar,
} from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("date");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredAndSortedTasks = () => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortCriteria) {
      case "priority":
        return filtered.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
      case "completed":
        return filtered.sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        );
      default:
        return filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  };

  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 border border-gray-100"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-gray-500 mb-8">Organize your tasks efficiently</p>

          <form onSubmit={addTask} className="mb-8">
            <div className="flex gap-4 flex-wrap md:flex-nowrap">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm min-w-[150px]"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                type="submit"
              >
                <Plus size={20} />
                Add Task
              </motion.button>
            </div>
          </form>

          <div className="flex gap-4 mb-8 flex-wrap md:flex-nowrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-12 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div className="relative min-w-[150px]">
              <Filter
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="w-full pl-12 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm appearance-none"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="completed">Sort by Completion</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {filteredAndSortedTasks().map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`mb-4 p-5 border rounded-xl transition-all duration-200 ${
                  task.completed ? "bg-gray-50" : "bg-white"
                } hover:shadow-md`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleComplete(task.id)}
                      className={`p-1.5 rounded-full transition-colors duration-200 ${
                        task.completed
                          ? "bg-green-500"
                          : "border-2 border-gray-300 hover:border-green-500"
                      }`}
                    >
                      {task.completed && (
                        <Check size={16} className="text-white" />
                      )}
                    </motion.button>
                    <div className="flex flex-col gap-1 flex-1">
                      <span
                        className={`${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        } font-medium`}
                      >
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`text-sm px-3 py-1.5 rounded-full border ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredAndSortedTasks().length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200"
            >
              <div className="flex flex-col items-center gap-2">
                <Search size={40} className="text-gray-400" />
                <p>No tasks found</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
