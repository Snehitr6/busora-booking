
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Clock,
  MapPin,
  Star,
  Wifi,
  BatteryCharging,
  Snowflake,
  ShieldCheck,
  CheckCircle2,
  Armchair,
  Coffee,
} from "lucide-react";
import { buses, formatPrice, formatDate, getTomorrowDate } from "../data/buses";
import { useBooking } from "../context/BookingContext";
import SeatLayout from "../components/SeatLayout";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBooking, date: savedDate } = useBooking();

  const bus = buses.find((item) => String(item.id) === String(id));

  const [travelDate, setTravelDate] = useState(savedDate || getTomorrowDate());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boarding, setBoarding] = useState("Main Bus Stand");
  const [dropping, setDropping] = useState("Central Bus Station");

  if (!bus) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Bus size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Bus not found
          </h1>
          <p className="mt-2 text-slate-500">
            This bus may no longer be available.
          </p>
          <Link
            to="/search"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
          >
            <ArrowLeft size={18} />
            Back to buses
          </Link>
        </div>
      </main>
    );
  }

  const toggleSeat = (seat) => {
    setSelectedSeats((current) =>
      current.includes(seat)
        ? current.filter((item) => item !== seat)
        : current.length < 6
          ? [...current, seat]
          : current
    );
  };

  const handleContinue = () => {
    if (!travelDate) {
      return;
    }

    if (selectedSeats.length === 0) {
      document.getElementById("seat-selection")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    updateBooking({
      bus,
      from: bus.from,
      to: bus.to,
      date: travelDate,
      seats: selectedSeats,
      passengers: selectedSeats.map((seat, index) => ({
        id: `${seat}-${index}`,
        name: "",
        age: "",
        gender: "",
        seat,
      })),
      boarding,
      dropping,
    });

    navigate("/passenger-details");
  };

  const amenities = Array.isArray(bus.amenities) ? bus.amenities : [];
  const getAmenityIcon = (amenity) => {
    const name = amenity.toLowerCase();
    if (name.includes("wifi")) return <Wifi size={18} />;
    if (name.includes("charg")) return <BatteryCharging size={18} />;
    if (name.includes("water")) return <Coffee size={18} />;
    return <Snowflake size={18} />;
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 px-4 py-8 text-white sm:px-6">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to results
          </button>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  {bus.busType || "AC Bus"}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                  <CheckCircle2 size={14} />
                  Available for booking
                </span>
              </div>

              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {bus.operator}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-blue-100">
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  {bus.rating || "4.5"} rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {bus.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Armchair size={16} />
                  {bus.seatsAvailable || 12} seats available
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100">Starting from</p>
              <p className="mt-1 text-3xl font-extrabold">
                {formatPrice(bus.price)}
                <span className="ml-1 text-sm font-normal text-blue-100">
                  / seat
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-7">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-extrabold text-slate-900">
              Journey details
            </h2>

            <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {bus.departure}
                </p>
                <p className="mt-1 font-bold text-slate-700">{bus.from}</p>
                <p className="mt-1 text-xs text-slate-500">Departure</p>
              </div>

              <div className="flex flex-col items-center text-blue-600">
                <span className="text-xs text-slate-500">{bus.duration}</span>
                <div className="my-2 flex items-center gap-1">
                  <div className="h-px w-8 bg-blue-200 sm:w-14" />
                  <Bus size={22} />
                  <div className="h-px w-8 bg-blue-200 sm:w-14" />
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-extrabold text-slate-900">
                  {bus.arrival}
                </p>
                <p className="mt-1 font-bold text-slate-700">{bus.to}</p>
                <p className="mt-1 text-xs text-slate-500">Arrival</p>
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <label
                htmlFor="travel-date"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Select travel date
              </label>
              <input
                id="travel-date"
                type="date"
                min={getTomorrowDate()}
                value={travelDate}
                onChange={(event) => setTravelDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:max-w-xs"
              />
              {travelDate && (
                <p className="mt-2 text-sm text-slate-500">
                  Travel date: {formatDate(travelDate)}
                </p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-extrabold text-slate-900">
              Bus amenities
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Comforts available on this journey
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {amenities.length > 0 ? (
                amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    <span className="text-blue-700">
                      {getAmenityIcon(amenity)}
                    </span>
                    {amenity}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  Please check with the bus operator for amenities.
                </p>
              )}
            </div>
          </section>

          <section
            id="seat-selection"
            className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Select your seats
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose up to 6 seats for your trip
                </p>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                {selectedSeats.length} selected
              </span>
            </div>

            <div className="mt-6">
              <SeatLayout
                selectedSeats={selectedSeats}
                onSeatSelect={toggleSeat}
              />
            </div>

            {selectedSeats.length >= 6 && (
              <p className="mt-3 text-sm text-amber-700">
                You have reached the maximum of 6 seats per booking.
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-extrabold text-slate-900">
              Boarding and dropping points
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="boarding"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Boarding point
                </label>
                <select
                  id="boarding"
                  value={boarding}
                  onChange={(event) => setBoarding(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Main Bus Stand</option>
                  <option>City Railway Station</option>
                  <option>Central Pickup Point</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dropping"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Dropping point
                </label>
                <select
                  id="dropping"
                  value={dropping}
                  onChange={(event) => setDropping(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Central Bus Station</option>
                  <option>City Railway Station</option>
                  <option>Airport Road</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold text-slate-900">
            Booking summary
          </h2>

          <div className="mt-5 flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <Bus size={23} />
            </div>
            <div>
              <p className="font-bold text-slate-900">{bus.operator}</p>
              <p className="mt-1 text-sm text-slate-500">{bus.busType}</p>
            </div>
          </div>

          <div className="mt-5 space-y-4 border-t border-slate-100 pt-5 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500">Route</span>
              <span className="text-right font-semibold text-slate-800">
                {bus.from} → {bus.to}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Travel date</span>
              <span className="font-semibold text-slate-800">
                {travelDate ? formatDate(travelDate) : "Select date"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-500">Selected seats</span>
              <span className="text-right font-semibold text-slate-800">
                {selectedSeats.length
                  ? selectedSeats.join(", ")
                  : "None selected"}
              </span>
            </div>
          </div>

          <div className="mt-5 border-t border-dashed border-slate-200 pt-5">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>
                {formatPrice(bus.price)} × {selectedSeats.length} seat(s)
              </span>
              <span>{formatPrice(bus.price * selectedSeats.length)}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-slate-800">Total amount</span>
              <span className="text-2xl font-extrabold text-blue-700">
                {formatPrice(bus.price * selectedSeats.length)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!travelDate || selectedSeats.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Continue to passengers
            <ArrowRight size={18} />
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
            <ShieldCheck size={16} className="text-emerald-600" />
            Secure booking experience
          </p>
        </aside>
      </div>
    </main>
  );
}
