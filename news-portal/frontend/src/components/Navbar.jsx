import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="border-b-4 border-black bg-[#f8f5ed] text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8 lg:px-10">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center border-2 border-black bg-red-700 font-serif text-lg font-black text-white">
            DN
          </span>

          <div>
            <p className="font-serif text-2xl font-black leading-none tracking-tight">
              Dainik News
              <span className="text-red-700">.</span>
            </p>

            <p className="mt-1 hidden font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-gray-500 sm:block">
              Independent Daily Edition
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="border-b-2 border-transparent px-2 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:border-red-700 hover:text-red-700"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/admin"
                className="border-b-2 border-transparent px-2 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:border-red-700 hover:text-red-700"
              >
                Admin
              </Link>

              <button
                type="button"
                onClick={logout}
                className="border-2 border-black bg-black px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="border-2 border-black bg-red-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-black"
            >
              Login →
            </Link>
          )}
        </div>
      </div>

      {/* Editorial Line */}
      <div className="border-t border-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 md:px-8 lg:px-10">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500">
            News / Politics / Sports / Culture
          </span>

          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-red-700">
            Daily Edition
          </span>
        </div>
      </div>
    </nav>
  );
}