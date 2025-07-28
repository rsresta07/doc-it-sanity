"use client";

import { useState } from "react";

export default function CommentForm({
  postId,
  onSuccess,
}: {
  postId: string;
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        className="border rounded w-full p-2"
      />
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
