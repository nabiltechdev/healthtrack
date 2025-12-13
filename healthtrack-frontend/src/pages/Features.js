import React from 'react';
import { FaDumbbell, FaUtensils, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

function Features() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Features of HealthTrack</h1>
      <p className="text-lg mb-8 text-center">Discover the powerful tools that make tracking your wellness effortless and effective.</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <FaDumbbell className="text-4xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Log Daily Exercises</h2>
          <p>Track workouts like running, yoga, or gym sessions. Add details, dates, and times to monitor your fitness routine.</p>
          <p className="text-sm text-gray-600">Example: "Ran 5km at 7 AM"</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <FaUtensils className="text-4xl text-green-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Track Meals and Nutrition</h2>
          <p>Log breakfast, lunch, dinner, and snacks. Keep a record of your eating habits for better nutrition insights.</p>
          <p className="text-sm text-gray-600">Example: "Ate a healthy salad for lunch"</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <FaCalendarAlt className="text-4xl text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Monitor General Activities</h2>
          <p>Record sleep, meditation, or other daily activities. Use dates and times for accurate tracking.</p>
          <p className="text-sm text-gray-600">Example: "Slept 8 hours last night"</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <FaChartBar className="text-4xl text-orange-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">View Progress Summaries</h2>
          <p>See totals and trends, like total exercises logged. Get motivated with data-driven feedback.</p>
          <p className="text-sm text-gray-600">Example: "Logged 10 activities this week!"</p>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-lg">Ready to explore these features? <a href="/dashboard" className="text-blue-600 underline">Login now</a>.</p>
      </div>
    </div>
  );
}

export default Features;