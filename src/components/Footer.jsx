
import { Link } from "react-router-dom";
import {
  Bus,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Headphones,
  Clock,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Bus size={25} />
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Busora<span className="text-blue-400">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Your journey, made simpler. Discover routes, compare buses, and
              plan your next trip with Busora.
            </p>

            <div className="mt-5 flex gap-3">
              <SocialIcon
                href="https://www.instagram.com/"
                label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://www.facebook.com/"
                label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5V13h2.7v8h3.3Z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://www.linkedin.com/"
                label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3.6 9h3.2v11H3.6V9Zm5.2 0h3.1v1.5h.1c.5-.9 1.6-1.9 3.4-1.9 3.5 0 4.1 2.3 4.1 5.2V20h-3.2v-5.5c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H8.8V9Z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-white">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/search" label="Search buses" />
              <FooterLink to="/login" label="Login" />
              <FooterLink to="/signup" label="Create account" />
            </ul>
          </div>

          {/* Popular routes */}
          <div>
            <h3 className="font-bold text-white">Popular routes</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink
                to="/search?from=Bengaluru&to=Chennai"
                label="Bengaluru → Chennai"
              />
              <FooterLink
                to="/search?from=Bengaluru&to=Hyderabad"
                label="Bengaluru → Hyderabad"
              />
              <FooterLink
                to="/search?from=Chennai&to=Bengaluru"
                label="Chennai → Bengaluru"
              />
              <FooterLink
                to="/search?from=Hyderabad&to=Bengaluru"
                label="Hyderabad → Bengaluru"
              />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white">Get in touch</h3>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-blue-400" />
                <p className="leading-6 text-slate-400">
                  Travel with comfort, wherever life takes you.
                </p>
              </div>

              <a
                href="mailto:support@busora.example"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={18} className="shrink-0 text-blue-400" />
                <span>Email support</span>
                <ArrowUpRight size={14} />
              </a>

              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={18} className="shrink-0 text-blue-400" />
                <span>Phone support coming soon</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Headphones size={18} className="shrink-0 text-blue-400" />
                <span>Customer assistance</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Clock size={18} className="shrink-0 text-blue-400" />
                <span>Plan your trip anytime</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Busora. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-emerald-400" />
              Travel with confidence
            </span>
            <Link to="/" className="transition hover:text-white">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="inline-flex items-center gap-1 transition hover:text-white"
      >
        {label}
        <ArrowUpRight
          size={13}
          className="transition group-hover:translate-x-0.5"
        />
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
    >
      <span className="h-5 w-5">{children}</span>
    </a>
  );
}
