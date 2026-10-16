import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeftRight,
  CalendarDays,
  MapPin,
  Search,
  ShieldCheck,
  Armchair,
  Sparkles,
  Clock3,
} from "lucide-react";
import { cities, getTomorrowDate } from "../data/buses";

export default function Hero() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("Bengaluru");
  const [to, setTo] = useState("Chennai");
  const [date, setDate] = useState(getTomorrowDate());

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!from || !to || from === to || !date) {
      return;
    }

    navigate(
      `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&date=${encodeURIComponent(date)}`
    );
  };

  return (
    <section
      id="home"
      className="relative isolate min-h-[680px] w-full overflow-hidden bg-slate-950 text-white lg:min-h-[720px]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/65" />

      {/* Main layout */}
      <div className="mx-auto grid min-h-[680px] w-full max-w-[1800px] grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-6 lg:py-12 xl:gap-14 xl:px-8 2xl:px-12">
        {/* Left content */}
        <div className="animate-fade relative z-10 w-full min-w-0 lg:-translate-x-3 xl:-translate-x-5">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100 backdrop-blur-md">
            <Sparkles size={17} className="text-orange-400" />
            A better way to travel
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[54px] xl:text-[62px]">
            Every journey begins with{" "}
            <span className="text-teal-300">a better ride.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
            Discover comfortable buses, compare fares, pick your favourite
            seats, and book your next trip in just a few clicks.
          </p>

          {/* Hero buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("booking-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-950/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Find your bus
              <ArrowRight size={19} />
            </button>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("destinations")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20"
            >
              Explore routes
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4 text-sm font-semibold text-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck size={19} className="text-teal-300" />
              Simple booking
            </div>

            <div className="flex items-center gap-2">
              <Armchair size={19} className="text-teal-300" />
              Easy seat selection
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={19} className="text-teal-300" />
              Plan your trip
            </div>
          </div>

          {/* Trust note */}
          <div className="mt-10 inline-flex max-w-full items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/25 p-3 backdrop-blur-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300">
              <ShieldCheck size={23} />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Your journey, made simpler
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Compare routes and choose your seats.
              </p>
            </div>
          </div>
        </div>

        {/* Right booking card */}
        <div
          id="booking-form"
          className="relative z-10 w-full min-w-0 scroll-mt-24 lg:translate-x-3 xl:translate-x-5"
        >
          <div className="mx-auto w-full max-w-[600px] rounded-[30px] bg-white p-3 text-slate-900 shadow-2xl shadow-black/25 sm:p-4 lg:mx-0 lg:max-w-none">
            {/* Card banner */}
            <div
              className="relative flex h-[210px] items-end overflow-hidden rounded-[23px] bg-cover bg-center sm:h-[245px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=90')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-slate-950/10" />

              <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-slate-950/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                BUSORA
              </div>

              <div className="relative z-10 p-5 sm:p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-200">
                  Your next adventure
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                  Travel your way.
                </h2>

                <p className="mt-2 text-sm text-slate-200">
                  Find your route. Enjoy the ride.
                </p>
              </div>
            </div>

            {/* Search form */}
            <div className="p-3 pt-6 sm:p-5 sm:pt-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-700">
                Plan your journey
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                Where are you headed?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select your cities and travel date.
              </p>

              <form onSubmit={handleSearch} className="mt-6 space-y-4">
                {/* From and To */}
                <div className="grid grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] items-end gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <label
                      htmlFor="from-city"
                      className="mb-2 block text-xs font-bold uppercase text-slate-500"
                    >
                      From
                    </label>

                    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 sm:px-4">
                      <MapPin
                        size={18}
                        className="shrink-0 text-teal-600"
                      />

                      <select
                        id="from-city"
                        value={from}
                        onChange={(event) => setFrom(event.target.value)}
                        className="w-full min-w-0 appearance-none bg-transparent py-4 text-sm font-medium text-slate-700 outline-none"
                        required
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSwap}
                    aria-label="Swap departure and destination"
                    className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-teal-700 transition duration-300 hover:rotate-180 hover:bg-teal-100"
                  >
                    <ArrowLeftRight size={19} />
                  </button>

                  <div className="min-w-0">
                    <label
                      htmlFor="to-city"
                      className="mb-2 block text-xs font-bold uppercase text-slate-500"
                    >
                      To
                    </label>

                    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 sm:px-4">
                      <MapPin
                        size={18}
                        className="shrink-0 text-orange-500"
                      />

                      <select
                        id="to-city"
                        value={to}
                        onChange={(event) => setTo(event.target.value)}
                        className="w-full min-w-0 appearance-none bg-transparent py-4 text-sm font-medium text-slate-700 outline-none"
                        required
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Travel date */}
                <div>
                  <label
                    htmlFor="journey-date"
                    className="mb-2 block text-xs font-bold uppercase text-slate-500"
                  >
                    Journey date
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10">
                    <CalendarDays
                      size={19}
                      className="shrink-0 text-teal-600"
                    />

                    <input
                      id="journey-date"
                      type="date"
                      value={date}
                      min={getTomorrowDate()}
                      onChange={(event) => setDate(event.target.value)}
                      className="w-full min-w-0 bg-transparent py-4 text-sm font-medium text-slate-700 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Validation message */}
                {from === to && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    Please select two different cities.
                  </p>
                )}

                {/* Search button */}
                <button
                  type="submit"
                  disabled={!from || !to || from === to || !date}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Search size={20} />
                  Search available buses
                  <ArrowRight size={19} />
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Compare routes, check available seats, and plan your trip.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
