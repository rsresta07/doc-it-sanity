import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Image } from "next-sanity/image";
import { POST_QUERY } from "@/app/api/all-api";
import CommentForm from "@/components/CommentForm";
import CommentsSection from "@/components/CommentsSection";

const { projectId, dataset } = client.config();

/**
 * Given a SanityImageSource, returns a URL for the image.
 * @param source The source object for the image.
 * @returns A URL for the image, or null if the Sanity client is not configured.
 */
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

/**
 * A page that displays a single post.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.params - The parameters object.
 * @param {string} props.params.topicSlug - The slug of the topic to fetch posts for.
 * @param {string} props.params.postSlug - The slug of the post to fetch.
 * Fetches the post from the Sanity client using the provided topic slug and post slug.
 * Renders a post with its title, image, published date, and body content.
 * The post body content is rendered using the `PortableText` component from `next-sanity`.
 * The post body content is rendered with a custom configuration for the `PortableText` component.
 * The custom configuration specifies the components to use for each block type.
 * The custom configuration specifies the components to use for each mark type.
 * The custom configuration specifies the components to use for each list item type.
 * @returns A React component that displays a post.
 */
export default async function Page({
  params,
}: {
  params: { topicSlug: string; postSlug: string };
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, {
    slug: params.postSlug,
  });

  const topics = await client.fetch<SanityDocument[]>(`
    *[_type == "topic"]{title, slug}
  `);

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  const currentTopic = topics.find(
    (topic) => topic.slug.current === params.topicSlug
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl flex flex-col gap-4 mt-[5rem]">
      {/* BreadCrumbs */}
      <section className="text-sm mb-4 text-gray-600 flex flex-wrap items-center gap-1">
        <Link href="/" className="hover:underline text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/topic/${post.topic.slug.current}`}
          className="hover:underline text-blue-600"
        >
          {post.topic.title}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{post.title}</span>
      </section>

      {/* Go back link */}
      <Link
        href={`/topic/${currentTopic?.slug?.current}`}
        className="hover:underline"
      >
        ← Back to posts
      </Link>

      {/* title */}
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-[1rem]">{post.title}</h1>
        <div>
          <p className="text-sm text-right">
            Published Date: {new Date(post?._createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-right">
            Updated Date: {new Date(post?._updatedAt).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Image */}
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl object-cover"
          width="1024"
          height="1024"
        />
      )}

      {/* Content */}
      <section className="prose">
        {Array.isArray(post.body) && (
          <PortableText
            value={post.body}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold my-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold my-3">{children}</h2>
                ),
                normal: ({ children }) => (
                  <p className="text-base my-2">{children}</p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc ml-6">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal ml-6">{children}</ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li className="my-1">{children}</li>,
                number: ({ children }) => <li className="my-1">{children}</li>,
              },
              marks: {
                link: ({ value, children }) => (
                  <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        )}
      </section>

      {/* Comment section */}
      <section className="mt-[10rem]">
        <CommentsSection postId={post._id} />
      </section>
    </main>
  );
}
