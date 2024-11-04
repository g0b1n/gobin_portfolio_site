"use client";

import React, { useState } from 'react';
import { Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode } from '@/app/state';

function Navbar() {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDarkMode = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    };

    return (
        <nav className="bg-gray-100 text-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="#home" className="text-2xl font-bold">Govinda Dahal</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#home" className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="#about" className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium">About</a>
                        <a href="#projects" className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
                        <a href="#techstacks" className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium">Tech Stacks</a>
                        <a href="#contact" className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium">Contact</a>

                        {/* Dark Mode Toggle */}
                        <button onClick={toggleDarkMode} className="ml-4">
                            {isDarkMode ? (
                                <Moon className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1" size={30} />
                            ) : (
                                <Sun className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1" size={30} />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        {/* Dark Mode Toggle */}
                        <button onClick={toggleDarkMode} className="ml-4 mr-4">
                            {isDarkMode ? (
                                <Moon className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1" size={30} />
                            ) : (
                                <Sun className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1" size={30} />
                            )}
                        </button>
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-gray-200 p-2 rounded-md text-gray-900 hover:text-white hover:bg-gray-600 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#home" onClick={toggleMenu} className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
                        <a href="#about" onClick={toggleMenu} className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">About</a>
                        <a href="#projects" onClick={toggleMenu} className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                        <a href="#techstacks" onClick={toggleMenu} className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Tech Stacks</a>
                        <a href="#contact" onClick={toggleMenu} className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
