
/**
 * Tasks module to handle task management operations
 */
class TaskManager {
  constructor() {
    this.tasks = [];
  }
  
  // Load all tasks for the current user
  async loadTasks() {
    try {
      this.tasks = await TasksAPI.getTasks();
      return this.tasks;
    } catch (error) {
      console.error('Error loading tasks:', error);
      throw error;
    }
  }
  
  // Create a new task
  async createTask(title, status = 'pending') {
    try {
      const newTask = await TasksAPI.createTask({ title, status });
      this.tasks.push(newTask);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
  
  // Delete a task
  async deleteTask(taskId) {
    try {
      await TasksAPI.deleteTask(taskId);
      this.tasks = this.tasks.filter(task => task.id !== parseInt(taskId));
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
  
  // Get all tasks
  getTasks() {
    return this.tasks;
  }
}

// Initialize task manager
const taskManager = new TaskManager();
