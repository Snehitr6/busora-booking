
import { Armchair, Check } from "lucide-react";

const seats = [
  { id: "A1", row: 1, col: 1 },
  { id: "A2", row: 1, col: 2 },
  { id: "A3", row: 1, col: 4 },
  { id: "A4", row: 1, col: 5 },
  { id: "B1", row: 2, col: 1 },
  { id: "B2", row: 2, col: 2 },
  { id: "B3", row: 2, col: 4 },
  { id: "B4", row: 2, col: 5 },
  { id: "C1", row: 3, col: 1 },
  { id: "C2", row: 3, col: 2 },
  { id: "C3", row: 3, col: 4 },
  { id: "C4", row: 3, col: 5 },
  { id: "D1", row: 4, col: 1 },
  { id: "D2", row: 4, col: 2 },
  { id: "D3", row: 4, col: 4 },
  { id: "D4", row: 4, col: 5 },
  { id: "E1", row: 5, col: 1 },
  { id: "E2", row: 5, col: 2 },
  { id: "E3", row: 5, col: 4 },
  { id: "E4", row: 5, col: 5 },
  { id: "F1", row: 6, col: 1 },
  { id: "F2", row: 6, col: 2 },
  { id: "F3", row: 6, col: 4 },
  { id: "F4", row: 6, col: 5 },
];

const bookedSeats = ["A2", "B4", "C1", "D3", "E2", "F4"];

export default function SeatLayout({
  selectedSeats = [],
  onSeatSelect = () => {},
}) {
  const selected = Array.isArray(selectedSeats) ? selectedSeats : [];

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="font-bold text-slate-800">Choose your seat</p>
            <p className="mt-1 text-xs text-slate-500">
              Front of the bus
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
            <Armchair size={24} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:gap-x-3">
          {seats.map((seat) => {
            const isBooked = bookedSeats.includes(seat.id);
            const isSelected = selected.includes(seat.id);

            return (
              <div key={seat.id} className="flex justify-center">
                {seat.col === 3 ? (
                  <div className="flex h-12 w-10 items-center justify-center text-xs text-slate-300">
                    {seat.row}
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isBooked}
                    onClick={() => onSeatSelect(seat.id)}
                    aria-label={`Seat ${seat.id}${
                      isBooked
                        ? ", booked"
                        : isSelected
                          ? ", selected"
                          : ", available"
                    }`}
                    aria-pressed={isSelected}
                    className={`relative flex h-12 w-10 flex-col items-center justify-center rounded-xl border transition duration-200 sm:h-14 sm:w-12 ${
                      isBooked
                        ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400"
                        : isSelected
                          ? "scale-105 border-blue-700 bg-blue-700 text-white shadow-md shadow-blue-200"
                          : "border-emerald-200 bg-white text-emerald-700 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50"
                    }`}
                  >
                    {isSelected ? (
                      <Check size={17} strokeWidth={3} />
                    ) : (
                      <Armchair size={18} />
                    )}

                    <span className="mt-0.5 text-[10px] font-bold">
                      {seat.id}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 border-t border-slate-200 pt-5 text-xs font-medium text-slate-600">
          <Legend color="bg-white border-emerald-300" label="Available" />
          <Legend color="bg-blue-700 border-blue-700" label="Selected" />
          <Legend color="bg-slate-200 border-slate-200" label="Booked" />
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Demo seat layout. Availability is sample data.
      </p>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded border ${color}`} />
      <span>{label}</span>
    </div>
  );
}
