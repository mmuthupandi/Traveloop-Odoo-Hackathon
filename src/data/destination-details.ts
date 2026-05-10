export type DestinationDetail = {
  id: string;
  name: string;
  country: string;
  emoji: string;
  tagline: string;
  description: string;
  rating: number;
  reviews: string;
  price: string;
  category: string;
  bestTime: string;
  language: string;
  currency: string;
  timezone: string;
  images: string[];
  highlights: { icon: string; title: string; desc: string }[];
  mustSee: { name: string; type: string; image: string }[];
  tips: string[];
};

export const destinationDetails: Record<string, DestinationDetail> = {
  bali: {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    emoji: "🌴",
    tagline: "Island of the Gods",
    description:
      "Bali is a living postcard — an Indonesian paradise that feels like a fantasy. Lush rice terraces, ancient temples, world-class surf breaks, and a deeply spiritual culture make it one of the world's most beloved destinations.",
    rating: 4.7,
    reviews: "2.4K reviews",
    price: "$450",
    category: "Beaches",
    bestTime: "Apr – Oct",
    language: "Balinese / Indonesian",
    currency: "IDR (Indonesian Rupiah)",
    timezone: "WITA (UTC+8)",
    images: [
      "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🏄", title: "World-Class Surfing", desc: "Kuta, Uluwatu & Canggu offer legendary waves" },
      { icon: "🛕", title: "Ancient Temples", desc: "Tanah Lot, Uluwatu & Besakih are must-visits" },
      { icon: "🌾", title: "Rice Terraces", desc: "Tegallalang's UNESCO-listed terraces are breathtaking" },
      { icon: "🧘", title: "Wellness & Yoga", desc: "Ubud is the world capital of spiritual retreats" },
    ],
    mustSee: [
      { name: "Tegallalang Rice Terraces", type: "Nature", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80" },
      { name: "Uluwatu Temple", type: "Culture", image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80" },
      { name: "Seminyak Beach", type: "Beach", image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Carry a sarong — required at all temples",
      "Exchange USD to IDR at airport for best rates",
      "Download Grab for affordable local transport",
      "Avoid rainy season (Nov–Mar) for beach trips",
    ],
  },

  switzerland: {
    id: "switzerland",
    name: "Switzerland",
    country: "Alps",
    emoji: "🏔️",
    tagline: "Heart of the Alps",
    description:
      "Switzerland is a masterpiece of nature — snow-capped peaks, crystal-clear lakes, charming villages and world-famous chocolate. Whether you're skiing in Zermatt or cruising Lake Geneva, every moment feels like a painting.",
    rating: 4.8,
    reviews: "1.8K reviews",
    price: "$1,250",
    category: "Mountains",
    bestTime: "Jun – Sep (summer) / Dec – Mar (skiing)",
    language: "German / French / Italian",
    currency: "CHF (Swiss Franc)",
    timezone: "CET (UTC+1)",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🎿", title: "World-Class Skiing", desc: "Zermatt, Verbier & St. Moritz are legendary" },
      { icon: "🚂", title: "Scenic Train Rides", desc: "Glacier Express & Bernina Express are iconic" },
      { icon: "🏔️", title: "Matterhorn Views", desc: "The iconic peak visible from Zermatt village" },
      { icon: "🍫", title: "Swiss Chocolate", desc: "Visit Lindt & Läderach factories in person" },
    ],
    mustSee: [
      { name: "Matterhorn, Zermatt", type: "Mountain", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" },
      { name: "Lake Geneva", type: "Nature", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=400&q=80" },
      { name: "Interlaken", type: "Adventure", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Buy a Swiss Travel Pass for unlimited trains, buses & boats",
      "Book ski resorts 3–6 months ahead in winter",
      "Tap water is safe and delicious everywhere",
      "Tipping is not mandatory — service is included",
    ],
  },

  santorini: {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    emoji: "🌊",
    tagline: "Jewel of the Aegean",
    description:
      "Santorini is the crown jewel of the Greek islands — iconic white-washed buildings, blue-domed churches, dramatic caldera views and legendary sunsets that have inspired artists for centuries.",
    rating: 4.6,
    reviews: "1.6K reviews",
    price: "$680",
    category: "Relaxation",
    bestTime: "Apr – Jun / Sep – Oct",
    language: "Greek",
    currency: "EUR (Euro)",
    timezone: "EET (UTC+2)",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🌅", title: "Legendary Sunsets", desc: "Oia village offers the world's most photographed sunset" },
      { icon: "🍷", title: "Volcanic Wines", desc: "Assyrtiko white wine grown in volcanic soil is unique" },
      { icon: "🏖️", title: "Black Sand Beaches", desc: "Perissa & Kamari have dramatic volcanic black beaches" },
      { icon: "⛵", title: "Caldera Cruises", desc: "Sail around the volcanic caldera at golden hour" },
    ],
    mustSee: [
      { name: "Oia Village", type: "Village", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80" },
      { name: "Perissa Black Beach", type: "Beach", image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=400&q=80" },
      { name: "Akrotiri Ruins", type: "History", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Arrive in Oia 1 hour before sunset to get a good spot",
      "Book ferry tickets in advance — summer routes fill fast",
      "Rent an ATV to explore the island independently",
      "Avoid July–August peak crowds if possible",
    ],
  },

  kyoto: {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    emoji: "🌸",
    tagline: "Ancient Capital of Japan",
    description:
      "Kyoto is Japan's cultural soul — over 1,600 Buddhist temples, 400 Shinto shrines, traditional geisha districts, bamboo groves and the world's most celebrated cherry blossom season.",
    rating: 4.9,
    reviews: "2.1K reviews",
    price: "$910",
    category: "Historical",
    bestTime: "Mar – May (cherry blossoms) / Oct – Nov (autumn)",
    language: "Japanese",
    currency: "JPY (Japanese Yen)",
    timezone: "JST (UTC+9)",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "⛩️", title: "Fushimi Inari", desc: "10,000 torii gates winding up a sacred mountain" },
      { icon: "🎋", title: "Arashiyama Bamboo", desc: "Walk through towering bamboo groves at dawn" },
      { icon: "🍵", title: "Tea Ceremony", desc: "Experience authentic matcha ceremony in Gion" },
      { icon: "🌸", title: "Cherry Blossoms", desc: "Maruyama Park & Philosopher's Path are magical in spring" },
    ],
    mustSee: [
      { name: "Fushimi Inari Shrine", type: "Shrine", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80" },
      { name: "Arashiyama Bamboo Grove", type: "Nature", image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=80" },
      { name: "Kinkaku-ji (Golden Pavilion)", type: "Temple", image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Visit Fushimi Inari at 6am to avoid crowds",
      "Get an IC card (Suica/ICOCA) for all public transport",
      "Book tea ceremonies and kaiseki dinners in advance",
      "Rent a bicycle — Kyoto is very cycle-friendly",
    ],
  },

  maldives: {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    emoji: "🐚",
    tagline: "Paradise on Earth",
    description:
      "The Maldives is the ultimate luxury escape — 1,200 coral islands scattered across the Indian Ocean, each with turquoise lagoons, overwater bungalows, and some of the world's best snorkelling and diving.",
    rating: 4.8,
    reviews: "1.2K reviews",
    price: "$980",
    category: "Relaxation",
    bestTime: "Nov – Apr",
    language: "Dhivehi / English",
    currency: "MVR (Maldivian Rufiyaa)",
    timezone: "MVT (UTC+5)",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🤿", title: "World-Class Diving", desc: "Coral reefs teeming with manta rays & whale sharks" },
      { icon: "🏠", title: "Overwater Bungalows", desc: "Sleep above the crystal-clear lagoon" },
      { icon: "🌊", title: "Bioluminescent Beaches", desc: "Vaadhoo Island glows blue at night" },
      { icon: "🐠", title: "Snorkelling", desc: "House reefs accessible directly from your villa" },
    ],
    mustSee: [
      { name: "Vaadhoo Island", type: "Beach", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=400&q=80" },
      { name: "Overwater Villas", type: "Stay", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=400&q=80" },
      { name: "Coral Reef Diving", type: "Activity", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Book seaplane transfers in advance — they fill up fast",
      "All-inclusive resorts offer the best value",
      "Alcohol is only available at resort islands",
      "Pack reef-safe sunscreen to protect coral",
    ],
  },

  "new-zealand": {
    id: "new-zealand",
    name: "New Zealand",
    country: "South Island",
    emoji: "⛰️",
    tagline: "Middle Earth Awaits",
    description:
      "New Zealand's South Island is a jaw-dropping landscape of fjords, glaciers, mountains and vineyards. From the adventure capital Queenstown to the serene Milford Sound, it's a paradise for outdoor lovers.",
    rating: 4.7,
    reviews: "1.5K reviews",
    price: "$1,120",
    category: "Adventure",
    bestTime: "Dec – Feb (summer) / Jun – Aug (skiing)",
    language: "English / Māori",
    currency: "NZD (New Zealand Dollar)",
    timezone: "NZST (UTC+12)",
    images: [
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🏔️", title: "Milford Sound", desc: "Fiordland's crown jewel — dramatic cliffs & waterfalls" },
      { icon: "🪂", title: "Queenstown Adventures", desc: "Bungee jumping, skydiving & jet boating capital" },
      { icon: "🍷", title: "Marlborough Wines", desc: "World-famous Sauvignon Blanc wine region" },
      { icon: "🦅", title: "Kaikoura Wildlife", desc: "Whale watching & swimming with dolphins" },
    ],
    mustSee: [
      { name: "Milford Sound", type: "Fjord", image: "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=400&q=80" },
      { name: "Queenstown", type: "Adventure", image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=400&q=80" },
      { name: "Lake Tekapo", type: "Nature", image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Rent a campervan for the ultimate road trip experience",
      "Book Milford Sound cruises well in advance",
      "Weather changes rapidly — always carry layers",
      "The Routeburn Track is one of the world's great walks",
    ],
  },

  cambodia: {
    id: "cambodia",
    name: "Cambodia",
    country: "Siem Reap",
    emoji: "🏛️",
    tagline: "Kingdom of Wonder",
    description:
      "Cambodia is home to Angkor Wat — the world's largest religious monument and one of humanity's greatest architectural achievements. Beyond the temples, vibrant markets, river life and warm hospitality await.",
    rating: 4.6,
    reviews: "980 reviews",
    price: "$620",
    category: "Historical",
    bestTime: "Nov – Mar",
    language: "Khmer",
    currency: "KHR / USD",
    timezone: "ICT (UTC+7)",
    images: [
      "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🏛️", title: "Angkor Wat", desc: "The world's largest religious monument at sunrise" },
      { icon: "🌅", title: "Angkor Thom", desc: "Ancient city with the iconic Bayon temple faces" },
      { icon: "🛶", title: "Tonle Sap Lake", desc: "Southeast Asia's largest freshwater lake & floating villages" },
      { icon: "🍜", title: "Khmer Cuisine", desc: "Amok fish curry & lok lak are must-try dishes" },
    ],
    mustSee: [
      { name: "Angkor Wat", type: "Temple", image: "https://images.unsplash.com/photo-1559628233-100c798642d4?auto=format&fit=crop&w=400&q=80" },
      { name: "Bayon Temple", type: "Temple", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80" },
      { name: "Tonle Sap Lake", type: "Nature", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Buy a 3-day Angkor pass for the best value",
      "Visit Angkor Wat at sunrise — arrive by 5:30am",
      "USD is widely accepted alongside Khmer Riel",
      "Hire a tuk-tuk driver for the day — very affordable",
    ],
  },

  thailand: {
    id: "thailand",
    name: "Thailand",
    country: "Phuket",
    emoji: "🌴",
    tagline: "Land of Smiles",
    description:
      "Phuket is Thailand's largest island — a dazzling mix of white-sand beaches, turquoise waters, vibrant nightlife, ornate temples and some of the world's best street food.",
    rating: 4.5,
    reviews: "1.1K reviews",
    price: "$430",
    category: "Beaches",
    bestTime: "Nov – Apr",
    language: "Thai",
    currency: "THB (Thai Baht)",
    timezone: "ICT (UTC+7)",
    images: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    ],
    highlights: [
      { icon: "🏖️", title: "Patong Beach", desc: "Phuket's most famous beach with vibrant nightlife" },
      { icon: "🛥️", title: "Phi Phi Islands", desc: "Stunning limestone cliffs & crystal-clear waters" },
      { icon: "🛕", title: "Big Buddha", desc: "45-metre marble statue with panoramic island views" },
      { icon: "🍜", title: "Street Food", desc: "Pad Thai, mango sticky rice & tom yum soup" },
    ],
    mustSee: [
      { name: "Phi Phi Islands", type: "Islands", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80" },
      { name: "Patong Beach", type: "Beach", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=80" },
      { name: "Old Phuket Town", type: "Culture", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80" },
    ],
    tips: [
      "Avoid Patong during Songkran (Thai New Year) if you dislike water fights",
      "Negotiate tuk-tuk prices before getting in",
      "Dress modestly when visiting temples",
      "Try local markets for the best street food",
    ],
  },
};
