
import {
  BusFront,
  ShieldCheck,
  Heart,
  Clock3,
  MapPin,
  ArrowRight,
  Users,
  Route,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ShieldCheck,
    title: "Travel with confidence",
    description:
      "Explore bus details and seat availability before continuing through the demo booking flow.",
  },
  {
    icon: Clock3,
    title: "Simple booking",
    description:
      "Find your route, choose a bus, select seats, and enter passenger details in a few steps.",
  },
  {
    icon: Heart,
    title: "Designed for you",
    description:
      "Enjoy a clean, responsive experience that makes planning a journey feel effortless.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="container-main relative">
        {/* Heading */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
            <Sparkles size={16} />
            Discover Busora
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Every journey deserves a{" "}
            <span className="text-orange-500">better beginning.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            We created Busora to make exploring bus routes, comparing
            journeys, and planning your next adventure feel simple and
            convenient.
          </p>
        </div>

        {/* Main About layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="reveal-left group relative mx-auto w-full max-w-xl">
            <div className="absolute -left-4 -top-4 h-28 w-28 rounded-tl-3xl border-l-2 border-t-2 border-orange-300 sm:-left-6 sm:-top-6" />

            <div className="relative h-[340px] overflow-hidden rounded-3xl bg-slate-100 shadow-xl sm:h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1100&q=90"
                alt="Intercity coach bus ready for a journey"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="rounded-2xl bg-white/15 p-3 backdrop-blur-md">
                    <BusFront size={28} />
                  </span>

                  <div>
                    <p className="text-xl font-extrabold">
                      Your journey, your way
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      Discover your next destination
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 flex items-center gap-3 rounded-2xl border border-white bg-white p-4 shadow-xl sm:-right-5 sm:p-5">
              <span className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <MapPin size={24} />
              </span>

              <div>
                <p className="text-lg font-extrabold text-slate-900">
                  Explore more
                </p>
                <p className="text-xs text-slate-500">
                  Plan your next getaway
                </p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="reveal-right pt-4 lg:pt-0">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our story
            </span>

            <h3 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Making travel planning feel{" "}
              <span className="text-orange-500">effortless.</span>
            </h3>

            <p className="mt-5 leading-8 text-slate-600">
              Busora is a bus-booking website concept built around one
              simple idea: planning a trip should be straightforward.
              Whether you're visiting family, exploring a new city, or
              planning a weekend getaway, our interface brings the key
              steps together in one place.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Browse sample routes, compare bus options, explore seat
              layouts, and follow the booking flow with a clean,
              mobile-friendly design.
            </p>

            {/* Feature list */}
            <div className="reveal-stagger mt-8 space-y-5">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="group flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition duration-300 group-hover:rotate-6 group-hover:bg-orange-500 group-hover:text-white">
                    <Icon size={23} />
                  </span>

                  <div>
                    <h4 className="font-extrabold text-slate-900">
                      {title}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/search"
              className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              Explore bus routes
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Bottom highlights */}
        <div className="reveal-stagger mt-20 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <Users size={27} className="text-orange-500" />
            <h4 className="mt-4 text-lg font-extrabold text-slate-900">
              Passenger focused
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              A clear layout that helps you navigate each booking step.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <Route size={27} className="text-orange-500" />
            <h4 className="mt-4 text-lg font-extrabold text-slate-900">
              Explore destinations
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Discover destinations and browse available sample routes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
            <ShieldCheck size={27} className="text-orange-500" />
            <h4 className="mt-4 text-lg font-extrabold text-slate-900">
              Clear booking flow
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review your selected journey before completing the demo flow.
            </p>
          </div>
        </div>

        {/* Demo notice */}
        <p className="reveal mt-10 text-center text-xs leading-6 text-slate-400">
          Busora is a demonstration interface. Live bus schedules,
          real-time seat availability, and actual ticket reservations
          are not connected.
        </p>
      </div>
    </section>
  );
}
