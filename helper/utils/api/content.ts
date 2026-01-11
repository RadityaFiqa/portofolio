import axios from "axios";

/**
 * Fetch markdown content for an article
 * @param slug - Article slug
 * @returns Markdown content string
 */
export async function fetchArticleContent(slug: string): Promise<string> {
  const response = await axios.get<string>(`/content/post/${slug}.md`, {
    responseType: "text",
  });
  // Remove frontmatter (content between --- markers)
  // Handle both Unix (LF) and Windows (CRLF) line endings
  const content = response.data.replace(/^---[\s\S]*?---\r?\n?/, "").trim();
  return content;
}

/**
 * Query key for article content
 */
export const articleContentQueryKey = (slug: string) =>
  ["article-content", slug] as const;
