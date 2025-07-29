import { topics } from "@/app/api/all-api";
import Link from "next/link";

/**
 * A page that displays a list of topics.
 *
 * Fetches topics from the Sanity client using the API defined in `all-api.ts`.
 * Renders a list of topics with links to each topic page.
 * Each topic is rendered with a title and a slug.
 */
export default async function TopicPage() {
  return (
    <main className="container mx-auto min-h-screen pt-[5rem] max-w-6xl">
      <h1 className="text-3xl font-bold mb-[2rem]">Topics</h1>
      <section className="flex flex-wrap gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.slug.current}
            href={`/topic/${topic.slug.current}`}
            className="font-bold text-xl"
          >
            <div className="border p-[1rem] rounded-2xl transform transition hover:scale-103">
              {topic.title}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
