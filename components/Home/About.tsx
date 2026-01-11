"use client";
import Image from "next/image";
import OrnamentCircle from "@/app/ornament-circle.svg";
import { motion, Variants } from "framer-motion";
import Lottie from "lottie-react";
import helloAnimation from "@/public/hello.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

const nameVariants: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
      delay: 0.3,
    },
  },
};

const highlightVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

const ornamentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 80,
      delay: 0.5,
    },
  },
};

export default function Home() {
  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-20 relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        variants={ornamentVariants}
        initial="hidden"
        animate="visible"
        className="absolute right-0 top-20 z-0"
      >
        <Image
          src={OrnamentCircle}
          alt="Ornament Circle"
          className="opacity-70 dark:opacity-50"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col justify-center z-10"
      >
        <div className="space-y-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold flex items-center flex-wrap"
          >
            <motion.span variants={itemVariants}>Hey, I'm</motion.span>{" "}
            <motion.span
              variants={nameVariants}
              className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
            >
              Raditya
            </motion.span>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 0.6,
              }}
            >
              <Lottie
                animationData={helloAnimation}
                loop={true}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 inline-block"
              />
            </motion.div>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600 dark:text-gray-300"
          >
            I'm a Software Engineer who builds
            <br />
            <motion.span
              variants={highlightVariants}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
            >
              enterprise systems
            </motion.span>{" "}
            &{" "}
            <motion.span
              variants={highlightVariants}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500"
            >
              scalable web solutions
            </motion.span>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
