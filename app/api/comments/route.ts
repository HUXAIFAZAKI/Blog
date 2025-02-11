import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  const { name, email, comment, blogSlug, approved, createdAt } =
    await request.json();

  try {
    await client.create({
      _type: "comment",
      name,
      email,
      comment,
      blogSlug,
      approved,
      createdAt,
    });

    return NextResponse.json({ message: "Comment submitted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to submit comment", error },
      { status: 500 }
    );
  }
}
