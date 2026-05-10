// Single source of truth for all trip detail data
// Used by both TripDetailsModal and BudgetPage

export type TripDetailData = {
  itinerary: { day: string; title: string; desc: string }[];
  hotels: { name: string; stars: number; nights: string; status: string; price: string }[];
  flights: { from: string; to: string; date: string; time: string; airline: string; status: string }[];
  activities: { name: string; category: string; price: string; booked: boolean }[];
  notes: string[];
  budget: { label: string; spent: number; total: number; color: string }[];
  remaining: string;
  totalBudget: number;
  tripDays: number;
  dates: string;
  stops: number;
  image: string;
  emoji: string;
  title: string;
};

export const tripDetailData: Record<string, TripDetailData> = {
  bali: {
    title: "Bali Getaway",
    emoji: "🌴",
    dates: "15 May – 23 May 2026",
    stops: 5,
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=400&q=80",
    totalBudget: 1450,
    tripDays: 8,
    remaining: "$370",
    itinerary: [
      { day: "Day 1 · 15 May", title: "Arrival & Seminyak Beach", desc: "Check in at The Layar, sunset at Seminyak, welcome dinner at Ku De Ta." },
      { day: "Day 2 · 16 May", title: "Ubud Cultural Tour", desc: "Monkey Forest, Tegallalang Rice Terraces, local art galleries & cooking class." },
      { day: "Day 3 · 17 May", title: "Temple Trail", desc: "Tanah Lot, Uluwatu Temple, Kecak fire dance at sunset." },
      { day: "Day 4 · 18 May", title: "Water Sports & Spa", desc: "Surfing lessons at Kuta Beach, afternoon spa & wellness at COMO Shambhala." },
      { day: "Day 5 · 19 May", title: "Mount Batur Sunrise", desc: "Pre-dawn hike, sunrise at the crater rim, natural hot springs." },
      { day: "Day 6–7 · 20–22 May", title: "Uluwatu & Nusa Dua", desc: "Cliff-top cafes, snorkelling, beach clubs, farewell dinner." },
      { day: "Day 8 · 23 May", title: "Departure", desc: "Check out, transfer to Ngurah Rai Airport, flight home." },
    ],
    hotels: [
      { name: "The Layar Seminyak",      stars: 5, nights: "2 nights", status: "Confirmed", price: "$320" },
      { name: "Komaneka at Bisma, Ubud", stars: 5, nights: "3 nights", status: "Confirmed", price: "$480" },
      { name: "Bulgari Resort Uluwatu",  stars: 5, nights: "2 nights", status: "Confirmed", price: "$580" },
    ],
    flights: [
      { from: "New Delhi (DEL)", to: "Bali (DPS)",      date: "15 May 2026", time: "06:30 → 14:45", airline: "IndiGo 6E-1234", status: "Confirmed" },
      { from: "Bali (DPS)",      to: "New Delhi (DEL)", date: "23 May 2026", time: "16:00 → 20:15", airline: "IndiGo 6E-1235", status: "Confirmed" },
    ],
    activities: [
      { name: "Ubud Cooking Class",    category: "Food & Culture", price: "$45", booked: true  },
      { name: "Kecak Dance Show",      category: "Culture",        price: "$20", booked: true  },
      { name: "Surfing Lesson – Kuta", category: "Adventure",      price: "$60", booked: false },
      { name: "Mount Batur Trek",      category: "Adventure",      price: "$35", booked: true  },
      { name: "COMO Shambhala Spa",    category: "Wellness",       price: "$80", booked: false },
    ],
    notes: [
      "Bring reef-safe sunscreen — Bali beaches require it.",
      "Exchange USD to IDR at airport for better rates.",
      "Download Grab app for local transport.",
      "Sarong required at all temples — usually provided at entrance.",
    ],
    // Budget tab data — matches hotel/flight/activity prices exactly
    budget: [
      { label: "Flights",      spent: 360, total: 400, color: "#3F7EA7" },
      { label: "Hotels",       spent: 800, total: 900, color: "#3C8B68" },
      { label: "Activities",   spent: 160, total: 250, color: "#C46A2D" },
      { label: "Food",         spent: 120, total: 200, color: "#E87565" },
      { label: "Transport",    spent: 40,  total: 100, color: "#9B6BB5" },
    ],
  },

  japan: {
    title: "Japan Spring",
    emoji: "🌸",
    dates: "01 Jun – 14 Jun 2026",
    stops: 7,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    totalBudget: 2350,
    tripDays: 14,
    remaining: "$1,050",
    itinerary: [
      { day: "Day 1 · 01 Jun", title: "Arrival in Tokyo",    desc: "Check in at Park Hyatt Tokyo, Shinjuku evening walk." },
      { day: "Day 2 · 02 Jun", title: "Tokyo Highlights",    desc: "Senso-ji Temple, Harajuku, Shibuya Crossing, Akihabara." },
      { day: "Day 3 · 03 Jun", title: "Day Trip to Nikko",   desc: "Tosho-gu Shrine, Kegon Falls, cedar forest trails." },
      { day: "Day 4 · 04 Jun", title: "Kyoto Arrival",       desc: "Shinkansen to Kyoto, Fushimi Inari at dusk." },
      { day: "Day 5 · 05 Jun", title: "Kyoto Temples",       desc: "Kinkaku-ji, Arashiyama Bamboo Grove, Nishiki Market." },
      { day: "Day 6 · 06 Jun", title: "Nara Day Trip",       desc: "Deer Park, Todai-ji Temple, traditional kaiseki dinner." },
      { day: "Day 7 · 07 Jun", title: "Osaka Food Tour",     desc: "Dotonbori, takoyaki, ramen, Osaka Castle." },
    ],
    hotels: [
      { name: "Park Hyatt Tokyo",       stars: 5, nights: "3 nights", status: "Confirmed", price: "$720" },
      { name: "The Ritz-Carlton Kyoto", stars: 5, nights: "3 nights", status: "Confirmed", price: "$850" },
      { name: "Conrad Osaka",           stars: 5, nights: "2 nights", status: "Pending",   price: "$480" },
    ],
    flights: [
      { from: "New Delhi (DEL)", to: "Tokyo (NRT)",      date: "01 Jun 2026", time: "08:00 → 20:30", airline: "ANA NH-828", status: "Confirmed" },
      { from: "Osaka (KIX)",     to: "New Delhi (DEL)", date: "14 Jun 2026", time: "11:00 → 15:45", airline: "ANA NH-829", status: "Confirmed" },
    ],
    activities: [
      { name: "Tsukiji Fish Market Tour", category: "Food",      price: "$55", booked: true  },
      { name: "Tea Ceremony Kyoto",       category: "Culture",   price: "$40", booked: true  },
      { name: "Mt. Fuji Day Trip",        category: "Adventure", price: "$90", booked: false },
      { name: "Sumo Morning Practice",    category: "Culture",   price: "$30", booked: false },
    ],
    notes: [
      "Get a Suica card at the airport for all train travel.",
      "Book Tsukiji outer market breakfast early — gets crowded.",
      "Cherry blossom season peaks early June in higher altitudes.",
      "Carry cash — many places don't accept cards.",
    ],
    budget: [
      { label: "Flights",    spent: 820,  total: 900,  color: "#3F7EA7" },
      { label: "Hotels",     spent: 1200, total: 1400, color: "#3C8B68" },
      { label: "Activities", spent: 95,   total: 300,  color: "#C46A2D" },
      { label: "Food",       spent: 180,  total: 350,  color: "#E87565" },
      { label: "Transport",  spent: 55,   total: 150,  color: "#9B6BB5" },
    ],
  },

  greece: {
    title: "Greek Islands",
    emoji: "🌊",
    dates: "10 Jul – 20 Jul 2026",
    stops: 4,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80",
    totalBudget: 1850,
    tripDays: 10,
    remaining: "$650",
    itinerary: [
      { day: "Day 1 · 10 Jul", title: "Athens Arrival",       desc: "Check in at Hotel Grande Bretagne, Plaka evening stroll." },
      { day: "Day 2 · 11 Jul", title: "Athens Highlights",    desc: "Acropolis, Parthenon, National Archaeological Museum." },
      { day: "Day 3 · 12 Jul", title: "Ferry to Santorini",   desc: "Morning ferry, check in at Canaves Oia, sunset at Oia." },
      { day: "Day 4 · 13 Jul", title: "Santorini Exploration",desc: "Caldera hike, wine tasting, black sand beach at Perissa." },
      { day: "Day 5 · 14 Jul", title: "Mykonos",              desc: "Ferry to Mykonos, Little Venice, beach clubs." },
    ],
    hotels: [
      { name: "Hotel Grande Bretagne, Athens", stars: 5, nights: "2 nights", status: "Confirmed", price: "$380" },
      { name: "Canaves Oia Suites, Santorini", stars: 5, nights: "2 nights", status: "Confirmed", price: "$620" },
      { name: "Cavo Tagoo, Mykonos",           stars: 5, nights: "2 nights", status: "Pending",   price: "$540" },
    ],
    flights: [
      { from: "New Delhi (DEL)", to: "Athens (ATH)",     date: "10 Jul 2026", time: "09:00 → 14:30", airline: "Lufthansa LH-761", status: "Confirmed" },
      { from: "Mykonos (JMK)",   to: "New Delhi (DEL)", date: "20 Jul 2026", time: "13:00 → 23:45", airline: "Lufthansa LH-762", status: "Confirmed" },
    ],
    activities: [
      { name: "Acropolis Guided Tour",    category: "Culture",     price: "$35", booked: true  },
      { name: "Santorini Caldera Cruise", category: "Adventure",   price: "$75", booked: false },
      { name: "Greek Cooking Class",      category: "Food",        price: "$50", booked: true  },
      { name: "Mykonos Windmills Sunset", category: "Sightseeing", price: "$0",  booked: false },
    ],
    notes: [
      "Book ferry tickets in advance — summer routes fill up fast.",
      "Santorini sunsets are best viewed from Oia village.",
      "Carry euros — smaller islands may not accept cards.",
      "Dress modestly when visiting churches and monasteries.",
    ],
    budget: [
      { label: "Flights",    spent: 650, total: 750,  color: "#3F7EA7" },
      { label: "Hotels",     spent: 900, total: 1000, color: "#3C8B68" },
      { label: "Activities", spent: 85,  total: 200,  color: "#C46A2D" },
      { label: "Food",       spent: 95,  total: 200,  color: "#E87565" },
      { label: "Transport",  spent: 120, total: 200,  color: "#9B6BB5" },
    ],
  },
};
