import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaStar } from 'react-icons/fa';

function Home() {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="bg-blue-100 p-8 rounded-lg mb-8">
        <FaHeartbeat className="text-6xl text-blue-600 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">Welcome to HealthTrack</h1>
        <p className="text-lg mb-4">Track your fitness, meals, and daily activities for a healthier life. Join thousands of users building better habits.</p>
        <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Started - Login to Track</Link>
      </div>
      
      
      {/* Testimonials Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <FaStar className="text-yellow-500 mb-2" />
            <p>"HealthTrack helped me stay consistent with my workouts!"</p>
            <p className="text-sm text-gray-600">- John D.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FaStar className="text-yellow-500 mb-2" />
            <p>"Easy to log meals and see my progress."</p>
            <p className="text-sm text-gray-600">- Sarah K.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FaStar className="text-yellow-500 mb-2" />
            <p>"Great for tracking daily activities!"</p>
            <p className="text-sm text-gray-600">- Mike T.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
  <h2 className="text-2xl font-bold mb-2">Ready to Start Your Wellness Journey?</h2>
  <p>Login today and take control of your health.</p>
  <Link to="/dashboard" className="bg-green-600 text-white px-4 py-2 rounded mt-4 inline-block">Login Now</Link>  
        </div> 
    </div>
  );
}

export default Home;