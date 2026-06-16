import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NOTES } from "../../../data/notes";
import { mediumArticles } from "../../../data/mediumArticles";

type Selection =
  | { kind: "note"; id: string }
  | { kind: "article"; id: string };

/* ------------------------------- detail views ------------------------------ */

function NoteDetail({ id }: { id: string }) {
  const note = NOTES.find((n) => n.id === id)!;
  return (
    <div className="px-5 pb-16 pt-2">
      <p className="mb-2 text-[12px] text-inkMuted">{note.date}</p>
      <h1 className="mb-5 text-[26px] font-bold tracking-tight text-inkStrong">{note.title}</h1>
      {note.body}
    </div>
  );
}

function ArticleDetail({ id }: { id: string }) {
  const article = mediumArticles.find((a) => a.id === id)!;
  return (
    <div className="px-5 pb-16 pt-2">
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-inkMuted">
        <span className="font-semibold uppercase tracking-wide text-inkTertiary">{article.source}</span>
        <span>·</span>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>

      <h1 className="text-[26px] font-bold leading-tight tracking-tight text-inkStrong">{article.title}</h1>
      <p className="mt-2 text-[16px] leading-relaxed text-inkSecondary">{article.subtitle}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[11px] font-medium text-inkSecondary">
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-6">
        <div className="max-h-[420px] overflow-hidden">
          <p className="text-[16px] leading-[1.8] text-inkSecondary">{article.excerpt}</p>
          {article.bodyPreview?.map((para, i) => (
            <p key={i} className="mt-4 text-[16px] leading-[1.8] text-inkSecondary">
              {para}
            </p>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#F7F7F8]/60 to-[#F7F7F8]" />
      </div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-inkStrong px-4 py-3 text-[14px] font-medium text-white active:bg-black/85"
      >
        Continue reading on Medium
      </a>
    </div>
  );
}

/* --------------------------------- list row -------------------------------- */

function Row({
  title,
  subtitle,
  meta,
  onClick,
}: {
  title: string;
  subtitle: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors active:bg-black/[0.04]"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] font-semibold text-inkStrong">{title}</p>
        <p className="mt-0.5 truncate text-[13px] text-inkTertiary">
          {meta && <span className="mr-1.5 text-inkMuted">{meta}</span>}
          {subtitle}
        </p>
      </div>
      <ChevronRight size={18} strokeWidth={2} className="shrink-0 text-inkFaint" />
    </button>
  );
}

/* ----------------------------------- app ----------------------------------- */

export default function MobileNotes() {
  const reduceMotion = useReducedMotion();
  const [selection, setSelection] = useState<Selection | null>(null);

  const detailTitle =
    selection?.kind === "note"
      ? NOTES.find((n) => n.id === selection.id)?.title
      : selection?.kind === "article"
        ? "Writing"
        : "";

  return (
    <div className="relative h-full overflow-hidden bg-[#F7F7F8]">
      {/* Master list */}
      <div className="h-full overflow-y-auto">
        {/* Personal notes */}
        <div className="overflow-hidden">
          {NOTES.map((note, i) => (
            <div key={note.id}>
              {i > 0 && <div className="ml-5 h-px bg-black/[0.06]" />}
              <Row
                title={note.title}
                subtitle={note.preview}
                meta={note.date}
                onClick={() => setSelection({ kind: "note", id: note.id })}
              />
            </div>
          ))}
        </div>

        {/* Writing section */}
        <p className="px-5 pb-2 pt-7 text-[12px] font-semibold uppercase tracking-wide text-inkMuted">
          Writing
        </p>
        <div className="overflow-hidden">
          {mediumArticles.map((article, i) => (
            <div key={article.id}>
              {i > 0 && <div className="ml-5 h-px bg-black/[0.06]" />}
              <Row
                title={article.title}
                subtitle={article.subtitle}
                onClick={() => setSelection({ kind: "article", id: article.id })}
              />
            </div>
          ))}
        </div>
        <div className="h-10" />
      </div>

      {/* Detail — slides in over the list */}
      <AnimatePresence>
        {selection && (
          <motion.div
            key={`${selection.kind}-${selection.id}`}
            className="absolute inset-0 flex flex-col bg-[#F7F7F8]"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              reduceMotion ? { duration: 0.2 } : { type: "spring", stiffness: 340, damping: 36 }
            }
          >
            {/* Detail nav bar */}
            <div className="flex shrink-0 items-center gap-1 border-b border-black/[0.06] bg-[#F7F7F8]/95 px-2 py-2 backdrop-blur">
              <button
                type="button"
                onClick={() => setSelection(null)}
                className="flex items-center gap-0.5 rounded-lg px-1.5 py-1 text-[16px] text-[#1F6FEB] active:opacity-60"
              >
                <ChevronLeft size={22} strokeWidth={2.2} />
                Notes
              </button>
              <span className="truncate text-[15px] font-semibold text-inkStrong">{detailTitle}</span>
            </div>

            <div className="flex-1 overflow-y-auto">
              {selection.kind === "note" ? (
                <NoteDetail id={selection.id} />
              ) : (
                <ArticleDetail id={selection.id} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
