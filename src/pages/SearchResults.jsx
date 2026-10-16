
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  Search,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  SlidersHorizontal,
  ArrowUpDown,
  Clock,
  Star,
  Bus,
  MapPin,
  CalendarDays,
  Armchair,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  buses,
  cities,
  formatPrice,
  formatDate,
  getTomorrowDate,
} from "../data/buses";
import { useBooking } from "../context/BookingContext";

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateBooking } = useBooking();

  const [from, setFrom] = useState(
    searchParams.get("from") || "Bengaluru"
  );
  const [to, setTo] = useState(searchParams.get("to") || "Chennai");
  const [date, setDate] = useState(
    searchParams.get("date") || getTomorrowDate()
  );
  const [sortBy, setSortBy] = useState("recommended");
  const [busType, setBusType] = useState("all");
  const [acOnly, setAcOnly] = useState(false);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!from || !to || from === to || !date) return;

    navigate(
      `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
    );
  };

  const results = useMemo(() => {
    let filtered = buses.filter((bus) => {
      const routeMatches =
        bus.from.toLowerCase() === from.toLowerCase() &&
        bus.to.toLowerCase() === to.toLowerCase();

      const typeMatches =
        busType === "all" ||
        (bus.busType || "").toLowerCase().includes(busType);

      const acMatches = !acOnly || (bus.busType || "").toLowerCase().includes("ac");

      return routeMatches && typeMatches && acMatches;
    });

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "departure") {
      filtered.sort((a, b) => a.departure.localeCompare(b.departure));
    }

    return filtered;
  }, [from, to, busType, acOnly, sortBy]);

  const selectBus = (bus) => {
    updateBooking({
      bus,
      from: bus.from,
      to: bus.to,
      date,
    });

    navigate(`/bus/${bus.id}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Search banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 px-4 py-8 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Find your next bus
          </h1>
          <p className="mt-2 text-sm text-blue-100 sm:text-base">
            Compare options and choose the journey that suits you.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 grid gap-3 rounded-2xl bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_1fr_auto]"
          >
            <div>
              <label
                htmlFor="from-city"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                From
              </label>
              <select
                id="from-city"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end justify-center">
              <button
                type="button"
                onClick={swapCities}
                aria-label="Swap departure and destination"
                className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700 transition hover:rotate-180 hover:bg-blue-100"
              >
                <ArrowLeftRight size={19} />
              </button>
            </div>

            <div>
              <label
                htmlFor="to-city"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                To
              </label>
              <select
                id="to-city"
                value={to}
                onChange={(event) => setTo(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="travel-date"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Travel date
              </label>
              <input
                id="travel-date"
                type="date"
                min={getTomorrowDate()}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-semibold text-slate-800 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={!from || !to || from === to || !date}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              Busora search results
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              {from} <span className="text-blue-700">→</span> {to}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              <CalendarDays size={15} className="mr-1 inline" />
              {date ? formatDate(date) : "Select a travel date"}
              <span className="mx-2">·</span>
              {results.length} bus{results.length === 1 ? "" : "es"} found
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={18} className="text-slate-500" />
            <label htmlFor="sort" className="text-sm font-semibold text-slate-600">
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="rating">Highest rated</option>
              <option value="departure">Departure time</option>
            </select>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[245px_1fr]">
          {/* Filters */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={19} className="text-blue-700" />
              <h3 className="font-extrabold text-slate-900">Filters</h3>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-bold text-slate-800">
                Bus type
              </p>
              <div className="space-y-3 text-sm text-slate-600">
                {[
                  { value: "all", label: "All buses" },
                  { value: "sleeper", label: "Sleeper" },
                  { value: "seater", label: "Seater" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2.5"
                  >
                    <input
                      type="radio"
                      name="bus-type"
                      value={option.value}
                      checked={busType === option.value}
                      onChange={(event) => setBusType(event.target.value)}
                      className="accent-blue-700"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={acOnly}
                  onChange={(event) => setAcOnly(event.target.checked)}
                  className="h-4 w-4 accent-blue-700"
                />
                AC buses only
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                setBusType("all");
                setAcOnly(false);
                setSortBy("recommended");
              }}
              className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:underline"
            >
              <X size={15} />
              Reset filters
            </button>
          </aside>

          {/* Bus cards */}
          <div className="space-y-5">
            {results.length > 0 ? (
              results.map((bus) => (
                <article
                  key={bus.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="grid sm:grid-cols-[190px_1fr]">
                    <div className="relative min-h-44 overflow-hidden bg-slate-100">
                      <img
                        src={bus.image}
                        alt={bus.operator}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-blue-800 shadow">
                        {bus.busType || "AC Bus"}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-900">
                            {bus.operator}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {bus.busType}
                          </p>
                          <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-amber-600">
                            <Star size={16} className="fill-amber-400" />
                            {bus.rating || "4.5"}
                            <span className="font-normal text-slate-400">
                              · Sample rating
                            </span>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-xs text-slate-500">Starting at</p>
                          <p className="mt-1 text-2xl font-extrabold text-blue-700">
                            {formatPrice(bus.price)}
                          </p>
                          <p className="text-xs text-slate-400">per seat</p>
                        </div>
                      </div>

                      <div className="my-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-slate-100 py-4">
                        <div>
                          <p className="text-xl font-extrabold text-slate-900">
                            {bus.departure}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-600">
                            {bus.from}
                          </p>
                        </div>

                        <div className="flex flex-col items-center text-slate-400">
                          <span className="text-xs">{bus.duration}</span>
                          <div className="my-1 flex items-center gap-1 text-blue-600">
                            <div className="h-px w-5 bg-slate-300" />
                            <Bus size={18} />
                            <div className="h-px w-5 bg-slate-300" />
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-extrabold text-slate-900">
                            {bus.arrival}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-600">
                            {bus.to}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Armchair size={15} />
                            {bus.seatsAvailable || 12} seats available
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck size={15} />
                            Demo listing
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => selectBus(bus)}
                          className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
                        >
                          View seats
                          <ArrowRight size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <MapPin size={30} />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                  No buses found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  There are no matching sample buses for this route and filter
                  combination. Try another route or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFrom("Bengaluru");
                    setTo("Chennai");
                    setBusType("all");
                    setAcOnly(false);
                    setSortBy("recommended");
                    setDate(getTomorrowDate());
                    navigate("/search");
                  }}
                  className="mt-5 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
                >
                  Show sample buses
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
