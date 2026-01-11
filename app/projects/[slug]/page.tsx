"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, projectsQueryKey } from "@/helper/utils/api";

interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  techStack: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: projects = [], isLoading } = useQuery<ProjectDetail[]>({
    queryKey: projectsQueryKey,
    queryFn: fetchProjects as () => Promise<ProjectDetail[]>,
  });

  const project = projects.find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <button
          onClick={() => router.push("/projects")}
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Projects
        </button>
      </main>
    );
  }

  return (
    <main className="lg:my-8 min-h-screen">
      <section className="px-4 md:px-8 lg:px-16 xl:px-20 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/projects")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <FaArrowLeft /> Back to Projects
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="bg-[#F0F1F3] dark:bg-gray-800 p-4 rounded-xl">
              <div className="flex gap-2 items-center mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={project.images[selectedImage]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-medium rounded-full">
              {project.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {project.title}
            </h1>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              {project.fullDescription.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#F0F1F3] dark:bg-gray-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-4 pt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <FaGithub /> View Code
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
