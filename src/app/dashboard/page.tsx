"use client";

import Image from "next/image";
import { ChevronRight, ArrowLeft, Calendar, Gauge, Fuel, Settings } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(Observer);

interface Car {
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

// Slider row: the horizontal drag-parallax collection
const sliderCars: Car[] = [
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

// Bookings row: the grid below
const bookingCars: Car[] = [
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

// Zurich row: 3 cars
const zurichCars: Car[] = [
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

// Abu Dhabi row: 14 cars
const abuDhabiCars: Car[] = [
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

const navLinks = [
  "Start",
  "Manage Bookings",
  "Your Account",
  "Insights",
  "Concierge",
];

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/10 ${className ?? ""}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[20px] h-[317px] bg-white/5 animate-pulse flex flex-col items-center justify-center gap-4">
      <Skeleton className="w-[280px] h-[80px] rounded-lg" />
      <Skeleton className="w-[160px] h-[20px]" />
      <Skeleton className="w-[220px] h-[28px]" />
    </div>
  );
}

export default function DashboardPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookingStep, setBookingStep] = useState(0); // 0 = detail, 1 = day select, 2 = time select
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayBgRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const detailImageRef = useRef<HTMLDivElement>(null);
  const dateSelectRef = useRef<HTMLDivElement>(null);
  const timeSelectRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate data loading
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const openDetail = useCallback(
    (car: Car, cardEl: HTMLDivElement) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const rect = cardEl.getBoundingClientRect();
      cardRectRef.current = rect;
      setSelectedCar(car);
    },
    [isAnimating]
  );

  // Run GSAP entrance animation after selectedCar is set and DOM is rendered
  useEffect(() => {
    if (!selectedCar || !overlayRef.current || !cardRectRef.current) return;

    const rect = cardRectRef.current;
    const overlay = overlayRef.current;
    const bg = overlayBgRef.current;
    const content = detailContentRef.current;
    const img = detailImageRef.current;

    // Compute the transform that makes the fullscreen bg appear as the card
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaleX = rect.width / vw;
    const scaleY = rect.height / vh;
    const tx = rect.left + rect.width / 2 - vw / 2;
    const ty = rect.top + rect.height / 2 - vh / 2;
    const avgScale = (scaleX + scaleY) / 2;
    const br = 20 / avgScale;

    // Set initial state: overlay bg matches the card via transform
    gsap.set(overlay, { visibility: "visible" });
    gsap.set(bg, { x: tx, y: ty, scaleX, scaleY, borderRadius: br, opacity: 1 });
    gsap.set(content, { visibility: "visible" });
    gsap.set(img, { opacity: 0, scale: 0.8 });

    // Set all stagger children to hidden
    const staggerEls = content?.querySelectorAll("[data-stagger]");
    if (staggerEls) {
      gsap.set(staggerEls, { opacity: 0, y: 30 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(bg, { clearProps: "willChange" });
        setIsAnimating(false);
      },
    });

    // Expand the bg to fullscreen using only transform
    tl.to(bg, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      borderRadius: 0,
      duration: 0.7,
      ease: "power4.out",
    });

    // Fade in the car image
    tl.to(
      img,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.25"
    );

    // Stagger in each text element one by one
    if (staggerEls && staggerEls.length > 0) {
      tl.to(
        staggerEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, [selectedCar]);

  const slideToDateSelect = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setBookingStep(1);

    const content = detailContentRef.current;
    const datePanel = dateSelectRef.current;

    if (!content || !datePanel) {
      setIsAnimating(false);
      return;
    }

    // Position date panel offscreen right
    gsap.set(datePanel, { x: "100%", opacity: 1, visibility: "visible" });

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Slide detail content out left
    tl.to(content, {
      x: "-120%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });

    // Slide date panel in from right
    tl.to(
      datePanel,
      {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.4"
    );

    // Stagger in date panel children
    const dateStaggerEls = datePanel.querySelectorAll("[data-date-stagger]");
    if (dateStaggerEls.length > 0) {
      gsap.set(dateStaggerEls, { opacity: 0, y: 20 });
      tl.to(
        dateStaggerEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }, [isAnimating]);

  const slideToTimeSelect = useCallback(() => {
    if (isAnimating || selectedDays.length === 0) return;
    setIsAnimating(true);
    setBookingStep(2);

    const datePanel = dateSelectRef.current;
    const timePanel = timeSelectRef.current;

    if (!datePanel || !timePanel) {
      setIsAnimating(false);
      return;
    }

    gsap.set(timePanel, { x: "100%", opacity: 1, visibility: "visible" });

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to(datePanel, {
      x: "-120%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.to(
      timePanel,
      {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.4"
    );

    const timeStaggerEls = timePanel.querySelectorAll("[data-time-stagger]");
    if (timeStaggerEls.length > 0) {
      gsap.set(timeStaggerEls, { opacity: 0, y: 20 });
      tl.to(
        timeStaggerEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }, [isAnimating, selectedDays]);

  const slideBackToDaySelect = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const datePanel = dateSelectRef.current;
    const timePanel = timeSelectRef.current;

    if (!datePanel || !timePanel) {
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setBookingStep(1);
        setIsAnimating(false);
      },
    });

    tl.to(timePanel, {
      x: "100%",
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.to(
      datePanel,
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.4"
    );
  }, [isAnimating]);

  const slideBackToDetail = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const content = detailContentRef.current;
    const datePanel = dateSelectRef.current;

    if (!content || !datePanel) {
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setBookingStep(0);
        setIsAnimating(false);
      },
    });

    // Slide date panel out to the right
    tl.to(datePanel, {
      x: "100%",
      duration: 0.5,
      ease: "power3.inOut",
    });

    // Slide detail content back in
    tl.to(
      content,
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.4"
    );
  }, [isAnimating]);

  const closeDetail = useCallback(() => {
    if (isAnimating || !overlayRef.current || !cardRectRef.current) return;
    setIsAnimating(true);

    const rect = cardRectRef.current;
    const bg = overlayBgRef.current;
    const content = detailContentRef.current;
    const img = detailImageRef.current;
    const datePanel = dateSelectRef.current;
    const timePanel = timeSelectRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedCar(null);
        setBookingStep(0);
        setSelectedDays([]);
        setSelectedTimes({});
        setIsAnimating(false);
      },
    });

    // Fade out whichever panel is currently visible
    if (bookingStep === 2 && timePanel) {
      tl.to(timePanel, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    } else if (bookingStep === 1 && datePanel) {
      tl.to(datePanel, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    } else {
      // Fade out stagger children
      const staggerEls = content?.querySelectorAll("[data-stagger]");
      if (staggerEls && staggerEls.length > 0) {
        tl.to(staggerEls, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.in",
        });
      }
    }

    tl.to(
      img,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    );

    // Shrink bg back to card position using only transform
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaleX = rect.width / vw;
    const scaleY = rect.height / vh;
    const tx = rect.left + rect.width / 2 - vw / 2;
    const ty = rect.top + rect.height / 2 - vh / 2;
    const avgScale = (scaleX + scaleY) / 2;
    const br = 20 / avgScale;

    gsap.set(bg, { willChange: "transform" });
    tl.to(
      bg,
      {
        x: tx,
        y: ty,
        scaleX,
        scaleY,
        borderRadius: br,
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.1"
    );

    tl.to(bg, {
      opacity: 0,
      duration: 0.2,
      clearProps: "willChange,transform",
    });
  }, [isAnimating, bookingStep]);

  return (
    <div className="min-h-screen bg-[#222] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center h-20 px-[68px] transition-[background-color,backdrop-filter] duration-300 ${scrolled ? "backdrop-blur-[12.5px] bg-[rgba(231,229,224,0.05)]" : ""}`}>
        <div className="h-[41px] w-[31px] relative shrink-0">
          <Image
            src="/dashboard/ryde-logo.png"
            alt="RYDE"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-0 ml-16">
          {navLinks.map((link, i) => (
            <button
              key={link}
              className={`relative px-6 h-12 flex items-center text-[16px] text-white ${
                i === 0 ? "font-medium" : "font-normal"
              }`}
            >
              {link}
              {i === 0 && (
                <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-white" />
              )}
            </button>
          ))}
        </div>

        <button className="ml-auto bg-[#e20000] text-[#e7e5e0] text-[16px] px-6 h-12 rounded-full">
          Request a Demo
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[665px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/dashboard/hero-bond.png"
            alt="James Bond"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        <div className="relative z-10 pt-[123px] pl-[72px] max-w-[771px]">
          {!loaded ? (
            <div className="space-y-5">
              <Skeleton className="h-[24px] w-[180px]" />
              <Skeleton className="h-[80px] w-[700px]" />
              <Skeleton className="h-[80px] w-[500px]" />
              <Skeleton className="h-[20px] w-[627px]" />
              <Skeleton className="h-[20px] w-[400px]" />
              <Skeleton className="h-[50px] w-[480px] rounded-none" />
            </div>
          ) : (
            <>
              <p className="text-[20px] leading-[31px] mb-1">
                <span className="font-medium">RYDE</span>{" "}
                <span className="font-normal">Exclusives</span>
              </p>
              <h1 className="text-[80px] leading-[88px] font-britanica tracking-tight mb-4">
                The James Bond Collection
              </h1>
              <p className="text-[20px] leading-[31px] max-w-[627px] mb-8">
                Ever imagined stepping into James Bond&apos;s shoes? With RYDE, you
                don&apos;t imagine, you drive. Experience the cars made famous by
                007.
                <br />
                April 20 &ndash; May 22, 2026.
              </p>
              <button className="flex items-center justify-center gap-2 bg-[#e20000] text-white text-[20px] w-[480px] h-[50px]">
                Explore
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Drag Parallax Slider — pulled up to overlap the hero */}
      <div className="-mt-[80px] relative z-10">
        {!loaded ? (
          <section className="px-[53px]">
            <div className="flex gap-[28px]">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </section>
        ) : (
          <DragParallaxSlider cars={sliderCars} onCardClick={openDetail} />
        )}
      </div>

      {/* Active Bookings Label */}
      <section className="px-[76px] mt-[50px] mb-[20px]">
        {!loaded ? (
          <Skeleton className="h-[32px] w-[380px]" />
        ) : (
          <h2 className="text-[32px] font-bold">
            Your active bookings ( {bookingCars.length} )
          </h2>
        )}
      </section>

      {/* Bookings Grid */}
      <section className="px-[53px]">
        <div className="grid grid-cols-3 gap-[28px]">
          {!loaded
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : bookingCars.slice(0, 6).map((car) => (
                <CarCard key={car.id} car={car} onClick={openDetail} />
              ))}
        </div>
      </section>

      {/* Zurich */}
      <section className="px-[76px] mt-[50px] mb-[20px]">
        {!loaded ? (
          <Skeleton className="h-[32px] w-[200px]" />
        ) : (
          <h2 className="text-[32px] font-bold">
            Zurich ( {zurichCars.length} )
          </h2>
        )}
      </section>
      <section className="px-[53px]">
        <div className="grid grid-cols-3 gap-[28px]">
          {!loaded
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : zurichCars.map((car) => (
                <CarCard key={car.id} car={car} onClick={openDetail} />
              ))}
        </div>
      </section>

      {/* Abu Dhabi */}
      <section className="px-[76px] mt-[50px] mb-[20px]">
        {!loaded ? (
          <Skeleton className="h-[32px] w-[260px]" />
        ) : (
          <h2 className="text-[32px] font-bold">
            Abu Dhabi ( {abuDhabiCars.length} )
          </h2>
        )}
      </section>
      <section className="px-[53px]">
        <div className="grid grid-cols-3 gap-[28px]">
          {!loaded
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : abuDhabiCars.map((car) => (
                <CarCard key={car.id} car={car} onClick={openDetail} />
              ))}
        </div>
      </section>

      <div className="h-24" />

      {/* Detail Overlay */}
      {selectedCar && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100]"
          style={{ visibility: "hidden" }}
        >
          {/* Animated background that morphs from card to fullscreen */}
          <div
            ref={overlayBgRef}
            className="absolute inset-0"
            style={{ backgroundColor: selectedCar.bgHex, willChange: "transform" }}
          />

          {/* Detail content */}
          <div className="absolute inset-0 flex overflow-hidden">
            {/* Left side - Car image */}
            <div className="flex-1 flex items-center justify-center relative">
              <button
                onClick={
                  bookingStep === 2
                    ? slideBackToDaySelect
                    : bookingStep === 1
                      ? slideBackToDetail
                      : closeDetail
                }
                className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-[16px]">Back</span>
              </button>

              <div ref={detailImageRef} className="relative w-[600px] h-[250px]">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right side - panels container */}
            <div className="w-[480px] relative">
              {/* Panel 1: Car details */}
              <div
                ref={detailContentRef}
                className="absolute inset-0 flex flex-col justify-center pr-16"
                style={{ visibility: "hidden" }}
              >
                <p data-stagger className="text-[18px] text-white/50 uppercase tracking-widest mb-2">
                  {selectedCar.subtitle}
                </p>
                <h2 data-stagger className="text-[48px] font-britanica leading-[1.1] mb-6">
                  {selectedCar.name}
                </h2>
                <p data-stagger className="text-[16px] leading-[1.7] text-white/70 mb-10">
                  {selectedCar.description}
                </p>

                {/* Specs grid */}
                <div data-stagger className="grid grid-cols-2 gap-6 mb-10">
                  <SpecItem
                    icon={<Calendar className="w-5 h-5" />}
                    label="Year"
                    value={selectedCar.year}
                  />
                  <SpecItem
                    icon={<Gauge className="w-5 h-5" />}
                    label="Power"
                    value={selectedCar.power}
                  />
                  <SpecItem
                    icon={<Fuel className="w-5 h-5" />}
                    label="Engine"
                    value={selectedCar.engine}
                  />
                  <SpecItem
                    icon={<Settings className="w-5 h-5" />}
                    label="Transmission"
                    value={selectedCar.transmission}
                  />
                </div>

                <button
                  data-stagger
                  onClick={slideToDateSelect}
                  className="flex items-center justify-center gap-2 bg-[#e20000] text-white text-[18px] h-[56px] rounded-full w-full hover:bg-[#c00] transition-colors"
                >
                  Book This Car
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Panel 2: Date selection */}
              <div
                ref={dateSelectRef}
                className="absolute inset-0 flex flex-col justify-center pr-16"
                style={{ visibility: "hidden" }}
              >
                <p data-date-stagger className="text-[18px] text-white/50 font-medium mb-4">
                  Step 2/3
                </p>

                <div data-date-stagger className="w-full h-[2px] bg-white/20 mb-8 relative">
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-white" />
                </div>

                <h2 data-date-stagger className="text-[37px] font-britanica leading-[1.15] mb-3">
                  Hello James! Let&apos;s schedule your vehicle delivery together:
                </h2>
                <p data-date-stagger className="text-[16px] text-white/50 leading-[1.5] mb-12">
                  Please pick days suitable for you for a delivery
                </p>

                <div className="grid grid-cols-3 gap-5 mb-12">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (day) => {
                      const isSelected = selectedDays.includes(day);
                      return (
                        <button
                          key={day}
                          data-date-stagger
                          onClick={() =>
                            setSelectedDays((prev) =>
                              prev.includes(day)
                                ? prev.filter((d) => d !== day)
                                : [...prev, day]
                            )
                          }
                          className={`w-[92px] h-[92px] rounded-full flex items-center justify-center text-[21px] font-britanica uppercase transition-colors ${
                            isSelected
                              ? "bg-white text-[#222]"
                              : "bg-transparent border-[1.5px] border-white/40 text-white"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  data-date-stagger
                  onClick={slideToTimeSelect}
                  disabled={selectedDays.length === 0}
                  className={`flex items-center justify-center gap-2 text-white text-[20px] h-[56px] w-full transition-colors ${
                    selectedDays.length === 0
                      ? "bg-white/10 cursor-not-allowed"
                      : "bg-[#e20000] hover:bg-[#c00]"
                  }`}
                >
                  Confirm
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Panel 3: Time window selection */}
              <div
                ref={timeSelectRef}
                className="absolute inset-0 flex flex-col justify-center pr-16 overflow-y-auto"
                style={{ visibility: "hidden" }}
              >
                <p data-time-stagger className="text-[18px] text-white/50 font-medium mb-4">
                  Step 3/3
                </p>

                <div data-time-stagger className="w-full h-[2px] bg-white/20 mb-8 relative">
                  <div className="absolute inset-y-0 left-0 w-full bg-white" />
                </div>

                <h2 data-time-stagger className="text-[32px] font-britanica leading-[1.15] mb-2">
                  Pick your time windows
                </h2>
                <p data-time-stagger className="text-[16px] text-white/50 leading-[1.5] mb-8">
                  Select the times that work best for each day
                </p>

                <div className="space-y-6 mb-10">
                  {selectedDays.map((day) => (
                    <DayTimeRow
                      key={day}
                      day={day}
                      selectedSlots={selectedTimes[day] || []}
                      onToggle={(slot) =>
                        setSelectedTimes((prev) => {
                          const current = prev[day] || [];
                          const next = current.includes(slot) ? [] : [slot];
                          return { ...prev, [day]: next };
                        })
                      }
                    />
                  ))}
                </div>

                <button
                  data-time-stagger
                  className="flex items-center justify-center gap-2 bg-[#e20000] text-white text-[20px] h-[56px] w-full shrink-0 hover:bg-[#c00] transition-colors"
                >
                  Book Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CarCard({
  car,
  onClick,
}: {
  car: Car;
  onClick: (car: Car, el: HTMLDivElement) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={() => cardRef.current && onClick(car, cardRef.current)}
      className={`${car.bg} rounded-[20px] h-[317px] relative overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.96]`}
    >
      <div className="relative w-[320px] h-[100px] mb-8">
        <Image src={car.image} alt={car.name} fill className="object-contain" />
      </div>
      <p className="text-[24px] text-white/60 text-center">{car.subtitle}</p>
      <p className="text-[32px] font-britanica text-white text-center">
        {car.name}
      </p>
    </div>
  );
}

function SpecItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-white/40 mt-0.5">{icon}</div>
      <div>
        <p className="text-[13px] text-white/40 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-[16px] text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Day Time Row (Step 3)                                              */
/* ------------------------------------------------------------------ */

const ALL_TIME_SLOTS = [
  "8:00 – 10:00",
  "10:00 – 12:00",
  "12:00 – 14:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
  "18:00 – 20:00",
];

// Seeded random per day so slots stay stable across re-renders
function getSlotsForDay(day: string): string[] {
  let hash = 0;
  for (let i = 0; i < day.length; i++) {
    hash = (hash * 31 + day.charCodeAt(i)) | 0;
  }
  const shuffled = [...ALL_TIME_SLOTS].sort(() => {
    hash = (hash * 16807 + 1) | 0;
    return (hash & 0xffff) / 0xffff - 0.5;
  });
  // Pick 2–4 slots
  const count = 2 + (((hash >>> 0) % 3));
  return shuffled.slice(0, count).sort((a, b) => a.localeCompare(b));
}

const DAY_LABELS: Record<string, string> = {
  SUN: "Sunday",
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
  SAT: "Saturday",
};

function DayTimeRow({
  day,
  selectedSlots,
  onToggle,
}: {
  day: string;
  selectedSlots: string[];
  onToggle: (slot: string) => void;
}) {
  return (
    <div data-time-stagger>
      <p className="text-[18px] font-britanica uppercase mb-3">
        {DAY_LABELS[day] || day}
      </p>
      <div className="flex flex-wrap gap-2">
        {getSlotsForDay(day).map((slot) => {
          const isSelected = selectedSlots.includes(slot);
          return (
            <button
              key={slot}
              onClick={() => onToggle(slot)}
              className={`px-4 py-2 rounded-full text-[14px] transition-colors ${
                isSelected
                  ? "bg-white text-[#222] font-medium"
                  : "border border-white/30 text-white/70 hover:border-white/60"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drag Parallax Slider                                               */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 519;
const CARD_GAP = 28;
const PARALLAX_AMOUNT = 40; // px the car image shifts inside its card

function DragParallaxSlider({
  cars,
  onCardClick,
}: {
  cars: Car[];
  onCardClick: (car: Car, el: HTMLDivElement) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef({ x: 0, startX: 0 });
  const dragDistRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth =
      cars.length * CARD_WIDTH + (cars.length - 1) * CARD_GAP;
    const viewportWidth = window.innerWidth - 53 * 2; // account for px-[53px]
    const maxDrag = 0;
    const minDrag = -(totalWidth - viewportWidth);

    function clamp(val: number) {
      return Math.max(minDrag, Math.min(maxDrag, val));
    }

    function applyParallax() {
      const cards = cardsRef.current;
      const images = imagesRef.current;
      const viewCenter = window.innerWidth / 2;

      cards.forEach((card, i) => {
        if (!card || !images[i]) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        // Normalize: -1 (left edge) to 1 (right edge)
        const offset =
          ((cardCenter - viewCenter) / (window.innerWidth / 2)) *
          PARALLAX_AMOUNT;
        gsap.set(images[i], { x: -offset });
      });
    }

    function setTrackPosition(x: number, duration = 0) {
      const clamped = clamp(x);
      posRef.current.x = clamped;
      if (duration > 0) {
        gsap.to(track, {
          x: clamped,
          duration,
          ease: "power3.out",
          onUpdate: applyParallax,
        });
      } else {
        gsap.set(track, { x: clamped });
        applyParallax();
      }
    }

    // Initial parallax
    applyParallax();

    const observer = Observer.create({
      target: track,
      type: "touch,pointer",
      dragMinimum: 3,
      onPress: () => {
        posRef.current.startX = posRef.current.x;
        dragDistRef.current = 0;
        gsap.killTweensOf(track);
      },
      onDrag: (self) => {
        dragDistRef.current += Math.abs(self.deltaX);
        const newX = posRef.current.startX + (self.x ?? 0) - (self.startX ?? 0);
        // Allow slight overscroll with rubber-band
        const overshoot = 0.3;
        let clamped = newX;
        if (newX > maxDrag) clamped = maxDrag + (newX - maxDrag) * overshoot;
        if (newX < minDrag) clamped = minDrag + (newX - minDrag) * overshoot;
        posRef.current.x = clamped;
        gsap.set(track, { x: clamped });
        applyParallax();
      },
      onDragEnd: (self) => {
        // Momentum: throw with velocity
        const velocity = self.velocityX ?? 0;
        const momentum = velocity * 0.3;
        const target = clamp(posRef.current.x + momentum);
        setTrackPosition(target, Math.min(1.2, Math.abs(momentum) / 1000 + 0.4));
      },
    });

    // Wheel horizontal scroll
    function onWheel(e: WheelEvent) {
      // Only hijack if there's meaningful horizontal intent or shift is held
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const delta = e.deltaX || e.deltaY;
        setTrackPosition(posRef.current.x - delta, 0.3);
      }
    }
    track.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      observer.kill();
      track.removeEventListener("wheel", onWheel);
    };
  }, [cars]);

  return (
    <section className="mt-[15px] px-[53px] overflow-hidden">
      <div className="relative">
        <div
          ref={trackRef}
          className="flex select-none"
          style={{ gap: CARD_GAP, cursor: "grab", willChange: "transform" }}
          onMouseDown={(e) => e.currentTarget.style.cursor = "grabbing"}
          onMouseUp={(e) => e.currentTarget.style.cursor = "grab"}
        >
          {cars.map((car, i) => (
            <div
              key={car.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              onClick={() => {
                // Only open detail if this wasn't a drag gesture
                if (dragDistRef.current < 8 && cardsRef.current[i]) {
                  onCardClick(car, cardsRef.current[i]!);
                }
              }}
              className={`shrink-0 rounded-[20px] h-[317px] relative overflow-hidden flex flex-col items-center justify-center cursor-grab active:cursor-grabbing`}
              style={{ width: CARD_WIDTH, backgroundColor: car.bgHex }}
            >
              <div
                ref={(el) => { imagesRef.current[i] = el; }}
                className="relative mb-8"
                style={{ width: 360, height: 110 }}
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
              <p className="text-[24px] text-white/60 text-center pointer-events-none">
                {car.subtitle}
              </p>
              <p className="text-[32px] font-britanica text-white text-center pointer-events-none">
                {car.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
