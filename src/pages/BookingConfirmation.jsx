
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Ticket,
  MapPin,
  CalendarDays,
  Clock,
  Users,
  ArrowRight,
  Home,
  Download,
} from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { formatDate, formatPrice } from "../data/buses";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { bus, from, to, date, seats, passengers, confirmation, clearBooking } =
    useBooking();

  const bookingId =
    confirmation?.bookingId ||
    confirmation?.id ||
    `BUS${Date.now().toString().slice(-8)}`;

  const busFrom = bus?.from || from || "Bengaluru";
  const busTo = bus?.to || to || "Chennai";
  const travelDate = date || bus?.date || "";
  const seatList = Array.isArray(seats) ? seats : [];
  const passengerList = Array.isArray(passengers) ? passengers : [];
  const seatCount = seatList.length || passengerList.length || 1;
  const totalPrice = (bus?.price || 999) * seatCount;

  const handleNewBooking = () => {
    clearBooking();
    navigate("/");
  };

  const handleDownload = () => {
    const ticketText = [
      "BUSORA - BOOKING CONFIRMATION",
      "--------------------------------",
      `Booking ID: ${bookingId}`,
      `Operator: ${bus?.operator || "Busora Travel Partner"}`,
      `Bus Type: ${bus?.busType || "AC Sleeper"}`,
      `From: ${busFrom}`,
      `To: ${busTo}`,
      `Travel Date: ${travelDate ? formatDate(travelDate) : "Not specified"}`,
      `Departure: ${bus?.departure || "To be confirmed"}`,
      `Arrival: ${bus?.arrival || "To be confirmed"}`,
      `Seats: ${seatList.length ? seatList.join(", ") : "To be assigned"}`,
      `Passengers: ${seatCount}`,
      `Total Paid: ${formatPrice(totalPrice)}`,
      "",
      "Thank you for booking with Busora!",
    ].join("\n");

    const blob = new Blob([ticketText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Busora-Ticket-${bookingId}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2
              size={44}
              className="text-emerald-600"
              strokeWidth={1.8}
            />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
            Booking successful
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Your trip is confirmed!
          </h1>

          <p className="mt-3 text-slate-500">
            Your Busora booking details are ready.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-6 text-white sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-blue-100">Booking reference</p>
                <p className="mt-1 text-xl font-extrabold tracking-wider">
                  {bookingId}
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-3">
                <Ticket size={30} />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div>
                <p className="text-sm text-slate-500">From</p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                  {busFrom}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {bus?.departure || "Departure time"}
                </p>
              </div>

              <div className="hidden text-blue-600 sm:block">
                <ArrowRight size={28} />
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-slate-500">To</p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                  {busTo}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {bus?.arrival || "Arrival time"}
                </p>
              </div>
            </div>

            <div className="my-7 border-t border-dashed border-slate-200" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoItem
                icon={<CalendarDays size={19} />}
                label="Travel date"
                value={travelDate ? formatDate(travelDate) : "Not specified"}
              />

              <InfoItem
                icon={<Clock size={19} />}
                label="Journey duration"
                value={bus?.duration || "See operator details"}
              />

              <InfoItem
                icon={<Users size={19} />}
                label="Passengers"
                value={`${seatCount} passenger${seatCount === 1 ? "" : "s"}`}
              />

              <InfoItem
                icon={<Ticket size={19} />}
                label="Seat number(s)"
                value={seatList.length ? seatList.join(", ") : "To be assigned"}
              />

              <InfoItem
                icon={<MapPin size={19} />}
                label="Bus operator"
                value={bus?.operator || "Busora Travel Partner"}
              />

              <InfoItem
                icon={<Ticket size={19} />}
                label="Bus type"
                value={bus?.busType || "AC Sleeper"}
              />
            </div>

            {passengerList.length > 0 && (
              <div className="mt-7 rounded-2xl bg-slate-50 p-4">
                <h3 className="mb-3 font-bold text-slate-900">
                  Passenger details
                </h3>

                <div className="space-y-3">
                  {passengerList.map((passenger, index) => (
                    <div
                      key={passenger.id || index}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="text-slate-600">
                        {passenger.name || `Passenger ${index + 1}`}
                      </span>
                      <span className="text-slate-500">
                        {passenger.age ? `${passenger.age} years` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between rounded-2xl bg-emerald-50 p-5">
              <div>
                <p className="text-sm text-slate-600">Total amount</p>
                <p className="mt-1 text-xs text-slate-500">
                  {seatCount} seat{seatCount === 1 ? "" : "s"}
                </p>
              </div>

              <p className="text-2xl font-extrabold text-emerald-700">
                {formatPrice(totalPrice)}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownload}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white transition hover:bg-blue-800"
              >
                <Download size={18} />
                Download ticket
              </button>

              <button
                type="button"
                onClick={handleNewBooking}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Home size={18} />
                Book another trip
              </button>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-sm text-slate-500">
          Thank you for choosing Busora. Have a safe journey!
        </p>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Return to home
          </Link>
        </div>
      </div>
    </main>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 break-words font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
