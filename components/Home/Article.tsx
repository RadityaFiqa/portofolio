"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendar } from "react-icons/fa";

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  featured: boolean;
}

// Format date to DD MMM YYYY
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/articles.json")
      .then((res) => res.json())
      .then((data: Article[]) => {
        // Filter only featured articles, limit to 3
        const featuredArticles = data
          .filter((article) => article.featured)
          .slice(0, 3);
        setArticles(featuredArticles);
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-20 lg:min-h-screen flex flex-col items-center my-16">
      <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 ">
        Featured{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-500">
          Articles
        </span>
      </h1>

      <p className="text-gray-400 text-mute mb-8 text-center">
        Thoughts and insights about software engineering and development.
      </p>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block"
          >
            <article className="bg-[#F0F1F3] dark:bg-gray-800 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-medium rounded-full mb-4">
                {article.category}
              </span>

              {/* Title */}
              <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                {article.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {article.description}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaCalendar className="text-xs" />
                <span>{formatDate(article.date)}</span>
              </div>
            </article>
          </Link>
        ))}
      </motion.div>

      <div className="rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-0.5 mt-16">
        <div className="flex h-full w-full items-center justify-center bg-white dark:bg-black rounded-full py-3 px-6">
          <a className=" font-bold" href="/articles">
            See More Articles
          </a>
        </div>
      </div>
    </section>
  );
}
