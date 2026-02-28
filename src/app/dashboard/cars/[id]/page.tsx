"use client";

import { use, useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  ChevronRight,
  LoaderCircle,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import { SplitText } from "gsap/dist/SplitText";
import { findCarById, activeBookings } from "@/lib/cars";
import type { LiveMapTrackerHandle } from "@/components/LiveMapTracker";

gsap.registerPlugin(CustomEase, SplitText);

const RYDE_EASE = CustomEase.create(
  "rydeEase",
  "M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1"
);

const LiveMapTrackerComponent = dynamic(
  () => import("@/components/LiveMapTracker"),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const BOOKING_CONFIRMATION_STEPS = [
  "Checking vehicle availability",
  "Securing your booking slot",
  "Sending your confirmation details",
];

const BOOKING_LOADER_IMAGES = [
  "/dashboard/hero-bond.png",
  "/dashboard/car-db10.png",
  "/dashboard/car-v12.png",
];

const ALL_TIME_SLOTS = [
  "8:00 – 10:00",
  "10:00 – 12:00",
  "12:00 – 14:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
  "18:00 – 20:00",
];

function getSlotsForDay(day: string): string[] {
  let hash = 0;
  for (let i = 0; i < day.length; i++) {
    hash = (hash * 31 + day.charCodeAt(i)) | 0;
  }
  const shuffled = [...ALL_TIME_SLOTS].sort(() => {
    hash = (hash * 16807 + 1) | 0;
    return (hash & 0xffff) / 0xffff - 0.5;
  });
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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

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
        <p className="text-[13px] text-white/40 uppercase tracking-wider">{label}</p>
        <p className="text-[16px] text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

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
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const car = findCarById(id);
  const activeBooking = activeBookings.find((b) => b.carId === car?.id) ?? null;
  const isActiveBooking = activeBooking !== null;
  const isLive = activeBooking?.status === "live";
  const router = useRouter();

  const [bookingStep, setBookingStep] = useState(1); // 1 = day select, 2 = time select
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBookingLoaderOpen, setIsBookingLoaderOpen] = useState(false);
  const [bookingLoaderStep, setBookingLoaderStep] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingSelectionError, setBookingSelectionError] = useState("");
  const [showLoaderVisuals, setShowLoaderVisuals] = useState(false);

  const leftContentRef = useRef<HTMLDivElement>(null);
  const detailH1Ref = useRef<HTMLHeadingElement>(null);
  const detailDescRef = useRef<HTMLParagraphElement>(null);
  const bookingH2Ref = useRef<HTMLHeadingElement>(null);
  const bookingSubRef = useRef<HTMLParagraphElement>(null);
  const dayPanelRef = useRef<HTMLDivElement>(null);
  const timePanelRef = useRef<HTMLDivElement>(null);
  const bookingTimeoutsRef = useRef<number[]>([]);
  const confirmOverlayRef = useRef<HTMLDivElement>(null);
  const confirmContentRef = useRef<HTMLDivElement>(null);
  const kmCountRef = useRef<HTMLSpanElement>(null);
  const speedCountRef = useRef<HTMLSpanElement>(null);
  const coordsRef = useRef<HTMLParagraphElement>(null);
  const mapRef = useRef<LiveMapTrackerHandle>(null);

  // Active booking: count up KM driven
  useEffect(() => {
    if (!isActiveBooking || !activeBooking) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: activeBooking.kmDriven,
      duration: 1.8,
      ease: "power2.out",
      delay: 0.6,
      onUpdate() {
        if (kmCountRef.current) kmCountRef.current.textContent = String(Math.round(obj.v));
      },
    });
  }, [isActiveBooking, activeBooking]);

  // Active booking: live coordinate drift
  useEffect(() => {
    if (!isLive || activeBooking?.lat == null || activeBooking?.lon == null) return;
    let lat = activeBooking.lat;
    let lon = activeBooking.lon;
    let heading = Math.random() * 360;
    const ids: number[] = [];
    const tick = () => {
      const speedKmh = activeBooking.currentSpeed ?? 0;
      const elapsed = (2000 + Math.random() * 1000) / 1000;
      const distKm = (speedKmh * elapsed) / 3600;
      heading += (Math.random() - 0.5) * 20;
      const rad = (heading * Math.PI) / 180;
      lat += (distKm * Math.cos(rad)) / 111.111;
      lon += (distKm * Math.sin(rad)) / (111.111 * Math.cos((lat * Math.PI) / 180));
      if (coordsRef.current) {
        coordsRef.current.textContent = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
      }
      mapRef.current?.updatePosition(lat, lon);
      const id = window.setTimeout(tick, elapsed * 1000);
      ids.push(id);
    };
    const id = window.setTimeout(tick, 2000);
    ids.push(id);
    return () => ids.forEach(window.clearTimeout);
  }, [isLive, activeBooking]);

  // Active booking: live speed fluctuation (live only)
  useEffect(() => {
    if (!isLive || activeBooking?.currentSpeed == null) return;
    const base = activeBooking.currentSpeed;
    const ids: number[] = [];
    const tick = () => {
      const drift = Math.round((Math.random() - 0.5) * 6);
      const next = Math.max(base - 10, Math.min(base + 10, base + drift));
      if (speedCountRef.current) speedCountRef.current.textContent = String(next);
      const id = window.setTimeout(tick, 1800 + Math.random() * 1400);
      ids.push(id);
    };
    const id = window.setTimeout(tick, 2500);
    ids.push(id);
    return () => ids.forEach(window.clearTimeout);
  }, [isLive, activeBooking]);

  // Entry animations + page-transition overlay (coordinated in one effect)
  useEffect(() => {
    // Always set panel positions first
    if (dayPanelRef.current) gsap.set(dayPanelRef.current, { x: 0, opacity: 1 });
    if (timePanelRef.current) gsap.set(timePanelRef.current, { x: "100%" });

    const overlay = document.querySelector(".ryde-page-transition") as HTMLElement | null;

    const leftEls = leftContentRef.current
      ? Array.from(leftContentRef.current.querySelectorAll<HTMLElement>("[data-stagger]"))
      : [];
    const dateEls = dayPanelRef.current
      ? Array.from(dayPanelRef.current.querySelectorAll<HTMLElement>("[data-date-stagger]"))
      : [];

    // ── SplitText setup ──
    const splits: InstanceType<typeof SplitText>[] = [];

    function wrapLines(lines: Element[], inline = false) {
      lines.forEach((line) => {
        const wrap = document.createElement(inline ? "span" : "div");
        wrap.style.cssText = inline
          ? "display:inline-block;overflow:hidden;line-height:1;vertical-align:bottom;"
          : "overflow:hidden;line-height:inherit;";
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
      });
    }

    let splitH1: InstanceType<typeof SplitText> | null = null;
    let splitDesc: InstanceType<typeof SplitText> | null = null;
    let splitBookingH2: InstanceType<typeof SplitText> | null = null;
    let splitBookingSub: InstanceType<typeof SplitText> | null = null;

    // Left panel h1 — char flip-in (same as dashboard hero)
    // "words,chars" + nowrap on word spans prevents mid-word line breaks.
    if (detailH1Ref.current) {
      splitH1 = new SplitText(detailH1Ref.current, { type: "words,chars", aria: false });
      splits.push(splitH1);
      splitH1.words.forEach((w) => ((w as HTMLElement).style.whiteSpace = "nowrap"));
      wrapLines(splitH1.chars, true);
      gsap.set(splitH1.chars, { y: "100%", rotateX: 60, transformPerspective: 800, force3D: true });
    }

    // Left panel description — lines slide up
    if (detailDescRef.current) {
      splitDesc = new SplitText(detailDescRef.current, { type: "lines", aria: false });
      splits.push(splitDesc);
      wrapLines(splitDesc.lines);
      gsap.set(splitDesc.lines, { y: "110%", force3D: true });
    }

    // Booking panel h2 — words slide up with fade
    if (bookingH2Ref.current) {
      splitBookingH2 = new SplitText(bookingH2Ref.current, { type: "words", aria: false });
      splits.push(splitBookingH2);
      wrapLines(splitBookingH2.words, true);
      gsap.set(splitBookingH2.words, { y: "60%", opacity: 0, force3D: true });
    }

    // Booking panel sub-paragraph — lines slide up
    if (bookingSubRef.current) {
      splitBookingSub = new SplitText(bookingSubRef.current, { type: "lines", aria: false });
      splits.push(splitBookingSub);
      wrapLines(splitBookingSub.lines);
      gsap.set(splitBookingSub.lines, { y: "110%", force3D: true });
    }

    // Pre-hide simple stagger elements
    if (leftEls.length) gsap.set(leftEls, { opacity: 0, y: 30 });
    if (dateEls.length) gsap.set(dateEls, { opacity: 0, y: 20 });

    function animateIn(delay = 0) {
      const tl = gsap.timeline({ defaults: { force3D: true } });

      // Left: image, subtitle, specs — simple fade-up
      if (leftEls.length) {
        tl.to(leftEls, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" }, delay);
      }
      // Left: h1 chars flip in
      if (splitH1) {
        tl.to(splitH1.chars, { y: 0, rotateX: 0, duration: 2.1, stagger: 0.035, ease: "expo.out" }, delay + 0.1);
      }
      // Left: description lines slide up
      if (splitDesc) {
        tl.to(splitDesc.lines, { y: 0, duration: 1.65, stagger: { amount: 0.08, from: "end" }, ease: "power3.out" }, delay + 0.45);
      }

      // Right: step label, progress bar, day buttons, next button
      if (dateEls.length) {
        tl.to(dateEls, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, delay + 0.05);
      }
      // Right: booking h2 words
      if (splitBookingH2) {
        tl.to(splitBookingH2.words, { y: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: RYDE_EASE }, delay + 0.2);
      }
      // Right: booking sub-paragraph lines
      if (splitBookingSub) {
        tl.to(splitBookingSub.lines, { y: 0, duration: 1.1, stagger: { amount: 0.06, from: "end" }, ease: "power3.out" }, delay + 0.5);
      }
    }

    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.45,
        ease: "power1.in",
        onComplete: () => {
          overlay.remove();
          animateIn();
        },
      });
    } else {
      animateIn(0.15);
    }

    return () => {
      splits.forEach((s) => s.revert());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      bookingTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Clear booking error when valid selection is made
  useEffect(() => {
    const allDaysHaveSlot = selectedDays.every(
      (day) => (selectedTimes[day]?.length ?? 0) > 0
    );
    if (allDaysHaveSlot) setBookingSelectionError("");
  }, [selectedDays, selectedTimes]);

  // Loader visual fade-in
  useEffect(() => {
    if (isBookingLoaderOpen && !bookingConfirmed) {
      const raf = window.requestAnimationFrame(() => setShowLoaderVisuals(true));
      return () => window.cancelAnimationFrame(raf);
    }
    setShowLoaderVisuals(false);
  }, [isBookingLoaderOpen, bookingConfirmed]);

  // Confirmation overlay: slide right panel across to cover full screen
  useEffect(() => {
    if (!bookingConfirmed || !confirmOverlayRef.current || !confirmContentRef.current) return;

    const overlay = confirmOverlayRef.current;
    const els = confirmContentRef.current.querySelectorAll("[data-confirm]");

    gsap.set(overlay, { visibility: "visible", width: 480 });
    gsap.set(els, { opacity: 0, y: 40 });

    const tl = gsap.timeline();
    tl.to(overlay, { width: "100vw", duration: 0.75, ease: "power3.inOut" });
    tl.to(els, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: "power2.out" }, "-=0.15");
  }, [bookingConfirmed]);

  const canBookNow =
    selectedDays.length > 0 &&
    selectedDays.every((day) => (selectedTimes[day]?.length ?? 0) > 0);

  const bookingLoaderImageIndex = Math.min(
    bookingLoaderStep,
    BOOKING_LOADER_IMAGES.length - 1
  );

  const slideToTimeSelect = useCallback(() => {
    if (isAnimating || selectedDays.length === 0) return;
    setIsAnimating(true);
    setBookingStep(2);

    const dayPanel = dayPanelRef.current;
    const timePanel = timePanelRef.current;
    if (!dayPanel || !timePanel) { setIsAnimating(false); return; }

    gsap.set(timePanel, { x: "100%", opacity: 1 });

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
    tl.to(dayPanel, { x: "-120%", opacity: 0, duration: 0.5, ease: "power3.inOut" });
    tl.to(timePanel, { x: "0%", duration: 0.5, ease: "power3.inOut" }, "-=0.4");

    const staggerEls = timePanel.querySelectorAll("[data-time-stagger]");
    if (staggerEls.length > 0) {
      gsap.set(staggerEls, { opacity: 0, y: 20 });
      tl.to(staggerEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, "-=0.2");
    }
  }, [isAnimating, selectedDays]);

  const slideBackToDaySelect = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const dayPanel = dayPanelRef.current;
    const timePanel = timePanelRef.current;
    if (!dayPanel || !timePanel) { setIsAnimating(false); return; }

    const dateStaggerEls = dayPanel.querySelectorAll("[data-date-stagger]");
    if (dateStaggerEls.length > 0) gsap.set(dateStaggerEls, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      onComplete: () => {
        setBookingStep(1);
        setIsAnimating(false);
      },
    });
    tl.to(timePanel, { x: "100%", duration: 0.5, ease: "power3.inOut" });
    tl.to(dayPanel, { x: "0%", opacity: 1, duration: 0.5, ease: "power3.inOut" }, "-=0.4");
    if (dateStaggerEls.length > 0) {
      tl.to(dateStaggerEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" }, "-=0.2");
    }
  }, [isAnimating]);

  const startBookingConfirmation = useCallback(() => {
    if (isAnimating || isBookingLoaderOpen) return;
    if (!canBookNow) {
      setBookingSelectionError("Select at least one time slot for each chosen day.");
      return;
    }

    setBookingSelectionError("");
    setIsBookingLoaderOpen(true);
    setBookingLoaderStep(0);
    setBookingConfirmed(false);
    bookingTimeoutsRef.current = [];

    const t1 = window.setTimeout(() => setBookingLoaderStep(1), 1600);
    const t2 = window.setTimeout(() => setBookingLoaderStep(2), 3400);
    const t3 = window.setTimeout(() => {
      setBookingConfirmed(true);
      const t4 = window.setTimeout(() => {
        router.push("/dashboard");
      }, 3500);
      bookingTimeoutsRef.current.push(t4);
    }, 6200);

    bookingTimeoutsRef.current.push(t1, t2, t3);
  }, [isAnimating, isBookingLoaderOpen, canBookNow, router]);

  const handleBack = useCallback(() => {
    if (isActiveBooking) { router.push("/dashboard"); return; }
    if (isBookingLoaderOpen) return;
    if (bookingStep === 2) {
      slideBackToDaySelect();
    } else {
      router.push("/dashboard");
    }
  }, [isActiveBooking, isBookingLoaderOpen, bookingStep, slideBackToDaySelect, router]);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#222] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[20px] text-white/60 mb-4">Car not found</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: car.bgHex }}>
      {/* Main — full viewport height */}
      <div className="flex h-screen overflow-hidden">
        {/* ── Left: car info or booking loader images ── */}
        <div className="flex-1 relative">
          {/* Back button — always on top */}
          <button
            onClick={handleBack}
            disabled={isBookingLoaderOpen}
            className={`absolute top-8 left-8 z-[1000] flex items-center gap-2 transition-colors ${
              isBookingLoaderOpen
                ? "text-white/30 cursor-not-allowed"
                : "text-white/70 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[16px]">Back</span>
          </button>
          {isBookingLoaderOpen && !bookingConfirmed ? (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                showLoaderVisuals ? "opacity-100" : "opacity-0"
              }`}
            >
              {BOOKING_LOADER_IMAGES.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    bookingLoaderImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Booking step ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ) : isLive && activeBooking?.lat != null ? (
            /* Live vehicle — show tracking map */
            <div className="absolute inset-0">
              <LiveMapTrackerComponent
                ref={mapRef}
                initialLat={activeBooking.lat}
                initialLon={activeBooking.lon}
              />
              {/* Car name gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-10 pt-24 pb-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                <p className="text-[12px] text-white/50 uppercase tracking-widest mb-2">
                  {car.subtitle}
                </p>
                <h2 className="text-[38px] font-britanica leading-none text-white">
                  {car.name}
                </h2>
              </div>
            </div>
          ) : (
            <div
              ref={leftContentRef}
              className="flex flex-col items-center justify-center h-full px-16"
            >
              {/* Car image */}
              <div data-stagger className="relative w-[560px] h-[200px] mb-10">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="w-full max-w-[520px]">
                <p data-stagger className="text-[16px] text-white/50 uppercase tracking-widest mb-2">
                  {car.subtitle}
                </p>
                <h1 ref={detailH1Ref} className="text-[52px] font-britanica leading-[1.1] mb-6">
                  {car.name}
                </h1>

                {/* Specs */}
                <div data-stagger className="grid grid-cols-2 gap-5 mb-8">
                  <SpecItem icon={<Calendar className="w-5 h-5" />} label="Year" value={car.year} />
                  <SpecItem icon={<Gauge className="w-5 h-5" />} label="Power" value={car.power} />
                  <SpecItem icon={<Fuel className="w-5 h-5" />} label="Engine" value={car.engine} />
                  <SpecItem icon={<Settings className="w-5 h-5" />} label="Transmission" value={car.transmission} />
                </div>

                <p ref={detailDescRef} className="text-[15px] leading-[1.75] text-white/65">
                  {car.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: active-booking telemetry OR booking panel ── */}
        <div className="w-[480px] shrink-0 relative border-l border-white/10 overflow-hidden">
          {isActiveBooking && activeBooking ? (
            <div className="absolute inset-0 flex flex-col justify-between p-10">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-1.5">
                    Active Booking
                  </p>
                  <p className="text-[28px] font-britanica text-white leading-none">
                    {isLive ? "Currently in use" : "Vehicle parked"}
                  </p>
                </div>
                {isLive ? (
                  <div className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[12px] text-white/70 font-medium tracking-wide">Live</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span className="text-[12px] text-white/40 font-medium">Parked</span>
                  </div>
                )}
              </div>

              <div className="h-px bg-white/10" />

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[16px] text-white font-medium">{activeBooking.location}</p>
                  <p ref={coordsRef} className="text-[12px] text-white/35 font-mono mt-0.5">{activeBooking.coordinates}</p>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Stats */}
              <div className="flex items-end gap-10">
                <div>
                  <p className="text-[52px] font-britanica text-white leading-none">
                    <span ref={kmCountRef}>0</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/40 mt-2">KM Driven</p>
                </div>
                {isLive && activeBooking.currentSpeed != null && (
                  <>
                    <div className="w-px h-12 bg-white/10 mb-2" />
                    <div>
                      <p className="text-[52px] font-britanica text-white leading-none">
                        <span ref={speedCountRef}>{activeBooking.currentSpeed}</span>
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-white/40 mt-2">KM/H</p>
                    </div>
                  </>
                )}
              </div>

              <div className="h-px bg-white/10" />

              {/* Booking period + progress */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[13px] text-white/50">{activeBooking.period}</p>
                  <p className="text-[13px] text-white/50">
                    {activeBooking.totalDays - activeBooking.daysElapsed} days left
                  </p>
                </div>
                <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${(activeBooking.daysElapsed / activeBooking.totalDays) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 h-[52px] border border-white/25 rounded-sm text-[15px] text-white/75 hover:bg-white/10 transition-colors"
                >
                  Return Vehicle
                </button>
                <button className="flex-1 h-[52px] bg-white/10 hover:bg-white/20 rounded-sm text-[15px] text-white flex items-center justify-center gap-2 transition-colors">
                  Extend Booking
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
          {/* Panel 1: Day selection */}
          <div
            ref={dayPanelRef}
            className="absolute inset-0 flex flex-col justify-center pr-16 pl-10"
          >
            <p data-date-stagger className="text-[15px] text-white/50 font-medium mb-4">
              Step 1 of 2
            </p>

            <div data-date-stagger className="w-full h-[2px] bg-white/20 mb-8 relative">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-white" />
            </div>

            <h2 ref={bookingH2Ref} className="text-[34px] font-britanica leading-[1.15] mb-3">
              Hello Crispin!<br />Let&apos;s schedule your delivery:
            </h2>
            <p ref={bookingSubRef} className="text-[15px] text-white/50 leading-[1.5] mb-10">
              Pick the days that work best for you.
            </p>

            <div className="grid grid-cols-3 gap-3 justify-items-center mb-10">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => {
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
                    className={`w-[68px] aspect-square rounded-full flex items-center justify-center text-[15px] font-britanica uppercase transition-colors ${
                      isSelected
                        ? "bg-white text-[#222]"
                        : "bg-transparent border-[1.5px] border-white/40 text-white hover:border-white/70"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <button
              data-date-stagger
              onClick={slideToTimeSelect}
              disabled={selectedDays.length === 0}
              className={`flex items-center justify-center gap-2 text-white text-[18px] h-[56px] w-full transition-colors rounded-sm ${
                selectedDays.length === 0
                  ? "bg-white/10 cursor-not-allowed"
                  : "bg-[#e20000] hover:bg-[#c00]"
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Panel 2: Time window selection */}
          <div
            ref={timePanelRef}
            className="absolute inset-0 flex flex-col justify-center pr-16 pl-10 overflow-y-auto"
          >
            <p data-time-stagger className="text-[15px] text-white/50 font-medium mb-4">
              Step 2 of 2
            </p>

            <div data-time-stagger className="w-full h-[2px] bg-white/20 mb-8 relative">
              <div className="absolute inset-y-0 left-0 w-full bg-white" />
            </div>

            <h2 data-time-stagger className="text-[32px] font-britanica leading-[1.15] mb-2">
              Pick your time windows
            </h2>
            <p data-time-stagger className="text-[15px] text-white/50 leading-[1.5] mb-8">
              Select the times that work best for each day.
            </p>

            {!isBookingLoaderOpen ? (
              <>
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
                  onClick={startBookingConfirmation}
                  className={`flex items-center justify-center gap-2 text-white text-[18px] h-[56px] w-full shrink-0 transition-colors rounded-sm ${
                    canBookNow
                      ? "bg-[#e20000] hover:bg-[#c00]"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  Book Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                {bookingSelectionError && (
                  <p className="text-[13px] text-[#ffb4b4] mt-3">
                    {bookingSelectionError}
                  </p>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6 mt-4">
                <p className="text-[18px] text-white mb-5">
                  Confirming your booking...
                </p>
                <div className="space-y-4">
                  {BOOKING_CONFIRMATION_STEPS.map((step, index) => {
                    const isCompleted = bookingConfirmed || index < bookingLoaderStep;
                    const isActive = !bookingConfirmed && index === bookingLoaderStep;
                    return (
                      <div key={step} className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <LoaderCircle
                            className={`w-5 h-5 shrink-0 ${
                              isActive ? "text-white animate-spin" : "text-white/30"
                            }`}
                          />
                        )}
                        <span
                          className={`text-[15px] ${
                            isCompleted || isActive ? "text-white" : "text-white/40"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          </>
          )}
        </div>
      </div>

      {/* Confirmation overlay — only for non-active bookings */}
      {!isActiveBooking && <div
        ref={confirmOverlayRef}
        className="fixed inset-y-0 right-0 z-[100] flex items-center justify-center"
        style={{ backgroundColor: car.bgHex, width: 480, visibility: "hidden" }}
      >
        <div ref={confirmContentRef} className="text-center px-16 w-full max-w-[540px]">
          <div data-confirm className="flex justify-center mb-8">
            <CheckCircle2 className="w-20 h-20 text-emerald-400" />
          </div>
          <p data-confirm className="text-[48px] font-britanica leading-[1.1] mb-4">
            Booking confirmed
          </p>
          <p data-confirm className="text-[16px] text-white/60 leading-[1.75] mb-10">
            Your vehicle reservation is secured and your<br />concierge team has been notified.
          </p>
          <button
            data-confirm
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center gap-2 bg-[#e20000] text-white text-[18px] h-[56px] rounded-full w-full hover:bg-[#c00] transition-colors"
          >
            Done
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>}
    </div>
  );
}
