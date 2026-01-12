/**
 * Position Map for Scratch Card Artworks
 * Maps each day to an artwork and its position on the canvas
 * 
 * Layout:
 * Row 1: artwork1 (Top Left), artwork2 (Top Right)
 * Row 2: artwork3 (Middle Left), artwork4 (Center/Right)
 * Row 3: artwork5 (Bottom Left), artwork6 (Bottom Right)
 */

export interface ArtworkPosition {
  /** Day number (1-7) */
  day: number;
  /** Artwork filename */
  artwork: string;
  /** X position as percentage (0-100) */
  x: string;
  /** Y position as percentage (0-100) */
  y: string;
  /** Width as percentage */
  width: string;
  /** Height as percentage */
  height: string;
  /** Description of the artwork */
  description: string;
}

export interface ScratchZone {
  /** X position in percentage */
  x: number;
  /** Y position in percentage */
  y: number;
  /** Width in percentage */
  width: number;
  /** Height in percentage */
  height: number;
}

/**
 * Position map for all artworks
 * Each artwork is mapped to a specific day and position
 */
export const POSITION_MAP: ArtworkPosition[] = [
  {
    day: 1,
    artwork: "artwork1.png",
    x: "5%",
    y: "5%",
    width: "42%",
    height: "28%",
    description: "Cowboy Hat - Top Left"
  },
  {
    day: 2,
    artwork: "artwork2.png",
    x: "53%",
    y: "5%",
    width: "42%",
    height: "28%",
    description: "Bandana - Top Right"
  },
  {
    day: 3,
    artwork: "artwork3.png",
    x: "5%",
    y: "36%",
    width: "42%",
    height: "28%",
    description: "Cowgirl Portrait - Middle Left"
  },
  {
    day: 4,
    artwork: "artwork4.png",
    x: "53%",
    y: "36%",
    width: "42%",
    height: "28%",
    description: "Cowboy Boots - Center Right"
  },
  {
    day: 5,
    artwork: "artwork5.png",
    x: "5%",
    y: "67%",
    width: "42%",
    height: "28%",
    description: "Pony - Bottom Left"
  },
  {
    day: 6,
    artwork: "artwork6.png",
    x: "53%",
    y: "67%",
    width: "42%",
    height: "28%",
    description: "Good Luck Charm - Bottom Right"
  }
];

/**
 * The letter image that is revealed after scratching
 */
export const REVEAL_IMAGE = "letter1.jpg";

/**
 * Get the position data for a specific day's artwork
 * @param dayNumber - The day number (1-6)
 * @returns The artwork position data or undefined if not found
 */
export function getArtworkPosition(dayNumber: number): ArtworkPosition | undefined {
  return POSITION_MAP.find(item => item.day === dayNumber);
}

/**
 * Get the active scratch zone boundaries for a specific day
 * Returns the boundaries in percentages for responsive layout
 * @param dayNumber - The day number (1-6)
 * @returns The scratch zone boundaries or null if day not found
 */
export function getActiveZone(dayNumber: number): ScratchZone | null {
  const position = POSITION_MAP.find(item => item.day === dayNumber);
  
  if (!position) {
    return null;
  }
  
  return {
    x: parseFloat(position.x),
    y: parseFloat(position.y),
    width: parseFloat(position.width),
    height: parseFloat(position.height)
  };
}

/**
 * Check if a point (in percentages) is within the active zone for a day
 * @param dayNumber - The day number
 * @param pointX - X coordinate as percentage (0-100)
 * @param pointY - Y coordinate as percentage (0-100)
 * @returns True if point is within the scratch zone
 */
export function isPointInActiveZone(
  dayNumber: number, 
  pointX: number, 
  pointY: number
): boolean {
  const zone = getActiveZone(dayNumber);
  
  if (!zone) return false;
  
  return (
    pointX >= zone.x &&
    pointX <= zone.x + zone.width &&
    pointY >= zone.y &&
    pointY <= zone.y + zone.height
  );
}

/**
 * Convert pixel coordinates to percentage coordinates
 * @param pixelX - X coordinate in pixels
 * @param pixelY - Y coordinate in pixels
 * @param containerWidth - Container width in pixels
 * @param containerHeight - Container height in pixels
 * @returns Object with x and y as percentages
 */
export function pixelToPercent(
  pixelX: number,
  pixelY: number,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number } {
  return {
    x: (pixelX / containerWidth) * 100,
    y: (pixelY / containerHeight) * 100
  };
}

/**
 * Convert percentage coordinates to pixel coordinates
 * @param percentX - X coordinate as percentage
 * @param percentY - Y coordinate as percentage
 * @param containerWidth - Container width in pixels
 * @param containerHeight - Container height in pixels
 * @returns Object with x and y in pixels
 */
export function percentToPixel(
  percentX: number,
  percentY: number,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number } {
  return {
    x: (percentX / 100) * containerWidth,
    y: (percentY / 100) * containerHeight
  };
}

/**
 * Get scratch zone boundaries in pixels
 * @param dayNumber - The day number
 * @param containerWidth - Container width in pixels
 * @param containerHeight - Container height in pixels
 * @returns Scratch zone boundaries in pixels or null
 */
export function getActiveZonePixels(
  dayNumber: number,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number; width: number; height: number } | null {
  const zone = getActiveZone(dayNumber);
  
  if (!zone) return null;
  
  return {
    x: (zone.x / 100) * containerWidth,
    y: (zone.y / 100) * containerHeight,
    width: (zone.width / 100) * containerWidth,
    height: (zone.height / 100) * containerHeight
  };
}




