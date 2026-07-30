# Implementation Plan - GDG Pretoria Monorepo Web Platform

Build a comprehensive web platform for **GDG Pretoria** using an **npm workspaces monorepo** consisting of an **Angular 22+ frontend**, an **Express Node.js backend**, and a **Drizzle ORM + PostgreSQL** database layer.

---

## Technical Stack & Monorepo Structure

```
gdg-pretoria/
├── package.json               # Root npm workspace configuration & scripts
├── README.md                  # Comprehensive Project Overview & Architecture Guide
├── tsconfig.base.json         # Shared TypeScript compiler options
├── apps/
│   ├── api/                   # Node.js / Express Backend API (TypeScript)
│   │   ├── src/
│   │   │   ├── config/        # Environment & Drizzle DB instance
│   │   │   ├── db/            # Drizzle Schema, Migrations & Seed data
│   │   │   ├── middleware/    # JWT Auth & Role Authorization Guard
│   │   │   ├── routes/        # Auth, Events, Speakers, Jobs, Members, Interviews, Admin
│   │   │   └── server.ts      # Express App Entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                   # Angular 22+ Frontend Application
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/      # Services (Auth, API, Theme, State) & Guards
│       │   │   ├── shared/    # Navbar, Footer, Cards, Modals, Badges, Toast
│       │   │   ├── pages/     # Home, Events, Speaker Portal, Member Portal,
│       │   │   │              # Mock Interview Engine, Partnerships, Resources, Admin
│       │   │   └── app.routes.ts
│       │   ├── styles.css     # Google Material 3 GDG Design System & Tokens
│       │   └── index.html
│       ├── package.json
│       └── tsconfig.json
```

---

## User Review Required

> [!NOTE]
> All technical choices and feature specifications were aligned during our `/grill-me` session. The application will include seed scripts with PostgreSQL (or fallback PGlite/SQLite in-memory for zero-dependency instant local execution if PostgreSQL service is unavailable locally).

---

## Proposed Changes

### Core Workspace & Database Layer

#### [NEW] [package.json](file:///Users/tash/code/web/sites/gdg-pretoria/package.json)
Root package file configuring `apps/*` npm workspaces and concurrent dev start scripts (`npm run dev`, `npm run build`, `npm run seed`).

#### [NEW] [apps/api/src/db/schema.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/api/src/db/schema.ts)
Drizzle ORM relational database schema covering:
- **`users`**: Auth credentials, profile details, roles (`ADMIN`, `MEMBER`, `SPEAKER`, `SPONSOR`), skills, social links.
- **`events`**: Meetup details, RSVP counts, speaker associations, venue info, media links.
- **`speakers` / `cfps`**: Talk proposals, presentation decks, status (`PENDING`, `APPROVED`, `REJECTED`).
- **`blog_posts`**: Articles, speaker spotlight interviews, tags, author links.
- **`job_board`**: Open roles posted by sponsors, company info, salary ranges, application links.
- **`community_needs`**: Funding, venue, hardware, catering request items.
- **`mock_interviews`**: Practice sessions, interview tracks (Frontend, Backend, Cloud/GCP, System Design), question prompts, AI evaluation rubrics, user scores.
- **`matching_matrix`**: Mentor/peer pairing connections and strength tags.

#### [NEW] [apps/api/src/server.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/api/src/server.ts)
Express backend server handling REST API endpoints for authentication, CRUD for events/jobs/CFPs, interactive mock interview evaluation, matching matrix, and admin actions.

---

### Angular Frontend Application (`apps/web`)

#### [NEW] [apps/web/src/styles.css](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/styles.css)
Google Material 3 design system with GDG brand palette:
- `#4285F4` (Google Blue), `#EA4335` (Google Red), `#FBBC04` (Google Yellow), `#34A853` (Google Green)
- Dark mode theme (`#0F172A` background, glassmorphism cards, glowing status pills)
- Micro-animations, responsive layout utilities, typography tokens (Google Sans / Outfit / Inter font).

#### [NEW] [apps/web/src/app/pages/home/home.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/home/home.component.ts)
Hero section, active sponsor ribbon with outbound links, upcoming event teaser, and community spotlights.

#### [NEW] [apps/web/src/app/pages/events/events.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/events/events.component.ts)
Event Directory (Upcoming & Past), Media Gallery (Stage & Community photos), GDG Blog & Speaker Interviews, Video Archive player.

#### [NEW] [apps/web/src/app/pages/speaker-portal/speaker-portal.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/speaker-portal/speaker-portal.component.ts)
Interactive Call For Papers (CFP) application, requested topics wishlist, speaker guidelines, and Hall of Fame recognition wall.

#### [NEW] [apps/web/src/app/pages/member-portal/member-portal.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/member-portal/member-portal.component.ts)
Directory of member/volunteer profiles, Job Board with sponsor roles, and Automated Strength Matching Matrix for mentorship and collaboration.

#### [NEW] [apps/web/src/app/pages/mock-interview/mock-interview.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/mock-interview/mock-interview.component.ts)
Interactive Technical Interview Engine featuring timed coding/system design challenges across Cloud/GCP, Frontend, Backend, and System Design tracks, instant feedback evaluator, score tracking history, and peer booking scheduler.

#### [NEW] [apps/web/src/app/pages/partnerships/partnerships.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/partnerships/partnerships.component.ts)
Partner onboarding guide with tiered benefits, transparent Community Needs board, and Partner Recognition Wall.

#### [NEW] [apps/web/src/app/pages/resources/resources.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/resources/resources.component.ts)
Google Codelab access links, Workshop code repository & slide decks, Code of Conduct safety guidelines.

#### [NEW] [apps/web/src/app/pages/admin/admin.component.ts](file:///Users/tash/code/web/sites/gdg-pretoria/apps/web/src/app/pages/admin/admin.component.ts)
Organizer Admin Panel to approve CFPs, post new meetups, publish blog spotlights, list job opportunities, and manage community needs.

---

## Verification Plan

### Automated Tests & Verification
1. Build verification across npm workspace:
   ```bash
   npm run build
   ```
2. API endpoint test suite (Auth, Events, Speakers, Jobs, Mock Interview API):
   ```bash
   npm run test --workspace=apps/api
   ```
3. Angular build & lint check:
   ```bash
   npm run build --workspace=apps/web
   ```

### Manual Verification
1. Launch full stack via `npm run dev` and navigate through all 6 primary sections.
2. Verify interactive Call for Papers (CFP) form submission and Admin Portal approval workflow.
3. Test Mock Interview Platform with timed category prompts and evaluation output.
4. Verify matching matrix filtering and job board interaction.
5. Check dark mode glassmorphic styling, responsive layout across mobile and desktop viewports.
