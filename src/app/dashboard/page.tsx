"use client";

import Image from "next/image";
import { ChevronRight, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Observer } from "gsap/dist/Observer";
import {
  type Car,
  type ActiveBooking,
  sliderCars,
  bookingCars,
  zurichCars,
  abuDhabiCars,
  activeBookings,
  activeBookingIds,
} from "@/lib/cars";

gsap.registerPlugin(Observer);

// Persists across client-side navigations so the skeleton only shows on the
// very first load (or after a hard refresh). Module scope survives remounts.
let _dashboardLoaded = false;

const navLinks = [
  "Start",
  "Manage Bookings",
  "Your Account",
  "Insights",
  "Concierge",
];

/* ------------------------------------------------------------------ */
/*  Skeleton helpers                                                    */
/* ------------------------------------------------------------------ */

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-white/10 ${className ?? ""}`} />
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

/* ------------------------------------------------------------------ */
/*  Active booking helpers                                              */
/* ------------------------------------------------------------------ */

// Map carId → Car for quick lookup in the active booking cards
const activeBookingCars = new Map(
  bookingCars
    .filter((c) => activeBookingIds.has(c.id))
    .map((c) => [c.id, c])
);

/* ------------------------------------------------------------------ */
/*  Active booking skeleton                                             */
/* ------------------------------------------------------------------ */

function SkeletonActiveBooking() {
  return (
    <div className="rounded-[20px] h-[300px] bg-white/5 animate-pulse flex overflow-hidden">
      <div className="flex-1" />
      <div className="w-[280px] p-7 border-l border-white/10 flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-[11px] w-[90px]" />
          <Skeleton className="h-[28px] w-[130px]" />
          <Skeleton className="h-[16px] w-[80px]" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-[13px] w-[150px]" />
          <Skeleton className="h-[10px] w-[110px]" />
        </div>
        <div className="flex gap-6">
          <div className="space-y-1">
            <Skeleton className="h-[34px] w-[60px]" />
            <Skeleton className="h-[9px] w-[50px]" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-[34px] w-[60px]" />
            <Skeleton className="h-[9px] w-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Active booking card                                                 */
/* ------------------------------------------------------------------ */

function ActiveBookingCard({
  booking,
  car,
  onClick,
}: {
  booking: ActiveBooking;
  car: Car;
  onClick: (car: Car, el: HTMLDivElement) => void;
}) {
  const isLive = booking.status === "live";
  const divRef = useRef<HTMLDivElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const coordsRef = useRef<HTMLParagraphElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Live coordinate drift — moves the position based on speed each tick
  useEffect(() => {
    if (!isLive || booking.lat == null || booking.lon == null) return;
    let lat = booking.lat;
    let lon = booking.lon;
    let heading = Math.random() * 360;
    const ids: number[] = [];
    const tick = () => {
      const speedKmh = booking.currentSpeed ?? 0;
      const elapsed = (2000 + Math.random() * 1000) / 1000;
      const distKm = (speedKmh * elapsed) / 3600;
      heading += (Math.random() - 0.5) * 20;
      const rad = (heading * Math.PI) / 180;
      lat += (distKm * Math.cos(rad)) / 111.111;
      lon += (distKm * Math.sin(rad)) / (111.111 * Math.cos((lat * Math.PI) / 180));
      if (coordsRef.current) {
        coordsRef.current.textContent = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
      }
      const id = window.setTimeout(tick, elapsed * 1000);
      ids.push(id);
    };
    const id = window.setTimeout(tick, 2000);
    ids.push(id);
    return () => ids.forEach(window.clearTimeout);
  }, [isLive, booking]);

  // Count up KM driven on mount
  useEffect(() => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: booking.kmDriven,
      duration: 1.8,
      ease: "power2.out",
      delay: 0.4,
      onUpdate() {
        if (kmRef.current) kmRef.current.textContent = String(Math.round(obj.v));
      },
    });
  }, [booking.kmDriven]);

  // Live speed fluctuation — only for live bookings
  useEffect(() => {
    if (!isLive || booking.currentSpeed == null) return;
    const base = booking.currentSpeed;
    const ids: number[] = [];
    const tick = () => {
      const drift = Math.round((Math.random() - 0.5) * 6);
      const next = Math.max(base - 10, Math.min(base + 10, base + drift));
      if (speedRef.current) speedRef.current.textContent = String(next);
      const id = window.setTimeout(tick, 1800 + Math.random() * 1400);
      ids.push(id);
    };
    const id = window.setTimeout(tick, 2200);
    ids.push(id);
    return () => ids.forEach(window.clearTimeout);
  }, [isLive, booking.currentSpeed]);

  return (
    <div
      ref={divRef}
      onClick={() => { if (divRef.current) onClick(car, divRef.current); }}
      className="rounded-[20px] overflow-hidden cursor-pointer h-[300px] flex transition-transform duration-200 hover:scale-[1.005] active:scale-[0.99]"
      style={{ backgroundColor: car.bgHex }}
    >
      {/* Left — car image */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent"
          style={{ "--tw-gradient-to": car.bgHex } as React.CSSProperties}
        />
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
        <div className="relative w-[320px] h-[160px]">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className={`object-contain transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      </div>

      {/* Right — telemetry panel */}
      <div className="w-[280px] shrink-0 p-7 flex flex-col justify-between border-l border-white/10">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-1.5">Active Booking</p>
            <p className="text-[24px] font-britanica text-white leading-none mb-1 truncate">{car.name}</p>
            <p className="text-[13px] text-white/50">{car.subtitle}</p>
          </div>
          {/* Status badge */}
          {isLive ? (
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 shrink-0 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-white/70 font-medium">Live</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 shrink-0 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="text-[11px] text-white/40 font-medium">Parked</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-white/35 mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] text-white font-medium leading-tight">{booking.location}</p>
            <p ref={coordsRef} className="text-[11px] text-white/35 font-mono mt-0.5">{booking.coordinates}</p>
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="flex items-end gap-6 mb-2.5">
            <div>
              <p className="text-[32px] font-britanica text-white leading-none">
                <span ref={kmRef}>0</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/35 mt-1.5">KM Driven</p>
            </div>
            {isLive && booking.currentSpeed != null && (
              <>
                <div className="w-px h-8 bg-white/10 mb-1" />
                <div>
                  <p className="text-[32px] font-britanica text-white leading-none">
                    <span ref={speedRef}>{booking.currentSpeed}</span>
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/35 mt-1.5">KM/H</p>
                </div>
              </>
            )}
          </div>
          <p className="text-[11px] text-white/25">{booking.period}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard page                                                      */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(_dashboardLoaded);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (_dashboardLoaded) return;
    const t = setTimeout(() => {
      _dashboardLoaded = true;
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  function handleCardClick(car: Car, el: HTMLDivElement) {
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const overlay = document.createElement("div");
    overlay.className = "ryde-page-transition";
    Object.assign(overlay.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      backgroundColor: car.bgHex,
      borderRadius: "20px",
      zIndex: "9999",
      pointerEvents: "none",
      transformOrigin: "center center",
    });
    document.body.appendChild(overlay);

    const tx = vw / 2 - (rect.left + rect.width / 2);
    const ty = vh / 2 - (rect.top + rect.height / 2);
    gsap.to(overlay, {
      x: tx,
      y: ty,
      scaleX: vw / rect.width,
      scaleY: vh / rect.height,
      borderRadius: 0,
      duration: 0.55,
      ease: "power4.out",
      // No onComplete removal — detail page owns cleanup via its fade-out
    });

    setTimeout(() => router.push(`/dashboard/cars/${car.id}`), 220);
  }

  return (
    <div className="min-h-screen bg-[#222] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center h-20 px-[68px] transition-[background-color,backdrop-filter] duration-300 ${
          scrolled ? "backdrop-blur-[12.5px] bg-[rgba(231,229,224,0.05)]" : ""
        }`}
      >
        {/* Logo */}
        <div className="h-[41px] w-[31px] relative shrink-0">
          <Image
            src="/dashboard/ryde-logo.png"
            alt="RYDE"
            fill
            className="object-cover"
          />
        </div>

        {/* Nav links — absolutely centered so they're always in the middle */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          {navLinks.map((link, i) => (
            <button
              key={link}
              className={`relative px-6 h-12 flex items-center text-[16px] text-white ${
                i === 0 ? "font-medium" : "font-normal opacity-60 hover:opacity-100 transition-opacity"
              }`}
            >
              {link}
              {i === 0 && (
                <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* CTA — pushed to the right */}
        <button className="ml-auto bg-[#e20000] text-[#e7e5e0] text-[16px] px-6 h-12 rounded-full shrink-0">
          Request a Demo
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/dashboard/hero-bond.png"
            alt="James Bond"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Left gradient — darkens behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        {/* Bottom gradient — blends hero into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-[#222] to-transparent" />

        {/* Content — bottom-anchored, aligned with navbar */}
        <div className="relative z-10 h-full flex flex-col justify-end pl-[68px] pb-[130px]">
          {!loaded ? (
            <div className="space-y-5">
              <Skeleton className="h-[20px] w-[160px]" />
              <Skeleton className="h-[88px] w-[640px]" />
              <Skeleton className="h-[88px] w-[420px]" />
              <Skeleton className="h-[18px] w-[540px]" />
              <Skeleton className="h-[18px] w-[360px]" />
              <Skeleton className="h-[52px] w-[180px] rounded-full" />
            </div>
          ) : (
            <>
              <p className="text-[16px] leading-[1.6] text-white/55 mb-2 uppercase tracking-[0.18em]">
                RYDE Exclusives
              </p>
              <h1 className="text-[80px] leading-[88px] font-britanica tracking-tight mb-5 max-w-[720px]">
                The James Bond Collection
              </h1>
              <p className="text-[18px] leading-[1.7] max-w-[560px] text-white/70 mb-10">
                Ever imagined stepping into James Bond&apos;s shoes? With RYDE, you
                don&apos;t imagine, you drive. Experience the cars made famous by 007.
                <br />
                <span className="text-white/40">April 20 &ndash; May 22, 2026.</span>
              </p>
              <button className="flex items-center gap-2.5 bg-[#e20000] text-white text-[16px] font-medium px-8 h-[52px] rounded-full w-fit">
                Explore
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Drag Parallax Slider */}
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
          <DragParallaxSlider cars={sliderCars} onCardClick={handleCardClick} />
        )}
      </div>

      {/* Active Bookings */}
      <section className="px-[76px] mt-[50px] mb-[20px]">
        {!loaded ? (
          <Skeleton className="h-[32px] w-[380px]" />
        ) : (
          <h2 className="text-[32px] font-bold">
            Your active bookings ( {activeBookings.length} )
          </h2>
        )}
      </section>
      <section className="px-[53px]">
        <div className="grid grid-cols-2 gap-[28px]">
          {!loaded
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonActiveBooking key={i} />)
            : activeBookings.map((booking) => {
                const car = activeBookingCars.get(booking.carId);
                if (!car) return null;
                return (
                  <ActiveBookingCard
                    key={booking.carId}
                    booking={booking}
                    car={car}
                    onClick={handleCardClick}
                  />
                );
              })}
        </div>
      </section>

      {/* Zurich */}
      <section className="px-[76px] mt-[50px] mb-[20px]">
        {!loaded ? (
          <Skeleton className="h-[32px] w-[200px]" />
        ) : (
          <h2 className="text-[32px] font-bold">Zurich ( {zurichCars.length} )</h2>
        )}
      </section>
      <section className="px-[53px]">
        <div className="grid grid-cols-3 gap-[28px]">
          {!loaded
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : zurichCars.map((car) => (
                <CarCard key={car.id} car={car} onClick={handleCardClick} />
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
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : abuDhabiCars.map((car) => (
                <CarCard key={car.id} car={car} onClick={handleCardClick} />
              ))}
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CarCard                                                             */
/* ------------------------------------------------------------------ */

function CarCard({
  car,
  onClick,
}: {
  car: Car;
  onClick: (car: Car, el: HTMLDivElement) => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      onClick={() => { if (divRef.current) onClick(car, divRef.current); }}
      className={`${car.bg} rounded-[20px] h-[317px] relative overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.96]`}
    >
      <div className="relative w-[320px] h-[100px] mb-8">
        {!imgLoaded && (
          <div className="absolute inset-0 rounded-lg animate-pulse bg-white/10" />
        )}
        <Image
          src={car.image}
          alt={car.name}
          fill
          className={`object-contain transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <p className="text-[24px] text-white/60 text-center">{car.subtitle}</p>
      <p className="text-[32px] font-britanica text-white text-center">{car.name}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SliderCard                                                          */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 519;
const CARD_GAP = 28;
const PARALLAX_AMOUNT = 40;

function SliderCard({
  car,
  cardRef,
  imageRef,
  onClick,
}: {
  car: Car;
  cardRef: (el: HTMLDivElement | null) => void;
  imageRef: (el: HTMLDivElement | null) => void;
  onClick: () => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="shrink-0 rounded-[20px] h-[317px] relative overflow-hidden flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ width: CARD_WIDTH, backgroundColor: car.bgHex }}
    >
      <div ref={imageRef} className="relative mb-8" style={{ width: 360, height: 110 }}>
        {!imgLoaded && (
          <div className="absolute inset-0 rounded-lg animate-pulse bg-white/10" />
        )}
        <Image
          src={car.image}
          alt={car.name}
          fill
          className={`object-contain pointer-events-none transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          draggable={false}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <p className="text-[24px] text-white/60 text-center pointer-events-none">
        {car.subtitle}
      </p>
      <p className="text-[32px] font-britanica text-white text-center pointer-events-none">
        {car.name}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DragParallaxSlider                                                  */
/* ------------------------------------------------------------------ */

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

    const totalWidth = cars.length * CARD_WIDTH + (cars.length - 1) * CARD_GAP;
    const viewportWidth = window.innerWidth - 53 * 2;
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
        const offset =
          ((cardCenter - viewCenter) / (window.innerWidth / 2)) * PARALLAX_AMOUNT;
        gsap.set(images[i], { x: -offset });
      });
    }

    function setTrackPosition(x: number, duration = 0) {
      const clamped = clamp(x);
      posRef.current.x = clamped;
      if (duration > 0) {
        gsap.to(track, { x: clamped, duration, ease: "power3.out", onUpdate: applyParallax });
      } else {
        gsap.set(track, { x: clamped });
        applyParallax();
      }
    }

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
        const overshoot = 0.3;
        let clamped = newX;
        if (newX > maxDrag) clamped = maxDrag + (newX - maxDrag) * overshoot;
        if (newX < minDrag) clamped = minDrag + (newX - minDrag) * overshoot;
        posRef.current.x = clamped;
        gsap.set(track, { x: clamped });
        applyParallax();
      },
      onDragEnd: (self) => {
        const velocity = self.velocityX ?? 0;
        const momentum = velocity * 0.3;
        const target = clamp(posRef.current.x + momentum);
        setTrackPosition(target, Math.min(1.2, Math.abs(momentum) / 1000 + 0.4));
      },
    });

    function onWheel(e: WheelEvent) {
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
          onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
          onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
        >
          {cars.map((car, i) => (
            <SliderCard
              key={car.id}
              car={car}
              cardRef={(el) => { cardsRef.current[i] = el; }}
              imageRef={(el) => { imagesRef.current[i] = el; }}
              onClick={() => {
                if (dragDistRef.current < 8) {
                  const cardEl = cardsRef.current[i];
                  if (cardEl) onCardClick(car, cardEl);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
