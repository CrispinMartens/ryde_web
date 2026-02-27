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
    image: "/dashboard/car-gwagon.png", // placeholder — swap for car-rangerover.png
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
    id: "ad-gwagon",
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
      "Command the desert highways of Abu Dhabi in the ultimate luxury SUV. Built for both dunes and downtown.",
  },
  {
    id: "ad-db5-blue",
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
      "The midnight blue DB5 against the Arabian night sky. An unforgettable pairing of British elegance and Middle Eastern grandeur.",
  },
  {
    id: "ad-model-s",
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
      "Cruise the Corniche in silent, electrifying luxury. The Model S Plaid is the perfect companion for Abu Dhabi's futuristic skyline.",
  },
  {
    id: "ad-db10",
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
      "One of only 10 ever made. Experience this bespoke Aston Martin on the sweeping highways of the UAE capital.",
  },
  {
    id: "ad-db5-red",
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
      "The burgundy DB5, as rare as the desert rose. Turn heads along the Abu Dhabi waterfront in this stunning variant.",
  },
  {
    id: "ad-v12",
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
      "The Vanquish's V12 roar echoes across the Yas Marina circuit. Available for track days and coastal cruising.",
  },
  {
    id: "ad-db5-default",
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
      "The silver birch DB5, polished to perfection under the Arabian sun. A timeless classic for the discerning driver.",
  },
  {
    id: "ad-gwagon-2",
    name: "G-Wagon",
    subtitle: "Mercedes-AMG",
    image: "/dashboard/car-gwagon.png",
    bg: "bg-[#0d0d0d]",
    bgHex: "#0d0d0d",
    year: "2024",
    power: "577 HP",
    engine: "4.0L Twin-Turbo V8",
    transmission: "9-Speed Automatic",
    description:
      "A second G 63 in the Abu Dhabi fleet for those who demand the ultimate in desert-ready luxury performance.",
  },
  {
    id: "ad-model-s-2",
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
      "A second Plaid for the Abu Dhabi fleet. Perfect for airport transfers at warp speed.",
  },
  {
    id: "ad-db5-blue-2",
    name: "Aston Martin DB5",
    subtitle: "Goldfinger",
    image: "/dashboard/car-db5-blue.png",
    bg: "bg-[#001e52]",
    bgHex: "#001e52",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "Midnight blue under starlit desert skies. This DB5 was made for evenings on Saadiyat Island.",
  },
  {
    id: "ad-v12-2",
    name: "Aston Martin V12",
    subtitle: "Vanquish S",
    image: "/dashboard/car-v12.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "2005",
    power: "520 HP",
    engine: "5.9L V12",
    transmission: "6-Speed Auto",
    description:
      "The Vanquish S, the ultimate evolution. More power, sharper handling, and unmistakable presence on any road.",
  },
  {
    id: "ad-db5-red-2",
    name: "Aston Martin DB5",
    subtitle: "No Time to Die",
    image: "/dashboard/car-db5-red.png",
    bg: "bg-[#5a1417]",
    bgHex: "#5a1417",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "The burgundy DB5 returns for Bond's final mission. Now available for yours in Abu Dhabi.",
  },
  {
    id: "ad-db10-2",
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
      "A second DB10 joins the Abu Dhabi collection. Exclusivity doubled, thrill guaranteed.",
  },
  {
    id: "ad-db5-default-2",
    name: "Aston Martin DB5",
    subtitle: "Thunderball",
    image: "/dashboard/car-db5-default.png",
    bg: "bg-[#3b3b3b]",
    bgHex: "#3b3b3b",
    year: "1964",
    power: "282 HP",
    engine: "4.0L Inline-6",
    transmission: "5-Speed Manual",
    description:
      "Featured in Thunderball's iconic chase scenes. Now ready for your own high-speed adventures across Abu Dhabi.",
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
