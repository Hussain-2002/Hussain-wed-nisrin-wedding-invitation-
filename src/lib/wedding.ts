export const couple = {
  him: "Hussain",
  her: "Nisrin",
  monogram: "H · N",
  and: "&",
  arabic: {
    together: "حسين و نسرين",
  },
};

export const wedding = {
  monthLabel: "August 2027",
  rangeLabel: "2 — 7 August 2027",
  start: new Date("2027-08-02T18:00:00+05:30"),
};

export const blessings = {
  bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  verse:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  verseRef: "Ar-Rum · 30:21",
  verseEn:
    "And of His signs is that He created for you spouses from among yourselves, so that you may find comfort in them, and He placed between you love and mercy.",
  nikah: "نكاح مبارك",
  raza: "With the grace of Allah, and with the raza and dua mubarak of Aqa Moula",
  dua: "بَارَكَ ٱللَّٰهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  duaEn:
    "May Allah bless you, shower His blessings upon you, and join you both together in goodness.",
};

export const music = {
  src: "/audio/shadi-mubarak.mp3",
};

export const cities = [
  { id: "ujjain", name: "Ujjain", state: "Madhya Pradesh" },
  { id: "chechat", name: "Chechat", state: "Rajasthan" },
  { id: "indore", name: "Indore", state: "Madhya Pradesh" },
] as const;

export const events = [
  {
    date: "2 August 2027",
    day: "02",
    weekday: "Monday",
    city: "Ujjain",
    title: "Welcome Evening",
    subtitle: "Istiqbal",
    note: "The first majlis of the week, in Ujjain. Come as family does — early, and stay for the thaal.",
    maps: "https://www.google.com/maps/search/?api=1&query=Ujjain",
  },
  {
    date: "3 August 2027",
    day: "03",
    weekday: "Tuesday",
    city: "Chechat",
    title: "Family Celebrations",
    subtitle: "Ghar ni khushi",
    note: "A day among family in Chechat. The house full, the thaal open, the week held close.",
    maps: "https://www.google.com/maps/search/?api=1&query=Chechat+Rajasthan",
  },
  {
    date: "4 August 2027",
    day: "04",
    weekday: "Wednesday",
    city: "Ujjain",
    title: "Nikah",
    subtitle: "Aqd-un-Nikah",
    accent: true,
    note: "Back in Ujjain, we ask you to witness our aqd and to raise your hands in dua with us.",
    maps: "https://www.google.com/maps/search/?api=1&query=Ujjain",
  },
  {
    date: "5 August 2027",
    day: "05",
    weekday: "Thursday",
    city: "Ujjain",
    title: "Reception",
    subtitle: "Ziyaafat",
    note: "An evening of ziyaafat in Ujjain. Sit together, share the thaal, celebrate the nikah.",
    maps: "https://www.google.com/maps/search/?api=1&query=Ujjain",
  },
  {
    date: "6 August 2027",
    day: "06",
    weekday: "Friday",
    city: "Indore",
    title: "Walima",
    subtitle: "Valima",
    accent: true,
    note: "The valima moves to Indore — the wedding feast, shared the Bohra way.",
    maps: "https://www.google.com/maps/search/?api=1&query=Indore",
  },
  {
    date: "7 August 2027",
    day: "07",
    weekday: "Saturday",
    city: "Indore",
    title: "Farewell Gathering",
    subtitle: "Rukhsat",
    note: "One last thaal, one last dua, before we part with salaam.",
    maps: "https://www.google.com/maps/search/?api=1&query=Indore",
  },
];

export const journey = [
  { days: "2 Aug", city: "Ujjain" },
  { days: "3 Aug", city: "Chechat" },
  { days: "4 — 5 Aug", city: "Ujjain" },
  { days: "6 — 7 Aug", city: "Indore" },
];
