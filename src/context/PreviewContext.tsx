import { createContext, useContext, useState, ReactNode } from "react";

interface PreviewContextType {
  imageUrl: string | null;
  title: string | null;
  setPreview: (imageUrl: string, title: string) => void;
  clearPreview: () => void;
}

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const setPreview = (url: string, t: string) => {
    setImageUrl(url);
    setTitle(t);
  };

  const clearPreview = () => {
    setImageUrl(null);
    setTitle(null);
  };

  return (
    <PreviewContext.Provider value={{ imageUrl, title, setPreview, clearPreview }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview must be used inside PreviewProvider");
  return ctx;
}
