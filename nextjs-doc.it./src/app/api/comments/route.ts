import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const { name, email, comment, postId } = await req.json();

    const result = await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
    });

    console.log("Incoming comment:", { name, email, comment, postId });

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { success: false, error: (error as any).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");
  if (!postId)
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const comments = await client.fetch(
    `*[_type == "comment" && post._ref == $postId] | order(_createdAt desc)`,
    { postId }
  );

  return NextResponse.json({ comments });
}
