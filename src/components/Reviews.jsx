import { Star, Quote, ShieldCheck } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    route: "Bengaluru → Chennai",
    initials: "PS",
    rating: 5,
    date: "Recent traveller",
    review:
      "The booking process was simple and the layout made it easy to compare routes. I could find the information I needed quickly.",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Rahul Kumar",
    route: "Bengaluru → Hyderabad",
    initials: "RK",
    rating: 5,
    date: "Recent traveller",
    review:
      "I liked the clean interface and straightforward seat selection. The journey details were easy to understand.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Ananya Reddy",
    route: "Chennai → Bengaluru",
    initials: "AR",
    rating: 5,
    date: "Recent traveller",
    review:
      "A neat and user-friendly booking experience. Finding a route and selecting a travel date was quick and convenient.",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function Reviews() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
              <Star size={14} fill="currentColor" />
              Traveller feedback
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Every journey deserves
              <span className="block text-orange-500">
                a better experience.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Discover a simpler way to explore routes, compare sample fares,
              and plan your next bus journey with Busora.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
              <Quote size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                Designed around travellers
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Simple, clear and convenient
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Sample review
                </span>
              </div>

              <p className="mt-6 flex-1 text-base leading-7 text-slate-600">
                “{review.review}”
              </p>

              <div className="my-6 h-px bg-slate-100" />

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${review.color}`}
                >
                  {review.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-slate-900">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {review.route}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {review.date}
                  </p>
                </div>

                <ShieldCheck
                  size={20}
                  className="shrink-0 text-teal-600"
                  aria-label="Trust indicator"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h3 className="font-bold text-slate-900">
              Ready to plan your next journey?
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Choose your departure city, destination and travel date.
            </p>
          </div>

          <a
            href="/search"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Explore buses
          </a>
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-400">
          Note: These are illustrative sample testimonials for the website
          design, not verified customer reviews.
        </p>
      </div>
    </section>
  );
}
