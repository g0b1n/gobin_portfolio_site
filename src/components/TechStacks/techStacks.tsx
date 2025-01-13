"use client"

import React, { useEffect, useState } from 'react'
import { TechStack } from '@/types/TechStack';

function TechStacks() {

  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [newTech, setNewTech] = useState({ name: "", image: ""});
  const [editTech, setEditTech] = useState<TechStack | null>(null);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await fetch('/api/techStacks');
        const data = await response.json();
        console.log("Fetched techStacks data:", data);

        // ensure data is an array before setting state
        if (Array.isArray(data)) {
          setTechStacks(data);
        } else {
          console.error('Fetched data is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    fetchTechStacks();
  }, []);

  const handleAddTechStack = async () => {
    try {
      const response = await fetch("/api/techStacks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTech),
      });

      const addedTech = await response.json();
      setTechStacks([...techStacks, addedTech]);
      setNewTech({ name: "", image: ""});
    } catch (error) {
      console.error("Error adding techStack:", error);
    }
  };

  const handleEditTechStack = async () => {
    if (!editTech) return;
    try {
      const response = await fetch("/api/techStacks", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editTech),
      });

      const updatedTech = await response.json();
      setTechStacks(techStacks.map((tech) => (tech.id === updatedTech.id ? updatedTech : tech)));
      setEditTech(null);
    } catch (error) {
      console.error("Error updating TechStack:", error);
    }
  };
  
  const handleDeleteTechStack = async (id: number) => {
    try {
      await fetch("/api/techStacks", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id }),
      });

      setTechStacks(techStacks.filter((tech) => tech.id !== id));
    } catch (error) {
      console.error("Error deleting techStacks:", error);
    }
  }

  return (
    <div>
        <p>This file will have my TechStacks and allow you to add, update and delete it.</p>

        {techStacks.length === 0 ? (
          <p className='tect-center text-red-500'>No TechStacks Found.</p>
        ) : (
          <div>
            <table className='table-auto border-collapse border border-gray-300'>
              <thead>
                <tr>
                  <th className='border border-gray-300 px-4 py-2'>Name</th>
                  <th className='border border-gray-300 px-4 py-2'>Image</th>
                  <th className='border border-gray-300 px-4 py-2'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {techStacks.map((tech) => (
                  <tr key={tech.id}>
                    <td className='border border-gray-300 px-4 py-2'>{tech.name}</td>
                    <td className='border border-gray-300 px-4 py-2'>{tech.image}</td>
                    <td>
                      <button 
                        className='bg-blue-300 text-gray-100 px-5 py-1 rounded m-1 hover:bg-blue-500'
                        onClick={() => setEditTech(tech)}
                      >
                        Edit
                      </button>
                      <button 
                        className='bg-red-300 text-white px-3 py-1 rounded m-1 hover:bg-red-500'
                        onClick={() => handleDeleteTechStack(tech.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

export default TechStacks
