import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

export default async function IndexPage() {
  const topics = await client.fetch<SanityDocument[]>(`
    *[_type == "topic"]{title, slug}
  `);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Topics</h1>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic.slug.current}>
            <Link href={`/${topic.slug.current}`} className="underline">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
