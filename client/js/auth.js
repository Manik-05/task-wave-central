
/**
 * Authentication module to handle user registration, login, and session management
 */
class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.token = localStorage.getItem('token');
    
    // If token exists, user is authenticated
    if (this.token) {
      this.isAuthenticated = true;
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  }
  
  // Login user
  async login(username, password) {
    try {
      const response = await AuthAPI.login({ username, password });
      this.setSession(response.token, response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  }
  
  // Register new user
  async register(username, password) {
    try {
      const response = await AuthAPI.register({ username, password });
      // After registration, log the user in
      return await this.login(username, password);
    } catch (error) {
      throw error;
    }
  }
  
  // Set session data
  setSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true;
    this.token = token;
    this.user = user;
  }
  
  // Clear session data
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.token = null;
    this.user = null;
  }
  
  // Check if user is authenticated
  isLoggedIn() {
    return this.isAuthenticated;
  }
  
  // Get current user
  getUser() {
    return this.user;
  }
}

// Initialize auth service
const auth = new Auth();
