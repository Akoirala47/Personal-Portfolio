// Profile header + Experiences tab + Projects tab.

const ProfileHeader = ({ t, copyEmail, copiedEmail }) => {
  const photoShape = t.photoShape || "circle";
  const photoCls = "pfp pfp-" + photoShape;
  return (
    <header className="profile-header">
      <div className="ph-photo-wrap">
        <div className={photoCls}>
          <img src={PROFILE.pfp} alt={PROFILE.name}/>
          <div className="pfp-ring" aria-hidden/>
        </div>
        <div className="status-dot" title="online"/>
      </div>

      <div className="ph-meta">
        <div className="ph-name-row">
          <h1 className="ph-name">
            {PROFILE.name}
            <span className="verified" title="verified human"><Icon name="verified" size={20}/></span>
          </h1>
          <span className="ph-handle">@{PROFILE.handle}</span>
        </div>

        <div className="ph-role">{PROFILE.role}</div>

        <div className="ph-stats">
          <div className="stat"><b>{PROFILE.stats.following}</b><span>Following</span></div>
          <div className="stat"><b>{PROFILE.stats.followers.toLocaleString()}</b><span>Followers</span></div>
          <div className="stat"><b>{PROFILE.stats.likes}</b><span>Likes</span></div>
          <div className="stat-sep"/>
          <div className="stat-meta">
            <Icon name="dot" size={8}/> Available for new work
          </div>
        </div>

        <div className="ph-bio">{PROFILE.bio}</div>

        <div className="ph-actions">
          <button className="btn btn-primary" onClick={copyEmail}>
            <Icon name="mail" size={15}/>
            {copiedEmail ? "copied!" : PROFILE.email}
          </button>
          <a className="btn btn-ghost" href={PROFILE.resume} target="_blank" rel="noreferrer">
            <Icon name="download" size={15}/>
            Resume.pdf
          </a>
          <button className="btn btn-icon" title="Share">
            <Icon name="share" size={15}/>
          </button>
        </div>
      </div>
    </header>
  );
};

// ──────────────────────────────────────────────────────────────────────────

const Tabs = ({ tab, setTab, counts }) => {
  const tabs = [
    { id: "experiences", label: "Experiences", count: counts.exp },
    { id: "projects", label: "Projects", count: counts.proj },
  ];
  return (
    <div className="tabs">
      {tabs.map(tt => (
        <button
          key={tt.id}
          className={"tab" + (tab === tt.id ? " active" : "")}
          onClick={() => setTab(tt.id)}
        >
          <span>{tt.label}</span>
          <span className="tab-count">{tt.count}</span>
        </button>
      ))}
      <div className="tab-spacer"/>
      <div className="tab-meta">
        <span className="mono">sort:</span> recent
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────

const ExperienceCard = ({ exp, idx }) => {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(exp.likes);
  const onLike = () => {
    setLiked(l => {
      setCount(c => c + (l ? -1 : 1));
      return !l;
    });
  };
  return (
    <article className="exp-card">
      <div className="exp-rail">
        <div className="exp-num mono">{String(idx + 1).padStart(2, "0")}</div>
        <div className="exp-line"/>
      </div>
      <div className="exp-body">
        <div className="exp-row-1">
          <h3 className="exp-role">{exp.role}</h3>
          <span className={"exp-pill " + (exp.end === "Present" ? "live" : "")}>
            {exp.end === "Present" ? <><span className="live-dot"/> currently</> : exp.duration}
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
          <Icon name="calendar" size={12}/>
          <span>{exp.start} → {exp.end}</span>
          <span className="dim">· {exp.duration}</span>
        </div>
        <p className="exp-summary">{exp.summary}</p>
        <div className="exp-stack">
          {exp.stack.map(s => <span key={s} className="chip mono">{s}</span>)}
        </div>
        <div className="exp-foot">
          <button className={"like " + (liked ? "liked" : "")} onClick={onLike}>
            <Icon name={liked ? "heart-fill" : "heart"} size={14}/>
            <span className="mono">{count.toLocaleString()}</span>
          </button>
          <span className="exp-foot-meta mono">posted {exp.start.toLowerCase()}</span>
        </div>
      </div>
    </article>
  );
};

const ExperiencesView = () => {
  return (
    <div className="exp-list">
      {EXPERIENCES.map((e, i) => <ExperienceCard key={e.id} exp={e} idx={i}/>)}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────

const ProjectThumb = ({ p }) => {
  // Stylized abstract thumb based on accent color, project id hash.
  const isOrange = p.color === "orange";
  const c1 = isOrange ? "var(--accent-1)" : "var(--accent-2)";
  const c2 = isOrange ? "var(--accent-2)" : "var(--accent-1)";
  // pick a pattern based on id char
  const seed = p.id.charCodeAt(p.id.length - 1) % 4;
  return (
    <div className="thumb">
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <linearGradient id={`g-${p.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} stopOpacity="0.0"/>
            <stop offset="1" stopColor={c1} stopOpacity="0.18"/>
          </linearGradient>
          <pattern id={`pat-${p.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 14 L14 0" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="#0e0e0e"/>
        <rect width="200" height="200" fill={`url(#pat-${p.id})`}/>
        <rect width="200" height="200" fill={`url(#g-${p.id})`}/>
        {seed === 0 && (
          <g>
            <circle cx="60" cy="100" r="46" fill="none" stroke={c1} strokeWidth="1.2" opacity="0.9"/>
            <circle cx="120" cy="100" r="46" fill="none" stroke={c2} strokeWidth="1.2" opacity="0.9"/>
          </g>
        )}
        {seed === 1 && (
          <g stroke={c1} strokeWidth="1" opacity="0.85">
            {Array.from({length: 8}).map((_, i) => (
              <line key={i} x1="20" y1={20 + i*22} x2={20 + (i+1)*18} y2={20 + i*22}/>
            ))}
            <line x1="20" y1="178" x2="180" y2="178" stroke={c2}/>
          </g>
        )}
        {seed === 2 && (
          <g>
            <path d="M20 150 Q 50 60, 100 110 T 180 70" fill="none" stroke={c1} strokeWidth="1.5"/>
            <path d="M20 170 Q 60 120, 100 140 T 180 110" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.7"/>
            {Array.from({length: 6}).map((_, i) => (
              <circle key={i} cx={20 + i*32} cy={150 - i*8} r="2" fill={c1}/>
            ))}
          </g>
        )}
        {seed === 3 && (
          <g>
            <rect x="40" y="40" width="120" height="120" fill="none" stroke={c1} strokeWidth="1.2"/>
            <rect x="60" y="60" width="80" height="80" fill="none" stroke={c2} strokeWidth="1.2"/>
            <rect x="80" y="80" width="40" height="40" fill={c1} opacity="0.5"/>
          </g>
        )}
      </svg>
    </div>
  );
};

const ProjectCard = ({ p }) => {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(p.likes);
  return (
    <article className={"proj-card" + (p.pinned ? " pinned" : "")}>
      <ProjectThumb p={p}/>
      <div className="proj-body">
        <div className="proj-top">
          <span className="proj-tag mono">{p.tag}</span>
          {p.pinned && <span className="proj-pinned mono"><Icon name="pin" size={11}/> pinned</span>}
        </div>
        <h3 className="proj-title mono">{p.title}</h3>
        <p className="proj-blurb">{p.blurb}</p>
        <div className="proj-foot">
          <button
            className={"like " + (liked ? "liked" : "")}
            onClick={() => { setLiked(l => { setCount(c => c + (l ? -1 : 1)); return !l; }); }}
          >
            <Icon name={liked ? "heart-fill" : "heart"} size={13}/>
            <span className="mono">{count.toLocaleString()}</span>
          </button>
          <span className="proj-stars mono">
            <Icon name="star" size={13}/> {p.stars.toLocaleString()}
          </span>
          <span className="proj-spacer"/>
          {p.github
            ? <a className="proj-open mono" href={p.github} target="_blank" rel="noreferrer">open ↗</a>
            : <span className="proj-open mono" style={{opacity:0.35,cursor:"default"}}>open ↗</span>
          }
        </div>
      </div>
    </article>
  );
};

const ProjectsView = () => {
  return (
    <div className="proj-grid">
      {PROJECTS.map(p => <ProjectCard key={p.id} p={p}/>)}
    </div>
  );
};

window.ProfileHeader = ProfileHeader;
window.Tabs = Tabs;
window.ExperiencesView = ExperiencesView;
window.ProjectsView = ProjectsView;
