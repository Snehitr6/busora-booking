
import { Route, Routes, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import BusDetails from "./pages/BusDetails";
import PassengerDetails from "./pages/PassengerDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import useScrollReveal from "./hooks/useScrollReveal";

function NotFound() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
        Page not found
      </p>

      <h1 className="mt-3 text-5xl font-extrabold text-slate-900">
        404
      </h1>

      <p className="mt-3 max-w-md text-slate-600">
        Sorry, we couldn't find the page you're looking for.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-orange-700"
      >
        Back to Home
      </Link>
    </main>
  );
}

export default function App() {
  const location = useLocation();

  // Enable reveal animations on page sections.
  useScrollReveal();

  const isAuthPage = ["/login", "/signup"].includes(
    location.pathname
  );

  // Smoothly scroll to the top after route changes.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip">
      {!isAuthPage && <Navbar />}

      <main className="w-full flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/search" element={<SearchResults />} />

          <Route path="/bus/:id" element={<BusDetails />} />

          <Route
            path="/passenger-details"
            element={<PassengerDetails />}
          />

          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route
            path="/my-bookings"
            element={<BookingHistory />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
