# Gift Card Creator 🎴

A beautiful, interactive digital gift card creator with scratch card functionality. Create personalized cards with photos, messages, stickers, and share them with friends and family!

**Made with love by [@evelynn.creates](https://www.instagram.com/evelynn.creates)**

---

## ✨ Features

### 🎨 Card Creation
- **6 Customizable Cards**: Create a collection of unique gift cards
- **Multiple Templates**: Choose from 4 beautiful card templates
- **Image Frames**: 6 decorative image frames that can be positioned, resized, and rotated
- **Drag & Drop Elements**: 
  - Photos can be dragged, resized, and rotated
  - Image frames are fully interactive (draggable, resizable, rotatable)
  - Stickers can be placed anywhere on the card
- **Rich Text Customization**:
  - Custom titles with size, color, bold, and italic options
  - Personalized messages with styling options
  - Multiple font sizes (small, mid, big)

### 📸 Media Support
- **Photo Upload**: Upload photos from your device
- **Camera Integration**: Take photos directly with your device camera
- **14 Stickers**: Choose from a collection of fun stickers

### 🎯 Preview & Share
- **Preview Mode**: See your cards before sharing
- **Scratch Card Experience**: Recipients scratch each card to reveal surprises
- **Share Links**: Generate unique shareable links for your friends
- **Happy New Year Animation**: Special animation plays when all 6 cards are revealed

### 📱 Responsive Design
- Fully responsive for desktop, tablet, and mobile
- Mobile-optimized editing panel
- Touch-friendly interactions

---

## 🚀 Getting Started

### Quick Start

This is a single-page application that runs entirely in the browser - no build process required!

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/Evelynn1119/newyear_scratchcard.git
   cd newyear_scratchcard
   ```

2. **Serve the files**
   
   Option A: Use a local server (recommended)
   ```bash
   # Using Python 3
   python -m http.server 8080
   
   # Using Node.js (with http-server)
   npx http-server -p 8080
   
   # Using PHP
   php -S localhost:8080
   ```
   
   Option B: Open directly in browser (some features may not work due to CORS)

3. **Open in browser**
   - Navigate to `http://localhost:8080/index.html`
   - Start creating your cards!

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Main Pink | `#FED5D4` | Primary background, cards |
| Main Red | `#E4412D` | Accents, buttons, highlights |
| Accent Aqua | `#AEEEEE` | Secondary accents |
| Secondary White | `#F9F0F0` | Light backgrounds, overlays |

### Typography

- **Serif Headings**: Cormorant Garamond (elegant, refined)
- **Sans Body**: Quicksand (readable, friendly)
- **Custom Font**: CCMETCON (special elements)

---

## 📁 Project Structure

```
.
├── index.html              # Main application (React app in single file)
├── preview.html            # Alternative preview interface
├── vercel.json             # Vercel deployment config
├── 
├── Assets/
│   ├── artwork*.png        # Card artwork images
│   ├── image_bg_*.png      # Image frame backgrounds
│   ├── template*.jpg       # Card templates
│   ├── popupcard*.png      # Happy New Year animation frames
│   ├── stickers/           # Sticker collection
│   └── ...
└── README.md               # This file
```

---

## 🎴 Card Features

Each card supports:

- **Background Template**: 4 template options
- **Image Frame**: 6 decorative frames (draggable, resizable, rotatable)
- **Title**: Customizable text with styling options
- **Message/Subtitle**: Personalized message with formatting
- **Photo**: Upload or capture photos, fully adjustable
- **Stickers**: Multiple stickers to add personality

---

## 🛠️ Technical Details

### Technologies Used

- **React 18**: Via CDN for component-based UI
- **React DOM**: For rendering
- **Babel Standalone**: For JSX transformation in browser
- **HTML5 Canvas**: For scratch card functionality
- **LocalStorage**: For data persistence
- **Google Fonts**: For typography

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

---

## 📝 Usage

### Creating Cards

1. Click **"Create Your Card"** or **"TAP TO EDIT"** on any card
2. Customize your card:
   - Choose a background template
   - Select an image frame
   - Add a title and message
   - Upload or take a photo
   - Add stickers
3. Click **"Save Day X"** to save your card
4. Repeat for all 6 cards

### Previewing & Sharing

1. Click **"PREVIEW AND SEND"** after creating your cards
2. Set a start date for card unlocking
3. Share the preview link with friends
4. Recipients scratch each card to reveal your surprises!

---

## 🎬 Happy New Year Animation

When all 6 cards are scratched/revealed in preview mode, a special "Happy New Year" animation plays:
- 4-frame animation sequence
- Floating hearts effect
- Appears only once per session
- Can be closed by clicking outside or pressing Escape

---

## 📱 Mobile Features

- Responsive design optimized for thumb zones
- Slide-out editing panel with arrow tab
- Touch-friendly drag and resize handles
- Mobile camera integration

---

## 💾 Data Storage

- Card data is saved in browser localStorage
- Share links use URL parameters
- No server-side storage required

---

## 🎯 Key Features in Detail

### Drag & Drop System
- **Photos**: Draggable, resizable (100-300px), rotatable
- **Image Frames**: Draggable, resizable (150-500px), rotatable, centered by default
- **Stickers**: Fully draggable, resizable, rotatable, deletable

### Auto-Centering
- Photo upload boxes are centered vertically and horizontally
- Image frames auto-center when created
- Messages stick to the bottom of cards

---

## 🐛 Troubleshooting

**Cards not saving?**
- Check browser console for errors
- Ensure localStorage is enabled in your browser

**Photos not uploading?**
- Check file size (should be reasonable)
- Ensure browser supports file input API

**Animation not showing?**
- Make sure all 6 cards are revealed in preview mode
- Clear localStorage if animation was shown before

---

## 📜 License

Made with ❤️ by Evelynn

For personal and commercial use.

---

## 🙏 Credits

- Design & Development: [@evelynn.creates](https://www.instagram.com/evelynn.creates)
- Fonts: Google Fonts (Cormorant Garamond, Quicksand)

---

## 🔗 Links

- **Instagram**: [@evelynn.creates](https://www.instagram.com/evelynn.creates)
- **GitHub**: [newyear_scratchcard](https://github.com/Evelynn1119/newyear_scratchcard)

---

**Enjoy creating beautiful gift cards! 🎉**
