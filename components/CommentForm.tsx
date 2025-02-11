'use client';

import { useState } from 'react';

interface CommentFormProps {
  blogSlug: string;
}

export default function CommentForm({ blogSlug }: CommentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        comment,
        blogSlug,
        approved: false, // Comments need approval
        createdAt: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <p className="text-center text-lg text-dark dark:text-light">
        Thank you for your comment! It will be reviewed and posted soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="name" className="text-dark dark:text-light font-semibold">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-white rounded bg-transparent text-dark dark:text-light placeholder:text-dark/50 dark:placeholder:text-light/50 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Your name"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-dark dark:text-light font-semibold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-white rounded bg-transparent text-dark dark:text-light placeholder:text-dark/50 dark:placeholder:text-light/50 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Your email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="text-dark dark:text-light font-semibold">
          Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="px-4 py-2 border border-white rounded bg-transparent text-dark dark:text-light placeholder:text-dark/50 dark:placeholder:text-light/50 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Write your comment..."
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 border border-white rounded text-dark dark:text-light font-semibold hover:bg-white hover:text-black transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
}