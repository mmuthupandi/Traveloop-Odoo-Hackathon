
export interface Note {
  id: string;
  title: string;
  preview: string;
  content?: string;
  category: string;
  trip?: string;
  date: string;
  isPinned: boolean;
  type: 'text' | 'list' | 'location' | 'image';
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Important', count: 6, icon: 'AlertCircle' },
  { id: '2', name: 'Ideas', count: 4, icon: 'Lightbulb' },
  { id: '3', name: 'Planning', count: 8, icon: 'Calendar' },
  { id: '4', name: 'Budget', count: 5, icon: 'DollarSign' },
  { id: '5', name: 'Packing', count: 3, icon: 'Package' },
  { id: '6', name: 'General', count: 7, icon: 'FileText' },
];

export const NOTES: Note[] = [
  {
    id: '1',
    title: 'Visa Requirements',
    preview: 'Check visa requirements for Japan. Apply at least 4 weeks in advance.',
    category: 'Important',
    trip: 'Japan Spring 🌸',
    date: 'May 10, 2024',
    isPinned: true,
    type: 'text',
  },
  {
    id: '2',
    title: 'Iceland Northern Lights',
    preview: 'Best time to see: Sept - Mar. Clear skies, away from city lights.',
    category: 'Ideas',
    trip: 'Switzerland Adventure 🏔️',
    date: 'May 8, 2024',
    isPinned: true,
    type: 'text',
  },
  {
    id: '3',
    title: 'Bali Travel Tips',
    preview: 'Carry light clothes, sunscreen, and insect repellent. Stay hydrated!',
    category: 'Planning',
    trip: 'Bali Getaway 🌴',
    date: 'May 5, 2024',
    isPinned: true,
    type: 'text',
  },
  {
    id: '4',
    title: 'Budget Reminder',
    preview: 'Keep daily budget under $120 to stay on track for the trip.',
    category: 'Budget',
    trip: 'Bali Getaway 🌴',
    date: 'May 3, 2024',
    isPinned: true,
    type: 'text',
  },
  {
    id: '5',
    title: 'Best Cafes in Canggu',
    preview: 'List of must-visit cafes and restaurants.',
    category: 'Planning',
    trip: 'Bali Getaway 🌴',
    date: 'May 10, 2024',
    isPinned: false,
    type: 'location',
  },
  {
    id: '6',
    title: 'Ubud Day Trip Plan',
    preview: 'Waterfalls, rice terraces, temples.',
    category: 'Planning',
    trip: 'Bali Getaway 🌴',
    date: 'May 8, 2024',
    isPinned: false,
    type: 'list',
  },
  {
    id: '7',
    title: 'Villa Booking Details',
    preview: 'Check-in: May 15 | 3 Nights | Ubud',
    category: 'Important',
    trip: 'Bali Getaway 🌴',
    date: 'May 5, 2024',
    isPinned: false,
    type: 'text',
  },
  {
    id: '8',
    title: 'Packing Notes',
    preview: 'Light clothes, swimwear, power adapter.',
    category: 'Packing',
    trip: 'Bali Getaway 🌴',
    date: 'May 3, 2024',
    isPinned: false,
    type: 'image',
  },
  {
    id: '9',
    title: 'Emergency Contacts',
    preview: 'Local emergency numbers and embassy.',
    category: 'Important',
    trip: 'Bali Getaway 🌴',
    date: 'Apr 30, 2024',
    isPinned: false,
    type: 'text',
  },
  {
    id: '10',
    title: 'Cherry Blossom Spots',
    preview: 'Best places to see sakura in Tokyo & Kyoto.',
    category: 'Ideas',
    trip: 'Japan Spring 🌸',
    date: 'Apr 20, 2024',
    isPinned: false,
    type: 'location',
  },
  {
    id: '11',
    title: 'JR Pass Information',
    preview: '7-day JR Pass for travel across Japan.',
    category: 'Planning',
    trip: 'Japan Spring 🌸',
    date: 'Apr 18, 2024',
    isPinned: false,
    type: 'list',
  },
  {
    id: '12',
    title: 'Places to Try',
    preview: 'Sushi, Ramen, Matcha desserts.',
    category: 'Ideas',
    trip: 'Japan Spring 🌸',
    date: 'Apr 15, 2024',
    isPinned: false,
    type: 'location',
  },
  {
    id: '13',
    title: 'Hiking Trails',
    preview: 'Top hikes in Interlaken and Zermatt.',
    category: 'Planning',
    trip: 'Switzerland Adventure 🏔️',
    date: 'Mar 28, 2024',
    isPinned: false,
    type: 'location',
  },
  {
    id: '14',
    title: 'Train Schedule',
    preview: 'Glacier Express reservation details.',
    category: 'Planning',
    trip: 'Switzerland Adventure 🏔️',
    date: 'Mar 25, 2024',
    isPinned: false,
    type: 'list',
  },
];

export const RECENT_NOTES = NOTES.slice(0, 5);
