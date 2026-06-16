import { AnimatePresence } from "framer-motion";
import DesignCard from "./DesignCard";
import type { DesignShot } from "../../../data/designShots";

interface DesignGridProps {
  designs: DesignShot[];
  onSelectDesign: (design: DesignShot) => void;
}

export default function DesignGrid({ designs, onSelectDesign }: DesignGridProps) {
  if (designs.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-[14px] text-inkMuted">
        No explorations added for this year yet.
      </div>
    );
  }

  return (
    <div className="grid flex-1 gap-4 overflow-y-auto p-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
      <AnimatePresence mode="popLayout">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onDoubleClick={() => onSelectDesign(design)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectDesign(design);
              }
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
