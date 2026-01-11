import { fetcher } from "../fetcher";

/**
 * About data interface
 */
export interface AboutData {
  name: string;
  role: string;
  image: string;
  openToWork: boolean;
  bio: string[];
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
}

/**
 * Experience interface
 */
export interface Experience {
  id: number;
  role: string;
  company: string;
  companyUrl: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
  techStack: string[];
}

/**
 * Achievement interface
 */
export interface Achievement {
  id: number;
  title: string;
  description: string;
  year: string;
  icon: string;
}

/**
 * Skills interface
 */
export interface Skills {
  languages: { name: string }[];
  frameworks: { name: string }[];
  databases: { name: string }[];
  tools: { name: string }[];
}

/**
 * Education interface
 */
export interface Education {
  id: number;
  institution: string;
  degree: string;
  gpa: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

/**
 * Endpoints
 */
export const ABOUT_ENDPOINT = "/about.json";
export const EXPERIENCES_ENDPOINT = "/experiences.json";
export const ACHIEVEMENTS_ENDPOINT = "/achievements.json";
export const SKILLS_ENDPOINT = "/skills.json";
export const EDUCATION_ENDPOINT = "/education.json";

/**
 * Fetch about data
 */
export async function fetchAbout(): Promise<AboutData> {
  return fetcher<AboutData>(ABOUT_ENDPOINT);
}

/**
 * Fetch experiences
 */
export async function fetchExperiences(): Promise<Experience[]> {
  return fetcher<Experience[]>(EXPERIENCES_ENDPOINT);
}

/**
 * Fetch achievements
 */
export async function fetchAchievements(): Promise<Achievement[]> {
  return fetcher<Achievement[]>(ACHIEVEMENTS_ENDPOINT);
}

/**
 * Fetch skills
 */
export async function fetchSkills(): Promise<Skills> {
  return fetcher<Skills>(SKILLS_ENDPOINT);
}

/**
 * Fetch education
 */
export async function fetchEducation(): Promise<Education[]> {
  return fetcher<Education[]>(EDUCATION_ENDPOINT);
}

/**
 * Query keys for React Query
 */
export const aboutQueryKey = ["about"] as const;
export const experiencesQueryKey = ["experiences"] as const;
export const achievementsQueryKey = ["achievements"] as const;
export const skillsQueryKey = ["skills"] as const;
export const educationQueryKey = ["education"] as const;