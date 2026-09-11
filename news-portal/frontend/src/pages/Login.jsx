import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e9e6dc] px-5 py-10 text-black">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <section className="relative w-full border-2 border-black bg-[#f8f5ed] p-7 shadow-[7px_7px_0_0_#111] md:p-9">
          {/* Corner Mark */}
          <span className="absolute right-4 top-4 h-3 w-3 bg-red-700" />

          {/* Header */}
          <header className="border-b-4 border-black pb-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">
              News Portal / Restricted
            </p>

            <h1 className="mt-2 font-serif text-4xl font-black leading-none tracking-tight">
              Admin Login
              <span className="text-red-700">.</span>
            </h1>

            <p className="mt-3 max-w-xs text-sm leading-5 text-gray-600">
              Sign in to access editorial controls and publish news.
            </p>
          </header>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-5 border-2 border-red-700 bg-red-50 px-4 py-3"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-700">
                Login Error
              </p>

              <p className="mt-1 text-sm font-semibold text-red-800">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="mt-6 space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                className="w-full border-2 border-black bg-white px-4 py-3 font-serif text-base outline-none placeholder:text-gray-400 focus:bg-[#fff9d6]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full border-2 border-black bg-white px-4 py-3 font-serif text-base outline-none placeholder:text-gray-400 focus:bg-[#fff9d6]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black bg-red-700 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-7 border-t border-black pt-4">
            <div className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-widest text-gray-500">
              <span>Editorial Access</span>
              <span>Secure Area</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}