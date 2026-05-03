import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const dateStr = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="post-page">
      <div className="post-page-inner">
        <Link href="/" className="post-page-back mono">
          ← back
        </Link>

        <div className="post-page-meta mono">
          <span>{dateStr}</span>
          <span className="dot">·</span>
          <span>{post.read_time}</span>
          <span className="dot">·</span>
          <span className="post-tag">blog</span>
        </div>

        <h1 className="post-page-title">{post.title}</h1>
        <p className="post-page-excerpt">{post.excerpt}</p>

        {post.content ? (
          <div className="post-page-content">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="post-page-empty mono">full post coming soon.</p>
        )}
      </div>
    </div>
  );
}
