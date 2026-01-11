import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Card({
  slug,
  title,
  description,
  image,
  date,
  techStack,
  type = "article",
}: Readonly<{
  slug?: string;
  image: string | StaticImageData;
  title: string;
  description?: string;
  date?: string;
  techStack?: string[];
  type?: "project" | "article";
}>) {
  // Determine link based on type and slug
  const href = slug ? (type === "project" ? `/projects/${slug}` : `/articles/${slug}`) : null;

  const content = (
    <div className="group h-full">
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {/* Window Header - Only for projects */}
          {type === "project" && (
            <div className="bg-[#F0F1F3] dark:bg-gray-800 px-4 py-3">
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image */}
          <div className={`relative overflow-hidden ${type === "project" ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* View Project Icon - appears on hover */}
          <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
              <FaExternalLinkAlt className="w-4 h-4 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          {date && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider">
              {date}
            </p>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* Tech Stack */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
