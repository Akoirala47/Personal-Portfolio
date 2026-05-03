import { supabase } from "@/lib/supabase";
import { Experience, Project, Post, ReadingItem } from "@/lib/types";
import PortfolioClient from "./PortfolioClient";

export const dynamic = "force-dynamic";

async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
  return data ?? [];
}

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  return data ?? [];
}

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return data ?? [];
}

async function getReadingItems(): Promise<ReadingItem[]> {
  const { data, error } = await supabase
    .from("reading_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching reading items:", error);
    return [];
  }
  return data ?? [];
}

export default async function Home() {
  const [experiences, projects, posts, readingItems] = await Promise.all([
    getExperiences(),
    getProjects(),
    getPosts(),
    getReadingItems(),
  ]);

  return (
    <PortfolioClient
      experiences={experiences}
      projects={projects}
      posts={posts}
      readingItems={readingItems}
    />
  );
}
