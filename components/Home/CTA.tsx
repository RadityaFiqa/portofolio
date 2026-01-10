"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center"
    >
      <div className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md lg:rounded-lg flex flex-col justify-center items-center py-10">
        <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
          Let's <span className="">Work Together</span>
        </h1>
        <p className="text-muted text-center mb-8">
          Interested in collaborating with me? We should queue up a time to
          chat. I’ll buy the coffee.
        </p>

        <a
          className="bg-white text-black px-8 py-4 rounded-full"
          href="https://api.whatsapp.com/send/?phone=%2B6281232254875"
          target="_blank"
        >
          Contact Me
        </a>
      </div>
    </motion.section>
  );
}
