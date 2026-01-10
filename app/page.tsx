import Image from "next/image";
import ProjectImage from "./project_image.png";

import { FaHtml5, FaJava, FaReact } from "react-icons/fa";
import Testimonials from "@/components/Home/Testimonials";
import About from "@/components/Home/About";
import Project from "@/components/Home/Project";
import CTA from "@/components/Home/CTA";
import Articles from "@/components/Home/Article";

export default function Home() {
  return (
    <main className="lg:my-8 overflow-x-hidden">
      <About />
      <Project />
      <CTA />
      <Testimonials />
      <Articles />
    </main>
  );
}
