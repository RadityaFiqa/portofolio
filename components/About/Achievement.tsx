"use client";
import Image from "next/image";
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour } from "react-icons/fa";
import OrnamentPolygon from "@/app/ornament-polygon.svg";
import { motion } from "framer-motion";

export default function Achievement() {
  return (
    <section className="lg:min-h-screen lg:justify-center relative overflow-hidden px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col my-16">
      <Image
        src={OrnamentPolygon}
        alt="Ornament Circle"
        className="absolute md:-right-40 bottom-0 md:top-0 z-0"
      />

      <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-500 mb-4 text-center md:text-left">
        My <span className="">Achievement</span>
      </h1>

      <p className="text-gray-400 text-mute mb-8 text-center md:text-left">
        Here is a list of my recent achievement
      </p>

      <motion.ul
        initial={{ x: -100, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="flex flex-col space-y-8"
      >
        <AchievementList
          icon={<FaDiceOne className="w-8 h-8" color="#61DAFB" />}
          title="1st Place Mobile App Competition"
          description="Become the 1st place in Mobile App Competition at Magic Camp 2023
          Held by Himpunan Mahasiswa Manajemen Administrasi Universitas Sebelas Maret"
        />
        <AchievementList
          icon={<FaDiceTwo className="w-8 h-8" color="#61DAFB" />}
          title="Finalist Innovative Tech Competition"
          description="Become the finalist in Innovative Tech Competition at Ifest Comp 2022
          Held by Himpunan Mahasiswa Informatika Universitas Padjajaran"
        />
        <AchievementList
          icon={<FaDiceThree className="w-8 h-8" color="#61DAFB" />}
          title="1st Place Business Plan Competition"
          description="Become the 1st place in Business Plan Competition at Smart IT Fest 2022
          Held by Himpunan Mahasiswa D3 Teknik Informatika Universitas Sebelas Maret"
        />
        <AchievementList
          icon={<FaDiceFour className="w-8 h-8" color="#61DAFB" />}
          title="2nd Place Web Development Competition"
          description="Become the 2nd place in Web Development Competition at Smart Inotek Comp 2022
          Held by Himpunan Mahasiswa D3 Teknik Informatika PSDKU Universitas Sebelas Maret"
        />
      </motion.ul>
    </section>
  );
}

function AchievementList({
  icon,
  title,
  description,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  description: string;
}>) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-4"
    >
      <div className="w-12 h-12 bg-[#F0F1F3] dark:bg-gray-800 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-400 w-full md:w-1/2">{description}</p>
      </div>
    </motion.li>
  );
}
