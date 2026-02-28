export interface Car {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  bg: string;
  bgHex: string;
  year: string;
  power: string;
  engine: string;
  transmission: string;
  description: string;
}

export const sliderCars: Car[] = [
  {
    id: "db5-default",
    name: "Aston Martin DB5",
    subtitle: "Tomorrow Never Dies",
    image: "/dashboard/car-db5-default.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The iconic Aston Martin DB5, synonymous with James Bond since Goldfinger. Equipped with revolving number plates, oil slick sprayer, and passenger ejector seat.",
  },
  {
    id: "v12",
    name: "Aston Martin V12",
    subtitle: "Die Another Day",
    image: "/dashboard/car-v12.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "2001",
    power: "460 HP",
    engine: "5.9L V12",
    transmission: "6-Speed Manual",
    description:
      "The Aston Martin V12 Vanquish made its Bond debut in Die Another Day. Fitted with an adaptive camouflage system rendering the car nearly invisible.",
  },
  {
    id: "db10",
    name: "Aston Martin DB 10",
    subtitle: "Spectre",
    image: "/dashboard/car-db10.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "2015",
    power: "430 HP",
    engine: "4.7L V8",
    transmission: "6-Speed Manual",
    description:
      "Built exclusively for the film Spectre, only 10 DB10s were ever produced. A bespoke creation that showcased Aston Martin's future design language.",
  },
  {
    id: "db5-red",
    name: "Aston Martin DB5",
    subtitle: "Casino Royale",
    image: "/dashboard/car-db5-red.png",
    bg: "bg-[#5a1417]",
    bgHex: "#5a1417",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "A rare burgundy variant of the legendary DB5. This stunning colour option was reserved for a select few and represents the pinnacle of 1960s grand touring.",
  },
  {
    id: "model-s",
    name: "Model S",
    subtitle: "Tesla",
    image: "/dashboard/car-model-s.png",
    bg: "bg-[#4f6c67]",
    bgHex: "#4f6c67",
    year: "2024",
    power: "1,020 HP",
    engine: "Tri-Motor Electric",
    transmission: "Single-Speed",
    description:
      "The Tesla Model S Plaid redefines performance with instant torque delivery and a sub-2-second 0-60 time. The future of luxury driving.",
  },
  {
    id: "db5-blue",
    name: "Aston Martin DB5",
    subtitle: "Skyfall",
    image: "/dashboard/car-db5-blue.png",
    bg: "bg-[#001e52]",
    bgHex: "#001e52",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The midnight blue DB5 evokes the sophistication of a Bond evening mission. An exceptionally rare finish that commands attention in any setting.",
  },
  {
    id: "gwagon",
    name: "G-Wagon",
    subtitle: "Mercedes-Benz",
    image: "/dashboard/car-gwagon.png",
    bg: "bg-[#0d0d0d]",
    bgHex: "#0d0d0d",
    year: "2024",
    power: "577 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "9-Speed Automatic",
    description:
      "The Mercedes-AMG G 63 combines military-grade ruggedness with ultra-luxury refinement. A commanding presence on any terrain or city street.",
  },
  {
    id: "db5-gold",
    name: "Aston Martin DB5",
    subtitle: "Goldfinger",
    image: "/dashboard/car-db5-default.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The original Bond car. First appearing in Goldfinger, this DB5 set the standard for every spy vehicle that followed. A true icon of cinema and automotive history.",
  },
];

export const bookingCars: Car[] = [
  {
    id: "book-rangerover",
    name: "Range Rover",
    subtitle: "Land Rover",
    image: "/dashboard/car-range-rover-green.png", // placeholder — swap for car-rangerover.png
    bg: "bg-[#1e2b24]",
    bgHex: "#1e2b24",
    year: "2024",
    power: "523 HP",
    engine: "4.4L Twin-Turbo V8",
    transmission: "8-Speed Automatic",
    description:
      "The Range Rover SV redefines what a luxury SUV can be. A cabin of extraordinary refinement, commanding presence, and effortless power across any terrain.",
  },
  {
    id: "book-gwagon",
    name: "G-Wagon",
    subtitle: "Mercedes-Benz",
    image: "/dashboard/car-gwagon.png",
    bg: "bg-[#0d0d0d]",
    bgHex: "#0d0d0d",
    year: "2024",
    power: "577 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "9-Speed Automatic",
    description:
      "The Mercedes-AMG G 63 combines military-grade ruggedness with ultra-luxury refinement. A commanding presence on any terrain or city street.",
  },
  {
    id: "book-model-s",
    name: "Model S",
    subtitle: "Tesla",
    image: "/dashboard/car-model-s.png",
    bg: "bg-[#4f6c67]",
    bgHex: "#4f6c67",
    year: "2024",
    power: "1,020 HP",
    engine: "Tri-Motor Electric",
    transmission: "Single-Speed",
    description:
      "The Tesla Model S Plaid redefines performance with instant torque delivery and a sub-2-second 0-60 time. The future of luxury driving.",
  },
  {
    id: "book-db5-red",
    name: "Aston Martin DB5",
    subtitle: "Porsche",
    image: "/dashboard/car-db5-red.png",
    bg: "bg-[#5a1417]",
    bgHex: "#5a1417",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "A rare burgundy variant of the legendary DB5. This stunning colour option was reserved for a select few and represents the pinnacle of 1960s grand touring.",
  },
  {
    id: "book-db5-default",
    name: "Aston Martin DB5",
    subtitle: "Tomorrow Never Dies",
    image: "/dashboard/car-db5-default.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The iconic Aston Martin DB5, synonymous with James Bond since Goldfinger. Equipped with revolving number plates, oil slick sprayer, and passenger ejector seat.",
  },
  {
    id: "book-db5-blue",
    name: "Aston Martin DB5",
    subtitle: "Skyfall",
    image: "/dashboard/car-db5-blue.png",
    bg: "bg-[#001e52]",
    bgHex: "#001e52",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The midnight blue DB5 evokes the sophistication of a Bond evening mission. An exceptionally rare finish that commands attention in any setting.",
  },
  {
    id: "book-v12",
    name: "Aston Martin V12",
    subtitle: "Die Another Day",
    image: "/dashboard/car-v12.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "2001",
    power: "460 HP",
    engine: "5.9L V12",
    transmission: "6-Speed Manual",
    description:
      "The Aston Martin V12 Vanquish made its Bond debut in Die Another Day. Fitted with an adaptive camouflage system rendering the car nearly invisible.",
  },
];

export const zurichCars: Car[] = [
  {
    id: "zur-db5",
    name: "Aston Martin DB5",
    subtitle: "Goldfinger",
    image: "/dashboard/car-db5-default.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The original Bond car in its iconic silver birch finish, available for scenic drives through the Swiss Alps.",
  },
  {
    id: "zur-model-s",
    name: "Model S",
    subtitle: "Tesla",
    image: "/dashboard/car-model-s.png",
    bg: "bg-[#4f6c67]",
    bgHex: "#4f6c67",
    year: "2024",
    power: "1,020 HP",
    engine: "Tri-Motor Electric",
    transmission: "Single-Speed",
    description:
      "Silently carve through Zurich's lakeside roads with instant torque and zero emissions. Swiss precision meets Californian innovation.",
  },
  {
    id: "zur-v12",
    name: "Aston Martin V12",
    subtitle: "Die Another Day",
    image: "/dashboard/car-v12.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "2001",
    power: "460 HP",
    engine: "5.9L V12",
    transmission: "6-Speed Manual",
    description:
      "Take the Vanquish through the winding roads of the Swiss countryside. A grand tourer built for exactly these moments.",
  },
];

export const abuDhabiCars: Car[] = [
  {
    id: "ad-rr-phantom",
    name: "Phantom",
    subtitle: "Rolls-Royce",
    image: "/dashboard/car-rr-phantom.png",
    bg: "bg-[#12141a]",
    bgHex: "#12141a",
    year: "2024",
    power: "563 HP",
    engine: "6.75L Twin-Turbo V12",
    transmission: "8-Speed Automatic",
    description:
      "The Rolls-Royce Phantom represents the absolute pinnacle of automotive luxury. A hand-crafted monument of silence, presence, and unrivalled prestige.",
  },
  {
    id: "ad-rr-cullinan",
    name: "Cullinan",
    subtitle: "Rolls-Royce",
    image: "/dashboard/car-rr-cullinan.png",
    bg: "bg-[#1a1410]",
    bgHex: "#1a1410",
    year: "2024",
    power: "563 HP",
    engine: "6.75L Twin-Turbo V12",
    transmission: "8-Speed Automatic",
    description:
      "The Rolls-Royce Cullinan redefines what a luxury SUV can be. Effortless across any terrain, extraordinary in every detail.",
  },
  {
    id: "ad-bentley-bentayga",
    name: "Bentayga",
    subtitle: "Bentley",
    image: "/dashboard/car-bentley-bentayga.png",
    bg: "bg-[#0d1510]",
    bgHex: "#0d1510",
    year: "2024",
    power: "542 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "8-Speed Automatic",
    description:
      "The Bentley Bentayga blends exceptional performance with world-class craftsmanship. The enduring benchmark for ultra-luxury SUVs.",
  },
  {
    id: "ad-bentley-flying-spur",
    name: "Flying Spur",
    subtitle: "Bentley",
    image: "/dashboard/car-bentley-flying-spur.png",
    bg: "bg-[#1a150a]",
    bgHex: "#1a150a",
    year: "2024",
    power: "626 HP",
    engine: "6.0L W12",
    transmission: "8-Speed Dual-Clutch",
    description:
      "The Flying Spur is Bentley's most powerful four-door saloon. Sumptuous craftsmanship fused with breathtaking grand touring performance.",
  },
  {
    id: "ad-lambo-urus",
    name: "Urus S",
    subtitle: "Lamborghini",
    image: "/dashboard/car-lambo-urus.png",
    bg: "bg-[#1a0e00]",
    bgHex: "#1a0e00",
    year: "2024",
    power: "657 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "8-Speed Automatic",
    description:
      "The world's first Super Sport Utility Vehicle. Raw Lamborghini DNA elevated to a new dimension of speed and desirability.",
  },
  {
    id: "ad-lambo-huracan",
    name: "Huracán",
    subtitle: "Lamborghini",
    image: "/dashboard/car-lambo-huracan.png",
    bg: "bg-[#1f1200]",
    bgHex: "#1f1200",
    year: "2024",
    power: "630 HP",
    engine: "5.2L V10",
    transmission: "7-Speed Dual-Clutch",
    description:
      "Pure V10 theatre. The Huracán delivers an acoustic and visceral experience that no turbocharged engine can replicate.",
  },
  {
    id: "ad-ferrari-purosangue",
    name: "Purosangue",
    subtitle: "Ferrari",
    image: "/dashboard/car-ferrari-purosangue.png",
    bg: "bg-[#3a0808]",
    bgHex: "#3a0808",
    year: "2024",
    power: "715 HP",
    engine: "6.5L V12",
    transmission: "8-Speed Dual-Clutch",
    description:
      "Ferrari's first four-door, four-seat car is uncompromising in every dimension. A prancing horse that carries everyone in style.",
  },
  {
    id: "ad-mclaren-750s",
    name: "750S",
    subtitle: "McLaren",
    image: "/dashboard/car-mclaren-750s.png",
    bg: "bg-[#0f0c1a]",
    bgHex: "#0f0c1a",
    year: "2024",
    power: "740 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "7-Speed Dual-Clutch",
    description:
      "The distillation of everything McLaren knows about building a driver's car. Elemental, purposeful, and utterly extraordinary.",
  },
  {
    id: "ad-maybach-s",
    name: "S-Class",
    subtitle: "Mercedes-Maybach",
    image: "/dashboard/car-maybach-s.png",
    bg: "bg-[#0f0f0f]",
    bgHex: "#0f0f0f",
    year: "2024",
    power: "621 HP",
    engine: "6.0L Biturbo V12",
    transmission: "9-Speed Automatic",
    description:
      "The Mercedes-Maybach S-Class elevates the art of luxury travel to its highest expression. An unrivalled sanctuary on wheels.",
  },
  {
    id: "ad-porsche-cayenne",
    name: "Cayenne Turbo GT",
    subtitle: "Porsche",
    image: "/dashboard/car-porsche-cayenne.png",
    bg: "bg-[#0a1220]",
    bgHex: "#0a1220",
    year: "2024",
    power: "631 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "8-Speed Torque Converter",
    description:
      "The most powerful and dynamic Cayenne ever built. Track-honed precision wrapped in everyday luxury.",
  },
  {
    id: "ad-aston-dbs",
    name: "DBS 770",
    subtitle: "Aston Martin",
    image: "/dashboard/car-aston-dbs.png",
    bg: "bg-[#1a0505]",
    bgHex: "#1a0505",
    year: "2024",
    power: "770 HP",
    engine: "5.2L Twin-Turbo V12",
    transmission: "8-Speed Automatic",
    description:
      "The most powerful Aston Martin production car ever made. A grand tourer with a supercar heart, built for those who demand everything.",
  },
  {
    id: "ad-bmw-m8",
    name: "M8 Competition",
    subtitle: "BMW",
    image: "/dashboard/car-bmw-m8.png",
    bg: "bg-[#060d1a]",
    bgHex: "#060d1a",
    year: "2024",
    power: "617 HP",
    engine: "4.4L Twin-Turbo V8",
    transmission: "8-Speed M Steptronic",
    description:
      "The BMW M8 Competition is a grand tourer pushed to its absolute limit. Unmistakable, menacing, and devastatingly fast.",
  },
];

export interface ActiveBooking {
  carId: string;
  location: string;
  coordinates: string;
  lat?: number; // starting latitude  — only set for live bookings
  lon?: number; // starting longitude — only set for live bookings
  kmDriven: number;
  currentSpeed?: number; // undefined = parked
  status: "live" | "parked";
  period: string;
  daysElapsed: number;
  totalDays: number;
}

export const activeBookings: ActiveBooking[] = [
  {
    carId: "book-rangerover",
    location: "Gstaad, Switzerland",
    coordinates: "46.4753° N, 7.2837° E",
    lat: 46.4753,
    lon: 7.2837,
    kmDriven: 89,
    currentSpeed: 73,
    status: "live",
    period: "May 5 – May 12, 2026",
    daysElapsed: 2,
    totalDays: 7,
  },
  {
    carId: "book-gwagon",
    location: "Zurich, Switzerland",
    coordinates: "47.3769° N, 8.5417° E",
    kmDriven: 247,
    status: "parked",
    period: "May 3 – May 10, 2026",
    daysElapsed: 4,
    totalDays: 7,
  },
];

export const activeBookingIds = new Set(activeBookings.map((b) => b.carId));

export function findCarById(id: string): Car | undefined {
  return [...sliderCars, ...bookingCars, ...zurichCars, ...abuDhabiCars].find(
    (car) => car.id === id
  );
}
