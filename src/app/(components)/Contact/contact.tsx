"use client"
import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus(`Message send successfully!`);
      } else {
        setStatus(result.message || `Something went wrong.`);
      }
    } catch (error) {
      console.error(`Error sending message:`, error);
      setStatus(`Something went wrong.`);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-gray-100 py-12 scroll-mt-16">
      <div className="container mx-auto px-6 lg:flex lg:justify-between">
        
        {/* Text Section */}
        <div className="mb-8 lg:mb-0 lg:w-1/2">
          <h2 className="text-5xl font-bold text-left">Contact Me</h2>
          <p className="mt-6 text-lg text-left text-gray-600">
            I would love to hear from you. Feel free to fill out the form, and I’ll get back to you as soon as possible.
          </p>
          {/* Add GitHub and LinkedIn icons */}
          <div className="flex space-x-6 mt-8">
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaGithub size={40} />
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 mt-1 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Email"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 mt-1 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="What can we help you with?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-200 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-blue-700 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;