"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { ScratchCard as ScratchCardType } from "@/lib/types";

interface ScratchCardProps {
  card: ScratchCardType;
  onReveal?: (dayNumber: number) => void;
}

/**
 * ScratchCard Component
 * 
 * A premium scratch card component with real scratch-off functionality.
 * Press and drag to scratch away the cover and reveal the message underneath.
 * Locked cards show the same dark green surface but cannot be scratched.
 */
export default function ScratchCard({ card, onReveal }: ScratchCardProps) {
  const { dayNumber, message, isRevealed, isLocked, theme, icon } = card;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [localRevealed, setLocalRevealed] = useState(isRevealed);
  const [showCelebration, setShowCelebration] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Draw the scratch surface design
  const drawScratchSurface = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Gradient background - dark jade green
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#004d40");
    gradient.addColorStop(0.5, "#00695c");
    gradient.addColorStop(1, "#004d40");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Subtle dot pattern
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#d4af37";
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.beginPath();
          ctx.arc(i, j, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Center icon
    ctx.fillStyle = "rgba(212, 175, 55, 0.3)";
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(icon || "✨", width / 2, height / 2 - 30);

    // Theme text
    ctx.fillStyle = "rgba(255, 253, 208, 0.9)";
    ctx.font = '600 20px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(theme || "", width / 2, height / 2 + 20);

    // Hint text - only for unlocked cards
    if (!isLocked) {
      ctx.fillStyle = "rgba(255, 253, 208, 0.5)";
      ctx.font = '12px "DM Sans", sans-serif';
      ctx.fillText("Scratch here", width / 2, height / 2 + 50);
    }

    // Border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Corner ornaments
    drawCornerOrnament(ctx, 15, 15, 20);
    drawCornerOrnament(ctx, width - 15, 15, 20, true);
    drawCornerOrnament(ctx, 15, height - 15, 20, false, true);
    drawCornerOrnament(ctx, width - 15, height - 15, 20, true, true);
  }, [icon, theme, isLocked]);

  const drawCornerOrnament = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    flipX = false, 
    flipY = false
  ) => {
    ctx.save();
    ctx.translate(x, y);
    if (flipX) ctx.scale(-1, 1);
    if (flipY) ctx.scale(1, -1);
    
    ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.lineTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    
    ctx.restore();
  };

  // Initialize canvas - for ALL cards (locked and unlocked)
  useEffect(() => {
    if (localRevealed) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    // Draw scratch surface for all cards
    drawScratchSurface(ctx, rect.width, rect.height);
  }, [localRevealed, drawScratchSurface]);

  // Get position from event
  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }, []);

  // Check scratch progress
  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const totalPixels = pixels.length / 4;
    const percentage = Math.round((transparentPixels / totalPixels) * 100);
    setScratchPercentage(percentage);

    // Auto-reveal at 50%
    if (percentage >= 50 && !localRevealed) {
      revealCard();
    }
  }, [localRevealed]);

  // Reveal card
  const revealCard = useCallback(() => {
    setLocalRevealed(true);
    setShowCelebration(true);
    onReveal?.(dayNumber);

    // Clear celebration after animation
    setTimeout(() => setShowCelebration(false), 1500);
  }, [dayNumber, onReveal]);

  // Scratch function
  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";

    // Soft brush effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    // Draw line from last position for smooth scratching
    const lastPos = lastPosRef.current;
    if (lastPos) {
      ctx.lineWidth = 40;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    lastPosRef.current = { x, y };
    checkProgress();
  }, [checkProgress]);

  // Event handlers - only work for unlocked cards
  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isLocked || localRevealed) return;
    e.preventDefault();
    setIsScratching(true);
    const pos = getPos(e);
    lastPosRef.current = pos;
    scratch(pos.x, pos.y);
  }, [isLocked, localRevealed, getPos, scratch]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || isLocked || localRevealed) return;
    e.preventDefault();
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }, [isScratching, isLocked, localRevealed, getPos, scratch]);

  const handleEnd = useCallback(() => {
    setIsScratching(false);
    lastPosRef.current = null;
  }, []);

  // Celebration particles
  const celebrationEmojis = ["✨", "🌟", "⭐", "💫", "🎊", "🎉", "🧧", "🏮"];

  return (
    <div
      ref={containerRef}
      className={`
        card-base
        aspect-[3/4]
        relative
        overflow-hidden
        ${isLocked ? "cursor-default" : ""}
        ${localRevealed ? "bg-gradient-to-br from-accent to-silk-ivory" : ""}
      `}
      role="button"
      aria-label={`Day ${dayNumber} scratch card${isLocked ? " - locked" : ""}${localRevealed ? " - revealed" : ""}`}
      tabIndex={isLocked ? -1 : 0}
    >
      {/* Day Number Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span 
          className={`text-xs font-medium tracking-widest uppercase ${
            localRevealed 
              ? "text-primary/60" 
              : "text-accent/80"
          }`}
          style={!localRevealed ? { textShadow: "0 1px 2px rgba(0, 77, 64, 0.3)" } : {}}
        >
          Day {dayNumber}
        </span>
      </div>

      {/* Revealed Content (underneath scratch layer) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-3">
        <span className="text-5xl">{icon || "🎊"}</span>
        {theme && (
          <h3 className="font-serif text-lg text-secondary font-semibold uppercase tracking-wider">
            {theme}
          </h3>
        )}
        <div className="gold-divider w-16" />
        <p className="font-serif text-primary text-lg leading-relaxed italic">
          &ldquo;{message}&rdquo;
        </p>
      </div>

      {/* Scratch Canvas - shown for ALL cards until revealed */}
      {!localRevealed && (
        <>
          <canvas
            ref={canvasRef}
            className={`
              absolute inset-0 w-full h-full rounded-2xl touch-none z-10
              ${isLocked ? "cursor-default" : "cursor-crosshair"}
            `}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
          
          {/* Scratch hint - only for unlocked cards */}
          {!isLocked && (
            <span 
              className={`
                absolute bottom-4 left-1/2 -translate-x-1/2 z-20
                text-xs text-accent/90 uppercase tracking-wider
                pointer-events-none transition-opacity duration-300
                ${isScratching ? "opacity-0" : "opacity-100"}
              `}
              style={{ textShadow: "0 1px 2px rgba(0, 77, 64, 0.3)" }}
            >
              ✨ Scratch to reveal ✨
            </span>
          )}

          {/* Locked indicator - subtle, at bottom */}
          {isLocked && (
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none"
            >
              <svg 
                className="w-3.5 h-3.5 text-accent/60" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span 
                className="text-xs text-accent/60 uppercase tracking-wider"
                style={{ fontSize: "0.65rem" }}
              >
                Coming soon
              </span>
            </div>
          )}

          {/* Progress indicator - only for unlocked cards */}
          {!isLocked && (
            <span 
              className={`
                absolute top-4 right-4 z-20
                text-xs text-accent/80 pointer-events-none
                transition-opacity duration-300
                ${isScratching ? "opacity-100" : "opacity-0"}
              `}
            >
              {scratchPercentage}%
            </span>
          )}
        </>
      )}

      {/* Celebration Particles */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confetti 1s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            >
              {celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]}
            </span>
          ))}
        </div>
      )}

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-20 z-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <path
            d="M100 0 L100 100 L0 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 opacity-20 rotate-180 z-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <path
            d="M100 0 L100 100 L0 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
