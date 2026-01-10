"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaCode, FaAt, FaTrophy, FaMedal } from "react-icons/fa";

interface AboutData {
  name: string;
  role: string;
  image: string;
  openToWork: boolean;
  bio: string[];
  social: {
    linkedin: string;
    github: string;
    instagram: string;
    email: string;
  };
}

interface Experience {
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

interface Achievement {
  id: number;
  title: string;
  description: string;
  year: string;
  icon: string;
}

interface Skills {
  languages: { name: string }[];
  frameworks: { name: string }[];
  databases: { name: string }[];
  tools: { name: string }[];
}

const experienceTabs = [
  { id: "full-time", label: "Full Time" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
];

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<Skills | null>(null);
  const [activeTab, setActiveTab] = useState("full-time");

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));

    fetch("/experiences.json")
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching experiences:", err));

    fetch("/achievements.json")
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((err) => console.error("Error fetching achievements:", err));

    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => exp.type === activeTab);
  }, [experiences, activeTab]);

  if (!aboutData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="px-4 md:px-8 lg:px-16 xl:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Profile Card */}
            <motion.aside
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="lg:sticky lg:top-8">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={aboutData.image}
                        alt={aboutData.name}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    </div>

                    {/* Open to Work Badge */}
                    {aboutData.openToWork && (
                      <div className="absolute bottom-20 left-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 text-sm font-medium">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                          Open to work
                        </span>
                      </div>
                    )}

                    {/* Name & Role */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h1 className="text-2xl font-bold text-white">{aboutData.name}</h1>
                      <p className="text-gray-400">{aboutData.role}</p>
                    </div>
                  </div>

                  {/* Connect Section */}
                  <div className="p-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Connect</p>
                    <div className="flex gap-3">
                      <a
                        href={aboutData.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <FaLinkedinIn className="w-4 h-4 text-gray-400" />
                      </a>
                      <a
                        href={aboutData.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <FaGithub className="w-4 h-4 text-gray-400" />
                      </a>
                      <a
                        href={aboutData.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <FaCode className="w-4 h-4 text-gray-400" />
                      </a>
                      <a
                        href={`mailto:${aboutData.social.email}`}
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <FaAt className="w-4 h-4 text-gray-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 min-w-0"
            >
              {/* About Me Section */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-emerald-400">#</span> About Me
                </h2>
                <div className="space-y-4">
                  {aboutData.bio.map((paragraph, index) => (
                    <p key={index} className="text-gray-400 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Experience Section */}
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Experience</h2>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {experienceTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-800"
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Experience List */}
                <div className="space-y-0">
                  <AnimatePresence mode="wait">
                    {filteredExperiences.length > 0 ? (
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {filteredExperiences.map((exp, index) => (
                          <div key={exp.id} className="relative pl-8 pb-12 last:pb-0">
                            {/* Timeline Line */}
                            {index < filteredExperiences.length - 1 && (
                              <div className="absolute left-[7px] top-3 bottom-0 w-px bg-gray-800" />
                            )}
                            
                            {/* Timeline Dot */}
                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-gray-700 bg-gray-900" />

                            {/* Content */}
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                                <a
                                  href={exp.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                  {exp.company}
                                </a>
                              </div>
                              <span className="text-sm text-gray-500 md:text-right whitespace-nowrap">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>

                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                              {exp.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                              {exp.techStack.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-md border border-gray-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-gray-500"
                      >
                        No experience found for this category.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Skills Section */}
              {skills && (
                <section className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8">Skills</h2>
                  
                  <div className="space-y-6">
                    {/* Languages */}
                    <div>
                      <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-3">
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.languages.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-700 transition-colors"
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks */}
                    <div>
                      <h3 className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">
                        Frameworks
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.frameworks.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-700 hover:border-blue-500/50 hover:bg-gray-700 transition-colors"
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Databases */}
                    <div>
                      <h3 className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-3">
                        Databases
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.databases.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-700 hover:border-orange-500/50 hover:bg-gray-700 transition-colors"
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div>
                      <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3">
                        Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.tools.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-700 transition-colors"
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Achievements Section */}
              {achievements.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8">Achievements</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-emerald-500/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            {achievement.icon === "trophy" ? (
                              <FaTrophy className="w-6 h-6 text-yellow-400" />
                            ) : (
                              <FaMedal className="w-6 h-6 text-amber-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white truncate">{achievement.title}</h3>
                              <span className="text-xs text-gray-500 flex-shrink-0">{achievement.year}</span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">{achievement.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
