# GDG Pretoria Community & Developer Platform 🚀

Welcome to the official web platform repository for **Google Developer Group (GDG) Pretoria**. This project is a modern, high-performance monorepo designed to connect developers, event speakers, corporate sponsors, and community organizers.

---

## 🌟 Key Features

1. **The Welcome Hub (Home)**: High-impact hero section, active sponsor ribbon, upcoming meetup teasers, and community spotlights.
2. **Events & Content Directory**: Event directory, speaker media photo gallery, GDG blog & interview spotlights, and video archives.
3. **Speaker Portal (CFP)**: Interactive Call For Papers submission portal, requested topics wishlist, and Speaker Recognition Hall of Fame.
4. **Ecosystem & Member Portal**: Member & volunteer directory, sponsor job board, strength matching matrix, and an **Interactive Technical Mock Interview Platform**.
5. **Partnerships & Sponsorships**: Onboarding guide with tiered benefits, transparent Community Needs board, and Partner Recognition wall.
6. **Learning & Resources**: Google Codelabs pathways, workshop slide decks & GitHub sample code, and community Code of Conduct.
7. **Organizer Admin Portal**: Role-guarded admin panel for reviewing CFPs, managing meetups, publishing articles, and managing job postings.

---

## 🛠️ Technology Stack

- **Monorepo Manager**: `npm workspaces`
- **Frontend**: **Angular 22+** (Standalone Components, Signals, Control Flow)
- **Backend API**: **Node.js** with **Express** & **TypeScript**
- **Database & ORM**: **Drizzle ORM** with **PostgreSQL** (and PGlite/SQLite dev fallback engine)
- **Design System**: Google Material 3 inspired theme tailored with GDG brand colors (`#4285F4`, `#EA4335`, `#FBBC04`, `#34A853`), dark mode (`#0F172A`), glassmorphism, and responsive micro-animations.

---

## 📁 Repository Structure

```
gdg-pretoria/
├── package.json               # Root monorepo workspace config & scripts
├── README.md                  # Project overview & quickstart guide
├── apps/
│   ├── api/                   # Express REST API (Auth, Events, Speakers, Jobs, Mock Interview Engine)
│   │   ├── src/
│   │   │   ├── config/        # Environment & Drizzle DB setup
│   │   │   ├── db/            # Drizzle Schema, Migrations, & Seed data generator
│   │   │   ├── middleware/    # Auth & Role-based Guards (Admin, Member, Speaker, Sponsor)
│   │   │   ├── routes/        # API endpoints
│   │   │   └── server.ts      # Express App server
│   │   └── package.json
│   └── web/                   # Angular 22+ Web Application
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/      # API services, Auth state, Theme service, Guards
│       │   │   ├── shared/    # Navbar, Footer, Cards, Badges, Modals, Toasts
│       │   │   ├── pages/     # 8 Full Page Modules (Home, Events, Speaker, Member, Mock Interview, etc.)
│       │   │   └── app.routes.ts
│       │   ├── styles.css     # Google Material 3 & GDG Design System CSS Tokens
│       │   └── index.html
│       └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- PostgreSQL (optional: fallback dev database is automatically managed)

### Installation
```bash
# Clone the repository
git clone https://github.com/gdg-pretoria/website.git
cd gdg-pretoria

# Install workspace dependencies
npm install
```

### Running Locally
```bash
# Seed database with sample GDG Pretoria meetups, speakers, and practice interview prompts
npm run seed

# Launch both Angular 22+ frontend and Express API concurrently
npm run dev
```

The web application will be available at `http://localhost:4200` and the API server at `http://localhost:3000`.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
