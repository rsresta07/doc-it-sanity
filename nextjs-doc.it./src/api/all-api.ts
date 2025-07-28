import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

/**
 * fetch topics with title and their slug
 */
export const topics = await client.fetch<SanityDocument[]>(`
  *[_type == "topic"]{title, slug}
`);

/**
 * fetch post based topics to list post
 */
export const POSTS_BY_TOPIC_QUERY = `
  *[_type == "post" && topic->slug.current == $slug]
  | order(publishedAt desc){
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    image,
    topic->{ slug }
  }
`;

/**
 * fetch post details
 */
export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  _createdAt,
  _updatedAt,
  slug,
  image,
  body,
  topic->{
    title,
    slug
  }
}`;

