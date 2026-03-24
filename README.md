# MindShift 🌿
### Workplace Mental Health Intelligence Platform

A production-ready React + Vite landing page for a B2B2C mental health startup targeting Indian companies.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed ([download here](https://nodejs.org))

### Installation

```bash
# 1. Navigate into the project folder
cd mindshift

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser. That's it!

---

## 📁 Project Structure

```
mindshift/
├── index.html                   # HTML entry point
├── vite.config.js               # Vite config
├── package.json                 # Dependencies
├── public/
│   └── favicon.svg              # Browser tab icon
└── src/
    ├── main.jsx                 # React DOM entry
    ├── App.jsx                  # Root component (composes all sections)
    ├── index.css                # Global CSS variables & reset
    ├── hooks/
    │   └── useAnimatedNumber.js # Intersection Observer counter hook
    └── components/
        ├── Navbar.jsx / .module.css
        ├── Hero.jsx / .module.css
        ├── Problem.jsx / .module.css
        ├── HowItWorks.jsx / .module.css
        ├── Features.jsx / .module.css
        ├── Pricing.jsx / .module.css
        ├── Market.jsx / .module.css      ← TAM / SAM / SOM
        ├── Testimonials.jsx / .module.css
        ├── CTA.jsx / .module.css
        └── Footer.jsx / .module.css
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--sage-dark` | `#5C7A59` | Primary CTAs, headings accent |
| `--sage` | `#8BAF88` | Bars, dots, secondary elements |
| `--cream` | `#F7F3EE` | Section backgrounds |
| `--charcoal` | `#2A2A2A` | Body text, dark sections |
| `--accent` | `#D4845A` | Problem section highlights |
| `--gold` | `#C9A84C` | Pricing badge |

**Fonts:** Playfair Display (headings) + DM Sans (body) — loaded via Google Fonts in `index.html`

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy to Vercel, Netlify, or any static host.

---

## 💡 Sections

| Section | ID | Description |
|---|---|---|
| Navbar | — | Sticky, glassmorphic, scroll-aware |
| Hero | `#hero` | Animated stats + live burnout dashboard |
| Problem | `#problem` | 4 data-backed pain point cards |
| How It Works | `#how` | 3-step process |
| Features | `#features` | 4 core product features |
| Pricing | `#pricing` | Silver / Gold / Platinum plans |
| Market | `#market` | TAM · SAM · SOM with revenue proof |
| Testimonials | `#testimonials` | 3 HR/CTO quotes |
| CTA | `#cta` | Free pilot conversion section |
| Footer | — | 4-column links + legal |

---

## 📊 TAM / SAM / SOM Summary

| | Value | Basis |
|---|---|---|
| **TAM** | ₹1.68L Cr | India mental health market total (28.6% CAGR) |
| **SAM** | ₹18,500 Cr | Corporate wellness — 65K+ startups × 150 emp × ₹300/mo |
| **SOM** | ₹150–300 Cr | 300–500 startup clients by Year 3–5 on Gold plan |

---

Built with ❤️ for your MBA Digital Marketing & Brand Management project.
