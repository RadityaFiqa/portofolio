"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { Testimonial } from "@/helper/utils/api";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [show, setShow] = useState<number>(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setShow((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const isSelected = (index: number) => show === index;

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="lg:min-h-screen px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col items-center justify-center my-16">
      <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-blue-400 mb-4 text-center md:text-left">
        Testimonials
      </h1>

      <p className="text-gray-400 text-mute mb-8 text-center w-80">
        People I've worked with have said some nice things...
      </p>

      <CardTestimonials testimonial={testimonials[show]} />

      <div className="flex justify-center items-center mt-8">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full mx-2 cursor-pointer transition-all duration-300 ${
              isSelected(index)
                ? "bg-gradient-to-r from-green-400 to-blue-400 scale-110"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            onClick={() => setShow(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}

function CardTestimonials({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      key={testimonial.id}
      className="text-center flex-col items-center flex"
    >
      {/* Profile Image with LinkedIn Badge */}
      <div className="relative mb-4">
        <div className="relative w-20 h-20">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
          />
        </div>
        
        {/* LinkedIn Badge */}
        {testimonial.social?.linkedin && (
          <a
            href={testimonial.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label={`Connect with ${testimonial.name} on LinkedIn`}
          >
            <FaLinkedinIn className="w-4 h-4 text-white" />
          </a>
        )}
      </div>

      <p className="text-lg text-center mb-4 p-4 w-full md:w-1/2">
        &ldquo;{testimonial.message}&rdquo;
      </p>

      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{testimonial.name}</h2>
      </div>
      <p className="text-gray-400 text-muted">{testimonial.role}</p>
    </motion.div>
  );
}
