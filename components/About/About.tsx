"use client";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import PhotoProfile from "@/app/profile.png";
import OrnamentCircle from "@/app/ornament-circle.svg";
import Lottie from "lottie-react";
import HelloLottie from "@/public/hello.json";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="px-4 md:px-8 relative md:min-h-screen lg:px-16 xl:px-20 flex items-center justify-center">
      <Image
        src={OrnamentCircle}
        alt="Ornament Circle"
        className="absolute right-0 top-20 z-0"
      />

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="w-full flex flex-col justify-center items-center gap-6 rounded-lg z-10"
      >
        <Image
          src={PhotoProfile}
          alt="Raditya Firman S"
          className="rounded-full w-32 h-32 mr-0 lg:mr-8"
        />

        <div className="flex flex-col items-center space-y-4 px-4 md:px-0 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center justify-center mb-5">
            <p className="text-3xl font-semibold text-center ">
              Hello, I'm Raditya Firman Syaputra
            </p>
            <Lottie
              animationData={HelloLottie}
              className="size-10 md:size-12"
            />
          </div>

          <p className=" text-lg leading-relaxed w-full md:w-1/2 text-center">
            I'm a final year informatics engineering student at{" "}
            <a
              href="https://www.its.ac.id/"
              className="text-blue-400 hover:underline"
            >
              Universitas Sebelas Maret.
            </a>{" "}
            Currently Working as a Full Stack Developer at{" "}
            <a
              href="https://elnusa.co.id/"
              className="text-blue-400 hover:underline"
            >
              PT. Elnusa Tbk
            </a>
          </p>
        </div>

        <div className="flex space-x-4">
          <a
            className="flex items-center justify-center border-2 border-white rounded-full w-12 h-12 "
            href="https://linkedin.com/in/radityafirmansyaputra"
            target="_blank"
          >
            <FaLinkedinIn className=" w-6 h-6" />
          </a>
          <a
            className="flex items-center justify-center border-2 border-white rounded-full w-12 h-12 "
            href="https://instagram.com/sekutumu"
            target="_blank"
          >
            <FaInstagram className=" w-6 h-6" />
          </a>
          <a
            className="flex items-center justify-center border-2 border-white rounded-full w-12 h-12 "
            href="https://instagram.com/sekutumu"
            target="_blank"
          >
            <FaGithub className=" w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
