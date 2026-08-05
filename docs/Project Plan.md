# GDG Pretoria Platform Project Plan

## 1. Project Overview & Architecture Setup

**Goal:** Establish the technical foundation, CI/CD pipelines, and design system.

| Area | Details |
|------|---------|
| **Repository Setup** | Initialize the monorepo using npm workspaces. |
| **Database Design** | Map out the PostgreSQL schema (Users, Events, CFPs, Jobs, Mock Interviews) using Drizzle ORM. |
| **Design System** | Configure the Material 3 theme in Angular, defining the brand colors, dark mode (`#0F172A`), and global CSS for glassmorphism panels and micro-animations. |
| **UI/UX Design Deliverable** | Finalized Figma UI Kit (typography, component library, color tokens) and Database Entity-Relationship Diagrams (ERDs). |
| **API Foundation** | Scaffold the Node.js/Express + TypeScript backend. |

**Deliverable:** Working CI/CD pipeline, empty monorepo structure, and finalized database schema.

---

## 2. Core Authentication & Admin Foundation

**Goal:** Secure the platform and build the backbone for role-based access.

| Area | Details |
|------|---------|
| **Authentication** | Implement Google OAuth 2.0 and JWT-based session management. |
| **Role Management** | Create access tiers (`USER`, `SPEAKER`, `SPONSOR`, `ADMIN`). |
| **Admin Shell** | Scaffold the Organizer Admin Portal. |
| **UI/UX Design Deliverable** | User Journey Maps for onboarding, edge-case designs for unauthorized states, and wireframes for the Admin shell navigation. |

**Deliverable:** Users can log in via Google, and Admins can access a secure dashboard.

---

## 3. Public-Facing Portals & Content Delivery

**Goal:** Build the essential marketing and informational pages.

| Area | Details |
|------|---------|
| **Home Page** | Refine the hero section, sponsor carousel, and event teasers UI. |
| **Events & Content** | Build the categorized event directory, media gallery, YouTube archive, and Google Codelab Hub. |
| **Partnerships** | Develop the Sponsor Onboarding Guide, Community Needs Transparency Board, and Partner Recognition Wall. |
| **UI/UX Design Deliverable** | High-fidelity, mobile-first mockups for all public pages, strict responsive breakpoint definitions, and layout grids for media-heavy pages. |

**Deliverable:** A fully functional, public-facing website ready to attract sponsors and members.

---

## 4. User Portals & Ecosystem

**Goal:** Enable user interaction, profiles, and initial matching features.

| Area | Details |
|------|---------|
| **Member Portal** | Develop member profiles with GitHub/LinkedIn integrations and portfolio displays. |
| **Speaker Portal** | Build the Call For Papers (CFP) submission engine and Hall of Fame. |
| **Job Board** | Implement the sponsor-posted job listings with filters (role level, tech stack, location). |
| **Admin Controls** | Enable the CFP Review Engine and content management for jobs/events in the Admin dashboard. |
| **UI/UX Design Deliverable** | Form UX optimization. |

**Deliverable:** Members can create profiles, speakers can submit CFPs, and sponsors can post jobs.

---

## 5. Advanced Interactive Features

**Goal:** Implement the complex, high-value technical features.

### Interactive Mock Interview Engine

- Build the timed coding and system design prompt UI.
- Develop the scoring algorithm and evaluation breakdown.
- Integrate the 1-on-1 mentor booking calendar.

### Strength Matching Matrix

- Develop the automated pairing algorithm connecting mentors/mentees based on profile skills.

**Deliverable:** The platform's flagship interactive features are live and functioning.

---

## 6. QA, Performance Tuning, & Launch

**Goal:** Ensure the platform meets all non-functional requirements and is bug-free.

| Area | Details |
|------|---------|
| **Performance Audits** | Optimize Angular Control Flow and Standalone Components to ensure high Lighthouse scores. |
| **API Load Testing** | Ensure sub-second API response times under load. |
| **UAT** | Beta testing with GDG Pretoria core organizers. |
| **Go-Live** | Production deployment and community announcement. |

---

## Summary of Key Milestones

| Milestone | Key Outcome |
|-----------|-------------|
| **M1: Foundation** | DB Schema, Monorepo, & Design System complete. |
| **M2: Security** | Google OAuth & Role-Based Access live. |
| **M3: Public Launch** | Home, Events, & Partner pages ready for traffic. |
| **M4: Community Hub** | Profiles, CFPs, and Job Board active. |
| **M5: Ecosystem Live** | Mock Interviews & Matching Matrix operational. |
| **M6: Final Polish** | Lighthouse optimized; production deployment. |
