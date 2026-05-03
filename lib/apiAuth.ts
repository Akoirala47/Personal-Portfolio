import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "./auth";

export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const valid = await verifySessionToken(token);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
