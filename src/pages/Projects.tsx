import React, { useEffect, useState } from 'react';
import { GenerativeBackground } from '@/components/GenerativeBackground';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';
import { supabase } from '@/integrations/supabase/client';

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching projects:', error)
        } else {
          setProjects(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground">
                Loading projects...
              </div>
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  className={`animate-in slide-in-from-bottom-8 duration-700 [animation-delay:${index * 100}ms]`}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No projects found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;