"use client";

import { useState } from "react";

/**
 * A form to submit comments to a post.
 *
 * @param {Object} props - The component props.
 * @prop {string} postId - The ID of the post to submit a comment to.
 * @prop {Function} [onSuccess] - A callback function to call when the comment
 * has been successfully submitted. This is used to notify the parent component to
 * refresh the list of comments.
 *
 * @returns {ReactElement} A React component that displays a form to submit a
 * comment to the given post.
 */
export default function CommentForm({
  postId,
  onSuccess,
}: {
  postId: string;
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  /**
   * Handles changes to the comment form by updating the form state with the
   * current values of the form fields.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The
   * change event.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handles the submission of the comment form by sending a POST request to the
   * `/api/comments` endpoint with the form data and the `postId` as a JSON payload.
   * After a successful response, resets the form state and calls the `onSuccess`
   * callback if provided.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ ...form, postId }),
    });
    setForm({ name: "", email: "", comment: "" });
    onSuccess?.(); // Notify parent to refresh comments
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-[5rem]">
      <div className="flex gap-4">
        <input
          name="name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        <input
          name="email"
          placeholder="Your email (Optional)"
          value={form.email}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>
      <textarea
        name="comment"
        required
        placeholder="Your comment"
        value={form.comment}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />
      <button
        type="submit"
        className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
