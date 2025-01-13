"use client"

import React, { useState } from 'react';
import type { Project } from '@/types/Project';

interface CreateProjectDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newProject: Project) => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
    isOpen,
    onClose,
    onCreate,
}) => {
    const [formData, setFormData] = useState<Project>({
        id: 0,
        title: '',
        description: '',
        liveDemo: '',
        githubLink: '',
        tags: [],
    });

    const handleChange = (field: keyof Project, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-gray-100 p-6 rounded shadow-lg max-w-full'>
                <h2 className='text-lg font-bold mb-4'>Create New Project</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mg-2">
                        Title:
                        <input
                            type='text'
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className='border px-2 py-1 w-full rounded text-gray-500'
                        />
                    </label>
                    <label className="block mb-2">
                        Description:
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="border px-2 py-1 w-full rounded text-gray-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Tech Stacks (comma-separated):
                        <input
                            type="text"
                            value={formData.tags.join(', ')}
                            onChange={(e) => handleChange('tags', e.target.value.split(', '))}
                            className="border px-2 py-1 w-full rounded text-gray-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Demo Link:
                        <input
                            type="url"
                            value={formData.liveDemo || ''}
                            onChange={(e) => handleChange('liveDemo', e.target.value)}
                            className="border px-2 py-1 w-full rounded text-gray-500"
                        />
                    </label>
                    <label className="block mb-2">
                        GitHub Link:
                        <input
                            type="url"
                            value={formData.githubLink || ''}
                            onChange={(e) => handleChange('githubLink', e.target.value)}
                            className="border px-2 py-1 w-full rounded text-gray-500"
                        />
                    </label>

                    <div className='flex justify-end gap-2 mt-4'>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 px-3 py-1 rounded text-red-200 hover:bg-red-300 hover:text-red-900"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-500 px-3 py-1 rounded text-blue-200 hover:bg-blue-300 hover:text-blue-900"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProjectDialog;