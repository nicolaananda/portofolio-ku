import { useState, useEffect } from 'react';

export interface Project {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  category: string;
  imageUrls: string[];
  description: string;
  technologies: string[];
}

interface UseProjectsOptions {
  limit?: number;
}

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const useProjects = (options: UseProjectsOptions = {}): UseProjectsResult => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}/portfolio`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch projects');
        }

        const fetched: Project[] = data.data;
        setProjects(options.limit ? fetched.slice(0, options.limit) : fetched);
      } catch (err) {
        console.error('Failed to fetch projects', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  return { projects, isLoading, error };
};

export default useProjects;
