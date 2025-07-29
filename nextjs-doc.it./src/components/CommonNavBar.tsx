"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

/**
 * A common navigation bar component for the entire site.
 *
 * This component renders a common navigation bar for the site. It contains
 * the site title, a list of main navigation links, and a toggle button to
 * show/hide a menu for mobile devices.
 *
 * @returns A common navigation bar component.
 */
const CommonNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          MyBlog
        </Link>

        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 px-2 text-sm font-medium">
          <Link href="/" className="block hover:text-gray-300">
            Home
          </Link>
          <Link href="/blog" className="block hover:text-gray-300">
            Blog
          </Link>
          <Link href="/about" className="block hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="block hover:text-gray-300">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default CommonNavBar;
