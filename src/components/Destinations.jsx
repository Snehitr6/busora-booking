
import { MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Goa",
    category: "Beaches & sunsets",
    from: "Bengaluru",
    to: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mysuru",
    category: "Culture & heritage",
    from: "Bengaluru",
    to: "Mysuru",
    image:
      "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Chennai",
    category: "City by the coast",
    from: "Bengaluru",
    to: "Chennai",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hyderabad",
    category: "Food & history",
    from: "Bengaluru",
    to: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Coimbatore",
    category: "Nature & mountain escapes",
    from: "Bengaluru",
    to: "Coimbatore",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kochi",
    category: "Backwaters & culture",
    from: "Bengaluru",
    to: "Kochi",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mangaluru",
    category: "Coastal getaways",
    from: "Bengaluru",
    to: "Mangaluru",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pune",
    category: "City breaks & adventures",
    from: "Bengaluru",
    to: "Pune",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Destinations() {
  const navigate = useNavigate();

  function findBus(destination) {
    navigate(
      `/search?from=${encodeURIComponent(destination.from)}&to=${encodeURIComponent(destination.to)}`
    );
  }

  function exploreBuses() {
    navigate("/search");
  }

  return (
    <section
      id="destinations"
      className="overflow-hidden bg-slate-50 px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              Explore India
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Popular destinations
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Find your next getaway from Bengaluru.
            </p>
          </div>

          <button
            type="button"
            onClick={exploreBuses}
            className="hidden shrink-0 items-center gap-2 pb-1 text-sm font-bold text-slate-900 transition hover:text-blue-700 sm:inline-flex"
          >
            Explore buses <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination, index) => (
            <button
              key={destination.name}
              type="button"
              onClick={() => findBus(destination)}
              aria-label={`Find buses from Bengaluru to ${destination.name}`}
              className="group relative h-[300px] overflow-hidden rounded-2xl bg-slate-300 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 sm:h-[320px]"
            >
              <img
                src={destination.image}
                alt={destination.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

              <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="flex items-center gap-1.5 text-sm font-medium text-white/85">
                  <MapPin size={15} />
                  {destination.category}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold">
                  {destination.name}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 transition group-hover:gap-3">
                  Find a bus <ArrowRight size={17} />
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={exploreBuses}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-700 sm:hidden"
        >
          Explore all buses <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
