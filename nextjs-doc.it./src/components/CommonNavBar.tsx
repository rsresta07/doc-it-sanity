/**
 * A common navigation bar component, used across all pages.
 *
 * This component renders a horizontal navigation bar with a
 * "Next.js" title on the left and no links on the right.
 *
 * @returns A React component that renders a navigation bar.
 */
const CommonNavBar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Next.js</span>
      </div>
    </nav>
  );
};

export default CommonNavBar;
