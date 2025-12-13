import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaHeartbeat, FaChartLine } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white p-4 shadow-md transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center hover:opacity-80 transition-opacity">
          <FaHeartbeat className="mr-2" /> HealthTrack
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:underline transition-all">Home</Link>
          <Link to="/about" className="hover:underline transition-all">About</Link>
          <Link to="/features" className="hover:underline transition-all">Features</Link>
          <Link to="/contact" className="hover:underline transition-all">Contact</Link>
          {isLoggedIn && <Link to="/dashboard" className="hover:underline transition-all">Dashboard</Link>}
          
          {isLoggedIn && (
            <Link to="/analytics" className="hover:underline transition-all flex items-center gap-1">
              <FaChartLine /> Analytics
            </Link>
          )}
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {isLoggedIn ? (
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 px-4 py-2 rounded flex items-center transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <Link to="/dashboard" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors">
              Login
            </Link>
          )}
        </div>
        
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 flex flex-col">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:underline">About</Link>
          <Link to="/features" onClick={() => setIsOpen(false)} className="hover:underline">Features</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:underline">Contact</Link>
          {isLoggedIn && <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:underline">Dashboard</Link>}
          
          {isLoggedIn && (
            <Link to="/analytics" onClick={() => setIsOpen(false)} className="hover:underline flex items-center gap-1">
              <FaChartLine /> Analytics
            </Link>
          )}
          
          {isLoggedIn ? (
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full flex items-center justify-center transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-center transition-colors">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
