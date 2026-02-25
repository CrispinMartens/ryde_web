"use client";

import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-md" : ""
      }`}
    >
      <button aria-label="Menu">
        <Menu className="h-6 w-6 text-white" />
      </button>

      <span className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-white">
        RYDE
      </span>

      <div className="flex items-center gap-4">
        <a href="/login" className="text-sm font-medium text-white">
          Login
        </a>
        <a
          href="/investors"
          className="flex items-center gap-1 text-sm font-medium text-white"
        >
          Investors
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </nav>
  );
}
