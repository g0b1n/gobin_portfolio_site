"use client";

import React, { useState } from 'react';
import { Sun, Moon, Lock } from "lucide-react";
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-100 text-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold active:text-blue-300">Govinda Dahal</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/"className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium active:bg-blue-300">
                            Home
                        </Link>
                        <Link href="/about" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium active:bg-blue-300">
                            About
                        </Link>
                        <Link href="/projects" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium active:bg-blue-300">
                            Projects
                        </Link>
                        <Link href="/techstacks" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium active:bg-blue-300">
                            Tech Stacks
                        </Link>
                        <Link href="/contact" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium active:bg-blue-300">
                           Contact
                        </Link>

                        {/* Dark Mode Toggle */}
                        <button onClick={toggleDarkMode} className="ml-4">
                            {isDarkMode ? (
                                <Moon className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1 active:bg-blue-300" size={30} />
                            ) : (
                                <Sun className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1 active:bg-blue-300" size={30} />
                            )}
                        </button>

                        <Link href="https://github.com/g0b1n" target='_blank'>
                            <button className="px-3 py-2 text-sm font-medium flex items-center space-x-2 rounded-md hover:text-gray-500 active:bg-gray-300">
                                <FaGithub size={24} />
                            </button>
                         </Link>
                       </div>   
                        
                    
                    

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        {/* Dark Mode Toggle */}
                        <button onClick={toggleDarkMode} className="ml-4 mr-4">
                            {isDarkMode ? (
                                <Moon className="cursor-pointer text-gray-900 hover:bg-blue-500 rounded-md px-1 py-1" size={30} />
                            ) : (
                                <Sun className="cursor-pointer text-gray-900 hover:bg-blue-500 rounded-md px-1 py-1" size={30} />
                            )}
                        </button>
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-gray-200 p-2 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"
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
            <Link href="/" className="hover:bg-blue-500 hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="hover:bg-blue-500 hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/projects" className="hover:bg-blue-500 hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Projects
            </Link>
            <Link href="/techstacks" className="hover:bg-blue-500 hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Tech Stacks
            </Link>
            <Link href="/contact" className="hover:bg-blue-500 hover:text-gray-100 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;