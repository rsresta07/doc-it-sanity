import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

export const topics = await client.fetch<SanityDocument[]>(`
  *[_type == "topic"]{title, slug}
`);

export const POSTS_BY_TOPIC_QUERY = `
  *[_type == "post" && topic->slug.current == $slug]
  | order(publishedAt desc){
    _id,
    title,
    slug,
    image,
    publishedAt,
    topic->{ slug }
  }
`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  topic->{
    title,
    slug
  }
}`;
