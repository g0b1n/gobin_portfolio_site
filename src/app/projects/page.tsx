'use client'
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  liveDemo: string | null;
  githubLink: string | null;
  tags: string[];
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProjects = async () => {
    // save projects in localStorage to prevent it from fetching again and again 
    const cachedProjects = localStorage.getItem('projects')
    if (cachedProjects) {
      setProjects(JSON.parse(cachedProjects));
      setLoading(false)
      return;
    }

    try {
      const response = await fetch('/projects.json');
      const data = await response.json();
      console.log("Fetched projects data:", data);
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error('Fetched data is not an array', data);
      }
    } catch (error) {
      console.error('Error fetching projects', error);
    }
    setLoading(false)
  };
  fetchProjects();
}, []);

// truncate text
const truncateText = (text: string, limit: number = 140) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

{loading ? (
  <p className='text-center text-blue-500 font-bold'>Loading Projects...</p>
) : projects.length === 0 ? (
  <p className='text-center text-red-500 font-bold'>Projects Not Found :(</p>
) : (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'></div>
)}

  

  return (
  <div id='projects' className="min-h-screen bg-gray-100 text-gray-900 py-12 scroll-mt-16">
    <div className="container mx-auto px-6">
      <h1 className="text-5xl font-bold mb-10 text-center text-blue-500">My Projects</h1>

      {projects.length === 0 ? (  // Check if there are no projects
        <p className="text-center">No projects to display</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-lg rounded-lg p-6 hover:bg-gray-200 transform hover:rotate-1 transition-transform duration-300 ease-in-out">
              <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{truncateText(project.description)}</p>
              <div className="mb-4">
                <ul className="flex space-x-2 mt-2">
                  {project.tags.map((tech, index) => (
                    <li key={index} className="text-sm bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-4">
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="border border-gray-900 text-gray-900 px-4 py-2 rounded-md hover:bg-blue-200 hover:border-blue-200">
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="border border-gray-900 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-900 hover:text-gray-100">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}

export default Projects
