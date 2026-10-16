import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus, UserRound, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo signup only; no account is created on a server.
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-2xl" />

          <Link to="/" className="relative z-10 flex items-center gap-3 text-2xl font-black">
            <span className="rounded-xl bg-white p-2 text-blue-700">
              <Bus size={28} />
            </span>
            Busora
          </Link>

          <div className="relative z-10">
            <span className="mb-5 inline-block rounded-full border border-white/30 px-4 py-2 text-sm">
              Your journey starts here
            </span>
            <h1 className="mb-5 text-4xl font-black leading-tight lg:text-5xl">
              Travel more.
              <br />
              Worry less.
            </h1>
            <p className="max-w-sm leading-7 text-blue-100">
              Create your Busora account and enjoy a simple way to explore
              routes, compare buses, and plan your next journey.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-sm text-blue-100">
            <CheckCircle2 size={19} />
            <span>Easy booking experience, all in one place</span>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 md:p-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xl font-black text-blue-700 md:hidden">
              <Bus size={27} />
              Busora
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
                Get started
              </p>
              <h2 className="text-3xl font-black text-slate-900">Create account</h2>
              <p className="mt-2 text-sm text-slate-500">
                Join Busora and plan your next trip.
              </p>
            </div>

            {success ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 text-green-600" size={42} />
                <h3 className="text-lg font-bold text-green-800">Looks good!</h3>
                <p className="mt-2 text-sm text-green-700">
                  Demo validation completed. Redirecting to login…
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                    <UserRound size={19} className="shrink-0 text-slate-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                    <Mail size={19} className="shrink-0 text-slate-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                    <Lock size={19} className="shrink-0 text-slate-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm password
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                    <Lock size={19} className="shrink-0 text-slate-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
                >
                  Create Account
                  <ArrowRight size={19} />
                </button>
              </form>
            )}

            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Demo UI only. Real registration requires a backend authentication service.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
