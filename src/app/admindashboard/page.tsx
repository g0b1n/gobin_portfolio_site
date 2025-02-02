"use client"

import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Projects from '@/components/Projects/projects';
import TechStacks from '@/components/TechStacks/techStacks';
import AboutMe from '@/components/AboutMe/aboutMe';



const AdminDashboard = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {

        console.log("Session:", session);
        console.log("Status:", status)

        // wait for session to load first
        if (status === "loading") return; 

        if (status === 'unauthenticated') {
//             // redirect to the login page
            router.push("/api/auth/signin")
        } else if (session?.user?.role !== "ADMIN") {
//             // redirect to the main page
            router.push("/")
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    
    return (
        <div id='adminDashboard'>
            <h3 className='mt-6 text-center text-2xl font-black text-blue-500'>Admin Dashboard</h3>
            <p className='text-center font-bold mt-3'>Welcome, {session?.user?.name || "Admin"}!</p>
            
            <div className='ml-6'>
                <h1 className='text-blue-500'>About me</h1>
                <AboutMe />
            </div>
            
            <div className='ml-6'>
                <h1 className='text-blue-500'>Projects</h1>
                <Projects />
            </div>
            
            <div className='ml-6'>
                <h1 className='text-blue-500'>Tech Stacks</h1>
                <TechStacks />
            </div>
        </div>
    )
}

export default AdminDashboard;