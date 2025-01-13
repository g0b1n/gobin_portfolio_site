'use client'
import React, { useEffect, useState } from 'react';
import EditProjectDialog from './EditProject';
import CreateProjectDialog from './createProject';
import { Project } from '@/types/Project'

function Projects() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
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
  };
  fetchProjects();
}, []);

const handleSave = async (updatedProject: Project) => {
        try {
            const response = await fetch (`/api/projects`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProject),
            });

            if (!response.ok) {
                throw new Error(`Failed to update project in database`);
            }

            const updatedData = await response.json();

            // updte local state
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === updatedData.id ? updatedData : project
                )
            );
            // close the dialog
            setIsEditDialogOpen(false);
            console.log('Dialog closed successfully!');
        } catch (error) {
            console.error('Error saving projects:', error)
        }
    }

// create new project
const handleCreate = async (newProject: Project) => {
    try {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });

        if (!response.ok) {
            throw new Error('Failed to create project in database');
        }

        const createdProject = await response.json();

        // update local state
        setProjects((prevProjects) => [...prevProjects, createdProject]);

        // close the dialog box
        setIsCreateDialogOpen(false);
    } catch (error) {
        console.error('Error creating new project:', error)
    }
}

  return (
  <div id='projects' className="mx-auto p-4 max-w-7xl">
    {projects.length === 0 ? (
        <p className='text-center text-red-500'>No Projects Found.</p>
    ) : (
        <div>
            <table className='table-auto border-collapse border broder-gray-300'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 px-4 py-2'>Title</th>
                        <th className='border border-gray-300 px-4 py-2'>Discription</th>
                        <th className='border border-gray-300 px-4 py-2'>Tech Stacks</th>
                        <th className='border border-gray-300 px-4 py-2'>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td className='border border-gray-300 px-4 py-2'>{project.title}</td>
                            <td className='border border-gray-300 px-4 py-2'>{project.description}</td>

                            <td className='border border-gray-300 px-4 py-2'>
                                {project.tags.length > 0 ? (
                                    project.tags.map((tech, index) => (
                                        <span
                                            key={index}
                                            className='bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded mr-1'
                                        >
                                            {tech}
                                        </span>
                                    ))
                                ) : (
                                    <span className='text-red-500 italic'>No Tech Stacks Found.</span>
                                )}
                            </td>
                            
                            

                            <td className='border border-gray-300 px-4 py-2'>
                                <button 
                                    className='bg-blue-300 text-white px-5 py-1 rounded m-1 hover:bg-blue-500'
                                    onClick={() => {
                                        setCurrentProject(project);
                                        setIsEditDialogOpen(true)
                                    }}
                                >
                                    Edit
                                </button>
                                <button className='bg-red-300 text-white px-3 py-1 rounded m-1 hover:bg-red-500'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button 
                className='bg-blue-300 text-gray-100 px-3 py-1 rounded m-1 hover:bg-blue-500'
                onClick={() => setIsCreateDialogOpen(true)}
            >
                Create Project
            </button>

            <CreateProjectDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onCreate = {handleCreate}
            />
            
            <EditProjectDialog
                isOpen={isEditDialogOpen}
                project={currentProject}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleSave}
            />

        </div>
    )}
    
  </div>
);

}

export default Projects
