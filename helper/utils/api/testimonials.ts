import { fetcher } from "../fetcher";

/**
 * Testimonial interface
 */
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  image: string;
  social?: {
    linkedin?: string;
  };
}

/**
 * Endpoints
 */
export const TESTIMONIALS_ENDPOINT = "/testimonials.json";

/**
 * Fetch testimonials
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  return fetcher<Testimonial[]>(TESTIMONIALS_ENDPOINT);
}

/**
 * Query key for React Query
 */
export const testimonialsQueryKey = ["testimonials"] as const;
