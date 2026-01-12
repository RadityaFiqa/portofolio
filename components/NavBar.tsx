"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaRegMoon, FaRegSun } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/about">About</Link>
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

        <a
          href="https://api.whatsapp.com/send/?phone=%2B6281232254875"
          target="_blank"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          Contact Me
        </a>

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
              <li>
                <Link href="/" className="text-2xl" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-2xl" onClick={() => setIsOpen(false)}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-2xl" onClick={() => setIsOpen(false)}>
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-2xl" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
