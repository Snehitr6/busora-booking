import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightLeft,
  CalendarDays,
  MapPin,
  Search,
} from "lucide-react";
import { cities, getTomorrowDate } from "../data/buses";

export default function SearchForm({
  compact = false,
  initialFrom = "Bengaluru",
  initialTo = "Chennai",
  initialDate = getTomorrowDate(),
}) {
  const navigate = useNavigate();

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [error, setError] = useState("");

  function swapCities() {
    setFrom(to);
    setTo(from);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!from || !to || !date) {
      setError("Please select your departure city, destination, and date.");
      return;
    }

    if (from === to) {
      setError("Departure and destination cities must be different.");
      return;
    }

    setError("");

    const params = new URLSearchParams({ from, to, date });

    navigate(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`grid gap-3 ${
          compact
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto]"
        }`}
      >
        <label className="search-field">
          <span className="search-field-icon">
            <MapPin size={18} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="search-field-label">FROM</span>

            <select
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="search-field-control"
              aria-label="Departure city"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </span>
        </label>

        {!compact && (
          <button
            type="button"
            onClick={swapCities}
            className="hidden h-11 w-11 self-center rounded-full border border-slate-200 bg-white text-teal-800 transition hover:rotate-180 hover:border-teal-300 hover:bg-teal-50 md:flex md:items-center md:justify-center"
            aria-label="Swap departure and destination"
            title="Swap cities"
          >
            <ArrowRightLeft size={18} />
          </button>
        )}

        <label className="search-field">
          <span className="search-field-icon">
            <MapPin size={18} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="search-field-label">TO</span>

            <select
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="search-field-control"
              aria-label="Destination city"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="search-field">
          <span className="search-field-icon">
            <CalendarDays size={18} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="search-field-label">JOURNEY DATE</span>

            <input
              type="date"
              value={date}
              min={getTomorrowDate()}
              onChange={(event) => setDate(event.target.value)}
              className="search-field-control"
              aria-label="Journey date"
              required
            />
          </span>
        </label>

        <button type="submit" className="btn-primary min-h-14 px-5">
          <Search size={18} />
          Search
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}