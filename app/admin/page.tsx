"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Experience, Project, Post, ReadingItem } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stars: number;
  language: string | null;
  updated_at: string;
}

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "posts", label: "Posts" },
  { id: "experiences", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "sidebar", label: "Sidebar" },
] as const;

type NavTab = (typeof NAV_ITEMS)[number]["id"];

// ─── Posts Section ────────────────────────────────────────────────────────────

interface PostsTabProps {
  posts: Post[];
  onRefresh: () => void;
}

interface PostFormState {
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
}

const EMPTY_POST: PostFormState = { title: "", excerpt: "", content: "", read_time: "5 min read" };

function PostsTab({ posts, onRefresh }: PostsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormState>(EMPTY_POST);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setEditId(null);
    setForm(EMPTY_POST);
    setShowForm(true);
  };

  const openEdit = (post: Post) => {
    setEditId(post.id);
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content ?? "", read_time: post.read_time });
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_POST);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editId ? `/api/posts/${editId}` : "/api/posts";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        cancel();
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Posts</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>
          + New post
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={save}>
          <div className="admin-form-title">
            {editId ? "Edit post" : "New post"}
          </div>
          <div className="form-field">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Excerpt</label>
            <textarea
              className="form-input form-textarea"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Content (optional — shown on post page)</label>
            <textarea
              className="form-input form-textarea"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10}
              placeholder="Write the full post here. Separate paragraphs with a blank line."
            />
          </div>
          <div className="form-field" style={{ maxWidth: 200 }}>
            <label className="form-label">Read time</label>
            <input
              className="form-input"
              value={form.read_time}
              onChange={(e) => setForm({ ...form, read_time: e.target.value })}
              placeholder="5 min read"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? "Saving…" : editId ? "Save changes" : "Create post"}
            </button>
            <button type="button" className="admin-btn" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {posts.length === 0 && (
          <div style={{ color: "var(--text-3)", fontSize: 13, padding: "12px 0" }}>
            No posts yet.
          </div>
        )}
        {posts.map((post) => (
          <div key={post.id} className="admin-list-item">
            <div className="admin-list-item-main">
              <div className="admin-list-item-title">{post.title}</div>
              <div className="admin-list-item-sub">
                {new Date(post.published_at).toLocaleDateString()} · {post.read_time}
              </div>
            </div>
            <div className="admin-actions">
              <button className="admin-btn" onClick={() => openEdit(post)}>
                Edit
              </button>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Experiences Section ──────────────────────────────────────────────────────

interface ExpFormState {
  role: string;
  company: string;
  type: string;
  location: string;
  start_date: string;
  end_date: string;
  duration: string;
  summary: string;
  stack: string;
  display_order: number;
}

const EMPTY_EXP: ExpFormState = {
  role: "",
  company: "",
  type: "Internship",
  location: "",
  start_date: "",
  end_date: "",
  duration: "",
  summary: "",
  stack: "",
  display_order: 0,
};

interface ExperiencesTabProps {
  experiences: Experience[];
  onRefresh: () => void;
}

function ExperiencesTab({ experiences, onRefresh }: ExperiencesTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ExpFormState>(EMPTY_EXP);
  const [saving, setSaving] = useState(false);

  const expToForm = (exp: Experience): ExpFormState => ({
    role: exp.role,
    company: exp.company,
    type: exp.type,
    location: exp.location,
    start_date: exp.start_date,
    end_date: exp.end_date,
    duration: exp.duration,
    summary: exp.summary,
    stack: exp.stack.join(", "),
    display_order: exp.display_order,
  });

  const openNew = () => {
    setEditId(null);
    setForm(EMPTY_EXP);
    setShowForm(true);
  };

  const openEdit = (exp: Experience) => {
    setEditId(exp.id);
    setForm(expToForm(exp));
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_EXP);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const url = editId ? `/api/experiences/${editId}` : "/api/experiences";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        cancel();
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteExp = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Experiences</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>
          + Add experience
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={save}>
          <div className="admin-form-title">
            {editId ? "Edit experience" : "Add experience"}
          </div>
          <div className="form-row form-row-2">
            <div className="form-field">
              <label className="form-label">Role</label>
              <input
                className="form-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Company</label>
              <input
                className="form-input"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-row form-row-3">
            <div className="form-field">
              <label className="form-label">Type</label>
              <input
                className="form-input"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Location</label>
              <input
                className="form-input"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Duration</label>
              <input
                className="form-input"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="4 mo"
                required
              />
            </div>
          </div>
          <div className="form-row form-row-2">
            <div className="form-field">
              <label className="form-label">Start date</label>
              <input
                className="form-input"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                placeholder="May 2025"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">End date</label>
              <input
                className="form-input"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                placeholder="Aug 2025"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Summary</label>
            <textarea
              className="form-input form-textarea"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label">Stack (comma-separated)</label>
            <input
              className="form-input"
              value={form.stack}
              onChange={(e) => setForm({ ...form, stack: e.target.value })}
              placeholder="Next.js, TypeScript, PostgreSQL"
            />
          </div>
          <div className="form-field" style={{ maxWidth: 120 }}>
            <label className="form-label">Display order</label>
            <input
              className="form-input"
              type="number"
              value={form.display_order}
              onChange={(e) =>
                setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
              }
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? "Saving…" : editId ? "Save changes" : "Add experience"}
            </button>
            <button type="button" className="admin-btn" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {experiences.length === 0 && (
          <div style={{ color: "var(--text-3)", fontSize: 13, padding: "12px 0" }}>
            No experiences yet.
          </div>
        )}
        {experiences.map((exp) => (
          <div key={exp.id} className="admin-list-item">
            <div className="admin-list-item-main">
              <div className="admin-list-item-title">
                {exp.role} @ {exp.company}
              </div>
              <div className="admin-list-item-sub">
                {exp.start_date} → {exp.end_date} · {exp.location}
              </div>
            </div>
            <div className="admin-actions">
              <button className="admin-btn" onClick={() => openEdit(exp)}>
                Edit
              </button>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => deleteExp(exp.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

interface ProjFormState {
  title: string;
  tag: string;
  blurb: string;
  color: string;
  stars: number;
  github_url: string;
  pinned: boolean;
  display_order: number;
}

const EMPTY_PROJ: ProjFormState = {
  title: "",
  tag: "",
  blurb: "",
  color: "orange",
  stars: 0,
  github_url: "",
  pinned: false,
  display_order: 0,
};

interface RepoImportFormState {
  tag: string;
  blurb: string;
  color: string;
  pinned: boolean;
}

interface ProjectsTabProps {
  projects: Project[];
  onRefresh: () => void;
}

function ProjectsTab({ projects, onRefresh }: ProjectsTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjFormState>(EMPTY_PROJ);
  const [saving, setSaving] = useState(false);

  // GitHub import state
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [repoSearch, setRepoSearch] = useState("");
  const [importingRepo, setImportingRepo] = useState<string | null>(null);
  const [repoForms, setRepoForms] = useState<Record<string, RepoImportFormState>>({});

  const projToForm = (p: Project): ProjFormState => ({
    title: p.title,
    tag: p.tag,
    blurb: p.blurb,
    color: p.color,
    stars: p.stars,
    github_url: p.github_url ?? "",
    pinned: p.pinned,
    display_order: p.display_order,
  });

  const openNew = () => {
    setEditId(null);
    setForm(EMPTY_PROJ);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditId(p.id);
    setForm(projToForm(p));
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_PROJ);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        github_url: form.github_url || null,
      };
      const url = editId ? `/api/projects/${editId}` : "/api/projects";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        cancel();
        onRefresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteProj = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    onRefresh();
  };

  const loadRepos = async () => {
    setReposLoading(true);
    try {
      const res = await fetch("/api/github/repos");
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      }
    } finally {
      setReposLoading(false);
    }
  };

  const isAlreadyAdded = (htmlUrl: string) =>
    projects.some((p) => p.github_url === htmlUrl);

  const toggleRepoForm = (repoName: string, defaultBlurb: string) => {
    if (importingRepo === repoName) {
      setImportingRepo(null);
      return;
    }
    setImportingRepo(repoName);
    if (!repoForms[repoName]) {
      setRepoForms((prev) => ({
        ...prev,
        [repoName]: { tag: "", blurb: defaultBlurb || "", color: "orange", pinned: false },
      }));
    }
  };

  const saveRepoImport = async (repo: GitHubRepo) => {
    const rf = repoForms[repo.name];
    if (!rf) return;
    const payload = {
      title: repo.name,
      tag: rf.tag || repo.language || "open source",
      blurb: rf.blurb || repo.description || "",
      color: rf.color,
      stars: repo.stars,
      github_url: repo.html_url,
      pinned: rf.pinned,
      display_order: projects.length,
      likes: 0,
    };
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setImportingRepo(null);
      onRefresh();
    }
  };

  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
      (r.description ?? "").toLowerCase().includes(repoSearch.toLowerCase())
  );

  return (
    <div>
      <div className="admin-section-header">
        <h2 className="admin-section-title">Projects</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>
          + Add project
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={save}>
          <div className="admin-form-title">
            {editId ? "Edit project" : "New project"}
          </div>
          <div className="form-row form-row-2">
            <div className="form-field">
              <label className="form-label">Title</label>
              <input
                className="form-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Tag</label>
              <input
                className="form-input"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                placeholder="macOS · AI"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Blurb</label>
            <textarea
              className="form-input form-textarea"
              value={form.blurb}
              onChange={(e) => setForm({ ...form, blurb: e.target.value })}
              required
            />
          </div>
          <div className="form-row form-row-3">
            <div className="form-field">
              <label className="form-label">Color</label>
              <select
                className="form-input"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
              >
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Stars</label>
              <input
                className="form-input"
                type="number"
                value={form.stars}
                onChange={(e) =>
                  setForm({ ...form, stars: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="form-field">
              <label className="form-label">Display order</label>
              <input
                className="form-input"
                type="number"
                value={form.display_order}
                onChange={(e) =>
                  setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">GitHub URL (optional)</label>
            <input
              className="form-input"
              value={form.github_url}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>
          <div className="form-field">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontSize: 13,
                color: "var(--text-2)",
              }}
            >
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
              />
              Pinned
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? "Saving…" : editId ? "Save changes" : "Add project"}
            </button>
            <button type="button" className="admin-btn" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-list">
        {projects.length === 0 && (
          <div style={{ color: "var(--text-3)", fontSize: 13, padding: "12px 0" }}>
            No projects yet.
          </div>
        )}
        {projects.map((p) => (
          <div key={p.id} className="admin-list-item">
            <div className="admin-list-item-main">
              <div className="admin-list-item-title">
                {p.title}
                {p.pinned && (
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 10,
                      color: "var(--accent-1)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    pinned
                  </span>
                )}
              </div>
              <div className="admin-list-item-sub">
                {p.tag} · ★ {p.stars}
              </div>
            </div>
            <div className="admin-actions">
              <button className="admin-btn" onClick={() => openEdit(p)}>
                Edit
              </button>
              <button
                className="admin-btn admin-btn-danger"
                onClick={() => deleteProj(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Import */}
      <div className="github-import-section">
        <h3 className="github-import-title">Import from GitHub</h3>
        {repos.length === 0 ? (
          <button
            className="admin-btn admin-btn-primary"
            onClick={loadRepos}
            disabled={reposLoading}
          >
            {reposLoading ? "Loading…" : "Load repos"}
          </button>
        ) : (
          <>
            <input
              className="form-input search-input"
              placeholder="Search repos…"
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
            />
            <div className="github-repo-list">
              {filteredRepos.map((repo) => {
                const added = isAlreadyAdded(repo.html_url);
                const importing = importingRepo === repo.name;
                const rf = repoForms[repo.name];

                return (
                  <div key={repo.id}>
                    <div className="github-repo-item">
                      <div className="github-repo-item-main">
                        <div className="github-repo-name">{repo.name}</div>
                        {repo.description && (
                          <div className="github-repo-desc">
                            {repo.description}
                          </div>
                        )}
                        <div className="github-repo-meta">
                          <span>★ {repo.stars}</span>
                          {repo.language && <span>{repo.language}</span>}
                        </div>
                      </div>
                      <div>
                        {added ? (
                          <span className="already-added-badge">
                            Already added
                          </span>
                        ) : (
                          <button
                            className={`admin-btn ${importing ? "" : "admin-btn-primary"}`}
                            onClick={() =>
                              toggleRepoForm(repo.name, repo.description ?? "")
                            }
                          >
                            {importing ? "Cancel" : "Add"}
                          </button>
                        )}
                      </div>
                    </div>

                    {importing && rf && (
                      <div className="repo-inline-form">
                        <div className="form-field">
                          <label className="form-label">Tag</label>
                          <input
                            className="form-input"
                            value={rf.tag}
                            onChange={(e) =>
                              setRepoForms((prev) => ({
                                ...prev,
                                [repo.name]: { ...prev[repo.name], tag: e.target.value },
                              }))
                            }
                            placeholder={repo.language || "open source"}
                          />
                        </div>
                        <div className="form-field">
                          <label className="form-label">Blurb</label>
                          <textarea
                            className="form-input form-textarea"
                            value={rf.blurb}
                            onChange={(e) =>
                              setRepoForms((prev) => ({
                                ...prev,
                                [repo.name]: { ...prev[repo.name], blurb: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div className="repo-inline-form-row">
                          <label>Color:</label>
                          <div className="color-radio">
                            {(["orange", "purple"] as const).map((c) => (
                              <label key={c}>
                                <input
                                  type="radio"
                                  name={`color-${repo.name}`}
                                  value={c}
                                  checked={rf.color === c}
                                  onChange={() =>
                                    setRepoForms((prev) => ({
                                      ...prev,
                                      [repo.name]: { ...prev[repo.name], color: c },
                                    }))
                                  }
                                />
                                {c}
                              </label>
                            ))}
                          </div>
                          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={rf.pinned}
                              onChange={(e) =>
                                setRepoForms((prev) => ({
                                  ...prev,
                                  [repo.name]: { ...prev[repo.name], pinned: e.target.checked },
                                }))
                              }
                            />
                            Pinned
                          </label>
                        </div>
                        <div className="form-actions">
                          <button
                            className="admin-btn admin-btn-primary"
                            onClick={() => saveRepoImport(repo)}
                          >
                            Save
                          </button>
                          <button
                            className="admin-btn"
                            onClick={() => setImportingRepo(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar Tab ─────────────────────────────────────────────────────────────

interface SidebarTabProps {
  readingItems: ReadingItem[];
  onRefresh: () => void;
}

const EMPTY_READING = { tag: "", title: "" };

function SidebarTab({ readingItems, onRefresh }: SidebarTabProps) {
  const [form, setForm] = useState(EMPTY_READING);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openEdit = (item: ReadingItem) => {
    setEditId(item.id);
    setForm({ tag: item.tag, title: item.title });
  };

  const reset = () => {
    setEditId(null);
    setForm(EMPTY_READING);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await fetch(`/api/reading/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, display_order: readingItems.length }),
        });
      }
      reset();
      onRefresh();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/reading/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className="admin-tab">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Currently reading</h2>
        <p style={{ fontSize: 12, color: "var(--text-3)", margin: 0 }}>
          Shown in the sidebar of the portfolio
        </p>
      </div>

      <form onSubmit={handleSave} className="admin-form">
        <div className="admin-form-row">
          <input
            className="admin-input"
            placeholder="tag (e.g. paper, book, article)"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : editId ? "Update" : "Add item"}
          </button>
          {editId && (
            <button className="admin-btn" type="button" onClick={reset}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        {readingItems.map((item) => (
          <div key={item.id} className="admin-list-item">
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="post-tag">{item.tag}</span>
              <span>{item.title}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="admin-btn admin-btn-sm" onClick={() => openEdit(item)}>
                Edit
              </button>
              <button
                className="admin-btn admin-btn-sm admin-btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {readingItems.length === 0 && (
          <p style={{ color: "var(--text-3)", fontSize: 13 }}>No items yet.</p>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NavTab>("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [readingItems, setReadingItems] = useState<ReadingItem[]>([]);

  const fetchAll = async () => {
    const [postsRes, expRes, projRes, readingRes] = await Promise.all([
      fetch("/api/posts"),
      fetch("/api/experiences"),
      fetch("/api/projects"),
      fetch("/api/reading"),
    ]);
    if (postsRes.ok) setPosts(await postsRes.json());
    if (expRes.ok) setExperiences(await expRes.json());
    if (projRes.ok) setProjects(await projRes.json());
    if (readingRes.ok) setReadingItems(await readingRes.json());
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>
          <span>ak</span> / admin
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/"
            style={{ fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}
          >
            ← view site
          </a>
          <button className="admin-btn admin-btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                "admin-nav-item" + (activeTab === item.id ? " active" : "")
              }
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-content">
          {activeTab === "posts" && (
            <PostsTab posts={posts} onRefresh={fetchAll} />
          )}
          {activeTab === "experiences" && (
            <ExperiencesTab experiences={experiences} onRefresh={fetchAll} />
          )}
          {activeTab === "projects" && (
            <ProjectsTab projects={projects} onRefresh={fetchAll} />
          )}
          {activeTab === "sidebar" && (
            <SidebarTab readingItems={readingItems} onRefresh={fetchAll} />
          )}
        </div>
      </div>
    </div>
  );
}
