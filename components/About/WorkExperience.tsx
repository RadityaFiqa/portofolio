"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Experience = {
  type: string | "full-time" | "internship" | "freelance";
  role: string;
  company: string;
  description: string;
  date: string;
};

const experiences: Experience[] = [
  {
    type: "full-time",
    role: "Full-stack Developer",
    company: "PT. Elnusa Tbk",
    description:
      "Worked as a full-stack developer at PT. Elnusa Tbk, a company that provides services in the oil and gas sector. I was responsible for developing and maintaining the company's internal web applications.",
    date: "February 2024 - Present",
  },
  {
    type: "internship",
    role: "Full-stack Developer",
    company: "PT. Baracipta Esa Engineering",
    description:
      "Interned as a full-stack developer at PT. Baracipta Esa Engineering as part of MSIB Kampus Merdeka program. a construction company that provides services in the construction sector. I was responsible for developing and maintaining the company's product Estimator.ID.",
    date: "August 2023 - Desember 2023",
  },
  {
    type: "internship",
    role: "Software Developer",
    company: "UPT TIK Universitas Sebelas Maret",
    description:
      "Interned as a software developer at UPT TIK Universitas Sebelas Maret. I was responsible for helping internal team for collecting data and maintaining application",
    date: "January 2023 - September 2023",
  },
  {
    type: "freelance",
    role: "Full-stack Developer",
    company: "PT. Upcolab",
    description:
      "Worked as a Full-stack Developer at PT. Upcolab, a company that provides services in the digital marketing sector. I was responsible for developing Android applications specifically for the company's clients.",
    date: "Desember 2023 - Present",
  },
];

export default function WorkExperience() {
  const [filter, setFilter] = useState<string>("full-time");

  const isSelected = (type: string) => filter === type;
  const experiencesFiltered = experiences.filter((exp) => exp.type === filter);

  return (
    <section className="lg:min-h-screen lg:justify-center flex flex-col text-center items-center my-16">
      <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-500 mb-4">
        Work <span className="">Experience</span>
      </h1>

      <p className="text-gray-400 text-muted">
        Here is a list of my recent work experiences
      </p>

      <div className="grid grid-cols-3 gap-4 my-8 mb-16">
        <button
          className={`bg-[#F0F1F3] dark:bg-gray-800  px-4 py-2 rounded-lg hover:bg-gray-700 ${
            isSelected("full-time") && "bg-gray-700 text-white"
          }`}
          onClick={() => setFilter("full-time")}
        >
          Full-time
        </button>
        <button
          className={`bg-[#F0F1F3] dark:bg-gray-800  px-4 py-2 rounded-lg hover:bg-gray-700 ${
            isSelected("internship") && "bg-gray-700 text-white"
          }`}
          onClick={() => setFilter("internship")}
        >
          Internship
        </button>
        <button
          className={`bg-[#F0F1F3] dark:bg-gray-800  px-4 py-2 rounded-lg hover:bg-gray-700 ${
            isSelected("freelance") && "bg-gray-700 text-white"
          }`}
          onClick={() => setFilter("freelance")}
        >
          Freelance
        </button>
      </div>

      <div className="flex flex-col items-center w-full">
        {experiencesFiltered.map((exp, index) => ExperienceCard(exp, index))}
      </div>
    </section>
  );
}

function ExperienceCard(exp: Experience, index: number) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="sm:w-full p-4 md:w-1/2 lg:w-1/3 mb-16 text-muted"
      key={index}
    >
      <h2 className="text-gray-400 uppercase mb-2 text-center">{exp.role}</h2>
      <h2 className="text-xl font-bold mb-4 text-center">{exp.company}</h2>
      <p className="text-gray-400 text-center mb-4">{exp.description}</p>
      <p className="text-gray-400 text-center">{exp.date}</p>
    </motion.div>
  );
}
