"use client";

import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";

interface Comment {
  _id: string;
  name: string;
  comment: string;
  _createdAt: string;
}

/**
 * A component that displays a section of comments for a given post.
 *
 * This component fetches the comments for the given `postId` and renders them
 * in a list. It also renders a `CommentForm` that allows users to write new
 * comments. When a new comment is submitted, the component fetches the latest
 * comments again and renders them.
 *
 * @param {string} postId - The ID of the post to fetch comments for.
 * @returns {ReactElement} A React component that displays a list of comments and
 * a form to write new comments.
 */
export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  /**
   * Fetches comments for the given postId from the API and updates the state.
   *
   * This function sends a GET request to the `/api/comments` endpoint with the
   * specified `postId` as a query parameter. The response is expected to contain
   * a list of comments, which is then used to update the `comments` state.
   */
  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data.comments);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  /**
   * Handles the event when a comment is submitted by refreshing the comments list.
   *
   * This function is called as a callback when a new comment is successfully
   * submitted via the `CommentForm`. It triggers a refresh of the comments
   * by calling `fetchComments`, ensuring the newly added comment is displayed.
   */
  const handleCommentSubmitted = () => {
    fetchComments(); // refresh comments after new one added
  };

  return (
    <section className="pt-[10rem] pb-[5rem]">
      <h2 className="text-2xl font-bold mb-4">Write Comments</h2>
      <CommentForm postId={postId} onSuccess={handleCommentSubmitted} />

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul className="space-y-[1rem]">
        {comments?.map((c) => (
          <li key={c._id} className="border rounded-lg p-[1rem]">
            <p className="text-sm text-gray-600">
              {c.name} - {new Date(c._createdAt).toLocaleDateString()}
            </p>
            <p>{c.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
