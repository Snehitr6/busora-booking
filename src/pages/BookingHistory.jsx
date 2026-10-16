
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  CalendarDays,
  MapPin,
  ArrowRight,
  BusFront,
  Clock,
  UserRound,
  CheckCircle2,
  Search,
  ShieldCheck,
} from "lucide-react";

function getSavedBookings() {
  try {
    const list = JSON.parse(
      localStorage.getItem("busoraBookings") || "[]"
    );

    const single = JSON.parse(
      localStorage.getItem("busora-booking") || "null"
    );

    const bookings = [
      ...(Array.isArray(list) ? list : list ? [list] : []),
      ...(single
        ? Array.isArray(single)
          ? single
          : [single]
        : []),
    ];

    const seen = new Set();

    return bookings.filter((booking, index) => {
      if (!booking || typeof booking !== "object") return false;

      const id = booking.bookingId || booking.id;

      if (!id) return true;

      if (seen.has(String(id))) return false;

      seen.add(String(id));
      return true;
    });
  } catch {
    return [];
  }
}

function readValue(object, paths, fallback = "") {
  for (const path of paths) {
    const value = path
      .split(".")
      .reduce((current, key) => current?.[key], object);

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return fallback;
}

function formatFare(value) {
  if (value === "" || value === null || value === undefined) {
    return "—";
  }

  const amount = Number(value);

  return Number.isFinite(amount)
    ? `₹${amount.toLocaleString("en-IN")}`
    : String(value);
}

function BookingCard({ booking, index }) {
  const bookingId = readValue(
    booking,
    ["bookingId", "id", "confirmation.bookingId"],
    `BOOK-${String(index + 1).padStart(4, "0")}`
  );

  const operator = readValue(
    booking,
    ["busName", "operator", "bus.name", "bus.operator"],
    "Bus booking"
  );

  const from = readValue(
    booking,
    ["from", "bus.from", "boarding.city", "boarding"],
    "Departure"
  );

  const to = readValue(
    booking,
    ["to", "bus.to", "dropping.city", "dropping"],
    "Destination"
  );

  const travelDate = readValue(
    booking,
    ["travelDate", "date", "bus.date", "journeyDate"],
    "Date not provided"
  );

  const departureTime = readValue(
    booking,
    ["departureTime", "time", "bus.departureTime"],
    ""
  );

  const passenger = readValue(
    booking,
    ["passengerName", "passenger.name", "contact.name"],
    ""
  );

  const seat = readValue(
    booking,
    ["seatNumber", "seat", "selectedSeat"],
    ""
  );

  const fare = readValue(
    booking,
    ["total", "amount", "price", "fare"],
    null
  );

  const status = readValue(
    booking,
    ["status", "bookingStatus"],
    "Booking saved"
  );

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BusFront size={24} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-extrabold text-slate-900">
              {operator}
            </h2>

            <p className="mt-1 break-all text-xs text-slate-500">
              Booking ID: {String(bookingId)}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          <CheckCircle2 size={14} />
          {String(status)}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              From
            </p>

            <h3 className="mt-2 break-words text-xl font-extrabold text-slate-900">
              {String(from)}
            </h3>
          </div>

          <div className="hidden items-center justify-center text-blue-500 sm:flex">
            <div className="h-px w-8 bg-blue-200" />
            <BusFront size={20} className="mx-2" />
            <div className="h-px w-8 bg-blue-200" />
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              To
            </p>

            <h3 className="mt-2 break-words text-xl font-extrabold text-slate-900">
              {String(to)}
            </h3>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={19}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <div>
              <p className="text-xs text-slate-500">Travel date</p>
              <p className="mt-1 break-words text-sm font-bold text-slate-800">
                {String(travelDate)}
              </p>
            </div>
          </div>

          {departureTime && (
            <div className="flex items-start gap-3">
              <Clock
                size={19}
                className="mt-0.5 shrink-0 text-blue-600"
              />
              <div>
                <p className="text-xs text-slate-500">Departure</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {String(departureTime)}
                </p>
              </div>
            </div>
          )}

          {passenger && (
            <div className="flex items-start gap-3">
              <UserRound
                size={19}
                className="mt-0.5 shrink-0 text-blue-600"
              />
              <div>
                <p className="text-xs text-slate-500">Passenger</p>
                <p className="mt-1 break-words text-sm font-bold text-slate-800">
                  {String(passenger)}
                </p>
              </div>
            </div>
          )}

          {seat && (
            <div className="flex items-start gap-3">
              <Ticket
                size={19}
                className="mt-0.5 shrink-0 text-blue-600"
              />
              <div>
                <p className="text-xs text-slate-500">Seat</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {String(seat)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Total fare
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {formatFare(fare)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck size={17} className="text-emerald-600" />
            Saved booking details
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BookingHistory() {
  const [bookings] = useState(getSavedBookings);

  return (
    <main className="min-h-[70vh] w-full bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Ticket size={15} />
            Your journeys
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Find your saved bus trips, check journey details, and review
            your booking information in one place.
          </p>
        </div>

        {bookings.length === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <Ticket size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
              No bookings yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              Once your booking flow saves a trip to local storage, your
              journey details will appear here.
            </p>

            <Link
              to="/search"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <Search size={18} />
              Search buses
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600">
                {bookings.length} saved{" "}
                {bookings.length === 1 ? "booking" : "bookings"}
              </p>

              <Link
                to="/search"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
              >
                Book another trip
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-5">
              {bookings.map((booking, index) => (
                <BookingCard
                  key={booking.bookingId || booking.id || index}
                  booking={booking}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
