"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import OrnamentCircle from "@/app/ornament-circle2.svg";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, projectsQueryKey, Project } from "@/helper/utils/api";

const categories = ["All", "Web Dev", "Android Dev"];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: projectsQueryKey,
    queryFn: fetchProjects,
  });

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

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="lg:my-8 h-relative lg:min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-xl">Error loading projects.</p>
      </main>
    );
  }

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
          Here are a few past projects I've worked on. Want to see more?
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

        <div className="flex items-center justify-center w-full gap-2 md:gap-3 mb-12 mt-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full p-[1.5px] transition-all duration-200 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-green-400 to-blue-500"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            >
              <div className="flex h-full w-full items-center justify-center bg-white dark:bg-black rounded-full py-1.5 px-4">
                <span
                  className={`text-sm font-medium ${
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
