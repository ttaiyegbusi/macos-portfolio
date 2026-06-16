import { motion } from "framer-motion";
import type { MediumArticle } from "../../../data/mediumArticles";

interface ArticleListItemProps {
  article: MediumArticle;
  isSelected: boolean;
  onClick: () => void;
}

export default function ArticleListItem({ article, isSelected, onClick }: ArticleListItemProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left px-3 py-3 rounded-lg transition-all border ${
        isSelected
          ? "bg-black/[0.06] border-black/[0.08] shadow-sm"
          : "hover:bg-black/[0.02] border-transparent"
      }`}
    >
      <p className="text-[13px] font-medium text-inkStrong line-clamp-2">{article.title}</p>
      <p className="text-[11px] text-inkMuted mt-1">{article.date}</p>
    </motion.button>
  );
}
