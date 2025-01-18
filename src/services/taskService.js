// Base URL for the API
const API_BASE_URL = "http://localhost:5000";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

// Task Service object containing all API calls
const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fetchtask`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error fetching tasks");
      throw error;
    }
  },

  // Get a single task by ID
  //   getTaskById: async (taskId) => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);
  //       return handleResponse(response);
  //     } catch (error) {
  //       console.error(`Error fetching task `);
  //       throw error;
  //     }
  //   },
  // Create a new task
  createSubject: async (subjectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addsubject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjectData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Error creating subject");
      throw error;
    }
  },
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Error creating task");
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updatetask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error updating task`);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletetask`, {
        method: "DELETE",
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      throw error;
    }
  },
};

export default taskService;
