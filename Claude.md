# Spave - Marketplace for Hourly Space Rentals

## Project Overview
Spave is a marketplace platform for renting spaces by the hour. The vision includes multiple space types (music studios, photo studios, sports courts, event spaces), but the **MVP is focused exclusively on soccer court rentals in Montreal's metropolitan area**. Here we're only building the frontend; backend will be a separate Spring Boot project and database will be Supabase.

---

## Claude Guidelines

### Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Prioritize responsive design from the start** — design for mobile first, then add tablet and desktop breakpoints incrementally. Do not leave responsive polish for the end.

### Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below) or add a placeholder.
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

### Local Server
- **Always serve on localhost**
- If the server is already running, do not start a second instance.

### Output Defaults
- Mobile-first responsive
- For now, use images from `/public/temp_images`
- Use placeholder logo from `/public/spave-logo.svg` (will exist)

### Inspiration
- Always check the `design_inspiration/` folder before designing. It may contain vague examples of what I want to achieve. Those aren't for you to copy images or structure, but to get a sense of the tone, energy and vibe I want — think Uber, Airbnb, Stripe: clean, premium, functional, trustworthy.

### Anti-Generic Guardrails
- **Colors:** Primary color is #76043D (Crimson Violet). Secondary color is black (#000000). All on white background (#FFFFFF). Use different grays for hierarchy.
- **Shadows:** Never use flat shadows. Use layered, color-tinted shadows with low opacity. Uber uses soft, diffused shadows — emulate that.
- **Typography:** Use system font stack for everything (clean, fast, native). Create clear hierarchy: headings bold (600-700), body regular (400), small text medium (500) for labels.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. Uber buttons scale slightly on tap, have smooth transitions. No exceptions.
- **Spacing:** Use intentional, consistent spacing tokens (4, 8, 12, 16, 24, 32, 48, 64px). Airbnb and Uber use generous white space — mimic that.
- **Depth:** Surfaces should have a layering system (base → elevated → floating). Cards should feel slightly lifted from background.
- **Icons:** Use Lucide React for all icons.

### Hard Rules
- Do not "improve" a reference design — match it
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- No gradients, no emoji, no "AI-generated" look

---

## Brand Guidelines

| Element | Value |
|---------|-------|
| **Primary Color** | #76043D (Crimson Violet) |
| **Secondary Color** | #000000 (Black) |
| **Background** | #FFFFFF (White) |
| **Text Primary** | #111111 |
| **Text Secondary** | #666666 |
| **Text Muted** | #999999 |
| **Border** | #EEEEEE |
| **Card Background** | #FFFFFF |
| **Card Shadow** | Soft, diffused |
| **Hover Shadow** | Slightly elevated |

**Typography:** System font stack (clean, fast, native)

---

## Design Philosophy
- Clean, professional, minimalist (inspired by Uber, Airbnb, Stripe)
- Ample white space
- Mobile-first responsive design (build responsive from day one)
- Use regular CSS with CSS Modules
- Every interactive element has considered states (hover, focus, active)

## Full Platform Vision (for context)
Spave will eventually enable booking of any space by the hour:
- Music rehearsal studios
- Photography/video studios
- Sports facilities (soccer, basketball, tennis)
- Dance/yoga studios
- Event spaces
- Meeting rooms

## MVP Focus (Current Build)
The initial launch is **soccer court rentals in Montreal only**:
- Indoor and outdoor soccer courts
- 5v5, 7v7, and 11v11 full-size options
- Hourly booking with host approval
- Target users: recreational teams, casual players, leagues

---

## Pages & Build Order

Build in this exact order. Each page must be mobile-first responsive from the start.

---

### Phase 1: Landing Page & prototype

**Order:** 1 → 2 → 3

---

#### 1. Home Page (Landing)

**Purpose:** Build anticipation, capture waitlist emails, and drive users to the prototype.

**Sections:**

| Section | Content |
|---------|---------|
| **Header** | Logo (left), navigation links: "Try prototype", "Contact" (right). Sticky on scroll. |
| **Hero** | Large headline with soccer player image layered between words (there is an example in /public/inspiration but get creative). Subheadline explaining the problem (calling multiple places, wasted time, no price comparison). Two CTAs: "Join waitlist" and "Try prototype". Social proof hint somewhere (X people already joined) |
| **What's Coming** | Vertical timeline with dots and milestones alternating left and right. Center line connecting them. Milestones: Prototype, Booking & Payment integration (instant reservation through spave), more sports, mobile app (feel free to edit those, add, remove, change names). Current position: color the timeline between first and second dot (prototype launched, working on bookings). |
| **How It Works** | TI'll let you get creative here but you could break away from the white bg and go full crimson, just a suggestion |
| **Social Proof** | Two quotes from Montreal soccer players. Optional small circular headshot images. |
| **Visual Interlude** | Full-width soccer court image. Text overlay: "Your game is waiting." Button: "Find your court →" linking to browse page. |
| **FAQ** | Two-column grid. Common questions about Spave, costs, hosting, roadmap. |
| **Final CTA** | Centered. Headline. Two buttons: "Join waitlist" and "Try prototype". |
| **Footer** | Logo, links, email input for waitlist, copyright. |

**Images needed:**
- Soccer player PNG with transparent background (positioned between/within headline words) /public/soccer_player.png
- Full-width soccer court image /public/tow_view_field.jpg

**Data:** Form and buttons can be inactive for now, we'll integrate email saving after

---

#### 2. Browse Page (prototype)

**Purpose:** Let users discover and filter courts.

**Sections:**

| Section | Content |
|---------|---------|
| **Header** | Logo, filter button (right). |
| **Search Bar** | Search by court name or neighborhood. |
| **Results Count** | "X courts found" |
| **Court Cards** | Grid (2 columns mobile, 3-4 desktop). Each card: image, court name, neighborhood, price range, rating, availability hint. Click card → court detail. |
| **Infinite Scroll** | Load more courts as user scrolls. |

**Data:** Fetches from backend API (see `api.md` for endpoint structure).

---

#### 3. Court Detail Page

**Purpose:** Show full court information and provide booking redirect.

**Sections:**

| Section | Content |
|---------|---------|
| **Photo Gallery** | Main image with thumbnail strip below. Swipeable on mobile. |
| **Title & Location** | Court name, address, neighborhood. |
| **Host Info** | Host name, response time, rating. |
| **Key Details** | Size (5v5/7v7/full), type (indoor/outdoor), surface, max players. |
| **Amenities** | List of amenities (changing rooms, parking, lights, etc.). |
| **Pricing** | Price range per hour. Description of different rates (if any). |
| **Availability Hint** | When the court is typically available (evenings, weekends, etc.). |
| **Booking Button** | Button that redirects to the court's external booking link or reveals contact info. Label: "Book at [Venue Name] →" |
| **Reviews Section** | Average rating, review count, recent reviews. |
| **Similar Courts** | Horizontal scroll of 3-4 similar courts nearby. |

**Data:** Fetches from backend API (see `api.md` for endpoint structure).

---

### Future Phases (Not in MVP)

- Authentication (login, signup, email verification)
- User profiles and settings
- Booking request flow
- Host dashboard and listing management
- Reviews and ratings
- Internationalization (en/fr)
- Loading states, empty states, error boundaries

---

## Mock Data Strategy
For MVP demo, use data from backend API as defined in `api.md`. The backend provides endpoints for courts listing, court details.

## Technical Preferences
- **Framework**: Next.js with App Router (TypeScript)
- **Styling**: CSS Modules (`.module.css`)
- **Components**: shadcn/ui (customized with #76043D and black) when applicable
- **Icons**: Lucide React
- **Data Fetching**: Fetch from backend API as defined in `api.md`

## CSS Approach
- `app/globals.css` for reset, typography, theme variables
- CSS variables for colors, spacing, breakpoints
- Mobile-first media queries
- Component-specific styles in `Component.module.css`