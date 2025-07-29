import { Metadata } from "next";
import TopicPage from "./topic/page";

export const metadata: Metadata = {
  title: "NewBlogSanity | Homepage",
  description: "Thoughts, tutorials, and tech insights from a curious mind.",
};

/**
 * The home page of the blog.
 *
 * @returns A React component that displays a list of topics.
 * Fetches topics from the Sanity client using the API defined in `all-api.ts`.
 * Renders a list of topics with links to each topic page.
 * Each topic is rendered with a title and a slug.
 */
export default async function IndexPage() {
  return <TopicPage />;
}
