// Feed view (blog posts with comments + likes) + Send Message form.

const PostCard = ({ post }) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likes);
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState(post.comments);
  const [draft, setDraft] = React.useState("");
  const [draftFocus, setDraftFocus] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments(c => [
      ...c,
      { author: "@you", text: draft.trim(), time: "now", likes: 0, fresh: true }
    ]);
    setDraft("");
  };

  return (
    <article className="post">
      <div className="post-meta mono">
        <span>{post.date}</span>
        <span className="dot">·</span>
        <span>{post.readTime}</span>
        <span className="dot">·</span>
        <span className="post-tag">blog</span>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-excerpt">{post.excerpt}</p>

      <div className="post-foot">
        <button
          className={"like " + (liked ? "liked" : "")}
          onClick={() => { setLiked(l => { setLikeCount(c => c + (l ? -1 : 1)); return !l; }); }}
        >
          <Icon name={liked ? "heart-fill" : "heart"} size={14}/>
          <span className="mono">{likeCount.toLocaleString()}</span>
        </button>
        <button className="like" onClick={() => setOpen(o => !o)}>
          <Icon name="comment" size={14}/>
          <span className="mono">{comments.length}</span>
        </button>
        <button className="like">
          <Icon name="share" size={14}/>
          <span className="mono">share</span>
        </button>
        <span className="post-foot-spacer"/>
        <a className="post-readmore mono" href="#" onClick={e => e.preventDefault()}>read full →</a>
      </div>

      {open && (
        <div className="comments">
          <div className="comments-head mono">{comments.length} comment{comments.length === 1 ? "" : "s"}</div>
          {comments.map((c, i) => (
            <div key={i} className={"comment" + (c.author_self ? " self" : "") + (c.fresh ? " fresh" : "")}>
              <div className="c-avatar" style={{
                background: c.author_self
                  ? "linear-gradient(135deg, var(--accent-1), var(--accent-2))"
                  : `hsl(${(c.author.charCodeAt(1) * 23) % 360} 30% 25%)`
              }}>{c.author[1]?.toUpperCase() || "?"}</div>
              <div className="c-body">
                <div className="c-head">
                  <span className="c-author mono">
                    {c.author}
                    {c.author_self && <span className="c-self-tag">author</span>}
                  </span>
                  <span className="c-time mono">{c.time}</span>
                </div>
                <div className="c-text">{c.text}</div>
                <div className="c-actions mono">
                  <span><Icon name="heart" size={11}/> {c.likes}</span>
                  <span>reply</span>
                </div>
              </div>
            </div>
          ))}
          <form className={"c-compose" + (draftFocus ? " focused" : "")} onSubmit={submit}>
            <div className="c-avatar c-avatar-you">y</div>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onFocus={() => setDraftFocus(true)}
              onBlur={() => setDraftFocus(false)}
              placeholder="add a comment…"
            />
            <button type="submit" disabled={!draft.trim()} className="c-submit mono">post</button>
          </form>
        </div>
      )}
    </article>
  );
};

const FeedView = () => {
  return (
    <div className="feed-wrap">
      <div className="feed-head">
        <h2 className="section-title">Feed</h2>
        <div className="feed-sub">papers, agentic LLM rambles, and post-deploy regrets.</div>
      </div>
      <div className="post-list">
        {POSTS.map(p => <PostCard key={p.id} post={p}/>)}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────

const MessageView = () => {
  const [from, setFrom] = React.useState("");
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const send = (e) => {
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
        <div className="feed-sub">writes straight to <span className="mono">{PROFILE.email}</span>. I read everything.</div>
      </div>
      <form className="msg-form" onSubmit={send}>
        <div className="msg-row">
          <label className="msg-label mono">from</label>
          <input className="msg-input" type="email" required placeholder="you@somewhere.com" value={from} onChange={e=>setFrom(e.target.value)}/>
        </div>
        <div className="msg-row">
          <label className="msg-label mono">name</label>
          <input className="msg-input" placeholder="what should I call you" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className="msg-row">
          <label className="msg-label mono">subject</label>
          <input className="msg-input" required placeholder="working on something cool?" value={subject} onChange={e=>setSubject(e.target.value)}/>
        </div>
        <div className="msg-row msg-row-tall">
          <label className="msg-label mono">message</label>
          <textarea className="msg-input msg-textarea" required rows={8} placeholder="say what you want. links welcome." value={body} onChange={e=>setBody(e.target.value)}/>
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
};

window.FeedView = FeedView;
window.MessageView = MessageView;
