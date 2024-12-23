import React from 'react'
import Image from 'next/image';
import myPic from '@/app/images/myPic.jpg'

function About() {
  return (
   <div id='about' className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Profile Image */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0 flex justify-center">
          <Image 
          src={myPic}
          alt='Profile Image'
          className='rounded-lg shadow-lg'
          width={300}
          height={300}
          style={{objectFit: "cover"}}
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-2/3 lg:pl-12">
          <h1 className="text-5xl font-bold mb-6 text-blue-500">About me</h1>
          <p className="text-lg leading-7">
            I have completed a software engineering course with Springboard and spent two years studying Graphic Design at Pennsylvania College of Arts and Design before transferring to PennState World Campus for Multimedia Design. While art and design remain my passion, I am dedicated to building a career as a software engineer.
          </p>
          <p className="text-lg leading-7 mt-4">
            I bring a unique blend of artistic creativity and technical expertise, aiming to contribute innovative, user-centric solutions as a front-end developer. I am seeking opportunities in small to medium-sized companies where I can engage in hands-on projects, enhance my skills, and help drive the company’s growth by making its products more engaging and accessible to a global audience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
