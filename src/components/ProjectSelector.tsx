
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  title: string;
}

interface ProjectSelectorProps {
  selectedProjects: string[];
  onProjectsChange: (projects: string[]) => void;
  placeholder?: string;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  selectedProjects,
  onProjectsChange,
  placeholder = "Select projects..."
}) => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectToggle = (projectId: string) => {
    const updatedProjects = selectedProjects.includes(projectId)
      ? selectedProjects.filter(id => id !== projectId)
      : [...selectedProjects, projectId];
    
    onProjectsChange(updatedProjects);
  };

  const selectedProjectTitles = projects
    .filter(project => selectedProjects.includes(project.id))
    .map(project => project.title);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedProjectTitles.length > 0
            ? selectedProjectTitles.length === 1
              ? selectedProjectTitles[0]
              : `${selectedProjectTitles.length} projects selected`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandEmpty>
            {loading ? "Loading projects..." : "No projects found."}
          </CommandEmpty>
          <CommandGroup>
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                value={project.title}
                onSelect={() => handleProjectToggle(project.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedProjects.includes(project.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                {project.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSelector;
