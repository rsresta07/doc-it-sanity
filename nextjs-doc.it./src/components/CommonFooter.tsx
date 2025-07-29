import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

/**
 * Renders the common footer for the application.
 *
 * The footer includes site information, navigation links, resources, and social media links.
 * It is designed with a responsive grid layout that adjusts to different screen sizes.
 *
 * - Site Info: Displays the blog title and description.
 * - Navigation: Provides links to important pages such as Home, About, and Contact.
 * - Resources: Offers links to Tags, Categories, and Newsletter sections.
 * - Social Links: Displays icons linking to social media profiles like Twitter, GitHub, and LinkedIn.
 *
 * The footer is styled with Tailwind CSS classes for background, text color, and spacing.
 *
 * @returns JSX.Element - The footer component.
 */
const CommonFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-[5rem]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Site Info */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">MyBlog</h2>
          <p className="text-sm text-gray-400">
            Thoughts, tutorials, and tech insights from a curious mind.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/tags" className="hover:text-white">
                Tags
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="hover:text-white">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Me</h3>
          <div className="flex space-x-4">
            <Link
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default CommonFooter;
