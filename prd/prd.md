# Stardogwalker Cardiff: Dog Walking App (Splott & Adamsdown)

### TL;DR

A friendly, local, mobile-first web app connecting dog owners in Cardiff’s Splott & Adamsdown neighborhoods with a trusted solo dog walker. Streamlines walk scheduling, offers walk journals and pet profiles, while optimizing for mobile users and dominating local search results.

---

## Goals

### Business Goals

* Grow number of local dog-walking bookings by Splott & Adamsdown residents by 30% in first 3 months

* Establish Stardogwalker as the most visible dog walker in local online searches

* Build a reputation for reliability and personal service through engaged user feedback

* Create operational efficiencies for solo walker (less admin overhead, more time walking)

### User Goals

* Allow pet owners to quickly schedule dog walks for one or more pets

* Keep owners updated with detailed walk journals, photos, and messages

* Enable users to build and manage individual pet profiles

* Provide trust and transparency on every walk with in-app communication and status updates

### Non-Goals

* Handling payments or invoicing within the app (future roadmap)

* Supporting areas outside Splott & Adamsdown

* Offering advanced analytics or business insights in MVP

---

## User Stories

### Persona: Dog Owner (Client)

* As a dog owner, I want to easily schedule a walk for my dog, so that I can plan around my busy schedule.

* As a dog owner, I want to add, edit, and manage detailed profiles for each of my dogs, so that the walker knows their needs.

* As a dog owner, I want to receive real-time updates and photos during my dog’s walk, so I know my pet is safe and happy.

* As a dog owner, I want to browse upcoming and previous walks, so I can track my dog’s exercise.

* As a dog owner, I want to read about my walker’s local experience, so I feel confident entrusting my pet.

### Persona: Dog Walker (Admin/Sole Proprietor)

* As the dog walker, I want to manage my walk calendar, so I can avoid booking conflicts.

* As the dog walker, I want to view and update dog profiles, so I can prepare for each walk.

* As the dog walker, I want to send walk journals and photos to owners, so they remain engaged and trust my services.

* As the dog walker, I want quick access to all client and pet contact information, so I can resolve issues promptly.

---

## Functional Requirements

* **Onboarding & Authentication** (Priority: High)

  * Email/mobile sign-up for owners

  * Simple owner/dog walker role selection at first login

  * Password management (optional for mobile first; social login out of scope)

* **Scheduling & Calendar** (Priority: High)

  * Owner can request & manage bookings (date/time, duration, pet selection)

  * Walker receives/accepts/declines bookings

  * Calendar view (mobile-optimized; simple week & day views)

  * Conflict checks to prevent double-booking

* **Dog Profiles** (Priority: High)

  * Owners create/edit profiles (name, breed, age, health/behavior notes, photo)

  * Multiple pets per owner

  * Walker editable access for notes

* **Walk Journals** (Priority: High)

  * Walker logs each completed walk (time, route, notes, photo upload)

  * Owners receive push/email notification & view past walks

* **Notifications** (Priority: Medium)

  * Walk reminders and status updates (owners & walker)

  * Booking confirmations, cancellations

* **Admin & Settings** (Priority: Medium)

  * Basic owner profile management (address, preferred contact)

  * Walker profile (“About Me”, service area, contact details)

  * Privacy and data use options

* **Mobile-first, Desktop Supported** (Priority: High)

  * Responsive web design, touch-first controls

  * Desktop enhancements—wider calendar, accessible pet management dashboard

* **SEO & Local Search Optimization** (Priority: High)

  * Pages and elements targeting “dog walker Splott,” “Adamsdown dog walking,” and related terms

  * Local landing pages with Google Maps snippets, reviews, and unique meta content

  * Fast-loading mobile pages, proper semantic markup

---

## User Experience

**Entry Point & First-Time User Experience**

* Owners and interested clients find Stardogwalker via local search, directories, or community links

* Minimal, friendly landing page focused on “Splott & Adamsdown dog walking”

* Mobile onboarding guides user (owner or walker role) through creating an account with email/mobile and adding first pet profile

* Introductory tips about booking and walk journals

**Core Experience**

* **Step 1:** Scheduling a Walk

  * Owners tap ‘Book a Walk’ from dashboard

  * Select dog(s), date/time, walk duration; optional note (e.g., medication, behavior)

  * App validates slot is available; instant feedback for conflicts

  * Walker receives notification; accepts/declines request with optional message

  * Confirmation sent to owner

* **Step 2:** Managing Walks & Calendar

  * Owners see list/calendar of upcoming and previous walks

  * Can reschedule or cancel with confirmation dialog

  * Walker views all accepted/scheduled walks in mobile calendar; desktop shows week/month overview

* **Step 3:** Dog Profile Management

  * Owners add/edit pets with details and photo—simple, visual card layout

  * Walker can view health, care notes before each walk

  * All past walks are linked to pet profile for easy reference

* **Step 4:** Walk Journals & Updates

  * After each walk, the walker logs route, brief description, and uploads a photo or two (optional)

  * Owners receive notification and can access “Journal” for each pet

  * Owners can react/send optional thank-you messages

* **Step 5:** Responsive, SEO-Friendly Desktop

  * App scales to desktop with larger schedule and richer pet dashboards

  * Local-oriented meta content always visible (“Dog Walker in Splott & Adamsdown, Cardiff”)

**Advanced Features & Edge Cases**

* Account recovery—resend verification or password reset flows

* Owner or walker can “snooze” notifications for holidays/schedule blocks

* Walks auto-expire if not confirmed by walker in set window

**UI/UX Highlights**

* Friendly, approachable branding with “local, trusted dog walker” narrative

* Color palette optimized for accessibility (high contrast, color-blind safe)

* Big touch targets for mobile; keyboard and mouse support on desktop

* Photos and pet images prioritized for instant user delight

* Built-in local info “Did You Know?” flavor text—subtly reinforces area focus

---

## Narrative

Sophia is a busy professional living in Splott, Cardiff, who juggles work and the needs of her energetic spaniel, Max. Frustrated by impersonal agencies and time-consuming phone calls, she searches “local dog walker in Splott” and instantly finds Stardogwalker Cardiff. The app’s warm, friendly vibe and local landmarks reassure her—this isn’t a distant franchise, but a neighbor who really gets her community.

Setting up an account on her phone is effortless. She adds Max’s profile, noting his quirky fear of bicycles and love for puddles. Scheduling a walk for Wednesday afternoon takes seconds, and within minutes, she receives a cheery confirmation from her local dog walker. The day of the walk, Sophia gets a push notification: Max is off exploring the park! Later, she receives a walk journal complete with a map snapshot and a grin-inducing photo of Max mid-adventure. Everything is simple, transparent, and tailored for locals.

Sophia feels both peace of mind and neighborly trust. Stardogwalker Cardiff isn’t just another app—it’s her digital bridge to a trusted service, right in the heart of her community. For the dog walker, it means less admin, more walking, and a growing roster of delighted local clients.

---

## Success Metrics

### User-Centric Metrics

* Number of new owner account signups per month

* Number of successful walk bookings per week

* Repeat booking rate (% of users making >1 request)

* Walk journal views and owner reactions/messages

### Business Metrics

* Stardogwalker website/app ranking for “dog walker Splott” and “Adamsdown dog walker” terms (tracked monthly)

* Total active clients in Splott & Adamsdown

* Word-of-mouth referrals, measured by referral codes/links

### Technical Metrics

* Mobile page load <2 seconds (80th percentile)

* 99.9% uptime for scheduling, journaling, and profile management

* <1% failed booking attempts due to system errors

### Tracking Plan

* Account signups (by device, channel)

* Booking requests/submissions

* Confirmation/cancellation actions (both sides)

* Walk journal completions and photos uploaded

* Notification opens/interactions

* Organic search landing event (SEO performance)

* Pet profile creations/edits

---

## Technical Considerations

### Technical Needs

* Responsive web front-end (mobile-first PWA with desktop enhancements)

* Calendar and scheduling logic with robust validation for solo walker model

* Data models for users, pets, bookings, walk logs

* Real-time notification system (email, push where supported)

* Future-proofing for eventual payment integration

### Integration Points

* Google Maps API for routes/local area context (journals, landing pages)

* Email (and possibly SMS) notification platforms

* No outside CRM, payment gateways in MVP

### Data Storage & Privacy

* Secure cloud-based user data storage

* All client/pet information protected; no public sharing

* Compliant with basic GDPR/data protection for user data

* Simple privacy policy outlining data handling

### Scalability & Performance

* MVP designed for low-to-moderate usage (one walker, 100–200 active clients)

* Fast, CDN-backed asset delivery; lazy loading for photos/journals

### Potential Challenges

* Ensuring frictionless mobile onboarding (reduce account drop-off)

* Preventing walk/booking calendar errors

* Keeping notifications timely and reliable

* Balancing SEO with speed and mobile optimization

---

## Milestones & Sequencing

### Project Estimate

* Small project: 3–4 weeks

### Team Size & Composition

* Extra-small: 1–2 people

  * Product/Design Lead

  * Full-stack developer

### Suggested Phases

**1. Prototype & Design (Week 1)**

* Deliverables: Figma or in-browser clickable prototype, app identity, initial mobile and desktop flows.

* Responsible: Product/Design.

**2. Core Build: Scheduling & Profiles (Weeks 2–3)**

* Deliverables: User onboarding, pet management, main booking flow, calendar, owner-facing dashboard, basic notification system, initial SEO landing.

* Responsible: Developer (+ Product for QA).

* Dependencies: Google Maps keys, server setup.

**3. Walk Journals & Notifications (Week 3)**

* Deliverables: Walk logging, photo uploads, email/push notifications, journal view for owners.

* Responsible: Developer.

**4. SEO/Local Polish & Soft Launch (Week 4)**

* Deliverables: Local keyword content, structured data, area-specific meta tags, performance and accessibility improvements, desktop layout review.

* Responsible: Both.

* Dependencies: SEO copy, area details.

**5. Feedback & Next Steps**

* Post-launch collection of user feedback, plan for future payment integration and expansion only after local model is proven.