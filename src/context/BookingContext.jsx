
import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext(null);

const initialBooking = {
  bus: null,
  from: "",
  to: "",
  date: "",
  seats: [],
  passengers: [],
  boarding: "",
  dropping: "",
  contact: {
    email: "",
    phone: "",
  },
  bookingId: "",
};

function getSavedBooking() {
  try {
    const saved = localStorage.getItem("busora-booking");
    return saved ? { ...initialBooking, ...JSON.parse(saved) } : initialBooking;
  } catch {
    return initialBooking;
  }
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(getSavedBooking);

  useEffect(() => {
    try {
      localStorage.setItem("busora-booking", JSON.stringify(booking));
    } catch {
      // The app can still work if browser storage is unavailable.
    }
  }, [booking]);

  function updateBooking(updates) {
    setBooking((current) => ({ ...current, ...updates }));
  }

  function resetBooking() {
    setBooking(initialBooking);
    try {
      localStorage.removeItem("busora-booking");
    } catch {
      // Ignore storage errors.
    }
  }

  return (
    <BookingContext.Provider
      value={{ booking, updateBooking, resetBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}
