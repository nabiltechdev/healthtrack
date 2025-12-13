import React from 'react';
import { FaUsers, FaBullseye, FaHeart } from 'react-icons/fa';

function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About HealthTrack</h1>
      <p className="text-lg mb-8 text-center">HealthTrack is a personal wellness app designed to help you log and monitor your daily health routines, from exercises to meals, empowering you to live healthier.</p>
      
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <FaBullseye className="text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p>To make wellness tracking simple and accessible for everyone, promoting better health habits through data-driven insights.</p>
        </div>
        <div className="text-center">
          <FaHeart className="text-4xl text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Benefits</h2>
          <p>Improve fitness, nutrition, and overall well-being by logging activities and viewing progress summaries.</p>
        </div>
        <div className="text-center">
          <FaUsers className="text-4xl text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Team</h2>
          <p>A dedicated team of developers and health enthusiasts committed to your wellness journey.</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Why Choose HealthTrack?</h2>
        <p>Free, easy-to-use, and secure. Start tracking today and see the difference in your health!</p>
      </div>
    </div>
  );
}

export default About;