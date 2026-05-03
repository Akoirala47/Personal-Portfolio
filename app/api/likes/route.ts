import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, supabase } from "@/lib/supabase";

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// GET /api/likes?entity_type=post,project,experience
// Returns which entity_ids the caller's IP has already liked
export async function GET(request: NextRequest) {
  const ip = getIp(request);
  const { data, error } = await supabase
    .from("likes")
    .select("entity_type, entity_id")
    .eq("ip_address", ip);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: Record<string, string[]> = { post: [], project: [], experience: [] };
  for (const row of data ?? []) {
    if (result[row.entity_type]) result[row.entity_type].push(row.entity_id);
  }
  return NextResponse.json(result);
}

// POST /api/likes  { entity_type, entity_id }
// Toggles like for caller's IP; updates the count on the parent table
export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const { entity_type, entity_id } = await request.json();

  if (!entity_type || !entity_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const adminClient = createAdminClient();

  // Check if already liked
  const { data: existing } = await adminClient
    .from("likes")
    .select("id")
    .eq("entity_type", entity_type)
    .eq("entity_id", entity_id)
    .eq("ip_address", ip)
    .maybeSingle();

  const tableMap: Record<string, string> = {
    post: "posts",
    project: "projects",
    experience: "experiences",
  };
  const table = tableMap[entity_type];
  if (!table) return NextResponse.json({ error: "Invalid entity_type" }, { status: 400 });

  const liked = !existing;
  const delta = liked ? 1 : -1;

  if (liked) {
    await adminClient.from("likes").insert({ entity_type, entity_id, ip_address: ip });
  } else {
    await adminClient.from("likes").delete()
      .eq("entity_type", entity_type)
      .eq("entity_id", entity_id)
      .eq("ip_address", ip);
  }

  // Increment / decrement the cached count
  const { data: current } = await adminClient
    .from(table)
    .select("likes")
    .eq("id", entity_id)
    .single();

  const newCount = Math.max(0, (current?.likes ?? 0) + delta);
  await adminClient.from(table).update({ likes: newCount }).eq("id", entity_id);

  return NextResponse.json({ liked, count: newCount });
}
