export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  location: string;
  start_date: string;
  end_date: string;
  duration: string;
  summary: string;
  stack: string[];
  likes: number;
  display_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  color: string;
  stars: number;
  likes: number;
  github_url: string | null;
  pinned: boolean;
  display_order: number;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  read_time: string;
  likes: number;
  published_at: string;
  created_at: string;
}

export interface ReadingItem {
  id: string;
  name: string;
  url: string;
  display_order: number;
}
