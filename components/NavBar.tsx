"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaBars, FaRegMoon, FaRegSun } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className="container mx-auto overflow-x-hidden flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-20 my-4 lg:my-8"
      style={{
        zIndex: 100,
      }}
    >
      <Link href="/" className="text-2xl font-bold">
        radityaa.dev
      </Link>

      <div className="hidden md:flex space-x-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative py-1 transition-all duration-300 ${
              isActive(item.href)
                ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-semibold"
                : "hover:text-green-400"
            }`}
          >
            {item.label}
            {isActive(item.href) && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
            )}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 md:gap-6 items-center">
        {mounted && (
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full size-10 flex items-center justify-center transition-colors duration-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <FaRegSun className="text-xl text-yellow-400" />
            ) : (
              <FaRegMoon className="text-xl text-gray-700" />
            )}
          </button>
        )}

        <Link
          href="https://api.whatsapp.com/send/?phone=%2B6281232254875"
          target="_blank"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          Contact Me
        </Link>

        <div className="md:hidden flex items-center">
          <FaBars onClick={() => setIsOpen(!isOpen)} className="text-2xl" />
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed size-full text-white top-0 left-0 right-0 bg-gray-800 p-4 rounded-lg"
          style={{
            zIndex: 99,
          }}
        >
          <div className="flex justify-end">
            <FaXmark onClick={() => setIsOpen(!isOpen)} className="text-2xl" />
          </div>

          <div className="flex h-full flex-col gap-4">
            <ul className="flex h-full justify-center items-center flex-col gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-2xl transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-bold"
                        : "hover:text-green-400"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    {isActive(item.href) && " •"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
