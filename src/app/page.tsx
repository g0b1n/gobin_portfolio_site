'use client'
import React from 'react';


const HomePage = () => {

  const handleResumeClick = () => {
    // open resume pdf in a new tab
    window.open('/Govinda_Dahal_Resume.pdf', '_blank')
  }

  return (
    <div>
      {/* render all pages here and delete all  */}
      {/* Home Section */}
      <section id="home" className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      {/* Intro Text */}
      <h1 className="mb-5 text-gray-900 text-lg md:text-lg font-bold">Hello, I am <span className="text-blue-500">Govinda.</span></h1>
      <h1 className="mb-3 text-gray-900 text-7xl md:text-8xl font-bold">A</h1>
      <h1 className="text-gray-900 text-7xl md:text-8xl font-bold">
        <span className="text-blue-500">Junior Software</span>
      </h1>
      <h1 className="text-gray-900 text-7xl md:text-8xl font-bold mt-2">
        Engineer
      </h1>

      {/* Button */}
      <button 
        onClick={handleResumeClick}
        className="mt-10 px-8 py-3 border border-gray-900 text-gray-900 text-lg font-medium rounded hover:bg-blue-200 hover:border-blue-200">
        Resumé
      </button>
      </section>
    </div>
  );
};

export default HomePage;
