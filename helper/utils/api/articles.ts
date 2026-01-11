import { fetcher } from "../fetcher";

/**
 * Article interface
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  category: string;
  featured: boolean;
}

/**
 * Endpoints for articles API
 */
export const ARTICLES_ENDPOINT = "/articles.json";

/**
 * Fetch all articles
 * @returns Promise with array of articles
 */
export async function fetchArticles(): Promise<Article[]> {
  return fetcher<Article[]>(ARTICLES_ENDPOINT);
}

/**
 * Query key for React Query
 */
export const articlesQueryKey = ["articles"] as const;
