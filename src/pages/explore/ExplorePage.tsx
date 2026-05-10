import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  Search,
  Sparkles,
  Star,
  TrendingUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/AppSidebar";
import { DestinationModal } from "@/components/explore/DestinationModal";
import {
  ctaLandscapeImage,
  exploreCategories,
  exploreInterests,
  exploreOffers,
  heroExploreImage,
  popularDestinations,
  recommendedDestinations,
  trendingSearches,
  type ExploreDestination
} from "@/data/explore";
import { cn } from "@/lib/utils";

function ExploreHeader() {
  return (
    <header className="hidden flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-serif text-4xl font-extrabold leading-tight text-[#1F261F] md:text-5xl">
          Hi, Explorer! <span className="font-sans text-3xl">👋</span>
        </h1>
        <p className="mt-2 text-base font-medium text-[#4F4A40] md:text-lg">
          Discover amazing places and experiences.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative grid h-12 w-12 place-items-center rounded-full border border-[#DDD4C6] bg-white shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-[#2E2A24]" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#D84E4E]" />
        </button>
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-[#DDD4C6] bg-white py-1.5 pl-1.5 pr-4 shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
        >
          <Avatar className="h-11 w-11">
            <AvatarImage
              src="https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
              alt="Heisenberg"
            />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-bold text-[#24221D] sm:block">
            Heisenberg
          </span>
          <ChevronDown className="h-4 w-4 text-[#605B52]" />
        </button>
      </div>
    </header>
  );
}

function SectionHeader({
  title,
  action,
  onAction
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="font-serif text-2xl font-bold text-[#1F261F]">{title}</h2>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="text-sm font-bold text-[#2F4F3E] transition-colors duration-300 hover:text-[#C46A2D]"
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}

function HeroBanner({
  query,
  setQuery,
  onSearch
}: {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative min-h-[380px] overflow-hidden rounded-3xl bg-[#2F4F3E] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
    >
      <img
        src={heroExploreImage}
        alt="Traveler watching hot air balloons over mountains"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7E8CF]/95 via-[#EBCB93]/45 to-[#1D251D]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F261F]/45 via-transparent to-white/10" />
      <div className="relative z-10 flex min-h-[380px] max-w-2xl flex-col justify-center px-8 py-10 md:px-12">
        <h2 className="max-w-lg font-serif text-5xl font-extrabold leading-tight text-[#1F261F] md:text-6xl">
          Explore the world your way
        </h2>
        <p className="mt-5 max-w-md text-base font-semibold leading-7 text-[#252821]">
          Find destinations, activities and experiences that match your travel style.
        </p>
        <form
          className="mt-9 max-w-xl"
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
        >
          <label className="flex h-16 items-center gap-3 rounded-full bg-white/95 p-2 pl-6 shadow-[0_18px_40px_rgba(31,38,31,0.16)] backdrop-blur transition-all duration-300 focus-within:scale-[1.01]">
            <Search className="h-6 w-6 shrink-0 text-[#1F261F]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search destinations, cities or activities..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#1F261F] outline-none placeholder:text-[#8B8377]"
            />
            <button
              type="submit"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2F4F3E] text-white transition-all duration-300 hover:bg-[#294536]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </label>
        </form>
      </div>
    </motion.section>
  );
}

function CategoryCard({
  category,
  activeCategory,
  onSelect
}: {
  category: (typeof exploreCategories)[number];
  activeCategory: string;
  onSelect: (category: string) => void;
}) {
  const Icon = category.icon;
  const isActive = activeCategory === category.id;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(isActive ? "All" : category.id)}
      className={cn(
        "min-h-[132px] rounded-3xl border p-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300",
        isActive ? "border-[#2F4F3E] bg-white" : "border-transparent bg-white/50"
      )}
    >
      <span className={cn("mx-auto grid h-14 w-14 place-items-center rounded-full", category.className)}>
        <Icon className="h-7 w-7" />
      </span>
      <span className="mt-4 block text-sm font-extrabold text-[#1F261F]">
        {category.label}
      </span>
    </motion.button>
  );
}

function DestinationCard({
  destination,
  compact,
  onSelect
}: {
  destination: ExploreDestination;
  compact?: boolean;
  onSelect: (destination: ExploreDestination) => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -7, scale: 1.015 }}
      className="overflow-hidden rounded-3xl border border-[#E8DED1] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
    >
      <button
        type="button"
        onClick={() => onSelect(destination)}
        className="block w-full text-left"
      >
        <div className="relative">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country}`}
            className={cn("w-full object-cover", compact ? "h-40" : "h-52")}
          />
          {destination.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-[#2F4F3E] shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
              {destination.badge}
            </span>
          ) : null}
        </div>
        <div className="p-5">
          <h3 className="font-serif text-2xl font-bold text-[#1F261F]">
            {destination.name}, {destination.country}{" "}
            <span className="font-sans text-xl">{destination.emoji}</span>
          </h3>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#6B6458]">
            <Star className="h-4 w-4 fill-[#E5A835] text-[#E5A835]" />
            {destination.rating} ({destination.reviews})
          </p>
          <p className="mt-3 text-sm font-extrabold text-[#1F261F]">
            From {destination.price}
          </p>
        </div>
      </button>
    </motion.article>
  );
}

function OfferCard({ offer }: { offer: (typeof exploreOffers)[number] }) {
  const Icon = offer.icon;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
    >
      <span className={cn("grid h-14 w-14 place-items-center rounded-2xl", offer.className)}>
        <Icon className="h-7 w-7" />
      </span>
      <div>
        <h3 className="text-sm font-extrabold text-[#1F261F]">{offer.title}</h3>
        <p className="mt-1 text-sm font-medium leading-6 text-[#5D574D]">
          {offer.description}
        </p>
      </div>
    </motion.article>
  );
}

function InterestCard({ interest }: { interest: (typeof exploreInterests)[number] }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="relative h-40 overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
    >
      <img src={interest.image} alt={interest.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-serif text-2xl font-bold">{interest.title}</h3>
        <p className="mt-1 text-sm font-semibold">{interest.subtitle}</p>
      </div>
    </motion.article>
  );
}

function BottomSection({
  query,
  setQuery,
  onSuggestion
}: {
  query: string;
  setQuery: (value: string) => void;
  onSuggestion: () => void;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-[#E8DED1] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#1F261F]">
            Trending Searches
          </h2>
          <TrendingUp className="h-5 w-5 text-[#2F4F3E]" />
        </div>
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => setQuery(tag)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300",
                query === tag
                  ? "border-[#2F4F3E] bg-[#2F4F3E] text-white"
                  : "border-[#E8DED1] bg-[#F7F4EE] text-[#302C25] hover:bg-white"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-[#E8DED1] bg-[#EFE5D5] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <img
          src={ctaLandscapeImage}
          alt=""
          className="absolute bottom-0 right-0 h-full w-1/2 object-cover opacity-35"
        />
        <div className="relative max-w-md">
          <h2 className="font-serif text-3xl font-bold text-[#1F261F]">
            Can&apos;t decide where to go?
          </h2>
          <p className="mt-3 text-base font-medium leading-7 text-[#4F4A40]">
            Get personalized suggestions based on your preferences and travel style.
          </p>
          <button
            type="button"
            onClick={onSuggestion}
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-2xl bg-[#2F4F3E] px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(47,79,62,0.22)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Suggestions <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ExplorePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [popularOffset, setPopularOffset] = useState(0);
  const [recommendedOffset, setRecommendedOffset] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<ExploreDestination | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle destination from URL query
  useEffect(() => {
    const handleUrlQuery = () => {
      const hash = window.location.hash;
      const queryIndex = hash.indexOf("?");
      if (queryIndex !== -1) {
        const searchParams = new URLSearchParams(hash.slice(queryIndex + 1));
        const destination = searchParams.get("destination");
        if (destination) {
          setQuery(destination);
          setMessage(`Showing results for "${destination}".`);
        }
      }
    };

    handleUrlQuery();
    window.addEventListener("hashchange", handleUrlQuery);
    return () => window.removeEventListener("hashchange", handleUrlQuery);
  }, []);

  const allDestinations = useMemo(
    () => [...popularDestinations, ...recommendedDestinations],
    []
  );

  const visiblePopular = useMemo(
    () =>
      [...popularDestinations.slice(popularOffset), ...popularDestinations.slice(0, popularOffset)],
    [popularOffset]
  );

  const visibleRecommended = useMemo(
    () => [
      ...recommendedDestinations.slice(recommendedOffset),
      ...recommendedDestinations.slice(0, recommendedOffset)
    ],
    [recommendedOffset]
  );

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allDestinations.filter((destination) => {
      const matchesCategory =
        activeCategory === "All" || destination.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${destination.name} ${destination.country} ${destination.category}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, allDestinations, query]);

  const selectDestination = (destination: ExploreDestination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1F261F]">
      <AppSidebar activeRoute="explore" darkMode={darkMode} onDarkModeChange={setDarkMode} />
      <main className="xl:ml-[282px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="mx-auto flex max-w-[1500px] flex-col gap-8 px-4 pt-3 pb-20 sm:px-6 lg:px-10 xl:px-12 xl:py-10"
        >
          <ExploreHeader />
          <HeroBanner
            query={query}
            setQuery={setQuery}
            onSearch={() =>
              setMessage(
                query.trim()
                  ? `${filteredResults.length} matches found for "${query.trim()}".`
                  : "Showing our favorite places to explore."
              )
            }
          />

          {message ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[#D9CEBE] bg-[#FFFBF4] px-5 py-3 text-sm font-bold text-[#2F4F3E] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              {message}
            </motion.div>
          ) : null}

          <section>
            <SectionHeader title="Browse by Category" action="View all" />
            <div className="grid grid-flow-col auto-cols-[42%] gap-5 overflow-x-auto pb-2 sm:auto-cols-[24%] lg:grid-flow-row lg:grid-cols-7 lg:overflow-visible lg:pb-0">
              {exploreCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  activeCategory={activeCategory}
                  onSelect={(categoryId) => {
                    setActiveCategory(categoryId);
                    setMessage(
                      categoryId === "All"
                        ? "Showing every travel style."
                        : `Filtered destinations by ${categoryId}.`
                    );
                  }}
                />
              ))}
            </div>
          </section>

          {(query || activeCategory !== "All") && (
            <section>
              <SectionHeader title="Matching Results" action="Clear" onAction={() => {
                setQuery("");
                setActiveCategory("All");
                setMessage("Filters cleared.");
              }} />
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {filteredResults.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    compact
                    onSelect={selectDestination}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="relative">
            <SectionHeader
              title="Popular Destinations"
              action="View all"
              onAction={() => setMessage("Popular destinations expanded.")}
            />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {visiblePopular.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onSelect={selectDestination}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setPopularOffset((current) => (current + 1) % popularDestinations.length)
              }
              className="absolute right-0 top-1/2 hidden h-12 w-12 translate-x-1/2 place-items-center rounded-full bg-white text-[#2F4F3E] shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 xl:grid"
              aria-label="Next popular destinations"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </section>

          <section className="relative">
            <SectionHeader title="Recommended for You" action="View all" />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {visibleRecommended.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  compact
                  onSelect={selectDestination}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setRecommendedOffset(
                  (current) => (current + 1) % recommendedDestinations.length
                )
              }
              className="absolute right-0 top-1/2 hidden h-12 w-12 translate-x-1/2 place-items-center rounded-full bg-white text-[#2F4F3E] shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 xl:grid"
              aria-label="Next recommended destinations"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </section>

          <section>
            <SectionHeader title="Deals & Offers" action="View all" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {exploreOffers.map((offer) => (
                <OfferCard key={offer.title} offer={offer} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Explore by Interest" action="View all" />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {exploreInterests.map((interest) => (
                <InterestCard key={interest.title} interest={interest} />
              ))}
            </div>
          </section>

          <BottomSection
            query={query}
            setQuery={(value) => {
              setQuery(value);
              setMessage(`Trending search applied: ${value}.`);
            }}
            onSuggestion={() =>
              setMessage("Suggestions are tuned for beaches, culture and warm weather.")
            }
          />
        </motion.div>
      </main>

      {/* Destination detail modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
}

