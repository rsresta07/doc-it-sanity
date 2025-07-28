"use client";

import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";

interface Comment {
  _id: string;
  name: string;
  comment: string;
  _createdAt: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data.comments);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmitted = () => {
    fetchComments(); // refresh comments after new one added
  };

  return (
    <section className="mt-[10rem]">
      <h2 className="text-2xl font-bold mb-4">Write Comments</h2>
      <CommentForm postId={postId} onSuccess={handleCommentSubmitted} />

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments?.map((c) => (
          <li key={c._id} className="border rounded p-4">
            <p className="text-sm text-gray-600">
              {c.name} – {new Date(c._createdAt).toLocaleDateString()}
            </p>
            <p>{c.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
