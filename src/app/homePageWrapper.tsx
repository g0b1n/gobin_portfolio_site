"use client"

import Navbar from '@/app/(components)/Navbar/navbar';
import React, { useEffect } from 'react'
import StoreProvider, { useAppSelector } from './redux';

const HomePageLayout = ({ children } : {children: React.ReactNode}) => {

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.add("light")
    }
  })

  return (
    <div className={`${isDarkMode ? "dark" : "light"} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <main className='w-full h-full'>
            <Navbar />
            { children }
        </main>
    </div>
  )
}

const HomePageWrapper = ({ children } : {children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <HomePageLayout>{ children }</HomePageLayout>
    </StoreProvider>
  )
}

export default HomePageWrapper;