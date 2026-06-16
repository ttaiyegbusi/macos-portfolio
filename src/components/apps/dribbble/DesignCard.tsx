import { motion } from "framer-motion";
import type { DesignShot } from "../../../data/designShots";

interface DesignCardProps {
  design: DesignShot;
  onDoubleClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function DesignCard({ design, onDoubleClick, onKeyDown }: DesignCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      className="group flex h-full w-full flex-col rounded-lg bg-white/70 p-3 transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inkStrong/40"
    >
      {/* Image preview with gradient */}
      <div className="relative flex-1 overflow-hidden rounded-md bg-gradient-to-br" style={{ backgroundImage: `url(${design.imageUrl}), linear-gradient(135deg, #e0e7ff 0%, #f0e7ff 100%)` }}>
        <motion.div
          className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/[0.04]"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.06)" }}
        />
      </div>

      {/* Title */}
      <p className="mt-2 text-center text-[11.5px] font-medium text-inkStrong/85 line-clamp-1">
        {design.title}
      </p>
    </motion.button>
  );
}
