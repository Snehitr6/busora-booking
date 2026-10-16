
import {
  ArrowRight,
  ShieldCheck,
  Headphones,
  Wallet,
  MapPin,
  Star,
  BusFront,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Reviews from "../components/Reviews";
import About from "../components/About";

const destinations = [
  {
    city: "Goa",
    subtitle: "Beaches & sunsets",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Mysuru",
    subtitle: "Culture & heritage",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Chennai",
    subtitle: "City by the coast",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Hyderabad",
    subtitle: "Food & history",
    image:
      "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Kochi",
    subtitle: "Backwaters & culture",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Mangaluru",
    subtitle: "Coastal getaways",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Coimbatore",
    subtitle: "Nature & mountain escapes",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
  {
    city: "Pune",
    subtitle: "City breaks & adventures",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85",
    from: "Bengaluru",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Travel with confidence",
    text: "Explore journey details and seat options before booking.",
  },
  {
    icon: Wallet,
    title: "Transparent fares",
    text: "Compare sample ticket prices before checkout.",
  },
  {
    icon: Headphones,
    title: "Simple experience",
    text: "Plan your journey on desktop, tablet, or mobile.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-clip">
      {/* Hero */}
      <div className="reveal">
        <Hero />
      </div>

      {/* Statistics */}
      <section className="reveal border-b border-slate-100 bg-white py-7">
        <div className="container-main grid gap-6 sm:grid-cols-3">
          {[
            ["100+", "Sample journeys"],
            ["24/7", "Browse anytime"],
            ["3 steps", "Simple booking flow"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="group flex items-center justify-center gap-3 transition duration-300 hover:-translate-y-1"
            >
              <span className="text-2xl font-extrabold text-orange-500 transition duration-300 group-hover:scale-110">
                {value}
              </span>

              <span className="text-sm font-semibold text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular destinations */}
      <section
        id="destinations"
        className="section-padding scroll-mt-20"
      >
        <div className="container-main">
          <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
                Explore India
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Popular destinations
              </h2>

              <p className="mt-3 text-slate-500">
                Find your next getaway from Bengaluru.
              </p>
            </div>

            <Link
              to="/search?from=Bengaluru&to=Chennai"
              className="group flex items-center gap-2 font-bold text-orange-500 transition duration-300 hover:gap-3 hover:text-orange-600"
            >
              Explore buses
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <Link
                key={destination.city}
                to={`/search?from=${encodeURIComponent(destination.from)}&to=${encodeURIComponent(destination.city)}`}
                className="group relative isolate h-[300px] overflow-hidden rounded-2xl bg-slate-300 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src={destination.image}
                  alt={`${destination.city} travel destination`}
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent transition duration-500 group-hover:from-slate-950/95" />

                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="flex items-center gap-1.5 text-sm text-white/85">
                    <MapPin size={15} />
                    {destination.subtitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold transition-transform duration-300 group-hover:-translate-y-1">
                    {destination.city}
                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-sm font-bold text-orange-300">
                    Find a bus
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="reveal bg-white py-16">
        <div className="container-main">
          <div className="reveal mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
              The Busora difference
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              A better way to travel
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              Everything you need to plan your journey in one place.
            </p>
          </div>

          <div className="reveal-stagger grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition duration-500 hover:-translate-y-2 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
              >
                <span className="inline-flex rounded-2xl bg-orange-100 p-3 text-orange-600 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={25} />
                </span>

                <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <div className="reveal">
        <Reviews />
      </div>

      {/* Booking call to action */}
      <section className="section-padding">
        <div className="container-main">
          <div className="reveal grid items-center gap-10 overflow-hidden rounded-3xl bg-orange-500 p-7 text-white sm:p-12 lg:grid-cols-2">
            <div className="reveal-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">
                <Sparkles size={16} />
                Your next adventure
              </span>

              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                Good journeys begin with a great plan.
              </h2>

              <p className="mt-4 max-w-lg leading-7 text-orange-50">
                Compare routes, find your preferred seat, and prepare your
                demo ticket in a few simple steps.
              </p>

              <Link
                to="/search?from=Bengaluru&to=Chennai"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-orange-600 transition duration-300 hover:-translate-y-1 hover:bg-orange-50"
              >
                Find your bus
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="reveal-right relative hidden min-h-[240px] items-center justify-center lg:flex">
              <div className="absolute h-64 w-64 rounded-full border border-white/20" />
              <div className="absolute h-48 w-48 rounded-full border border-white/25" />

              <div className="bus-float relative rounded-3xl bg-white p-9 text-orange-500 shadow-2xl">
                <BusFront size={110} strokeWidth={1.4} />
              </div>

              <div className="absolute right-3 top-5 rounded-xl bg-white/15 p-3">
                <Star size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About and demo notice */}
      <section
        id="about"
        className="reveal border-t border-slate-100 bg-white py-8"
      >
        <div className="container-main flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-4">
          <BusFront size={21} className="shrink-0 text-orange-500" />

          <p className="text-sm leading-6 text-slate-500">
            Busora is a demonstration booking interface using sample bus data.
            Real-time schedules and live reservations are not connected.
          </p>
        </div>
      </section>
      <About />
    </main>
  );
}
