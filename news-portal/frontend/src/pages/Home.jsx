import { useEffect, useState } from "react";
import API from "../api";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/articles").then((res) => setArticles(res.data));
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const filtered =
    filter === "All"
      ? articles
      : articles.filter((article) => article.category?.name === filter);

  return (
    <main className="min-h-screen bg-[#e9e6dc] text-black">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 lg:px-10">
        {/* Header */}
        <header className="border-b-4 border-black pb-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-700">
                Independent News / Daily Edition
              </p>

              <h1 className="font-serif text-5xl font-black leading-none tracking-tight md:text-7xl">
                Latest
                <br className="sm:hidden" /> News
                <span className="text-red-700">.</span>
              </h1>
            </div>

            <div className="max-w-xs border-l-4 border-red-700 pl-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                News Portal
              </p>

              <p className="mt-2 text-sm leading-5 text-gray-600">
                Stories, ideas and information that matter.
              </p>
            </div>
          </div>
        </header>

        {/* Filter */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
              Browse Sections
            </p>

            <span className="font-mono text-[10px] font-bold uppercase">
              {filtered.length.toString().padStart(2, "0")} Stories
            </span>
          </div>

          <div className="flex flex-wrap gap-2 border-y-2 border-black py-3">
            {["All", ...categories.map((category) => category.name)].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`border-2 border-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                    filter === category
                      ? "bg-red-700 text-white"
                      : "bg-[#f8f5ed] text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </section>

        {/* News Grid */}
        <section className="mt-8">
          {filtered.length === 0 ? (
            <div className="border-2 border-dashed border-black bg-[#f8f5ed] px-6 py-20 text-center">
              <p className="font-serif text-3xl font-black">
                No articles yet.
              </p>

              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-gray-500">
                No stories available in this section
              </p>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, index) => (
                <div
                  key={article._id}
                  className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom Editorial Strip */}
        <section className="mt-12 border-y-4 border-black py-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">
                Current Edition
              </p>

              <p className="mt-1 font-serif text-xl font-black">
                Read. Think. Question.
              </p>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
              {articles.length} total articles
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 flex flex-col justify-between gap-2 border-t-2 border-black pt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:flex-row">
          <span>News Portal</span>
          <span>Independent Editorial System</span>
        </footer>
      </div>
    </main>
  );
}