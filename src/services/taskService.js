// Base URL for the API
const API_BASE_URL = 'http://localhost:5000';

// Common headers for all requests
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  // Add any auth tokens here if needed
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`
    }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Task Service object containing all API calls
const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fetchtask`, {
        method: 'GET',
        headers,
        credentials: 'include', // Include cookies if needed
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addtask`, {
        method: 'POST',
        headers,
        credentials: 'include', // Include cookies if needed
        body: JSON.stringify(taskData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updatetask`, {
        method: 'PUT',
        headers,
        credentials: 'include', // Include cookies if needed
        body: JSON.stringify({ ...taskData, id: taskId }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletetask`, {
        method: 'DELETE',
        headers,
        credentials: 'include', // Include cookies if needed
        body: JSON.stringify({ id: taskId }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default taskService; 