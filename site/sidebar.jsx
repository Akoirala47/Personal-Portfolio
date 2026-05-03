// Sidebar + small shared icons. Uses inline SVGs.

const Icon = ({ name, size = 20 }) => {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "feed":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M4 6h16M4 12h16M4 18h10"/></svg>);
    case "profile":
      return (<svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>);
    case "github":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>);
    case "linkedin":
      return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v8M8 7v.01M12 18v-5a2 2 0 0 1 4 0v5M12 13v5"/></svg>);
    case "mail":
      return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>);
    case "heart":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"/></svg>);
    case "heart-fill":
      return (<svg viewBox="0 0 24 24" style={{width:size,height:size}}><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" fill="currentColor"/></svg>);
    case "comment":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
    case "search":
      return (<svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>);
    case "download":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>);
    case "share":
      return (<svg viewBox="0 0 24 24" {...s}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"/></svg>);
    case "verified":
      return (<svg viewBox="0 0 24 24" style={{width:size,height:size}}><path d="m12 2 2.4 2 3.1-.4.6 3.1 2.4 2-2 2.4.4 3.1-3.1.6-2 2.4-2.4-2-3.1.4-.6-3.1-2.4-2 2-2.4-.4-3.1 3.1-.6z" fill="currentColor"/><path d="m8.5 12 2.5 2.5L15.5 9.5" stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case "pin":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M16 3 21 8M11.5 7.5 7 12l-3-1 8 8-1-3 4.5-4.5M14 14l5 5"/></svg>);
    case "ext":
      return (<svg viewBox="0 0 24 24" {...s}><path d="M14 4h6v6M20 4l-9 9M19 13v6H5V5h6"/></svg>);
    case "star":
      return (<svg viewBox="0 0 24 24" {...s}><path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.2L12 17.3l-5.6 2.9 1-6.2L3 9.6l6.3-.9z"/></svg>);
    case "calendar":
      return (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>);
    case "dot":
      return (<svg viewBox="0 0 24 24" style={{width:size,height:size}}><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>);
    default:
      return null;
  }
};

const Sidebar = ({ view, setView, t }) => {
  const items = [
    { id: "feed", label: "Feed", icon: "feed", badge: 3 },
    { id: "profile", label: "Profile", icon: "profile" },
    { id: "external", label: "GitHub", icon: "github", href: PROFILE.github },
    { id: "external", label: "LinkedIn", icon: "linkedin", href: PROFILE.linkedin },
    { id: "message", label: "Send message", icon: "mail" },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <span style={{color: "var(--accent-1)"}}>a</span>
          <span style={{color: "var(--accent-2)"}}>k</span>
          <span className="brand-dot"/>
        </div>
        <div className="brand-name">
          <div className="bn-top">aayush.koirala</div>
          <div className="bn-sub">v 4.0 · 2026</div>
        </div>
      </div>

      <div className="search">
        <Icon name="search" size={14}/>
        <input placeholder="Search posts, projects…" />
        <kbd>⌘K</kbd>
      </div>

      <nav className="nav">
        {items.map((it, i) => {
          const active = !it.href && view === it.id;
          const cls = "nav-item" + (active ? " active" : "");
          if (it.href) {
            return (
              <a key={i} className={cls} href={it.href} target="_blank" rel="noreferrer">
                <Icon name={it.icon} size={18}/>
                <span>{it.label}</span>
                <span className="nav-ext"><Icon name="ext" size={12}/></span>
              </a>
            );
          }
          return (
            <button key={i} className={cls} onClick={() => setView(it.id)}>
              <Icon name={it.icon} size={18}/>
              <span>{it.label}</span>
              {it.badge ? <span className="badge">{it.badge}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="side-section-label">Now playing</div>
      <div className="now-playing">
        <div className="np-bars" aria-hidden>
          <span/><span/><span/><span/><span/>
        </div>
        <div className="np-text">
          <div className="np-title">deep focus · neural ambient</div>
          <div className="np-sub">{PROFILE.location} · live</div>
        </div>
      </div>

      <div className="side-section-label">Currently reading</div>
      <div className="reading">
        <div className="reading-row">
          <span className="r-tag">paper</span>
          <span className="r-title">The Forward-Forward Algorithm</span>
        </div>
        <div className="reading-row">
          <span className="r-tag">paper</span>
          <span className="r-title">Cross-layer SAE features</span>
        </div>
        <div className="reading-row">
          <span className="r-tag">book</span>
          <span className="r-title">The Information — Gleick</span>
        </div>
      </div>

      <div className="footer-mini">
        <span>© {PROFILE.name.split(" ")[0].toLowerCase()} · 2026</span>
        <span className="dot-sep">·</span>
        <span>made by hand</span>
      </div>
    </aside>
  );
};

window.Icon = Icon;
window.Sidebar = Sidebar;
