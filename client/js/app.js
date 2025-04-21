
/**
 * Main application module
 */
document.addEventListener('DOMContentLoaded', () => {
  // App elements
  const appElement = document.getElementById('app');
  
  // Show loading state
  const showLoading = () => {
    appElement.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
      </div>
    `;
  };
  
  // Show error message
  const showError = (message, elementId) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  };
  
  // Clear error message
  const clearError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  };
  
  // Render template
  const renderTemplate = (templateId) => {
    const template = document.getElementById(templateId);
    appElement.innerHTML = template.innerHTML;
  };
  
  // Render login page
  const renderLogin = () => {
    renderTemplate('login-template');
    setupAuthTabs();
    setupLoginForm();
  };
  
  // Render register page
  const renderRegister = () => {
    renderTemplate('register-template');
    setupAuthTabs();
    setupRegisterForm();
  };
  
  // Render dashboard
  const renderDashboard = async () => {
    renderTemplate('dashboard-template');
    setupDashboard();
    
    try {
      await loadTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };
  
  // Setup auth tabs
  const setupAuthTabs = () => {
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabType = tab.dataset.tab;
        if (tabType === 'login') {
          renderLogin();
        } else if (tabType === 'register') {
          renderRegister();
        }
      });
    });
  };
  
  // Setup login form
  const setupLoginForm = () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        clearError('login-error');
        
        try {
          showLoading();
          await auth.login(username, password);
          renderDashboard();
        } catch (error) {
          renderLogin();
          showError(error.message || 'Login failed', 'login-error');
        }
      });
    }
  };
  
  // Setup register form
  const setupRegisterForm = () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        
        clearError('register-error');
        
        try {
          showLoading();
          await auth.register(username, password);
          renderDashboard();
        } catch (error) {
          renderRegister();
          showError(error.message || 'Registration failed', 'register-error');
        }
      });
    }
  };
  
  // Setup dashboard
  const setupDashboard = () => {
    // Display username
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
      const user = auth.getUser();
      usernameDisplay.textContent = user ? user.username : '';
    }
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        auth.logout();
        renderLogin();
      });
    }
    
    // Setup add task form
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
      addTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const status = document.getElementById('task-status').value;
        
        try {
          await taskManager.createTask(title, status);
          document.getElementById('task-title').value = '';
          renderTasksList();
        } catch (error) {
          console.error('Error adding task:', error);
        }
      });
    }
  };
  
  // Load tasks from API
  const loadTasks = async () => {
    try {
      await taskManager.loadTasks();
      renderTasksList();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };
  
  // Render tasks list
  const renderTasksList = () => {
    const tasksListElement = document.getElementById('tasks-list');
    const emptyTasksElement = document.getElementById('empty-tasks');
    
    if (tasksListElement) {
      const tasks = taskManager.getTasks();
      
      // Show empty state if no tasks
      if (tasks.length === 0) {
        emptyTasksElement.style.display = 'block';
        tasksListElement.innerHTML = '';
        tasksListElement.appendChild(emptyTasksElement);
        return;
      }
      
      // Hide empty state and render tasks
      emptyTasksElement.style.display = 'none';
      
      // Clear current tasks
      tasksListElement.innerHTML = '';
      
      // Add tasks to the list
      tasks.forEach(task => {
        const taskTemplate = document.getElementById('task-template');
        const taskElement = document.importNode(taskTemplate.content, true);
        
        const taskItem = taskElement.querySelector('.task-item');
        taskItem.dataset.id = task.id;
        
        const taskTitle = taskElement.querySelector('.task-title');
        taskTitle.textContent = task.title;
        
        const taskStatus = taskElement.querySelector('.task-status');
        taskStatus.textContent = task.status;
        taskStatus.dataset.status = task.status;
        
        const deleteBtn = taskElement.querySelector('.delete-task-btn');
        deleteBtn.addEventListener('click', async () => {
          try {
            await taskManager.deleteTask(task.id);
            renderTasksList();
          } catch (error) {
            console.error('Error deleting task:', error);
          }
        });
        
        tasksListElement.appendChild(taskElement);
      });
    }
  };
  
  // Initialize app
  const initApp = () => {
    if (auth.isLoggedIn()) {
      renderDashboard();
    } else {
      renderLogin();
    }
  };
  
  // Start the app
  initApp();
});
