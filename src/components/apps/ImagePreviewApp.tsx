import { motion } from "framer-motion";
import { usePreview } from "../../context/PreviewContext";

export default function ImagePreviewApp() {
  const { imageUrl, title } = usePreview();

  if (!imageUrl || !title) {
    return (
      <div className="flex h-full w-full items-center justify-center text-inkMuted bg-[#F7F7F7]">
        No image selected
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F7F7F7] p-8 overflow-auto">
      <motion.img
        key={imageUrl}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        src={imageUrl}
        alt={title}
        className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
      />
    </div>
  );
}
