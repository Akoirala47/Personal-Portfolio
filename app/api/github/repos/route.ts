import { NextResponse } from "next/server";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  private: boolean;
}

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/users/Akoirala47/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-admin",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub repos" },
        { status: response.status }
      );
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks and private repos, return relevant fields
    const filtered = repos
      .filter((r) => !r.fork && !r.private)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        updated_at: r.updated_at,
      }));

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub repos" },
      { status: 500 }
    );
  }
}
