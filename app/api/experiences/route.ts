import { NextRequest, NextResponse } from "next/server";
import { supabase, createAdminClient } from "@/lib/supabase";
import { requireAdmin } from "@/lib/apiAuth";

export async function GET() {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("experiences")
      .insert([body])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
