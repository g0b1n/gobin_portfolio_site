"use client";

import React, { useState } from 'react';
import { Sun, Moon, Lock } from "lucide-react";
import { useDarkMode } from '@/context/DarkModeContext';
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { data: session, status } = useSession();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
       signOut({
        callbackUrl: "/"
       })
    }

    return (
        <nav className="bg-gray-100 text-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold">Govinda Dahal</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/"className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium">
                            About
                        </Link>
                        <Link href="/projects" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium">
                            Projects
                        </Link>
                        <Link href="/techstacks" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium">
                            Tech Stacks
                        </Link>
                        <Link href="/contact" className="hover:bg-blue-200 px-3 py-3 rounded-md text-sm font-medium">
                           Contact
                        </Link>

                        {/* Dark Mode Toggle */}
                        <button onClick={toggleDarkMode} className="ml-4">
                            {isDarkMode ? (
                                <Moon className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1" size={30} />
                            ) : (
                                <Sun className="cursor-pointer text-gray-900 hover:bg-blue-200 rounded-md px-1 py-1" size={30} />
                            )}
                        </button>
                       
                       {status === 'authenticated' ? (
                        <button className='px-3 py-2 text-sm font-medium flex items-center space-x-2 hover:bg-red-200 rounded-md text-red-500 hover:text-gray-900' 
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                       ) : (
                        <Link href="/admindashboard">
                            <button className="px-3 py-2 text-sm font-medium flex items-center space-x-2 hover:bg-red-200 rounded-md text-red-500 hover:text-gray-900">
                                <Lock className='px-1 py-1 text-red-500' size={24}/>
                                <span className='text-red-500'>Admin</span>
                            </button>
                         </Link>
                       )}
            
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

            {status === 'authenticated' ? (
                        <button className='hover:bg-red-500 text-red-500 hover:text-gray-900 block px-3 py-2 rounded-md font-medium' 
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                       ) : (
                        <Link href="/admindashboard">
                            <button className="hover:bg-red-500 hover:text-gray-100 block px-3 py-2 text-base rounded-md font-medium">
                                <Lock className='px-1 py-1 text-red-500' size={24}/>
                                <span className='text-red-500'>Admin</span>
                            </button>
                         </Link>
                       )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;