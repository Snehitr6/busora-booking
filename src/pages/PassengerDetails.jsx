
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bus, CheckCircle2 } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { formatPrice } from "../data/buses";

export default function PassengerDetails() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  const seats = booking.seats || [];

  const [passengers, setPassengers] = useState(() =>
    seats.map((seat, index) => ({
      id: `${seat}-${index}`,
      name: booking.passengers?.[index]?.name || "",
      age: booking.passengers?.[index]?.age || "",
      gender: booking.passengers?.[index]?.gender || "",
      seat,
    }))
  );

  const [email, setEmail] = useState(booking.contact?.email || "");
  const [phone, setPhone] = useState(booking.contact?.phone || "");
  const [error, setError] = useState("");

  function updatePassenger(index, field, value) {
    setPassengers((current) =>
      current.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!booking.bus) {
      navigate("/search");
      return;
    }

    if (seats.length === 0) {
      setError("Please go back and select at least one seat.");
      return;
    }

    const invalidPassenger = passengers.some(
      (passenger) =>
        !passenger.name.trim() ||
        !passenger.age ||
        Number(passenger.age) < 1 ||
        Number(passenger.age) > 120 ||
        !passenger.gender
    );

    if (invalidPassenger) {
      setError("Enter a valid name, age and gender for every passenger.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    updateBooking({
      passengers,
      contact: { email, phone: phone.replace(/\D/g, "") },
    });

    navigate("/booking-confirmation");
  }

  if (!booking.bus || seats.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
        <Bus size={42} className="text-orange-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Your booking isn't ready yet
        </h1>
        <p className="mt-2 text-slate-600">
          Choose a bus and select your seats before entering passenger details.
        </p>
        <Link
          to="/search"
          className="mt-6 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
        >
          Search Buses
        </Link>
      </main>
    );
  }

  const total = Number(booking.bus.price || 0) * seats.length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          to={`/bus/${booking.bus.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600"
        >
          <ArrowLeft size={17} />
          Back to seat selection
        </Link>

        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
            Step 2 of 3
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Passenger details
          </h1>
          <p className="mt-2 text-slate-600">
            Enter the details exactly as required for your trip.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Bus size={24} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-slate-900">
                {booking.bus.operator}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {booking.from} → {booking.to}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {booking.date || "Travel date not selected"} · Seats:{" "}
                {seats.join(", ")}
              </p>
            </div>
            <p className="whitespace-nowrap font-bold text-slate-900">
              {typeof formatPrice === "function"
                ? formatPrice(total)
                : `₹${total}`}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {passengers.map((passenger, index) => (
            <section
              key={passenger.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Passenger {index + 1}
                </h2>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                  Seat {passenger.seat}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    value={passenger.name}
                    onChange={(event) =>
                      updatePassenger(index, "name", event.target.value)
                    }
                    placeholder="Enter full name"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Age
                  <input
                    required
                    type="number"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={(event) =>
                      updatePassenger(index, "age", event.target.value)
                    }
                    placeholder="Enter age"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                  Gender
                  <select
                    required
                    value={passenger.gender}
                    onChange={(event) =>
                      updatePassenger(index, "gender", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              Contact details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Email address
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Mobile number
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  placeholder="10-digit mobile number"
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </label>
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Total ticket amount</p>
              <p className="text-2xl font-extrabold text-slate-900">
                {typeof formatPrice === "function"
                  ? formatPrice(total)
                  : `₹${total}`}
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              <CheckCircle2 size={19} />
              Continue to confirmation
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
