"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { PROFILE } from "@/lib/profile";
import { Experience, Project, Post, ReadingItem } from "@/lib/types";
import Image from "next/image";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

interface IconProps {
  name: string;
  size?: number;
}

function Icon({ name, size = 20 }: IconProps) {
  const s = {
    width: size,
    height: size,
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "feed":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v8M8 7v.01M12 18v-5a2 2 0 0 1 4 0v5M12 13v5" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 7 9-7" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
        </svg>
      );
    case "heart-fill":
      return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }}>
          <path
            d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"
            fill="currentColor"
          />
        </svg>
      );
    case "comment":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "download":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
        </svg>
      );
    case "share":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
        </svg>
      );
    case "verified":
      return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }}>
          <path d="m12 2 2.4 2 3.1-.4.6 3.1 2.4 2-2 2.4.4 3.1-3.1.6-2 2.4-2.4-2-3.1.4-.6-3.1-2.4-2 2-2.4-.4-3.1 3.1-.6z" fill="currentColor" />
          <path d="m8.5 12 2.5 2.5L15.5 9.5" stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M16 3 21 8M11.5 7.5 7 12l-3-1 8 8-1-3 4.5-4.5M14 14l5 5" />
        </svg>
      );
    case "ext":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M14 4h6v6M20 4l-9 9M19 13v6H5V5h6" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.2L12 17.3l-5.6 2.9 1-6.2L3 9.6l6.3-.9z" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "dot":
      return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }}>
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface SidebarProps {
  view: string;
  setView: (view: string) => void;
  readingItems: ReadingItem[];
}

function Sidebar({ view, setView, readingItems }: SidebarProps) {
  const items = [
    { id: "feed", label: "Feed", icon: "feed", badge: null as number | null },
    { id: "profile", label: "Profile", icon: "profile", badge: null },
    { id: "external-gh", label: "GitHub", icon: "github", href: PROFILE.github, badge: null },
    { id: "external-li", label: "LinkedIn", icon: "linkedin", href: PROFILE.linkedin, badge: null },
    { id: "message", label: "Send message", icon: "mail", badge: null },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <span style={{ color: "var(--accent-1)" }}>a</span>
          <span style={{ color: "var(--accent-2)" }}>k</span>
          <span className="brand-dot" />
        </div>
        <div className="brand-name">
          <div className="bn-top">aayush.koirala</div>
          <div className="bn-sub">v 4.0 · 2026</div>
        </div>
      </div>

      <div className="search">
        <Icon name="search" size={14} />
        <input placeholder="Search posts, projects…" readOnly />
        <kbd>⌘K</kbd>
      </div>

      <nav className="nav">
        {items.map((it) => {
          if ("href" in it && it.href) {
            return (
              <a
                key={it.id}
                className="nav-item"
                href={it.href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={it.icon} size={18} />
                <span>{it.label}</span>
                <span className="nav-ext">
                  <Icon name="ext" size={12} />
                </span>
              </a>
            );
          }
          const active = view === it.id;
          return (
            <button
              key={it.id}
              className={"nav-item" + (active ? " active" : "")}
              onClick={() => setView(it.id)}
            >
              <Icon name={it.icon} size={18} />
              <span>{it.label}</span>
              {it.badge ? <span className="badge">{it.badge}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="side-section-label">Now playing</div>
      <div className="now-playing">
        <div className="np-bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="np-text">
          <div className="np-title">SWE II · Walmart Global Tech</div>
          <div className="np-sub">on shift · present</div>
        </div>
      </div>

      <div className="side-section-label">Currently reading</div>
      <div className="reading">
        {readingItems.length > 0 ? (
          readingItems.map((item) => (
            <div key={item.id} className="reading-row">
              <a className="r-title r-link" href={item.url} target="_blank" rel="noreferrer">
                {item.name} →
              </a>
            </div>
          ))
        ) : (
          <div className="reading-row">
            <span className="r-title mono" style={{ color: "var(--text-3)" }}>nothing right now</span>
          </div>
        )}
      </div>

      <div className="footer-mini">
        <span>© aayush · 2026</span>
        <span className="dot-sep">·</span>
        <span>made by hand</span>
      </div>
    </aside>
  );
}

// ─── Profile Header ───────────────────────────────────────────────────────────

interface ProfileHeaderProps {
  copyEmail: () => void;
  copiedEmail: boolean;
}

function ProfileHeader({ copyEmail, copiedEmail }: ProfileHeaderProps) {
  return (
    <header className="profile-header">
      <div className="ph-photo-wrap">
        <div className="pfp pfp-circle">
          <Image src={PROFILE.pfp} alt={PROFILE.name} width={168} height={168} style={{ objectFit: "cover" }} />
          <div className="pfp-ring" aria-hidden="true" />
        </div>
        <div className="status-dot" title="online" />
      </div>

      <div className="ph-meta">
        <div className="ph-name-row">
          <h1 className="ph-name">
            {PROFILE.name}
            <span className="verified" title="verified human">
              <Icon name="verified" size={20} />
            </span>
          </h1>
          <span className="ph-handle">@{PROFILE.handle}</span>
        </div>

        <div className="ph-role">{PROFILE.role}</div>

        <div className="ph-stats">
          <div className="stat">
            <b>142</b>
            <span>Following</span>
          </div>
          <div className="stat">
            <b>1,284</b>
            <span>Followers</span>
          </div>
          <div className="stat">
            <b>12.4K</b>
            <span>Likes</span>
          </div>
          <div className="stat-sep" />
          <div className="stat-meta">
            <Icon name="dot" size={8} /> Available for new work
          </div>
        </div>

        <div className="ph-bio">{PROFILE.bio}</div>

        <div className="ph-actions">
          <button className="btn btn-primary" onClick={copyEmail}>
            <Icon name="mail" size={15} />
            {copiedEmail ? "copied!" : PROFILE.email}
          </button>
          <a
            className="btn btn-ghost"
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="download" size={15} />
            Resume.pdf
          </a>
          <button className="btn btn-icon" title="Share">
            <Icon name="share" size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

interface TabsProps {
  tab: string;
  setTab: (tab: string) => void;
  counts: { exp: number; proj: number };
}

function Tabs({ tab, setTab, counts }: TabsProps) {
  const tabs = [
    { id: "experiences", label: "Experiences", count: counts.exp },
    { id: "projects", label: "Projects", count: counts.proj },
  ];
  return (
    <div className="tabs">
      {tabs.map((tt) => (
        <button
          key={tt.id}
          className={"tab" + (tab === tt.id ? " active" : "")}
          onClick={() => setTab(tt.id)}
        >
          <span>{tt.label}</span>
          <span className="tab-count">{tt.count}</span>
        </button>
      ))}
      <div className="tab-spacer" />
      <div className="tab-meta">
        <span className="mono">sort:</span> recent
      </div>
    </div>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────

interface ExperienceCardProps {
  exp: Experience;
  idx: number;
  initialLiked: boolean;
  onLike: () => Promise<{ liked: boolean; count: number } | null>;
}

function ExperienceCard({ exp, idx, initialLiked, onLike }: ExperienceCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(exp.likes);

  useEffect(() => { setLiked(initialLiked); }, [initialLiked]);

  const handleLike = async () => {
    const res = await onLike();
    if (res) { setLiked(res.liked); setCount(res.count); }
  };
  const isLive = exp.end_date === "Present";
  return (
    <article className="exp-card">
      <div className="exp-rail">
        <div className="exp-num mono">{String(idx + 1).padStart(2, "0")}</div>
        <div className="exp-line" />
      </div>
      <div className="exp-body">
        <div className="exp-row-1">
          <h3 className="exp-role">{exp.role}</h3>
          <span className={"exp-pill " + (isLive ? "live" : "")}>
            {isLive ? (
              <>
                <span className="live-dot" /> currently
              </>
            ) : (
              exp.duration
            )}
          </span>
        </div>
        <div className="exp-row-2">
          <span className="exp-co">{exp.company}</span>
          <span className="dot">·</span>
          <span className="mono dim">{exp.type}</span>
          <span className="dot">·</span>
          <span className="mono dim">{exp.location}</span>
        </div>
        <div className="exp-dates mono">
          <Icon name="calendar" size={12} />
          <span>
            {exp.start_date} → {exp.end_date}
          </span>
          <span className="dim">· {exp.duration}</span>
        </div>
        <p className="exp-summary">{exp.summary}</p>
        <div className="exp-stack">
          {exp.stack.map((s) => (
            <span key={s} className="chip mono">
              {s}
            </span>
          ))}
        </div>
        <div className="exp-foot">
          <button
            className={"like " + (liked ? "liked" : "")}
            onClick={handleLike}
          >
            <Icon name={liked ? "heart-fill" : "heart"} size={14} />
            <span className="mono">{count.toLocaleString()}</span>
          </button>
          <span className="exp-foot-meta mono">
            posted {exp.start_date.toLowerCase()}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Project Thumb ────────────────────────────────────────────────────────────

interface ProjectThumbProps {
  p: Project;
}

function ProjectThumb({ p }: ProjectThumbProps) {
  const isOrange = p.color === "orange";
  const c1 = isOrange ? "var(--accent-1)" : "var(--accent-2)";
  const c2 = isOrange ? "var(--accent-2)" : "var(--accent-1)";
  const seed = p.id.charCodeAt(p.id.length - 1) % 4;
  return (
    <div className="thumb">
      <svg
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id={`g-${p.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} stopOpacity="0.0" />
            <stop offset="1" stopColor={c1} stopOpacity="0.18" />
          </linearGradient>
          <pattern
            id={`pat-${p.id}`}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 14 L14 0"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="#0e0e0e" />
        <rect width="200" height="200" fill={`url(#pat-${p.id})`} />
        <rect width="200" height="200" fill={`url(#g-${p.id})`} />
        {seed === 0 && (
          <g>
            <circle
              cx="60"
              cy="100"
              r="46"
              fill="none"
              stroke={c1}
              strokeWidth="1.2"
              opacity="0.9"
            />
            <circle
              cx="120"
              cy="100"
              r="46"
              fill="none"
              stroke={c2}
              strokeWidth="1.2"
              opacity="0.9"
            />
          </g>
        )}
        {seed === 1 && (
          <g stroke={c1} strokeWidth="1" opacity="0.85">
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="20"
                y1={20 + i * 22}
                x2={20 + (i + 1) * 18}
                y2={20 + i * 22}
              />
            ))}
            <line x1="20" y1="178" x2="180" y2="178" stroke={c2} />
          </g>
        )}
        {seed === 2 && (
          <g>
            <path
              d="M20 150 Q 50 60, 100 110 T 180 70"
              fill="none"
              stroke={c1}
              strokeWidth="1.5"
            />
            <path
              d="M20 170 Q 60 120, 100 140 T 180 110"
              fill="none"
              stroke={c2}
              strokeWidth="1.5"
              opacity="0.7"
            />
            {Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={20 + i * 32} cy={150 - i * 8} r="2" fill={c1} />
            ))}
          </g>
        )}
        {seed === 3 && (
          <g>
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              fill="none"
              stroke={c1}
              strokeWidth="1.2"
            />
            <rect
              x="60"
              y="60"
              width="80"
              height="80"
              fill="none"
              stroke={c2}
              strokeWidth="1.2"
            />
            <rect x="80" y="80" width="40" height="40" fill={c1} opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  p: Project;
  initialLiked: boolean;
  onLike: () => Promise<{ liked: boolean; count: number } | null>;
}

function ProjectCard({ p, initialLiked, onLike }: ProjectCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(p.likes);

  useEffect(() => { setLiked(initialLiked); }, [initialLiked]);

  const handleLike = async () => {
    const res = await onLike();
    if (res) { setLiked(res.liked); setCount(res.count); }
  };

  return (
    <article className={"proj-card" + (p.pinned ? " pinned" : "")}>
      <ProjectThumb p={p} />
      <div className="proj-body">
        <div className="proj-top">
          <span className="proj-tag mono">{p.tag}</span>
          {p.pinned && (
            <span className="proj-pinned mono">
              <Icon name="pin" size={11} /> pinned
            </span>
          )}
        </div>
        <h3 className="proj-title mono">{p.title}</h3>
        <p className="proj-blurb">{p.blurb}</p>
        <div className="proj-foot">
          <button
            className={"like " + (liked ? "liked" : "")}
            onClick={handleLike}
          >
            <Icon name={liked ? "heart-fill" : "heart"} size={13} />
            <span className="mono">{count.toLocaleString()}</span>
          </button>
          <span className="proj-stars mono">
            <Icon name="star" size={13} /> {p.stars.toLocaleString()}
          </span>
          <span className="proj-spacer" />
          {p.github_url ? (
            <a
              className="proj-open mono"
              href={p.github_url}
              target="_blank"
              rel="noreferrer"
            >
              open ↗
            </a>
          ) : (
            <span
              className="proj-open mono"
              style={{ opacity: 0.35, cursor: "default" }}
            >
              open ↗
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

interface PostComment {
  author: string;
  text: string;
  time: string;
  likes: number;
  author_self?: boolean;
  fresh?: boolean;
}

interface PostCardProps {
  post: Post;
  initialLiked: boolean;
  onLike: () => Promise<{ liked: boolean; count: number } | null>;
}

function PostCard({ post, initialLiked, onLike }: PostCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  useEffect(() => { setLiked(initialLiked); }, [initialLiked]);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [draft, setDraft] = useState("");
  const [draftFocus, setDraftFocus] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments((c) => [
      ...c,
      { author: "@you", text: draft.trim(), time: "now", likes: 0, fresh: true },
    ]);
    setDraft("");
  };

  const dateStr = new Date(post.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="post">
      <div className="post-meta mono">
        <span>{dateStr}</span>
        <span className="dot">·</span>
        <span>{post.read_time}</span>
        <span className="dot">·</span>
        <span className="post-tag">blog</span>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>

      <div className="post-foot">
        <button
          className={"like " + (liked ? "liked" : "")}
          onClick={async () => {
            const res = await onLike();
            if (res) { setLiked(res.liked); setLikeCount(res.count); }
          }}
        >
          <Icon name={liked ? "heart-fill" : "heart"} size={14} />
          <span className="mono">{likeCount.toLocaleString()}</span>
        </button>
        <button className="like" onClick={() => setOpen((o) => !o)}>
          <Icon name="comment" size={14} />
          <span className="mono">{comments.length}</span>
        </button>
        <button className="like">
          <Icon name="share" size={14} />
          <span className="mono">share</span>
        </button>
        <span className="post-foot-spacer" />
        <Link className="post-readmore mono" href={`/posts/${post.id}`}>
          read full →
        </Link>
      </div>

      {open && (
        <div className="comments">
          <div className="comments-head mono">
            {comments.length} comment{comments.length === 1 ? "" : "s"}
          </div>
          {comments.map((c, i) => (
            <div
              key={i}
              className={
                "comment" +
                (c.author_self ? " self" : "") +
                (c.fresh ? " fresh" : "")
              }
            >
              <div
                className="c-avatar"
                style={{
                  background: c.author_self
                    ? "linear-gradient(135deg, var(--accent-1), var(--accent-2))"
                    : `hsl(${(c.author.charCodeAt(1) * 23) % 360} 30% 25%)`,
                }}
              >
                {c.author[1]?.toUpperCase() || "?"}
              </div>
              <div className="c-body">
                <div className="c-head">
                  <span className="c-author mono">
                    {c.author}
                    {c.author_self && (
                      <span className="c-self-tag">author</span>
                    )}
                  </span>
                  <span className="c-time mono">{c.time}</span>
                </div>
                <div className="c-text">{c.text}</div>
                <div className="c-actions mono">
                  <span>
                    <Icon name="heart" size={11} /> {c.likes}
                  </span>
                  <span>reply</span>
                </div>
              </div>
            </div>
          ))}
          <form
            className={"c-compose" + (draftFocus ? " focused" : "")}
            onSubmit={submit}
          >
            <div className="c-avatar c-avatar-you">y</div>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={() => setDraftFocus(true)}
              onBlur={() => setDraftFocus(false)}
              placeholder="add a comment…"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="c-submit mono"
            >
              post
            </button>
          </form>
        </div>
      )}
    </article>
  );
}

// ─── Feed View ────────────────────────────────────────────────────────────────

function FeedView({
  posts,
  likedIds,
  onLike,
}: {
  posts: Post[];
  likedIds: Set<string>;
  onLike: (id: string) => Promise<{ liked: boolean; count: number } | null>;
}) {
  return (
    <div className="feed-wrap">
      <div className="feed-head">
        <h2 className="section-title">Feed</h2>
        <div className="feed-sub">
          papers, agentic LLM rambles, and post-deploy regrets.
        </div>
      </div>
      <div className="post-list">
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            initialLiked={likedIds.has(p.id)}
            onLike={() => onLike(p.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Message View ─────────────────────────────────────────────────────────────

function MessageView() {
  const [from, setFrom] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject || "Hello from your portfolio")}&body=${encodeURIComponent(body + "\n\n— " + (name || from || "anonymous"))}`;
    window.location.href = url;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="msg-wrap">
      <div className="feed-head">
        <h2 className="section-title">Send a message</h2>
        <div className="feed-sub">
          writes straight to{" "}
          <span className="mono">{PROFILE.email}</span>. I read everything.
        </div>
      </div>
      <form className="msg-form" onSubmit={send}>
        <div className="msg-row">
          <label className="msg-label mono">from</label>
          <input
            className="msg-input"
            type="email"
            required
            placeholder="you@somewhere.com"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="msg-row">
          <label className="msg-label mono">name</label>
          <input
            className="msg-input"
            placeholder="what should I call you"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="msg-row">
          <label className="msg-label mono">subject</label>
          <input
            className="msg-input"
            required
            placeholder="working on something cool?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="msg-row msg-row-tall">
          <label className="msg-label mono">message</label>
          <textarea
            className="msg-input msg-textarea"
            required
            rows={8}
            placeholder="say what you want. links welcome."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="msg-foot">
          <span className="mono dim">↵ to send · esc to cancel</span>
          <button type="submit" className="btn btn-primary">
            {sent ? "✓ launching mail…" : "send message →"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Portfolio Client Root ────────────────────────────────────────────────────

interface PortfolioClientProps {
  experiences: Experience[];
  projects: Project[];
  posts: Post[];
  readingItems: ReadingItem[];
}

export default function PortfolioClient({
  experiences,
  projects,
  posts,
  readingItems,
}: PortfolioClientProps) {
  const [view, setView] = useState("profile");
  const [tab, setTab] = useState("experiences");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<string, Set<string>>>({
    post: new Set(),
    project: new Set(),
    experience: new Set(),
  });

  useEffect(() => {
    fetch("/api/likes")
      .then((r) => r.json())
      .then((data) => {
        setLikedIds({
          post: new Set(data.post ?? []),
          project: new Set(data.project ?? []),
          experience: new Set(data.experience ?? []),
        });
      })
      .catch(() => {});
  }, []);

  const toggleLike = useCallback(
    async (entity_type: string, entity_id: string): Promise<{ liked: boolean; count: number } | null> => {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity_type, entity_id }),
      });
      if (!res.ok) return null;
      const { liked, count } = await res.json();
      setLikedIds((prev) => {
        const next = new Set(prev[entity_type]);
        liked ? next.add(entity_id) : next.delete(entity_id);
        return { ...prev, [entity_type]: next };
      });
      return { liked, count };
    },
    []
  );

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1600);
  };

  return (
    <div className="app">
      <Sidebar view={view} setView={setView} readingItems={readingItems} />
      <main className="main">
        {view === "profile" && (
          <>
            <ProfileHeader copyEmail={copyEmail} copiedEmail={copiedEmail} />
            <Tabs
              tab={tab}
              setTab={setTab}
              counts={{ exp: experiences.length, proj: projects.length }}
            />
            {tab === "experiences" ? (
              <div className="exp-list">
                {experiences.map((e, i) => (
                  <ExperienceCard
                    key={e.id}
                    exp={e}
                    idx={i}
                    initialLiked={likedIds.experience.has(e.id)}
                    onLike={() => toggleLike("experience", e.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="proj-grid">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    p={p}
                    initialLiked={likedIds.project.has(p.id)}
                    onLike={() => toggleLike("project", p.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {view === "feed" && (
          <FeedView
            posts={posts}
            likedIds={likedIds.post}
            onLike={(id) => toggleLike("post", id)}
          />
        )}
        {view === "message" && <MessageView />}
      </main>

      <div className="corner-pill">
        <span className="live-dot" /> live · v4.0
      </div>
    </div>
  );
}
