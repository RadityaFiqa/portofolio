"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import OrnamentCircle from "@/app/ornament-circle2.svg";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
}

const categories = ["All", "Web Dev", "Android Dev"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  return (
    <main className="lg:my-8 h-relative lg:min-h-screen">
      <section className="px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center my-16">
        <Image
          src={OrnamentCircle}
          alt="Project Image"
          className="absolute top-0 z-0"
          style={{ zIndex: -1 }}
        />

        <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Featured{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-500 ">
            Projects
          </span>
        </h1>

        <p className="text-gray-400 text-mute mb-8 text-center">
          Here are a few past design projects I've worked on. Want to see more?
        </p>

        <div className="flex justify-center w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search Project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 bg-[#F0F1F3] dark:bg-gray-800 rounded-l-lg h-10 focus:outline-none"
          />
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-r-lg w-12 flex items-center justify-center">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center justify-center w-full h-8 gap-4 md:gap-8 mb-12 mt-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full p-0.5 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-green-400 to-blue-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <div className="flex h-full w-full items-center justify-center bg-white dark:bg-black rounded-full py-3 px-6">
                <span
                  className={`font-bold text-center ${
                    activeCategory === category
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center my-16">
        {filteredProjects.length > 0 ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProjects.map((project) => (
              <Card
                key={project.slug}
                slug={project.slug}
                type="project"
                image={project.image}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No projects found.</p>
          </div>
        )}
      </section>
    </main>
  );
}
