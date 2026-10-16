
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bus,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Ticket,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Demo login only; connect an authentication API for real accounts.
    navigate("/");
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 md:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-700 p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[45px] border-white/5" />

          <Link to="/" className="relative z-10 inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Bus size={28} />
            </span>
            <span className="text-2xl font-extrabold">
              Busora<span className="text-blue-300">.</span>
            </span>
          </Link>

          <div className="relative z-10 py-10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Ticket size={34} />
            </div>
            <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
              Your next journey starts here.
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-blue-100">
              Sign in to make booking your next bus trip simple and convenient.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-blue-100">
              <ShieldCheck size={20} />
              A simpler way to plan your travels
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-200">
            Travel more. Worry less.
          </p>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-lg font-extrabold text-blue-700 md:hidden"
          >
            <Bus size={25} />
            Busora.
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Welcome back
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Sign in to Busora
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your details to continue your travel journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setError("Password recovery requires an authentication service.")
                  }
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Sign in
              <ArrowRight size={19} />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-blue-700 hover:underline"
            >
              Create account
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400">
            <ShieldCheck size={16} />
            Secure travel experience
          </div>
        </section>
      </div>
    </main>
  );
}
