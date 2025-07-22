// app/topics/[topicSlug]/page.tsx
import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

const POSTS_BY_TOPIC_QUERY = `
    *[_type == "post" && topic->slug.current == $slug]
    | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      topic->{ slug }
    }
  `;

export default async function TopicPage({
  params,
}: {
  params: { topicSlug: string };
}) {
  const posts = await client.fetch<SanityDocument[]>(POSTS_BY_TOPIC_QUERY, {
    slug: params.topicSlug,
  });

  console.log("Fetched posts:", posts);

  return (
    <main className="container mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-6">Posts in {params.topicSlug}</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link
              href={`/${post?.topic?.slug?.current}/${post?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
