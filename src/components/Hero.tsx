"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageContainerRef.current, {
        borderBottomLeftRadius: "0%",
        borderBottomRightRadius: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full bg-primary-100">
        <div
          ref={imageContainerRef}
          className="relative h-full w-full overflow-hidden"
          style={{
            borderBottomLeftRadius: "20%",
            borderBottomRightRadius: "20%",
            willChange: "border-radius",
          }}
        >
          <Image
            src="/hero.jpg"
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end justify-center pb-20">
            <h1 className="text-5xl font-bold text-white md:text-7xl">
             Drive Cars, we do the rest
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
