# The Celestial Steed 🐴

A premium, boutique digital scratch card app for **Lunar New Year 2026** — the Year of the Horse.

## ✨ Features

- **7-Day Countdown Journey**: Each day reveals a personal gift or blessing
- **Dreamy Boutique Aesthetic**: Deep Jade, Soft Gold, and Cream/Silk palette
- **Interactive Scratch Cards**: Beautiful reveal animations
- **Responsive Design**: Works beautifully on all devices

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Jade | `#004d40` | Primary color, text |
| Soft Gold | `#d4af37` | Accents, highlights |
| Cream/Silk | `#fffdd0` | Backgrounds, cards |

### Typography

- **Serif**: Cormorant Garamond (headings, elegant text)
- **Sans**: DM Sans (body text, UI elements)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/
│   ├── ScratchCard.tsx  # Individual scratch card
│   └── CardGrid.tsx     # Grid of 7 cards
└── lib/
    └── types.ts         # TypeScript interfaces
```

## 🎴 Types

### ScratchCard
```typescript
interface ScratchCard {
  dayNumber: number;    // 1-7
  message: string;      // Gift message
  isRevealed: boolean;  // Has been scratched
  isLocked: boolean;    // Future day, not yet available
}
```

### GiftSession
```typescript
interface GiftSession {
  sender: string;       // Gift sender name
  recipient: string;    // Gift recipient name
  startDate: Date;      // Day 1 of the journey
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Cormorant Garamond, DM Sans)

## 📜 License

Made with ❤️ for Lunar New Year 2026

---

新年快乐 · 恭喜发财 🧧






