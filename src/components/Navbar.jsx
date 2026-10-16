import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Bus,
  Menu,
  X,
  UserRound,
  Ticket,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Search Buses", to: "/search" },
    { label: "My Bookings", to: "/booking-confirmation" },
  ];

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
    }`;

  return (
    <>
      {/* Fixed navbar */}
      <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="flex h-[76px] w-full items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-700/20 transition group-hover:-rotate-3 group-hover:scale-105">
              <Bus size={25} strokeWidth={2.2} />
            </span>

            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Busora<span className="text-blue-700">.</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              <UserRound size={18} />
              Login
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-700/15 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Get Started
              <Ticket size={17} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <UserRound size={17} />
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Get Started
                <Ticket size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Reserve space for the fixed navbar */}
      <div aria-hidden="true" className="h-[76px] w-full" />
    </>
  );
}
