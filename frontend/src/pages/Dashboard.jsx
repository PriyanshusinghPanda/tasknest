import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });
  const [filter, setFilter] = useState({
    status: '',
    category: '',
    priority: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        status: 'pending',
        dueDate: ''
      });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (!filter.status || task.status === filter.status) &&
      (!filter.category || task.category === filter.category) &&
      (!filter.priority || task.priority === filter.priority)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="input mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="input mt-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="input mt-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="input mt-1"
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <div className="mb-4 flex space-x-4">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="input"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="input"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <div className="mt-2 space-x-2">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-gray-200">
                      {task.category}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      task.priority === 'high' ? 'bg-red-200' :
                      task.priority === 'medium' ? 'bg-yellow-200' :
                      'bg-green-200'
                    }`}>
                      {task.priority}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      task.status === 'completed' ? 'bg-green-200' :
                      task.status === 'in-progress' ? 'bg-blue-200' :
                      'bg-gray-200'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTask(task._id, { status: e.target.value })}
                    className="input"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 