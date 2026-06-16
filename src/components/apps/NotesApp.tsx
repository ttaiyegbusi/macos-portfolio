import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PanelLeft, PanelLeftOpen, Search, X } from "lucide-react";
import { mediumArticles } from "../../data/mediumArticles";
import { NOTES } from "../../data/notes";
import HangingIDBadge from "./notes/HangingIDBadge";

/* ------------------------------ article body ----------------------------- */

function ArticleBody({ articleId }: { articleId: string }) {
  const reduceMotion = useReducedMotion();
  const article = mediumArticles.find((a) => a.id === articleId)!;

  return (
    <motion.div
      key={article.id}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="mx-auto max-w-[640px]"
    >
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-inkMuted">
        <span className="font-semibold uppercase tracking-wide text-inkTertiary">{article.source}</span>
        <span>·</span>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>

      {/* Title + subtitle */}
      <h1 className="text-[30px] font-bold leading-tight tracking-tight text-inkStrong">{article.title}</h1>
      <p className="mt-2 text-[17px] leading-relaxed text-inkSecondary">{article.subtitle}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[11px] font-medium text-inkSecondary">
            {tag}
          </span>
        ))}
      </div>

      {/* Excerpt with fade overlay */}
      <div className="relative mt-6">
        <div className="max-h-[460px] overflow-hidden">
          <p className="text-[16px] leading-[1.8] text-inkSecondary">{article.excerpt}</p>
          {article.bodyPreview?.map((para, i) => (
            <p key={i} className="mt-4 text-[16px] leading-[1.8] text-inkSecondary">
              {para}
            </p>
          ))}
        </div>
        {/* soft fade — matches the reading area background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      {/* CTA */}
      <motion.a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={reduceMotion ? {} : { y: -2 }}
        whileTap={reduceMotion ? {} : { scale: 0.98 }}
        aria-label={`Continue reading "${article.title}" on Medium (opens in a new tab)`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-inkStrong px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inkStrong/40"
      >
        Continue reading on Medium
      </motion.a>
    </motion.div>
  );
}

/* -------------------------------- the app -------------------------------- */

export default function NotesApp() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(NOTES[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const activeNote = NOTES.find((n) => n.id === activeId);
  const isArticle = !activeNote;

  const q = query.trim().toLowerCase();
  const filteredNotes = q
    ? NOTES.filter((n) => n.title.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q))
    : NOTES;
  const filteredArticles = q
    ? mediumArticles.filter(
        (a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q),
      )
    : mediumArticles;
  const noResults = q && filteredNotes.length === 0 && filteredArticles.length === 0;

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const spring = { type: "spring", stiffness: 360, damping: 34 } as const;

  return (
    <div className="relative flex h-full gap-4 bg-white/50 p-4">
      {/* Floating sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16, width: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, width: 230 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16, width: 0 }}
            transition={reduceMotion ? { duration: 0.15 } : spring}
            className="flex shrink-0 flex-col overflow-hidden rounded-lg border border-white/40 bg-white/80 p-3 shadow-sm backdrop-blur-sm"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-2 pb-3 pt-1">
              {!searchOpen && (
                <span className="text-[11px] font-semibold uppercase tracking-wide text-inkTertiary">Notes</span>
              )}

              {searchOpen ? (
                <div className="flex w-full items-center gap-1.5 rounded-md bg-black/[0.05] px-2 py-1">
                  <Search size={12} strokeWidth={1.8} className="shrink-0 text-inkMuted" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                    placeholder="Search"
                    aria-label="Search notes and articles"
                    className="w-full bg-transparent text-[12px] text-inkStrong placeholder:text-inkMuted focus:outline-none"
                  />
                  <button
                    onClick={closeSearch}
                    aria-label="Cancel search"
                    className="shrink-0 rounded p-0.5 text-inkMuted transition-colors hover:bg-black/[0.06] hover:text-inkSecondary"
                  >
                    <X size={12} strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-inkTertiary">
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                    className="rounded p-1 transition-colors hover:bg-black/[0.05] hover:text-inkSecondary"
                  >
                    <Search size={13} strokeWidth={1.8} />
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Collapse sidebar"
                    className="rounded p-1 transition-colors hover:bg-black/[0.05] hover:text-inkSecondary"
                  >
                    <PanelLeft size={13} strokeWidth={1.8} />
                  </button>
                </div>
              )}
            </div>

            <div className="app-scroll flex-1 overflow-y-auto px-1 pb-2">
              {noResults && (
                <p className="px-2.5 py-3 text-[12px] text-inkMuted">No results for "{query}"</p>
              )}

              {/* Personal notes */}
              {filteredNotes.map((note) => {
                const isActive = note.id === activeId;
                return (
                  <button
                    key={note.id}
                    onClick={() => setActiveId(note.id)}
                    className={`mb-1 w-full rounded-md px-2.5 py-2 text-left transition-colors ${
                      isActive ? "bg-black/[0.06]" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <p className="truncate text-[12px] font-semibold text-inkStrong">{note.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-inkTertiary">
                      <span className="mr-1.5 text-inkMuted">{note.date}</span>
                      {note.preview}
                    </p>
                  </button>
                );
              })}

              {/* Divider */}
              {filteredArticles.length > 0 && (
                <div className="mb-2 mt-7 border-t border-black/[0.06] px-2 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-inkMuted">Writing</p>
                </div>
              )}

              {/* Articles */}
              {filteredArticles.map((article) => {
                const isActive = article.id === activeId;
                return (
                  <button
                    key={article.id}
                    onClick={() => setActiveId(article.id)}
                    className={`mb-1 w-full rounded-md px-2.5 py-2 text-left transition-colors ${
                      isActive ? "bg-black/[0.06]" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <p className="truncate text-[12px] font-semibold text-inkStrong">{article.title}</p>
                    <p className="mt-0.5 truncate text-[11px] text-inkTertiary">{article.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Expand handle when collapsed */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            key="expand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Expand sidebar"
            className="absolute left-6 top-7 z-10 rounded-md border border-white/50 bg-white/80 p-1.5 text-inkSecondary shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
          >
            <PanelLeftOpen size={14} strokeWidth={1.8} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Reading area */}
      <section className="app-scroll relative flex-1 overflow-y-auto rounded-lg bg-white px-8 py-6">
        <AnimatePresence mode="wait">
          {isArticle ? (
            <ArticleBody key={activeId} articleId={activeId} />
          ) : activeNote!.id === "about-me" ? (
            <motion.div
              key="about-me"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Badge hangs from the very top of the content area */}
              <HangingIDBadge />
              <h1 className="mb-5 text-[22px] font-bold text-inkStrong">{activeNote!.title}</h1>
              {activeNote!.body}
            </motion.div>
          ) : (
            <motion.div
              key={activeNote!.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="mb-4 text-center text-[10px] text-inkFaint">{activeNote!.date}</p>
              <h1 className="mb-5 text-[22px] font-bold text-inkStrong">{activeNote!.title}</h1>
              {activeNote!.body}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
