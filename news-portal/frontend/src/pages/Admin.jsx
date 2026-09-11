import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import ArticleCard from "../components/ArticleCard";

export default function Admin() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
  });
  const [newCat, setNewCat] = useState("");
  const navigate = useNavigate();

  const load = () => {
    API.get("/articles").then((res) => setArticles(res.data));
    API.get("/categories").then((res) => setCategories(res.data));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    load();
  }, []);

  const addArticle = async (e) => {
    e.preventDefault();

    await API.post("/articles", form);

    setForm({
      title: "",
      content: "",
      author: "",
      category: "",
    });

    load();
  };

  const addCategory = async () => {
    if (!newCat.trim()) return;

    await API.post("/categories", {
      name: newCat,
    });

    setNewCat("");
    load();
  };

  const deleteArticle = async (id) => {
    await API.delete(`/articles/${id}`);
    load();
  };

  return (
    <main className="min-h-screen bg-[#e9e6dc] text-black">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 lg:px-10">
        {/* Header */}
        <header className="border-b-4 border-black pb-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-700">
                News Portal / Control Room
              </p>

              <h1 className="font-serif text-5xl font-black leading-none tracking-tight md:text-6xl">
                Admin<span className="text-red-700">.</span>
              </h1>
            </div>

            <div className="border-l-4 border-red-700 pl-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                Editorial Dashboard
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Create. Organize. Publish.
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.7fr]">
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Add Category */}
            <section className="border-2 border-black bg-[#f8f5ed] p-5 shadow-[6px_6px_0_0_#111]">
              <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-3">
                <h2 className="font-serif text-2xl font-black">
                  Categories
                </h2>

                <span className="font-mono text-xs font-bold">
                  {categories.length.toString().padStart(2, "0")}
                </span>
              </div>

              <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                New category
              </label>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <input
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                  placeholder="e.g. Sports"
                  className="min-w-0 flex-1 border-2 border-black bg-white px-3 py-2.5 font-serif text-sm outline-none placeholder:text-gray-400 focus:bg-[#fff9d6]"
                />

                <button
                  type="button"
                  onClick={addCategory}
                  className="border-2 border-black bg-black px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
                >
                  Add
                </button>
              </div>

              {categories.length > 0 && (
                <div className="mt-5 border-t border-black pt-4">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category._id}
                        className="border border-black bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Editor Note */}
            <div className="rotate-[-1deg] border-2 border-black bg-[#fff9d6] p-5 shadow-[4px_4px_0_0_#111]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">
                Editor's Note
              </p>

              <p className="mt-3 font-serif text-lg font-bold leading-snug">
                Good journalism starts with clear information and ends with
                clear writing.
              </p>

              <div className="mt-5 h-px bg-black" />

              <p className="mt-3 text-xs leading-5 text-gray-600">
                Keep titles sharp. Keep content readable. Choose correct
                categories before publishing.
              </p>
            </div>
          </aside>

          {/* Main */}
          <section>
            {/* Add Article */}
            <form
              onSubmit={addArticle}
              className="border-2 border-black bg-[#f8f5ed] p-6 shadow-[6px_6px_0_0_#111] md:p-7"
            >
              <div className="mb-6 flex items-start justify-between border-b-2 border-black pb-4">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">
                    New Entry
                  </p>

                  <h2 className="mt-1 font-serif text-3xl font-black">
                    Publish Article
                  </h2>
                </div>

                <span className="hidden border-2 border-black px-2 py-1 font-mono text-[10px] font-bold uppercase sm:block">
                  Draft
                </span>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    Headline
                  </label>

                  <input
                    placeholder="Write article headline..."
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black bg-white px-4 py-3 font-serif text-xl font-bold outline-none placeholder:font-normal placeholder:text-gray-400 focus:bg-[#fff9d6]"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    Story
                  </label>

                  <textarea
                    placeholder="Write article content..."
                    required
                    rows={9}
                    value={form.content}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        content: e.target.value,
                      })
                    }
                    className="w-full resize-y border-2 border-black bg-white px-4 py-3 font-serif text-base leading-7 outline-none placeholder:text-gray-400 focus:bg-[#fff9d6]"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    Byline
                  </label>

                  <input
                    placeholder="Author name"
                    value={form.author}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        author: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black bg-white px-4 py-3 font-serif text-sm outline-none placeholder:text-gray-400 focus:bg-[#fff9d6]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                    Section
                  </label>

                  <select
                    required
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black bg-white px-4 py-3 font-serif text-sm text-black outline-none focus:bg-[#fff9d6]"
                  >
                    <option value="" disabled>
                      -- Select Category --
                    </option>

                    {categories.length === 0 ? (
                      <option disabled>
                        No categories yet — add one above
                      </option>
                    ) : (
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Publish */}
                <div className="flex flex-col gap-4 border-t-2 border-black pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md font-mono text-[10px] leading-4 text-gray-500">
                    Publishing makes article visible through News Portal.
                  </p>

                  <button
                    type="submit"
                    className="border-2 border-black bg-red-700 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black"
                  >
                    Publish Article →
                  </button>
                </div>
              </div>
            </form>
          </section>
        </section>

        {/* Articles */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between border-b-4 border-black pb-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-red-700">
                Archive
              </p>

              <h2 className="mt-1 font-serif text-3xl font-black">
                All Articles
              </h2>
            </div>

            <span className="font-mono text-xs font-bold">
              {articles.length.toString().padStart(2, "0")} STORIES
            </span>
          </div>

          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                  onDelete={deleteArticle}
                  isAdmin
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-black bg-[#f8f5ed] px-6 py-16 text-center">
              <p className="font-serif text-2xl font-bold">
                No articles yet.
              </p>

              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-gray-500">
                First story waiting for publication
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-14 flex flex-col justify-between gap-2 border-t-2 border-black pt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:flex-row">
          <span>News Portal / Admin</span>
          <span>Editorial System</span>
        </footer>
      </div>
    </main>
  );
}