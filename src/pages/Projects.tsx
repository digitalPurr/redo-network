import React from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';

const Projects = () => {
  const allProjects = [
    {
      title: "Neural Synthesis",
      description: "AI-powered generative art system that creates dynamic visual experiences through machine learning algorithms and real-time data processing.",
      category: "AI • VISUALS",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Quantum Interface",
      description: "Revolutionary user interface design exploring quantum computing principles in human-computer interaction and parallel processing visualization.",
      category: "UI/UX • TECH",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Biometric Harmony",
      description: "Real-time biometric data visualization creating immersive audio-visual experiences from human physiology and emotional states.",
      category: "DATA • AUDIO",
      interactive: false,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Spatial Computing",
      description: "Next-generation spatial computing platform enabling collaborative creation in mixed reality environments with haptic feedback.",
      category: "AR/VR • COLLAB",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Morphic Networks",
      description: "Adaptive network visualization tool that maps complex data relationships in real-time, revealing hidden patterns and connections.",
      category: "DATA • NETWORKS",
      interactive: true,
      demoUrl: "#",
      projectUrl: "#"
    },
    {
      title: "Echo Chamber",
      description: "Interactive sound design platform using machine learning to generate and manipulate audio landscapes based on environmental data.",
      category: "AUDIO • ML",
      interactive: false,
      demoUrl: "#",
      projectUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <GenerativeBackground />
      <Header />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our collaborative creations pushing the boundaries of technology, 
              art, and human experience through innovative digital solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                className={`animate-in slide-in-from-bottom-8 duration-700 [animation-delay:${index * 100}ms]`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;