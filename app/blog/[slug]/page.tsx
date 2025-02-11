import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: BlogPageProps) {
  const query = `*[_type=="post" && slug.current=="${params.slug}"]{
    title,
    summary,
    image,
    content,
    author->{
      name,
      image,
      bio
    }
  }[0]`;
  const post = await client.fetch(query);

  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {post.title}
      </h1>

      {/* Featured Image */}
      <Image
        src={urlFor(post.image).url()}
        width={500}
        height={500}
        alt="Post Image"
        className="rounded"
        priority
      />

      {/* Blog Summary Section */}
      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>

      {/* Author Section (Image & Bio) */}
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        <Image
          src={urlFor(post.author.image).url()}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-dark dark:text-light">{post.author.name}</h3>
          <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
            {post.author.bio}
          </p>
        </div>
      </section>

      {/* Main Body of Blog */}
      <section className="text-lg leading-normal text-dark/80 dark:text-light/80">
        <PortableText value={post.content} />
      </section>

      {/* Comment Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">Comments</h2>
        <CommentList blogSlug={params.slug} />
        <CommentForm blogSlug={params.slug} />
      </section>
    </article>
  );
}

export const revalidate = 10;

export async function generateStaticParams() {
  const query = `*[_type=='post']{
    "slug": slug.current
  }`;
  const slugs = await client.fetch(query);
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}