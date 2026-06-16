interface ArticleTagsProps {
  tags: string[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block px-2.5 py-1 bg-black/[0.05] rounded-full text-[11px] font-medium text-inkSecondary hover:bg-black/[0.08] transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
