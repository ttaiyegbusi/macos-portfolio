import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  LayoutGrid,
  Mail,
  Search,
  User,
} from "lucide-react";

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

const FAVORITES = [
  { id: "about", label: "About", icon: User },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "case-studies", label: "Case Studies", icon: Folder },
  { id: "contact", label: "Contact", icon: Mail },
];

function ItemGlyph({ kind }: { kind: ItemKind }) {
  if (kind === "folder") {
    return (
      <svg viewBox="0 0 64 52" className="h-11 w-14 drop-shadow-sm">
        <path d="M4 10a5 5 0 0 1 5-5h14l5 6h27a5 5 0 0 1 5 5v26a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V10Z" fill="#6CC8FF" />
        <path d="M4 16h56v26a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V16Z" fill="#1FA7FF" />
        <path d="M4 16h56v3H4z" fill="#5FBDF6" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "pdf") {
    return (
      <svg viewBox="0 0 48 60" className="h-11 w-10 drop-shadow-sm">
        <path d="M4 6a4 4 0 0 1 4-4h22l14 14v38a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6Z" fill="#FFFFFF" stroke="#E6E6E6" />
        <path d="M30 2l14 14H34a4 4 0 0 1-4-4V2Z" fill="#EDEDED" />
        <rect x="10" y="34" width="28" height="13" rx="3" fill="#EA6B65" />
        <text x="24" y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="IBM Plex Sans, sans-serif">
          PDF
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 56 56" className="h-11 w-11 drop-shadow-sm">
      <circle cx="28" cy="28" r="26" fill="#D8D8D8" />
      <circle cx="28" cy="22" r="9" fill="#FFFFFF" />
      <path d="M10 47c2.6-9 9.7-13.5 18-13.5S43.4 38 46 47a26 26 0 0 1-36 0Z" fill="#FFFFFF" />
    </svg>
  );
}

export default function FinderApp() {
  const [selectedId, setSelectedId] = useState<string | null>("about");
  const selected = ITEMS.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <aside className="w-[168px] shrink-0 border-r border-borderLight bg-[#F6F6F6]/90 px-3 py-3">
        <p className="px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-inkFaint">Favorites</p>
        {FAVORITES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedId(id)}
            className={`mb-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${
              selectedId === id ? "bg-black/[0.07] text-inkStrong" : "text-inkSecondary hover:bg-black/[0.04]"
            }`}
          >
            <Icon size={13} strokeWidth={1.8} className="text-[#3099DE]" />
            {label}
          </button>
        ))}
        <p className="mt-4 px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-inkFaint">Locations</p>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-inkSecondary">
          <LayoutGrid size={13} strokeWidth={1.8} className="text-inkTertiary" />
          Portfolio
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-borderLight bg-[#FBFBFB] px-4 py-2">
          <div className="flex items-center gap-1 text-inkTertiary">
            <ChevronLeft size={15} strokeWidth={1.8} />
            <ChevronRight size={15} strokeWidth={1.8} className="opacity-40" />
          </div>
          <span className="text-[12px] font-semibold text-inkSecondary">Portfolio</span>
          <div className="ml-auto flex items-center gap-1.5 rounded-md border border-borderLight bg-white px-2 py-1 text-inkFaint">
            <Search size={11} strokeWidth={1.8} />
            <span className="text-[10px]">Search</span>
          </div>
        </header>

        <div className="app-scroll grid flex-1 auto-rows-min grid-cols-3 gap-x-2 gap-y-5 overflow-y-auto p-5 sm:grid-cols-4">
          {ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              onDoubleClick={() => setSelectedId(item.id)}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className={`rounded-lg p-2 transition-colors ${
                  selectedId === item.id ? "bg-[#3099DE]/15" : "group-hover:bg-black/[0.04]"
                }`}
              >
                <ItemGlyph kind={item.kind} />
              </span>
              <span
                className={`max-w-full truncate rounded px-1.5 py-0.5 text-[11px] leading-tight ${
                  selectedId === item.id ? "bg-[#3099DE] text-white" : "text-inkSecondary"
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>

        <footer className="border-t border-borderLight bg-[#FBFBFB] px-4 py-1.5 text-[10px] text-inkTertiary">
          {selected ? `${selected.name} — ${selected.meta}` : `${ITEMS.length} items`}
        </footer>
      </div>
    </div>
  );
}
