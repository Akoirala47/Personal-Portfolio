import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "portfolio_session";

/** Bytes for HS256, or null — never pass an empty key to jose (Edge throws). */
function getSecretBytes(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET?.trim();
  if (!secret) {
    return null;
  }
  const key = new TextEncoder().encode(secret);
  return key.byteLength > 0 ? key : null;
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (pathname.startsWith("/admin")) {
      const secret = getSecretBytes();
      if (!secret) {
        return redirectToLogin(request);
      }

      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (!token) {
        return redirectToLogin(request);
      }

      try {
        await jwtVerify(token, secret, { algorithms: ["HS256"] });
        return NextResponse.next();
      } catch {
        return redirectToLogin(request);
      }
    }

    return NextResponse.next();
  } catch {
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return redirectToLogin(request);
    }
    return NextResponse.next();
  }
}

export const runtime = "nodejs";

export const config = {
  matcher: ["/admin/:path*"],
};
