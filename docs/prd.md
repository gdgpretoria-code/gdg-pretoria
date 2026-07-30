# Product Requirement Document (PRD)

## Project Title: GDG Pretoria Community & Developer Ecosystem Platform

### 1. Product Overview & Vision
The **GDG Pretoria Platform** is a unified digital ecosystem designed for Google Developer Group (GDG) Pretoria. It connects developers, speakers, sponsors, and organizers by offering community event management, speaker CFP portals, a member matching matrix, an interactive technical mock interview engine, community resources, and partner onboarding.

### 2. Core Target Personas
1. **Community Members & Developers**: Attendees looking to network, practice interviews, access Google Codelabs/workshop resources, and find jobs.
2. **Speakers & Mentors**: Technologists submitting session proposals (CFP), sharing workshop materials, and providing interview practice or mentorship.
3. **Sponsors & Corporate Partners**: Companies looking to host events, hire tech talent through the Job Board, and support GDG Pretoria needs.
4. **GDG Organizers & Admins**: Community leaders managing events, reviewing speaker CFPs, publishing blog spotlights, and moderating job posts.

---

### 3. Functional Requirements & Feature Specifications

#### Module 1: Home Page (The Welcome Hub)
- **Hero Section**: High-impact intro to GDG Pretoria showcasing Google technologies (Android, GCP, Firebase, Flutter, TensorFlow) with a prominent WhatsApp/Discord join call-to-action.
- **Sponsor & Partner Ribbon**: Persistent carousel displaying active community sponsors with outbound links.
- **Upcoming Events Teaser**: Real-time card showing the next scheduled meetup/workshop with direct RSVP integration.
- **Community Spotlight**: Highlights of member projects, tech achievements, and community contributions.

#### Module 2: Events & Content Directory
- **Event Directory**: Categorized directory (Upcoming & Past meetups) with filter by technology track (Web, AI/ML, Cloud, Mobile).
- **Media Gallery**: High-res photo grid showcasing stage speakers, attendee interactions, and community workshops.
- **GDG Blog & Speaker Interviews**: Technical articles, community posts, and pre/post-event speaker interview spotlights.
- **Video Archives**: Embedded YouTube playbacks of past GDG Pretoria tech talks and live streams.

#### Module 3: Speaker Portal & Recognition
- **Call For Papers (CFP)**: Submission portal for speakers to submit talk abstracts, bio, presentation slides, and preferred talk format (lightning talk, deep-dive session, workshop).
- **Topic Wishlist & Guidelines**: Curated list of high-demand topics requested by the Pretoria community + speaker preparation checklist.
- **Speaker Recognition (Hall of Fame)**: Acknowledgment wall honoring past speakers and their presentation archives.

#### Module 4: Ecosystem & Networking (Member Portal)
- **Member & Volunteer Profiles**: Directory showcasing developer interests, GitHub/LinkedIn links, skills, and project portfolios.
- **Job Board & Opportunities**: Sponsor-posted job listings filtered by role level, tech stack, and remote/on-site location in Pretoria/Gauteng.
- **Strength Matching Matrix**: Automated pairing algorithm connecting members for mentor/mentee relationships and technical collaboration.
- **Interactive Mock Interview Platform**:
  - Timed coding and system design prompt tracks (Cloud/GCP, Frontend, Backend, AI/ML).
  - Instant scoring & automated evaluation breakdown.
  - 1-on-1 peer/mentor interview booking calendar.

#### Module 5: Partnerships & Sponsorships
- **Sponsor Onboarding Guide**: Tiered benefit breakdowns (Platinum, Gold, Venue, Community).
- **Community Needs Transparency Board**: Live requests matrix showing immediate needs (e.g., venue space, catering, hardware swag, financial support).
- **Partner Recognition Wall**: Public appreciation board showcasing corporate ecosystem supporters.

#### Module 6: Learning & Technical Resources
- **Google Codelab Hub**: Direct links and curated learning pathways for Google technologies.
- **Workshop Material Repository**: Slide decks, GitHub repo links, sample code snippets, and setup guides from past meetups.
- **Code of Conduct**: Community safety, diversity, and inclusion standards.

#### Module 7: Organizer Admin Portal
- **Dashboard Controls**: Authentication guard restricting access to `ADMIN` role users.
- **CFP Review Engine**: Accept/reject talk submissions with feedback notes.
- **Content Management**: Create/edit events, blog articles, media links, job postings, and community needs items.

---

### 4. Technical Requirements & Non-Functional Goals
- **Architecture**: Monorepo managed via `npm workspaces`.
- **Frontend Framework**: Angular 22+ utilizing modern Signals, Control Flow (`@if`, `@for`), and Standalone Components.
- **Backend API**: Node.js with Express and TypeScript.
- **Database Layer**: Drizzle ORM paired with PostgreSQL.
- **Design System**: Google Material 3 inspired theme tailored with GDG brand colors, sleek dark mode (`#0F172A`), glassmorphism panels, and smooth micro-animations.
- **Performance**: High Lighthouse performance & accessibility scores, sub-second API response times.
- **Authentication**: JWT & Google OAuth 2.0 based authentication with role-based access control.

---

### 5. Success Metrics
- Conversion rate of site visitors joining the community.
- Number of speaker CFP applications submitted per event cycle.
- Active utilization of the Mock Interview Platform and Member Matching Matrix.
- Sponsor lead generation via the Partnership Guide and Job Board interactions.
