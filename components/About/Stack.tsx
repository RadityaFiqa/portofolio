"use client";

import { FaReact, FaHtml5, FaJava } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Stack() {
  return (
    <section className="lg:min-h-screen lg:justify-center px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center justify-center my-16">
      <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-400 mb-4 text-center md:text-left">
        Tech <span className="">Stack</span>
      </h1>

      <p className="text-gray-400 text-mute mb-8 text-center w-80">
        I like to code things from scratch, and enjoy bringing ideas to life in
        the browser.
      </p>

      <h2 className="uppercase font-bold text-gray-400  mb-4 text-center md:text-left text-transparent font-medium bg-clip-text bg-gradient-to-b from-green-400 to-blue-500">
        Languages
      </h2>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaReact className=" w-8 h-8" color="#61DAFB" />
        </div>
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaHtml5 className=" w-8 h-8" color="#E34F26" />
        </div>
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaJava className=" w-8 h-8" color="#E34F26" />
        </div>
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaJava className=" w-8 h-8" color="#E34F26" />
        </div>
      </motion.div>

      <h2 className="uppercase font-bold text-gray-400  mb-4 text-center md:text-left text-transparent font-medium bg-clip-text bg-gradient-to-b from-green-400 to-blue-500">
        Dev tools
      </h2>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaReact className=" w-8 h-8" color="#61DAFB" />
        </div>
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaHtml5 className=" w-8 h-8" color="#E34F26" />
        </div>
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaJava className=" w-8 h-8" color="#E34F26" />
        </div>
        <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaJava className=" w-8 h-8" color="#E34F26" />
        </div>
      </motion.div>
    </section>
  );
}
