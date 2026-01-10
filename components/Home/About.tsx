"use client";
import Image from "next/image";
import OrnamentCircle from "@/app/ornament-circle.svg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-20 relative min-h-screen flex items-center justify-center">
      <Image
        src={OrnamentCircle}
        alt="Ornament Circle"
        className="absolute right-0 top-20 z-0"
      />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="flex w-full flex-col justify-center  z-10"
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            Hey, I'm{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Raditya
            </span>{" "}
            👋
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-600 dark:text-gray-300">
            I'm a Software Engineer who builds
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              enterprise systems
            </span>{" "}
            &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
              scalable web solutions
            </span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
