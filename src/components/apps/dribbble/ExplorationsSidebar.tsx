import { motion } from "framer-motion";
import { YEARS } from "../../../data/designShots";

interface ExplorationsSidebarProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export default function ExplorationsSidebar({ selectedYear, onYearChange }: ExplorationsSidebarProps) {
  return (
    <div className="flex h-full w-[200px] shrink-0 flex-col border-r border-borderFaint bg-white/80 px-4 py-3">
      <h3 className="mb-4 text-[13px] font-semibold text-inkStrong">Explorations</h3>

      <div className="space-y-1">
        {YEARS.map((year) => (
          <motion.button
            key={year}
            onClick={() => onYearChange(year)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-full rounded-md px-3 py-2 text-left text-[13px] transition-all duration-150 ${
              selectedYear === year
                ? "bg-black/[0.06] font-medium text-inkStrong"
                : "font-normal text-inkTertiary hover:bg-black/[0.03]"
            }`}
          >
            {selectedYear === year && (
              <motion.span
                layoutId="active-year"
                className="absolute inset-0 rounded-md bg-black/[0.03]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{year}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
