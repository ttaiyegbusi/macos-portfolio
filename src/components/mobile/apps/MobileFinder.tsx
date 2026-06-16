import { ChevronRight, FileText, Folder, Mail, User } from "lucide-react";

type ItemKind = "folder" | "pdf" | "contact";

interface FinderItem {
  id: string;
  name: string;
  kind: ItemKind;
  meta: string;
}

const ITEMS: FinderItem[] = [
  { id: "about", name: "About", kind: "folder", meta: "Folder · 4 items" },
  { id: "case-studies", name: "Case Studies", kind: "folder", meta: "Folder · 6 items" },
  { id: "resume", name: "Resume.pdf", kind: "pdf", meta: "PDF · 184 KB" },
  { id: "contact", name: "Contact", kind: "contact", meta: "Contact card" },
  { id: "knit", name: "Knit", kind: "folder", meta: "Folder · 12 items" },
  { id: "icametoo", name: "icametoo", kind: "folder", meta: "Folder · 9 items" },
  { id: "football", name: "Football Booth", kind: "folder", meta: "Folder · 7 items" },
  { id: "chaincore", name: "Chain Core", kind: "folder", meta: "Folder · 10 items" },
];

function Glyph({ kind }: { kind: ItemKind }) {
  if (kind === "folder") return <Folder size={22} className="text-[#5AAEF7]" fill="#9BD0FA" strokeWidth={1.5} />;
  if (kind === "pdf") return <FileText size={22} className="text-[#E5564B]" strokeWidth={1.5} />;
  return <User size={22} className="text-[#8E8E93]" strokeWidth={1.5} />;
}

export default function MobileFinder() {
  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F8]">
      {/* Favorites strip */}
      <div className="flex gap-3 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { label: "About", icon: User },
          { label: "Resume", icon: FileText },
          { label: "Case Studies", icon: Folder },
          { label: "Contact", icon: Mail },
        ].map(({ label, icon: Icon }) => (
          <div key={label} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <Icon size={22} strokeWidth={1.6} className="text-[#5AAEF7]" />
            </div>
            <span className="truncate text-[11px] text-inkTertiary">{label}</span>
          </div>
        ))}
      </div>

      <p className="px-5 pb-2 pt-3 text-[12px] font-semibold uppercase tracking-wide text-inkMuted">
        Portfolio
      </p>

      <div className="mx-4 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
        {ITEMS.map((item, i) => (
          <div key={item.id}>
            {i > 0 && <div className="ml-14 h-px bg-black/[0.06]" />}
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-black/[0.03]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Glyph kind={item.kind} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] text-inkStrong">{item.name}</p>
                <p className="truncate text-[12px] text-inkTertiary">{item.meta}</p>
              </div>
              <ChevronRight size={17} strokeWidth={2} className="shrink-0 text-inkFaint" />
            </button>
          </div>
        ))}
      </div>
      <div className="h-10" />
    </div>
  );
}
