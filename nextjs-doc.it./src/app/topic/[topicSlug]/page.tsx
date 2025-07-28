import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { POSTS_BY_TOPIC_QUERY, topics } from "@/app/api/all-api";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "next-sanity/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// create builder
const builder = imageUrlBuilder(client);

/**
 * Given a SanityImageSource, returns a URL for the image.
 * @param source The source object for the image.
 * @returns A URL for the image.
 */
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * A page that displays a list of posts for a given topic.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.params - The parameters object.
 * @param {string} props.params.topicSlug - The slug of the topic to fetch posts for.
 * @returns A React component that displays posts for the specified topic.
 * Fetches posts from the Sanity client using the provided topic slug.
 */
export default async function TopicPage({
  params,
}: {
  params: { topicSlug: string };
}) {
  const posts = await client.fetch<SanityDocument[]>(POSTS_BY_TOPIC_QUERY, {
    slug: params.topicSlug,
  });

  const currentTopic = await topics.find(
    (topic) => topic?.slug?.current === params?.topicSlug
  );
  return (
    <main className="container mx-auto min-h-screen max-w-3xl mt-[5rem]">
      <section className="text-sm mb-4 text-gray-600 flex flex-wrap items-center gap-1">
        <Link href="/" className="hover:underline text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/topic/${currentTopic?.slug.current}`}
          className="text-gray-800 font-medium"
        >
          {currentTopic?.title}
        </Link>
      </section>

      <h1 className="text-3xl font-bold mb-6">
        Posts in {currentTopic?.title ?? params.topicSlug}
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li className="transform transition hover:scale-103" key={post._id}>
            <Link
              href={`/topic/${post?.topic?.slug?.current}/${post?.slug?.current}`}
              className="flex justify-between items-center gap-4"
            >
              <div className="flex gap-6 items-center">
                {post.image && (
                  <Image
                    src={urlFor(post.image).width(400).height(250).url()}
                    alt={post.title}
                    className="rounded-xl object-cover w-[5rem] h-[5rem]"
                    width={1024}
                    height={1024}
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <div>
                    <p>
                      Posted Date:{" "}
                      {new Date(post?._createdAt).toLocaleDateString()}
                    </p>
                    {post?._updatedAt && (
                      <p>
                        Last updated:{" "}
                        {new Date(post?._updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
