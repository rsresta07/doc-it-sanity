import { topics } from "@/app/api/all-api";
import Link from "next/link";

/**
 * A page that displays a list of topics.
 *
 * @returns A React component that displays a list of topics.
 */
export default async function TopicPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl  mt-[5rem]">
      <h1 className="text-3xl font-bold mb-4">Topics</h1>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li
            key={topic.slug.current}
            className="transform transition hover:scale-103"
          >
            <Link href={`/topic/${topic.slug.current}`} className="font-bold">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
