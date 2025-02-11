'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import Image from 'next/image';
import commentPlaceholder from '@/public/comment-placeholder.jpg'

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentListProps {
  blogSlug: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});

export default function CommentList({ blogSlug }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const query = `*[_type == "comment" && blogSlug == $blogSlug && approved == true] | order(createdAt desc)`;
      const params = { blogSlug };
      const comments = await client.fetch<Comment[]>(query, params);
      setComments(comments);
    };

    fetchComments();
  }, [blogSlug]);

  return (
    <div className="space-y-6">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="p-4 border border-white rounded-lg bg-light/10 dark:bg-dark/20 shadow-sm shadow-gray-300 dark:shadow-black/50"
          > 
            <div className="flex items-center gap-2 mb-2">
              <Image src={commentPlaceholder} alt="comment" width={40} height={40} className='rounded-full'/>
              <span className="text-lg font-semibold text-dark dark:text-light">
                {comment.name}
              </span>
              <span className="text-sm text-dark/70 dark:text-light/70">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <p className="text-dark/80 dark:text-light/80">{comment.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-dark/70 dark:text-light/70">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}