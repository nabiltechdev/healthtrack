import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Check for stored token on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      
      // Fetch activities with stored token
      fetchActivities(storedToken);
    }
  }, []);

  const fetchActivities = async (authToken, filters = {}) => {
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.order) queryParams.append('order', filters.order);
      
      const queryString = queryParams.toString();
      const url = `http://localhost:5000/api/activities${queryString ? '?' + queryString : ''}`;
      
      const activitiesRes = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      setActivities(activitiesRes.data);
    } catch (err) {
      console.error('Error fetching activities:', err.response?.data?.message || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token expired or invalid, logout user
        handleLogout();
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      if (res.data.isNew) {
        alert('New user created! Welcome.');
      }
      
      const { token: authToken, user: userData } = res.data;
      
      // Store token and user data
      setToken(authToken);
      setUser(userData);
      setIsLoggedIn(true);
      
      // Persist to localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Fetch activities after login with token
      fetchActivities(authToken);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setActivities([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const addActivity = async (activity) => {
    try {
      const res = await axios.post('http://localhost:5000/api/activities', activity, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setActivities([...activities, res.data]);
      return res.data;
    } catch (err) {
      console.error('Error adding activity:', err.response?.data?.message || err.message);
      alert('Failed to add activity. Please try again.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
      throw err;
    }
  };

  const editActivity = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/activities/${id}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update the activity in the local state
      setActivities(activities.map(activity => 
        activity.id === id ? { ...activity, ...updatedData } : activity
      ));
      
      return res.data;
    } catch (err) {
      console.error('Error editing activity:', err.response?.data?.message || err.message);
      alert('Failed to edit activity. Please try again.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
      throw err;
    }
  };

  const deleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/activities/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setActivities(activities.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting activity:', err.response?.data?.message || err.message);
      alert('Failed to delete activity. Please try again.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    }
  };

  const handleFilter = (filters) => {
    if (token) {
      fetchActivities(token, filters);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={
                <Dashboard 
                  isLoggedIn={isLoggedIn} 
                  user={user} 
                  activities={activities} 
                  addActivity={addActivity}
                  editActivity={editActivity}
                  deleteActivity={deleteActivity}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                  handleFilter={handleFilter}
                />
              } />
              {/* Analytics page */}
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
