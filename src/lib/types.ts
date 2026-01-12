/**
 * Represents a single scratch card in the 7-day Lunar New Year journey.
 * Each card corresponds to one day and contains a personal gift or message.
 */
export interface ScratchCard {
  /** The day number (1-7) this card represents */
  dayNumber: number;
  
  /** The personal message or gift revealed when scratched */
  message: string;
  
  /** Whether the card has been scratched/revealed by the recipient */
  isRevealed: boolean;
  
  /** Whether the card is locked (future days are locked until their date) */
  isLocked: boolean;
  
  /** Optional: The date this card becomes available */
  unlockDate?: Date;
  
  /** Optional: A title or theme for the day (e.g., "Prosperity", "Health") */
  theme?: string;
  
  /** Optional: An emoji or icon associated with the card */
  icon?: string;
}

/**
 * Represents a gift session - the complete 7-day scratch card experience
 * shared between a sender and recipient.
 */
export interface GiftSession {
  /** The name of the person sending the gift */
  sender: string;
  
  /** The name of the person receiving the gift */
  recipient: string;
  
  /** The date the 7-day journey begins (Day 1) */
  startDate: Date;
  
  /** Optional: Unique identifier for this session */
  id?: string;
  
  /** Optional: The collection of all 7 scratch cards */
  cards?: ScratchCard[];
  
  /** Optional: A personal note from sender to recipient */
  personalNote?: string;
  
  /** Optional: Whether the session has been viewed/opened */
  isOpened?: boolean;
  
  /** Optional: The date the session was created */
  createdAt?: Date;
}

/**
 * Traditional Lunar New Year themes for each of the 7 days
 */
export const DAY_THEMES = [
  { day: 1, theme: "Prosperity", icon: "🧧", meaning: "Wealth and abundance" },
  { day: 2, theme: "Health", icon: "🌿", meaning: "Wellness and vitality" },
  { day: 3, theme: "Love", icon: "💝", meaning: "Relationships and connection" },
  { day: 4, theme: "Success", icon: "🎯", meaning: "Achievement and growth" },
  { day: 5, theme: "Joy", icon: "🎊", meaning: "Happiness and celebration" },
  { day: 6, theme: "Wisdom", icon: "🏮", meaning: "Knowledge and insight" },
  { day: 7, theme: "Fortune", icon: "🐴", meaning: "Luck in the Year of the Horse" },
] as const;

/**
 * Utility type for the day theme
 */
export type DayTheme = (typeof DAY_THEMES)[number];

/**
 * ============================================
 * EDITABLE CARD SYSTEM
 * ============================================
 * These interfaces define what users can customize when creating their own cards
 */

/**
 * Data structure for a customizable revealed card.
 * Users can edit the message text and upload their own photo.
 */
export interface CustomCardData {
  /** Unique identifier for the card (e.g., "day-1") */
  id: string;
  
  /** The message text displayed on the card - EDITABLE by user */
  message: string;
  
  /** URL of the photo/image displayed on the card - EDITABLE by user (can be blob URL) */
  imageSrc: string;
  
  /** Optional: Title/header for the card */
  title?: string;
  
  /** Optional: Subtitle or additional text */
  subtitle?: string;
}

/**
 * Editable card definition - what can be changed on a card
 */
export interface EditableCard {
  /** Unique identifier (e.g., "day-1") */
  id: string;
  
  /** The message text - THIS IS EDITABLE */
  messageText: string;
  
  /** URL to the photo - THIS IS EDITABLE (can be blob:http://...) */
  photoUrl: string;
  
  /** Optional: Background image/style */
  backgroundStyle?: string;
}

/**
 * Complete card configuration for the scratch card app
 */
export interface CardConfig {
  /** Day number (1-6) */
  day: number;
  
  /** Path to the artwork image (scratch layer) */
  artwork: string;
  
  /** Path to the letter/reveal image */
  letter: string;
  
  /** Name/title for the card */
  name: string;
  
  /** Date when this card becomes scratchable */
  unlockDate: Date;
  
  /** Optional: Custom message for this day */
  customMessage?: string;
  
  /** Optional: Whether user has customized this card */
  isCustomized?: boolean;
}

/**
 * Props for the CardEditorForm component
 */
export interface CardEditorFormProps {
  /** Current card data */
  data: CustomCardData;
  
  /** Callback when data is updated */
  onUpdate: (newData: CustomCardData) => void;
}

/**
 * Props for the RevealedCard display component
 */
export interface RevealedCardProps {
  /** Card data to display */
  data: CustomCardData;
  
  /** Optional: Click handler */
  onClick?: () => void;
}

