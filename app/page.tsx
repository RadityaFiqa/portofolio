"use client";

import { useQuery } from "@tanstack/react-query";
import Testimonials from "@/components/Home/Testimonials";
import About from "@/components/Home/About";
import Project from "@/components/Home/Project";
import CTA from "@/components/Home/CTA";
import Articles from "@/components/Home/Article";
import {
  fetchArticles,
  fetchProjects,
  fetchTestimonials,
  articlesQueryKey,
  projectsQueryKey,
  testimonialsQueryKey,
  Article,
  Testimonial,
} from "@/helper/utils/api";

interface ProjectWithFeatured {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
  featured: boolean;
}

export default function Home() {
  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: articlesQueryKey,
    queryFn: fetchArticles,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<ProjectWithFeatured[]>({
    queryKey: projectsQueryKey,
    queryFn: fetchProjects as () => Promise<ProjectWithFeatured[]>,
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: testimonialsQueryKey,
    queryFn: fetchTestimonials,
  });

  const isLoading = articlesLoading || projectsLoading || testimonialsLoading;

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  const featuredArticles = articles.filter((article) => article.featured).slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <main className="lg:my-8 overflow-x-hidden">
      <About />
      <Project projects={featuredProjects} />
      <CTA />
      <Testimonials testimonials={testimonials} />
      <Articles articles={featuredArticles} />
    </main>
  );
}
