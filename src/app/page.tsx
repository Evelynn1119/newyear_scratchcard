"use client";

import React, { useState } from "react";
import CardGrid from "@/components/CardGrid";
import type { ScratchCard } from "@/lib/types";
import { DAY_THEMES } from "@/lib/types";

export default function Home() {
  // Initialize cards with placeholder data
  const [cards, setCards] = useState<ScratchCard[]>(() =>
    DAY_THEMES.map((theme, index) => ({
      dayNumber: theme.day,
      message: getPlaceholderMessage(theme.day),
      isRevealed: false,
      isLocked: index > 0, // Only day 1 unlocked initially
      theme: theme.theme,
      icon: theme.icon,
    }))
  );

  const handleReveal = (dayNumber: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.dayNumber === dayNumber ? { ...card, isRevealed: true } : card
      )
    );
  };

  return (
    <main className="min-h-screen dreamy-bg">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating orbs */}
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-secondary/5 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float animate-delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Year Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-secondary/20 mb-8 opacity-0 animate-reveal">
            <span className="text-xl">🐴</span>
            <span className="text-sm font-medium text-primary/70 tracking-widest uppercase">
              Year of the Horse 2026
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary mb-6 opacity-0 animate-reveal animate-delay-100">
            <span className="block font-light italic text-secondary text-3xl md:text-4xl mb-2">
              The
            </span>
            Celestial Steed
          </h1>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 my-8 opacity-0 animate-reveal animate-delay-200">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
            <div className="w-2 h-2 rounded-full bg-secondary animate-glow" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
          </div>

          {/* Intro Text */}
          <p className="font-serif text-lg md:text-xl text-primary/70 leading-relaxed mb-4 opacity-0 animate-reveal animate-delay-300">
            Welcome to a journey of seven blessings,
            <br className="hidden md:block" />
            each carefully chosen for you as we welcome the Year of the Horse.
          </p>
          
          <p className="text-primary/50 text-base mb-12 opacity-0 animate-reveal animate-delay-400">
            Scratch one card each day to reveal your personal gift.
            <br />
            May fortune gallop into your life this Lunar New Year.
          </p>

          {/* Scroll Indicator */}
          <div className="opacity-0 animate-reveal animate-delay-500">
            <button
              onClick={() => {
                document.getElementById("cards")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col items-center gap-2 text-primary/40 hover:text-primary/60 transition-colors"
              aria-label="Scroll to cards"
            >
              <span className="text-sm tracking-wider uppercase">Begin Your Journey</span>
              <svg
                className="w-5 h-5 animate-float"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent/50 to-transparent pointer-events-none" />
      </section>

      {/* Cards Section */}
      <section id="cards" className="py-16 md:py-24">
        <CardGrid cards={cards} onReveal={handleReveal} />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-secondary/10">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🧧</span>
            <div className="gold-divider w-16" />
            <span className="text-3xl">🐴</span>
            <div className="gold-divider w-16" />
            <span className="text-3xl">🏮</span>
          </div>
          <p className="font-serif text-primary/60 italic">
            新年快乐 · Happy Lunar New Year
          </p>
          <p className="text-sm text-primary/40 mt-2">
            May the Year of the Horse bring you prosperity, health, and joy.
          </p>
        </div>
      </footer>
    </main>
  );
}

/**
 * Get placeholder messages for each day
 */
function getPlaceholderMessage(day: number): string {
  const messages = [
    "May wealth and prosperity flow into your life like a golden river.",
    "Wishing you vibrant health and boundless energy in the year ahead.",
    "May your heart be filled with love and your relationships flourish.",
    "Success awaits you at every turn. Believe in your journey.",
    "Joy and laughter will be your companions throughout this year.",
    "May wisdom guide your decisions and light your path forward.",
    "The Horse brings fortune galloping to your door. Embrace it!",
  ];
  return messages[day - 1] || "A special blessing awaits you...";
}






