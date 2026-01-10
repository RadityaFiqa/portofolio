"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import OrnamentCircle from "@/app/ornament-circle2.svg";
import { FaSearch, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    fetch("/articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  const filteredArticles = useMemo(() => {
    let result = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSearch;
    });

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [articles, searchQuery, sortOrder]);

  return (
    <main className="lg:my-8 h-relative lg:min-h-screen">
      <section className="px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center my-16">
        <Image
          src={OrnamentCircle}
          alt="Ornament"
          className="absolute top-0 z-0"
          style={{ zIndex: -1 }}
        />

        <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Featured{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-500 ">
            Articles
          </span>
        </h1>

        <p className="text-gray-400 text-mute mb-8 text-center">
          Essays, learning, and other miscellaneous goodies.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-0 px-4 justify-center w-full md:w-1/2">
          <div className="w-full flex items-center justify-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 bg-[#F0F1F3] dark:bg-gray-800 rounded-l-lg h-10 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-r-lg w-12 h-10 flex items-center justify-center md:mr-4">
              <FaSearch />
            </button>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="bg-[#F0F1F3] dark:bg-gray-800 rounded-lg h-10 focus:outline-none px-4 py-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center my-16">
        {filteredArticles.length > 0 ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {filteredArticles.map((article) => (
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No articles found.</p>
          </div>
        )}
      </section>
    </main>
  );
}
