export default function ArticleCard({ article, onDelete, isAdmin }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border-2 border-black bg-[#f8f5ed] p-5 shadow-[5px_5px_0_0_#111]">
      {/* Swiss Corner Mark */}
      <span className="absolute right-3 top-3 h-2.5 w-2.5 bg-black" />

      {/* Category + Date */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-black pb-3 pr-5">
        <span className="inline-block border-2 border-black bg-red-700 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          {article.category?.name || "General"}
        </span>

        <time
          dateTime={article.createdAt}
          className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500"
        >
          {new Date(article.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>

      {/* Article */}
      <div className="flex-1 pt-5">
        <h3 className="font-serif text-2xl font-black leading-[1.05] tracking-tight text-black">
          {article.title}
        </h3>

        <div className="mt-3 h-1 w-10 bg-red-700" />

        <p className="mt-4 line-clamp-5 text-[15px] leading-6 text-gray-800">
          {article.content}
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-6 flex items-end justify-between gap-4 border-t-2 border-black pt-4">
        <div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Written by
          </p>

          <p className="mt-1 font-serif text-sm font-bold text-black">
            {article.author || "Unknown Author"}
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={() => onDelete(article._id)}
            className="border-2 border-black bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-red-700 hover:text-white"
          >
            Delete
          </button>
        )}
      </footer>

      {/* Bottom Editorial Line */}
      <div className="mt-4 flex items-center gap-2">
        <span className="h-px flex-1 bg-black" />
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
          DN
        </span>
        <span className="h-px flex-1 bg-black" />
      </div>
    </article>
  );
}