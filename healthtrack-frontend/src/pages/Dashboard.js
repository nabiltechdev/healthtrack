import React, { useState } from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import SearchFilter from '../components/SearchFilter';

function Dashboard({ isLoggedIn, user, activities, addActivity, editActivity, deleteActivity, handleLogin, handleLogout, handleFilter }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get unique categories from activities
  const categories = [...new Set(activities.map(a => a.category || a.type))].filter(Boolean);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Login</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Enter your email and password to access your dashboard.</p>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }} className="bg-white dark:bg-gray-800 p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              placeholder="your@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="border dark:border-gray-600 p-2 w-full rounded dark:bg-gray-700 dark:text-white" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="border dark:border-gray-600 p-2 w-full rounded dark:bg-gray-700 dark:text-white" 
              required 
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 transition-colors">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">New user? Just enter your email to get started!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.email}!</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Activity Form */}
      <div className="mb-6">
        <ActivityForm addActivity={addActivity} />
      </div>

      {/* Search and Filter */}
      {activities.length > 0 && (
        <SearchFilter 
          onFilter={handleFilter} 
          categories={categories}
        />
      )}

      {/* Activities List */}
      <div className="mt-6">
        <ActivityList 
          activities={activities} 
          deleteActivity={deleteActivity}
          editActivity={editActivity}
        />
      </div>

      {/* Quick Stats */}
      {activities.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total Activities</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{activities.length}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">This Week</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-300">
              {activities.filter(a => {
                const activityDate = new Date(a.date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return activityDate >= weekAgo;
              }).length}
            </p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Categories</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">{categories.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
