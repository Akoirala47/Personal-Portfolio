-- Portfolio website schema
-- Run this in the Supabase SQL Editor for project nabxihkzoztyojnbfbcc

create table experiences (
  id uuid default gen_random_uuid() primary key,
  role text not null,
  company text not null,
  type text not null,
  location text not null,
  start_date text not null,
  end_date text not null,
  duration text not null,
  summary text not null,
  stack text[] not null default '{}',
  likes integer not null default 0,
  display_order integer not null default 0,
  created_at timestamptz default now()
);

create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  tag text not null,
  blurb text not null,
  color text not null default 'orange',
  stars integer not null default 0,
  likes integer not null default 0,
  github_url text,
  pinned boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz default now()
);

create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text not null,
  read_time text not null default '5 min read',
  likes integer not null default 0,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table experiences enable row level security;
alter table projects enable row level security;
alter table posts enable row level security;

create policy "public read experiences" on experiences for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read posts" on posts for select using (true);
