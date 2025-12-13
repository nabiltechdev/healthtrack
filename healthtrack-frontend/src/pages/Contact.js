import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">Get in Touch</h2>
            <p className="text-gray-600 mb-6">Have questions about HealthTrack? We're here to help!</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-4 text-xl" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">info@healthtrack.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-green-500 mr-4 text-xl" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-4 text-xl" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">123 Wellness St, Health City</p>
                </div>
              </div>
            </div>
            <img src="https://via.placeholder.com/400x300?text=Contact+Us" alt="Contact" className="mt-6 rounded-lg shadow-md" />
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-green-600">Send a Message</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="border border-gray-300 p-3 w-full rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 w-full rounded-lg hover:from-blue-600 hover:to-green-600 flex items-center justify-center">
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
            {submitted && <p className="text-green-600 mt-4 text-center font-semibold">Message sent successfully! We'll get back to you soon.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;