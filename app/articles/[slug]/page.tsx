"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendar, FaTag } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/helper/utils/dateFormatter";
import {
  fetchArticles,
  articlesQueryKey,
  fetchArticleContent,
  articleContentQueryKey,
  Article,
} from "@/helper/utils/api";

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: articlesQueryKey,
    queryFn: fetchArticles,
  });

  const article = articles.find((a) => a.slug === slug);

  const { data: content = "", isLoading: contentLoading } = useQuery<string>({
    queryKey: articleContentQueryKey(slug),
    queryFn: () => fetchArticleContent(slug),
    enabled: !!article,
  });

  const isLoading = !articles.length || (article && contentLoading);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <button
          onClick={() => router.push("/articles")}
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Articles
        </button>
      </main>
    );
  }

  return (
    <main className="lg:my-8 min-h-screen">
      <article className="px-4 md:px-8 lg:px-16 xl:px-20 py-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/articles")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <FaArrowLeft /> Back to Articles
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-medium rounded-full mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Description/Subtitle */}
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {article.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <FaCalendar className="text-sm" />
              <span>{formatDate(article.date)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-[#F0F1F3] dark:bg-gray-800 rounded-full text-sm"
              >
                <FaTag className="text-xs" /> {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="article-content"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-lg leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                  <div className="text-gray-600 dark:text-gray-300 italic text-lg">
                    {children}
                  </div>
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-pink-500 dark:text-pink-400">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-[#0d1117] text-gray-100 rounded-lg p-4 overflow-x-auto my-6 text-sm leading-relaxed">
                  {children}
                </pre>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-500 hover:text-blue-600 underline"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900 dark:text-white">
                  {children}
                </strong>
              ),
              hr: () => (
                <hr className="my-10 border-gray-200 dark:border-gray-700" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.div>
      </article>
    </main>
  );
}
