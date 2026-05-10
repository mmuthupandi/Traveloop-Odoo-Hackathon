export type NoteCategory =
  | "Important"
  | "Day Plan"
  | "Contacts"
  | "Food"
  | "Ideas"
  | "Shopping";

export type NoteType = "text" | "checklist";

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

export type Note = {
  id: string;
  title: string;
  category: NoteCategory;
  trip: string;
  date: string;
  stop: string;
  preview: string;
  content: string;
  type: NoteType;
  checklist?: ChecklistItem[];
  archived: boolean;
  reminder?: string;
  createdAt: string;
  updatedAt: string;
};

export const TRIP_OPTIONS = [
  {
    id: "bali",
    title: "Bali Getaway",
    emoji: "🌴",
    dates: "15 May – 23 May 2026",
    stops: 5,
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "japan",
    title: "Japan Spring",
    emoji: "🌸",
    dates: "01 Jun – 14 Jun 2026",
    stops: 7,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "greece",
    title: "Greek Islands",
    emoji: "🌊",
    dates: "10 Jul – 20 Jul 2026",
    stops: 4,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80",
  },
];

export const CATEGORY_META: Record<NoteCategory, { color: string; bg: string; icon: string }> = {
  Important: { color: "#E87565", bg: "#FDECEA", icon: "AlertCircle" },
  "Day Plan": { color: "#3C8B68", bg: "#EAF4EE", icon: "CalendarDays" },
  Contacts:  { color: "#3F7EA7", bg: "#E6F1F8", icon: "Users" },
  Food:      { color: "#C46A2D", bg: "#F8EDE0", icon: "Utensils" },
  Ideas:     { color: "#9B6BB5", bg: "#F3EDF8", icon: "Lightbulb" },
  Shopping:  { color: "#7F7A70", bg: "#F0EDE8", icon: "ShoppingBag" },
};

export const INITIAL_NOTES: Note[] = [
  {
    id: "n1",
    title: "Hotel Check-in Details",
    category: "Important",
    trip: "Bali Getaway 🌴",
    date: "15 May 2026",
    stop: "Seminyak, Bali",
    preview: "Check-in at 14:00 · The Layar Seminyak · Confirmation #TL-2026-0512",
    content: `Check-in Time: 14:00\nCheck-out Time: 12:00\n\nHotel: The Layar Seminyak\nAddress: Jl. Drupadi No.1, Seminyak, Bali 80361\nPhone: +62 361 730 000\nConfirmation: #TL-2026-0512\n\nReminder: Bring passport for check-in. Pool villa includes private butler service.`,
    type: "text",
    archived: false,
    reminder: "15 May 2026, 12:00",
    createdAt: "10 May 2026, 09:15",
    updatedAt: "12 May 2026, 14:30",
  },
  {
    id: "n2",
    title: "Ubud Day Tour Notes",
    category: "Day Plan",
    trip: "Bali Getaway 🌴",
    date: "16 May 2026",
    stop: "Ubud, Bali",
    preview: "Monkey Forest → Tegallalang Rice Terraces → Cooking Class at 16:00",
    content: `Day 2 – Ubud Cultural Tour\n\n09:00 – Depart from Seminyak\n10:30 – Sacred Monkey Forest Sanctuary\n12:00 – Lunch at Locavore (book in advance!)\n14:00 – Tegallalang Rice Terraces\n15:30 – Local art galleries & silver workshops\n16:00 – Ubud Cooking Class ($45 pp)\n19:00 – Return to hotel\n\nTips: Wear comfortable shoes. Sarong required at Monkey Forest.`,
    type: "text",
    archived: false,
    createdAt: "11 May 2026, 10:00",
    updatedAt: "11 May 2026, 10:00",
  },
  {
    id: "n3",
    title: "Local Contacts",
    category: "Contacts",
    trip: "Bali Getaway 🌴",
    date: "15 May 2026",
    stop: "Bali, Indonesia",
    preview: "Driver: Wayan +62 812-3456-7890 · Guide: Made +62 813-9876-5432",
    content: `Local Driver – Wayan\nPhone: +62 812-3456-7890\nWhatsApp: Available\nRate: $40/day\n\nTour Guide – Made\nPhone: +62 813-9876-5432\nSpecialty: Cultural & temple tours\n\nEmergency – Bali Police: 110\nAmbulance: 118\nNearest Hospital: BIMC Kuta +62 361 761 263\n\nEmbassy – Indian Embassy Jakarta: +62 21 5204150`,
    type: "text",
    archived: false,
    createdAt: "10 May 2026, 08:00",
    updatedAt: "10 May 2026, 08:00",
  },
  {
    id: "n4",
    title: "Restaurant Recommendations",
    category: "Food",
    trip: "Bali Getaway 🌴",
    date: "15 May 2026",
    stop: "Seminyak, Bali",
    preview: "Ku De Ta for sunset · Locavore for fine dining · Warung Babi Guling for local",
    content: `Must-Try Restaurants – Bali\n\n🌅 Sunset Dining\n• Ku De Ta – Seminyak beach, cocktails & sunset\n• Single Fin – Uluwatu cliff views\n\n🍽️ Fine Dining\n• Locavore – Ubud, farm-to-table (book 2 weeks ahead)\n• Merah Putih – Seminyak, modern Indonesian\n\n🥘 Local Warung\n• Warung Babi Guling Ibu Oka – Ubud, suckling pig\n• Nasi Ayam Kedewatan – Ubud, local chicken rice\n\n☕ Cafes\n• Revolver Espresso – Seminyak\n• Seniman Coffee – Ubud`,
    type: "text",
    archived: false,
    createdAt: "12 May 2026, 11:00",
    updatedAt: "12 May 2026, 11:00",
  },
  {
    id: "n5",
    title: "Photo Spots to Explore",
    category: "Ideas",
    trip: "Bali Getaway 🌴",
    date: "17 May 2026",
    stop: "Uluwatu, Bali",
    preview: "Tegallalang at sunrise · Gates of Heaven · Uluwatu cliff at golden hour",
    content: `📸 Best Photo Spots – Bali\n\n🌅 Sunrise Shots\n• Tegallalang Rice Terraces – arrive by 7am\n• Mount Batur summit – pre-dawn hike\n\n🏛️ Iconic Landmarks\n• Pura Lempuyang "Gates of Heaven" – queue early\n• Tanah Lot Temple – sunset silhouette\n• Uluwatu Cliff Temple – golden hour\n\n🌊 Beach & Nature\n• Nusa Penida – Kelingking Beach cliff view\n• Sekumpul Waterfall – jungle trek required\n• Jatiluwih Rice Terraces – UNESCO site\n\nTip: Hire a local photographer for $50–80/half day.`,
    type: "text",
    archived: false,
    createdAt: "13 May 2026, 09:30",
    updatedAt: "13 May 2026, 09:30",
  },
  {
    id: "n6",
    title: "Things to Buy",
    category: "Shopping",
    trip: "Bali Getaway 🌴",
    date: "20 May 2026",
    stop: "Ubud, Bali",
    preview: "Batik fabric, silver jewellery, Kopi Luwak coffee, handmade crafts...",
    content: "Shopping checklist for Bali trip",
    type: "checklist",
    checklist: [
      { id: "c1", text: "Batik fabric (Ubud market)",         done: true  },
      { id: "c2", text: "Silver jewellery from Celuk village", done: true  },
      { id: "c3", text: "Kopi Luwak coffee (2 packs)",        done: false },
      { id: "c4", text: "Handmade wooden carvings",           done: false },
      { id: "c5", text: "Balinese sarong (temple visits)",    done: true  },
      { id: "c6", text: "Coconut oil & natural skincare",     done: false },
      { id: "c7", text: "Rattan bag from Seminyak",           done: false },
      { id: "c8", text: "Spice mix & sambal paste",           done: true  },
    ],
    archived: false,
    createdAt: "14 May 2026, 16:00",
    updatedAt: "20 May 2026, 10:15",
  },

  // ── Japan Spring 🌸 ──────────────────────────────────────────────────────
  {
    id: "n7",
    title: "Tokyo Hotel Check-in",
    category: "Important",
    trip: "Japan Spring 🌸",
    date: "01 Jun 2026",
    stop: "Shinjuku, Tokyo",
    preview: "Check-in at 15:00 · Park Hyatt Tokyo · Confirmation #PHT-2026-0601",
    content: `Check-in Time: 15:00\nCheck-out Time: 12:00\n\nHotel: Park Hyatt Tokyo\nAddress: 3-7-1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-1055\nPhone: +81 3-5322-1234\nConfirmation: #PHT-2026-0601\n\nReminder: 52nd floor lobby. Bring passport. Concierge can arrange Shinkansen tickets.`,
    type: "text",
    archived: false,
    reminder: "01 Jun 2026, 13:00",
    createdAt: "20 May 2026, 10:00",
    updatedAt: "25 May 2026, 09:30",
  },
  {
    id: "n8",
    title: "Kyoto Temple Day Plan",
    category: "Day Plan",
    trip: "Japan Spring 🌸",
    date: "05 Jun 2026",
    stop: "Kyoto, Japan",
    preview: "Kinkaku-ji → Arashiyama Bamboo Grove → Nishiki Market → Tea Ceremony",
    content: `Day 5 – Kyoto Cultural Day\n\n07:30 – Fushimi Inari Taisha (beat the crowds)\n09:30 – Kinkaku-ji (Golden Pavilion)\n11:00 – Ryoan-ji Rock Garden\n12:30 – Lunch at Nishiki Market\n14:00 – Arashiyama Bamboo Grove\n15:30 – Tenryu-ji Temple & garden\n16:30 – Tea Ceremony at Urasenke ($40 pp)\n19:00 – Gion district evening walk\n\nTips: Rent a bicycle for Arashiyama. Wear comfortable walking shoes.`,
    type: "text",
    archived: false,
    createdAt: "22 May 2026, 14:00",
    updatedAt: "22 May 2026, 14:00",
  },
  {
    id: "n9",
    title: "Japan Local Contacts",
    category: "Contacts",
    trip: "Japan Spring 🌸",
    date: "01 Jun 2026",
    stop: "Tokyo, Japan",
    preview: "Tour Guide: Yuki +81 90-1234-5678 · Emergency: 110 (Police) · 119 (Ambulance)",
    content: `Tour Guide – Yuki Tanaka\nPhone: +81 90-1234-5678\nLine: yukitanaka_guide\nSpecialty: Tokyo & Kyoto cultural tours\n\nEmergency Numbers:\nPolice: 110\nAmbulance / Fire: 119\nJapan Helpline (English): 0570-000-911\n\nNearest Hospital: St. Luke's International Tokyo\nPhone: +81 3-5550-7166\n\nEmbassy – Indian Embassy Tokyo: +81 3-3262-2391`,
    type: "text",
    archived: false,
    createdAt: "20 May 2026, 08:00",
    updatedAt: "20 May 2026, 08:00",
  },
  {
    id: "n10",
    title: "Must-Try Japanese Food",
    category: "Food",
    trip: "Japan Spring 🌸",
    date: "02 Jun 2026",
    stop: "Tokyo, Japan",
    preview: "Tsukiji sushi · Ichiran ramen · Matcha desserts at Nakamura Tokichi",
    content: `🍣 Tokyo Food Guide\n\n🐟 Sushi & Seafood\n• Tsukiji Outer Market – fresh sushi breakfast\n• Sushi Saito – Minato (book months ahead)\n• Uobei Shibuya – conveyor belt, great value\n\n🍜 Ramen\n• Ichiran – solo booths, tonkotsu broth\n• Fuunji – Shinjuku, tsukemen style\n\n🍡 Kyoto Specialties\n• Nakamura Tokichi – matcha parfait & desserts\n• Nishiki Market – street food & pickles\n• Kikunoi – kaiseki multi-course dinner\n\n🍱 Convenience Store Gems\n• 7-Eleven onigiri & egg salad sandwiches\n• Lawson karaage chicken`,
    type: "text",
    archived: false,
    createdAt: "25 May 2026, 11:00",
    updatedAt: "25 May 2026, 11:00",
  },
  {
    id: "n11",
    title: "Japan Shopping List",
    category: "Shopping",
    trip: "Japan Spring 🌸",
    date: "10 Jun 2026",
    stop: "Akihabara, Tokyo",
    preview: "Matcha kit kats, ceramics, anime merch, Uniqlo, cosmetics...",
    content: "Japan shopping checklist",
    type: "checklist",
    checklist: [
      { id: "j1", text: "Matcha Kit Kats & snacks (Narita Airport)",  done: false },
      { id: "j2", text: "Kyoto ceramics & pottery",                   done: false },
      { id: "j3", text: "Uniqlo limited edition items",               done: true  },
      { id: "j4", text: "Japanese cosmetics (Shiseido, SK-II)",       done: false },
      { id: "j5", text: "Anime merch from Akihabara",                 done: true  },
      { id: "j6", text: "Wagashi (traditional sweets) gift box",      done: false },
      { id: "j7", text: "Tenugui hand towels",                        done: false },
    ],
    archived: false,
    createdAt: "28 May 2026, 15:00",
    updatedAt: "28 May 2026, 15:00",
  },

  // ── Greek Islands 🌊 ─────────────────────────────────────────────────────
  {
    id: "n12",
    title: "Athens Hotel Details",
    category: "Important",
    trip: "Greek Islands 🌊",
    date: "10 Jul 2026",
    stop: "Athens, Greece",
    preview: "Check-in at 14:00 · Hotel Grande Bretagne · Confirmation #GB-2026-0710",
    content: `Check-in Time: 14:00\nCheck-out Time: 12:00\n\nHotel: Hotel Grande Bretagne\nAddress: Vasileos Georgiou A 1, Syntagma Square, Athens 105 64\nPhone: +30 210 333 0000\nConfirmation: #GB-2026-0710\n\nReminder: Rooftop pool & spa available. Acropolis view from superior rooms. Valet parking available.`,
    type: "text",
    archived: false,
    reminder: "10 Jul 2026, 12:00",
    createdAt: "25 Jun 2026, 09:00",
    updatedAt: "28 Jun 2026, 11:00",
  },
  {
    id: "n13",
    title: "Santorini Day Plan",
    category: "Day Plan",
    trip: "Greek Islands 🌊",
    date: "12 Jul 2026",
    stop: "Oia, Santorini",
    preview: "Caldera hike → Oia village → Wine tasting → Sunset at Oia Castle",
    content: `Day 3 – Santorini Highlights\n\n08:00 – Caldera hike from Fira to Oia (10km, 3–4 hrs)\n12:00 – Lunch at Ammoudi Bay (fresh seafood)\n14:00 – Oia village exploration & shopping\n15:30 – Wine tasting at Santo Wines winery\n17:00 – Canaves Oia Suites check-in\n19:30 – Sunset at Oia Castle (arrive 30 min early!)\n21:00 – Dinner at Lauda restaurant\n\nTips: Book sunset spot early. Wear sunscreen & hat for the hike.`,
    type: "text",
    archived: false,
    createdAt: "01 Jul 2026, 10:00",
    updatedAt: "01 Jul 2026, 10:00",
  },
  {
    id: "n14",
    title: "Greek Food Guide",
    category: "Food",
    trip: "Greek Islands 🌊",
    date: "10 Jul 2026",
    stop: "Athens, Greece",
    preview: "Souvlaki at Kostas · Seafood at Ammoudi Bay · Gyros from street stalls",
    content: `🇬🇷 Greek Food Essentials\n\n🏛️ Athens\n• Kostas – Monastiraki, best souvlaki since 1950\n• Tzitzikas & Mermingas – modern mezze\n• Diporto – hidden basement taverna, no menu\n\n🌊 Santorini\n• Ammoudi Bay – fresh lobster & octopus\n• Lauda – fine dining, caldera views\n• Metaxy Mas – Exo Gonia, local favourite\n\n🏝️ Mykonos\n• Kiki's Tavern – no reservations, worth the wait\n• Spilia – sea cave restaurant\n\n🥗 Must Try:\n• Spanakopita (spinach pie)\n• Loukoumades (honey donuts)\n• Fava (yellow split pea dip)\n• Saganaki (fried cheese)`,
    type: "text",
    archived: false,
    createdAt: "05 Jul 2026, 14:00",
    updatedAt: "05 Jul 2026, 14:00",
  },
  {
    id: "n15",
    title: "Greece Shopping List",
    category: "Shopping",
    trip: "Greek Islands 🌊",
    date: "18 Jul 2026",
    stop: "Mykonos, Greece",
    preview: "Olive oil, saffron, evil eye jewellery, leather sandals, ceramics...",
    content: "Greece shopping checklist",
    type: "checklist",
    checklist: [
      { id: "g1", text: "Extra virgin olive oil (2 bottles)",    done: false },
      { id: "g2", text: "Greek saffron from Kozani",             done: false },
      { id: "g3", text: "Evil eye (mati) jewellery",             done: true  },
      { id: "g4", text: "Leather sandals from Athens",           done: true  },
      { id: "g5", text: "Hand-painted ceramics (Santorini)",     done: false },
      { id: "g6", text: "Mastiha products from Chios",           done: false },
      { id: "g7", text: "Honey & thyme honey jar",               done: false },
    ],
    archived: false,
    createdAt: "08 Jul 2026, 16:00",
    updatedAt: "08 Jul 2026, 16:00",
  },
];
