"use client";

import React from "react";
import ScratchCard from "./ScratchCard";
import type { ScratchCard as ScratchCardType } from "@/lib/types";
import { DAY_THEMES } from "@/lib/types";

interface CardGridProps {
  cards?: ScratchCardType[];
  onReveal?: (dayNumber: number) => void;
}

/**
 * CardGrid Component
 * 
 * Displays all 7 scratch cards in a beautiful grid layout.
 * Cards are arranged responsively for different screen sizes.
 */
export default function CardGrid({ cards, onReveal }: CardGridProps) {
  // Generate placeholder cards if none provided
  const displayCards: ScratchCardType[] = cards || generatePlaceholderCards();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">
          Your Seven Days of Fortune
        </h2>
        <p className="text-primary/60 max-w-md mx-auto">
          Each card holds a blessing for your journey into the Year of the Horse.
          Reveal them day by day.
        </p>
        <div className="gold-divider max-w-xs mx-auto mt-6" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayCards.map((card, index) => (
          <div
            key={card.dayNumber}
            className={`
              opacity-0 animate-reveal
              ${getAnimationDelay(index)}
            `}
            style={{ animationFillMode: "forwards" }}
          >
            <ScratchCard
              card={card}
              onReveal={onReveal}
            />
          </div>
        ))}
      </div>

      {/* Bottom Decorative Element */}
      <div className="flex items-center justify-center mt-12 gap-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-secondary/40" />
        <span className="text-2xl">🐴</span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary/40" />
      </div>
    </section>
  );
}

/**
 * Generate placeholder cards for demonstration
 */
function generatePlaceholderCards(): ScratchCardType[] {
  return DAY_THEMES.map((theme, index) => ({
    dayNumber: theme.day,
    message: `A special blessing awaits you on Day ${theme.day}...`,
    isRevealed: false,
    isLocked: index > 0, // Only day 1 is unlocked initially
    theme: theme.theme,
    icon: theme.icon,
  }));
}

/**
 * Get animation delay class based on card index
 */
function getAnimationDelay(index: number): string {
  const delays = [
    "animate-delay-100",
    "animate-delay-200",
    "animate-delay-300",
    "animate-delay-400",
    "animate-delay-500",
    "animate-delay-600",
    "animate-delay-700",
  ];
  return delays[index] || "";
}




