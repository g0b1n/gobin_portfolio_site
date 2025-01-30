"use client"

import React from 'react'
import Navbar from '@/components/Navbar/navbar';
import { useDarkMode } from '@/context/DarkModeContext';



const HomePageLayout = ({ children } : {children: React.ReactNode}) => {

  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? "dark" : "light"} pt-16 flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <main className='w-full h-full'>
            <Navbar />
            { children }
        </main>
    </div>
  )
}

const HomePageWrapper = ({ children } : {children: React.ReactNode}) => {
  return (
      <HomePageLayout>{ children }</HomePageLayout>
  )
}

export default HomePageWrapper;