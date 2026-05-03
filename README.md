<div align="center">

<img src="public/images/heroimage.jpg" alt="TravelLIGHT AI Banner" width="100%" style="border-radius: 12px; max-height: 300px; object-fit: cover;" />

# ✈️ TravelLIGHT AI — Intelligent Travel Consultant

**An AI-powered, full-stack travel planning platform that generates hyper-personalized itineraries, real-time route maps, hotel recommendations, and financial breakdowns — all in seconds.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.2-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-FF6B35?style=for-the-badge)](https://groq.com/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)

[🌐 Live Demo](#) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues)

</div>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Key Features](#-key-features)
- [🏗️ Architecture & System Flow](#-architecture--system-flow)
- [🗂️ Project Structure](#-project-structure)
- [🔌 API Reference](#-api-reference)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Environment Variables](#-environment-variables)
- [🖥️ Local Development Setup](#-local-development-setup)
- [🚀 Deployment](#-deployment)
- [📱 Pages & Routes](#-pages--routes)
- [🔄 Data Flow Diagram](#-data-flow-diagram)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Overview

TravelLIGHT AI is a production-grade travel planning application that combines the power of **Groq's LLaMA 3.3 70B** language model with live data from **OpenWeatherMap**, **TripAdvisor**, and **GeoDB Cities API** to deliver a complete, end-to-end itinerary within seconds.

Users input their trip details — origin, destination, travel dates, and traveller count — and the AI consultant returns:

- A fully structured **day-by-day itinerary** with morning/afternoon/evening activities
- A **real-time route map** with multi-modal transport alternatives (Train, Bus, Flight, Car)
- **Live hotel recommendations** pulled directly from TripAdvisor via RapidAPI
- **Weather-aware** planning using OpenWeatherMap data for the destination
- An **interactive pie chart** showing the complete financial breakdown in INR
- **Budget feasibility analysis** — the AI warns you if your budget is unrealistic and explains exactly why

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Itinerary Generation** | LLaMA 3.3 70B generates a full structured JSON itinerary with realistic Indian Railway train names, numbers, and fares |
| 🗺️ **Interactive Route Map** | Tree-structured route visualization with per-leg transport options, distance metrics, and AI-recommended picks |
| 🎛️ **Trip Customizer** | Multi-step modal for setting budget caps, travel vibes (Adventure, Romantic, Spiritual, etc.), pacing (Leisurely/Balanced/Intensive), and dietary restrictions |
| 🏨 **Live Hotel Data** | Real hotel cards from TripAdvisor RapidAPI with ratings, photos, and prices |
| ☁️ **Live Weather Data** | Destination weather fetched from OpenWeatherMap and injected into the AI prompt |
| 💰 **Budget Intelligence** | AI computes minimum realistic trip cost and flags infeasible budgets with specific savings recommendations |
| 📊 **Financial Breakdown** | Interactive Recharts donut chart showing Transport, Accommodation, Food, and Activities costs |
| 🔍 **Smart City Autocomplete** | GeoDB Cities API powers debounced, real-time city search with graceful API-limit fallback |
| 📱 **Fully Responsive** | Mobile-first design using TailwindCSS 4 — works flawlessly on all screen sizes |
| ⚡ **Animated Loading States** | Cycling transport icons (✈ 🚂 🚌 ⛰️) during AI generation with smooth transitions |

---

## 🏗️ Architecture & System Flow

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER BROWSER                               │
│                                                                     │
│  ┌──────────────┐    ┌───────────────┐    ┌─────────────────────┐  │
│  │  Hero Search │───▶│ Customise     │───▶│  Itinerary Page     │  │
│  │  + AutoFill  │    │ Modal         │    │  (Results Display)  │  │
│  └──────────────┘    └───────────────┘    └──────────┬──────────┘  │
│                                                       │             │
└───────────────────────────────────────────────────────┼─────────────┘
                                                        │ POST /api/generate-itinerary
                                                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       EXPRESS.JS BACKEND                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  1. Fetch Weather      → OpenWeatherMap API                  │   │
│  │  2. Fetch Hotels       → TripAdvisor (via RapidAPI)          │   │
│  │  3. Build Prompt       → Inject all data + user constraints  │   │
│  │  4. Call Groq LLM      → LLaMA 3.3 70b (JSON mode)          │   │
│  │  5. Parse & Return     → Structured JSON to frontend         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
         │           │                  │
         ▼           ▼                  ▼
  OpenWeatherMap  TripAdvisor        Groq API
  (Live Weather)  (Live Hotels)    (LLaMA 3.3 70B)
```

### Request Flow Sequence

```
User Input                Backend                    External APIs
    │                        │                            │
    │──── POST /api/generate-itinerary ──────────────────▶│
    │                        │                            │
    │              ┌─────────▼─────────┐                 │
    │              │  1. Validate body  │                 │
    │              └─────────┬─────────┘                 │
    │                        │                            │
    │              ┌─────────▼─────────┐                 │
    │              │  2. GET weather   │──────────────────▶ OpenWeatherMap
    │              │     for dest.     │◀────────────────── temp + condition
    │              └─────────┬─────────┘                 │
    │                        │                            │
    │              ┌─────────▼─────────┐                 │
    │              │  3. GET hotels    │──────────────────▶ TripAdvisor API
    │              │     (TripAdvisor) │◀────────────────── hotel cards
    │              └─────────┬─────────┘                 │
    │                        │                            │
    │              ┌─────────▼─────────┐                 │
    │              │  4. Build prompt  │                  │
    │              │     + constraints │                  │
    │              └─────────┬─────────┘                 │
    │                        │                            │
    │              ┌─────────▼─────────┐                 │
    │              │  5. POST Groq API │──────────────────▶ LLaMA 3.3 70B
    │              │     (JSON mode)   │◀────────────────── Full JSON itinerary
    │              └─────────┬─────────┘                 │
    │                        │                            │
    │◀──────── 200 OK + itinerary JSON ─────────────────── │
    │                        │                            │
```

---

## 🔄 Data Flow Diagram

```
                        ┌─────────────────────────┐
                        │       Home Page          │
                        │  ┌───────────────────┐   │
                        │  │  Search Bar        │   │
                        │  │  ├ Origin           │   │
                        │  │  ├ Destination      │   │
                        │  │  ├ Start Date       │   │
                        │  │  ├ End Date         │   │
                        │  │  └ Travellers       │   │
                        │  └───────┬───────────┘   │
                        └──────────┼────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
           [Search Button]              [Customise Trip Button]
                    │                             │
                    │                    ┌────────▼────────┐
                    │                    │ CustomiseModal   │
                    │                    │  ├ Budget Cap    │
                    │                    │  ├ Vibe (7 opts) │
                    │                    │  ├ Pacing(3 opts)│
                    │                    │  └ Diet (6 opts) │
                    │                    └────────┬─────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                         navigate('/itinerary', state)
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │       Itinerary Page          │
                    │                              │
                    │   fetch('/api/generate-')    │
                    │   itinerary', { POST })       │
                    │                              │
                    │  ┌────────────────────────┐  │
                    │  │  Loading State          │  │
                    │  │  (Animated icons)       │  │
                    │  └─────────┬──────────────┘  │
                    └────────────┼─────────────────┘
                                 │ (on success)
                    ┌────────────▼──────────────────┐
                    │      RENDERED SECTIONS         │
                    │                               │
                    │  ① Trip Summary Hero          │
                    │  ② Floating Metrics Bar       │
                    │     (Cost, Dates, Dest, Wx)   │
                    │  ③ Budget Warning / Savings   │
                    │  ④ Day-by-Day Accordion       │
                    │  ⑤ Route Map (Tree View)      │
                    │  ⑥ Hotels + Transport Cards   │
                    │  ⑦ Financial Pie Chart        │
                    └───────────────────────────────┘
```

---

## 🗂️ Project Structure

```
AItravell/
├── 📁 public/
│   └── 📁 images/                   # Hero and placeholder images
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── CategoryCarousel.tsx     # Embla Carousel for explore section
│   │   ├── CustomiseModal.tsx       # Trip customization modal (Budget/Vibe/Pacing/Diet)
│   │   ├── Footer.tsx               # Site-wide footer with links
│   │   ├── Gallery.tsx              # Destination gallery grid
│   │   ├── Hero.tsx                 # Landing page hero with search bar + autocomplete
│   │   ├── Layout.tsx               # App shell wrapping all pages
│   │   ├── Navbar.tsx               # Responsive navigation bar (transparent/solid modes)
│   │   ├── PageHeader.tsx           # Reusable page header component
│   │   ├── PlaceholderImage.tsx     # Graceful image fallback component
│   │   ├── RouteMapSection.tsx      # Tree-structured route map visualization
│   │   ├── Stats.tsx                # Statistics/metrics display strip
│   │   └── StaySection.tsx          # Accommodation browse section
│   │
│   ├── 📁 pages/
│   │   ├── About.tsx                # About the platform page
│   │   ├── Contact.tsx              # Contact form page
│   │   ├── FAQ.tsx                  # Frequently asked questions
│   │   ├── Home.tsx                 # Main landing page (composes all sections)
│   │   ├── ItineraryPage.tsx        # AI itinerary results (main output page)
│   │   ├── LegalPage.tsx            # Privacy / Terms / Cookies (parameterized)
│   │   ├── PackageDetails.tsx       # Individual package/destination detail page
│   │   └── Support.tsx              # Support / help center page
│   │
│   ├── App.tsx                      # Root component with React Router v7 routes
│   ├── index.css                    # Global styles + Tailwind directives
│   ├── main.tsx                     # Vite entry point
│   └── vite-env.d.ts                # Vite environment type declarations
│
├── 📁 server/
│   ├── index.js                     # Express.js API server (all endpoints)
│   ├── package.json                 # Backend dependencies
│   ├── vercel.json                  # Vercel serverless deployment config
│   └── .env                         # Backend environment variables (gitignored)
│
├── index.html                       # Root HTML template
├── package.json                     # Frontend dependencies & scripts
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript compiler options
├── netlify.toml                     # Netlify deployment config (SPA redirect rule)
└── .env.production                  # Frontend production env vars (gitignored)
```

---

## 🔌 API Reference

### `GET /api/cities`

City autocomplete powered by GeoDB Cities API.

| Parameter | Type | Description |
|---|---|---|
| `query` | `string` | Minimum 3 characters. Returns up to 5 matching cities. |

**Response:**
```json
[
  { "city": "Mumbai", "country": "India" },
  { "city": "Mysore", "country": "India" }
]
```

---

### `POST /api/generate-itinerary`

Core endpoint. Orchestrates weather, hotel, and LLM calls and returns a complete itinerary JSON.

**Request Body:**
```json
{
  "origin": "Delhi",
  "destination": "Goa",
  "startDate": "2026-06-15",
  "endDate": "2026-06-20",
  "adults": 2,
  "children": 0,
  "infants": 0,
  "customise": true,
  "budget": "50000",
  "vibe": "Adventure",
  "pacing": "Balanced",
  "diet": "Vegetarian"
}
```

**Response (abbreviated):**
```json
{
  "title": "A 5-Day Adventurous Trip to Goa",
  "overview": "Explore Goa's vibrant beaches...",
  "metrics": {
    "cost": "₹42,500",
    "dates": "2026-06-15 - 2026-06-20",
    "destination": "Goa",
    "weather": "28°C, Partly Cloudy"
  },
  "days": [ { "day": 1, "title": "Arrival & North Goa", "activities": [...] } ],
  "logistics": {
    "hotels": [ { "name": "Taj Fort Aguada", "price": "₹8,500/night", ... } ],
    "transport": [ { "type": "Train - Rajdhani Express (12431)", "price": "₹1,800", ... } ]
  },
  "routeMap": {
    "totalDistance": "1,850 km",
    "legs": [ { "from": "Delhi", "to": "Goa", "distanceKm": 1850, "options": [...] } ]
  },
  "finance": [
    { "name": "Flights & Transport", "value": 3600, "color": "#31A8FF" },
    { "name": "Accommodation",       "value": 25500, "color": "#0a3d5c" },
    { "name": "Food & Dining",       "value": 8000,  "color": "#38bdf8" },
    { "name": "Activities & Fees",   "value": 5400,  "color": "#7dd3fc" }
  ],
  "budgetAnalysis": {
    "minimumBudget": "₹38,000",
    "isBudgetFeasible": true,
    "costSavings": [ { "category": "Transport", "saving": "Chose AC-3 train instead of flight, saving ₹7,200" } ]
  }
}
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI component framework |
| **TypeScript** | 6.0 | Type safety |
| **Vite** | 6.3 | Build tool & dev server |
| **TailwindCSS** | 4.2 | Utility-first styling |
| **React Router DOM** | 7 | Client-side routing (SPA) |
| **Recharts** | 3.8 | Financial pie chart visualization |
| **Embla Carousel** | 8.6 | Category carousel (autoplay) |
| **Lucide React** | 1.14 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js + Express** | 4.18 | REST API server |
| **Groq SDK** | 0.3.2 | LLaMA 3.3 70B inference |
| **Axios** | 1.6 | HTTP client for external APIs |
| **CORS** | 2.8 | Cross-origin request handling |
| **dotenv** | 16.3 | Environment variable management |

### External APIs
| API | Usage |
|---|---|
| **Groq / LLaMA 3.3 70B** | Core AI itinerary generation (JSON mode, 3500 tokens) |
| **OpenWeatherMap** | Live weather for destination city |
| **TripAdvisor (via RapidAPI)** | Live hotel search by city GeoID |
| **GeoDB Cities (via RapidAPI)** | City autocomplete with population ranking |

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```env
# Required: Powers all itinerary generation
GROQ_API_KEY=your_groq_api_key_here

# Optional: Enables live weather in itinerary header
OPENWEATHER_API_KEY=your_openweathermap_key_here

# Optional: Enables city autocomplete + live hotel cards
RAPIDAPI_KEY=your_rapidapi_key_here
```

> **Note:** The app gracefully degrades when optional keys are missing.
> - Without `OPENWEATHER_API_KEY` → Uses "22°C, Mostly Sunny" fallback
> - Without `RAPIDAPI_KEY` → AI generates realistic hotel recommendations instead
> - Without `GROQ_API_KEY` → Returns a 500 error (this key is required)

### Frontend (`.env.production`)

```env
# Points frontend to the deployed backend API
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

> In development, `VITE_API_BASE_URL` defaults to empty string (`''`), so calls go to `localhost` via Vite's proxy.

---

## 🖥️ Local Development Setup

### Prerequisites

- **Node.js** v18 or above
- **npm** v9 or above
- A free **Groq API key** from [console.groq.com](https://console.groq.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create `server/.env` with your API keys:

```bash
cp server/.env.example server/.env
# Then edit server/.env and fill in your keys
```

### 5. Start the Backend Server

```bash
cd server
node index.js
# Server starts on http://localhost:3001
```

### 6. Start the Frontend Dev Server

In a new terminal (from the project root):

```bash
npm run dev
# App opens on http://localhost:5173
```

> The Vite dev server proxies `/api/*` calls to `localhost:3001` automatically.

---

## 🚀 Deployment

### Frontend — Netlify

The frontend is configured for zero-config deployment on Netlify via `netlify.toml`.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps:**
1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set `VITE_API_BASE_URL` in Netlify's **Environment Variables** settings
4. Deploy — Netlify auto-builds on every push to `main`

### Backend — Vercel

The backend exports the Express app for Vercel serverless via `server/vercel.json`:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

**Steps:**
```bash
npm install -g vercel
cd server
vercel --prod
```

Set all environment variables (`GROQ_API_KEY`, `OPENWEATHER_API_KEY`, `RAPIDAPI_KEY`) in Vercel's project dashboard.

---

## 📱 Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with search bar, category carousel, gallery, stats |
| `/itinerary` | `ItineraryPage` | AI-generated results (receives state via React Router) |
| `/about` | `About` | About TravelLIGHT AI platform |
| `/contact` | `Contact` | Contact form |
| `/faq` | `FAQ` | Frequently asked questions |
| `/support` | `Support` | Help & support center |
| `/package/:id` | `PackageDetails` | Individual travel package details |
| `/privacy` | `LegalPage` | Privacy policy |
| `/terms` | `LegalPage` | Terms of service |
| `/cookies` | `LegalPage` | Cookie policy |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     A new feature
fix:      A bug fix
docs:     Documentation changes
style:    Formatting, no logic changes
refactor: Code restructure without feature changes
perf:     Performance improvements
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Built with ❤️ using **React**, **Groq AI**, and **TailwindCSS**

**TravelLIGHT AI** — *Explore the world, your way.*

</div>
