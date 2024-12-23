// client/src/app/(components)/TechStacks/techStacks.tsx
import React from 'react';
import {
  SiJavascript,
  SiReact,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiPostgresql,
} from "react-icons/si";

const techStacks = [
  { name: "JavaScript", icon: <SiJavascript className="text-4xl text-yellow-500" /> },
  { name: "React", icon: <SiReact className="text-4xl text-blue-600" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-4xl" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-4xl text-green-600" /> },
  { name: "Express", icon: <SiExpress className="text-4xl text-gray-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-4xl text-blue-400" /> },
  { name: "HTML5", icon: <SiHtml5 className="text-4xl text-orange-500" /> },
  { name: "CSS", icon: <SiCss3 className="text-4xl text-blue-600" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-4xl text-blue-800" /> },
];

const TechStacks = () => {
  return (
    <section id="techstacks" className="min-h-screen text-gray-900 py-12 scroll-mt-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-10">Tech Stacks</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {techStacks.map((tech, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              {tech.icon || (
                <div className="text-4xl text-gray-700 font-bold">
                  {tech.name.charAt(0)}
                </div>
              )}
              <h3 className="mt-4 text-xl font-bold">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStacks;
