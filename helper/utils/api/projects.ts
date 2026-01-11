import { fetcher } from "../fetcher";

/**
 * Project interface
 */
export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
}

/**
 * Endpoints for projects API
 */
export const PROJECTS_ENDPOINT = "/projects.json";

/**
 * Fetch all projects
 * @returns Promise with array of projects
 */
export async function fetchProjects(): Promise<Project[]> {
  return fetcher<Project[]>(PROJECTS_ENDPOINT);
}

/**
 * Query key for React Query
 */
export const projectsQueryKey = ["projects"] as const;
