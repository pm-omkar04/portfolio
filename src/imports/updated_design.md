# Senior Product Manager Portfolio — Updated Design System & Layout Specification

## 1. Design Direction

- **Core aesthetic:** Premium, modern, enterprise-grade FinTech minimalism.
- **Brand tone:** Authoritative, product-led, metrics-driven, technically credible, collaborative.
- **Visual goal:** Attractive and memorable without becoming flashy or overly decorative.
- **Primary storytelling principle:** Content → Product visuals → Metrics → Motion.
- **Accessibility:** WCAG AA contrast, readable hierarchy, keyboard-visible focus states, touch-friendly controls, and support for `prefers-reduced-motion`.

---

## 2. Color System

### Primary Palette

| Token | Value | Usage |
|---|---|---|
| Deep Navy | `#08111F` | Main dark background |
| Navy Surface | `#101C2E` | Cards and elevated surfaces |
| Primary Blue | `#3B82F6` | Primary actions, links, highlights |
| Electric Blue | `#60A5FA` | Hover states, active indicators |
| Emerald | `#10B981` | Positive metrics and success states |
| Soft Cyan | `#22D3EE` | Secondary data visualization accent |
| White | `#F8FAFC` | Primary text |
| Slate | `#94A3B8` | Secondary text |
| Border | `#26364A` | Subtle separators and card borders |

### Color Usage Rules

- Use Deep Navy as the dominant background.
- Use Navy Surface for cards rather than pure black.
- Blue is the primary interactive color.
- Emerald is reserved primarily for positive/impact metrics.
- Cyan should be used sparingly for secondary chart elements.
- Avoid using all accent colors simultaneously in the same component.
- Maintain sufficient contrast for all text and interactive elements.

### Optional Light Mode

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Primary text: `#0F172A`
- Secondary text: `#475569`
- Border: `#E2E8F0`
- Primary Blue: `#2563EB`
- Emerald: `#059669`

---

## 3. Typography

### Font Direction

Use a modern professional sans-serif such as **Inter**, **Manrope**, or an equivalent system fallback.

### Scale

- Hero / H1: `clamp(2.75rem, 5vw, 4.5rem)`, weight `700`, line-height `1.05–1.1`
- Section H2: `clamp(2rem, 3.5vw, 2.75rem)`, weight `600–700`
- H3: `1.5rem`, weight `600`
- Body Large: `1.125rem`, line-height `1.6`
- Body: `1rem`, line-height `1.6`
- Caption / Tags: `0.875rem`, weight `500`

Keep the typography hierarchy strong and avoid excessive font-weight variation.

---

## 4. Spacing & Layout

Use an 8pt grid system.

- Desktop section padding: `6rem–8rem`
- Mobile section padding: `3rem`
- Card padding: `2rem`
- Mobile card padding: `1.5rem`
- Standard grid gap: `2rem`
- Container max width: `1280px`
- Horizontal container padding: `1.5rem–2rem`

Use generous whitespace around major case studies and metrics.

---

## 5. Global Motion Principles

Animation should reinforce product storytelling rather than compete with the content.

### Motion Rules

- Use scroll-triggered reveals only when an element first enters the viewport.
- Default reveal duration: `500–800ms`.
- Default easing: `ease-out` or a smooth cubic-bezier equivalent.
- Stagger related elements by approximately `80–120ms`.
- Avoid continuous animation on large sections.
- Avoid excessive scaling, bouncing, flashing, or parallax.
- Respect `prefers-reduced-motion: reduce` by disabling non-essential motion.

### Recommended Reveal

```text
Initial:
opacity: 0
transform: translateY(24px)

Visible:
opacity: 1
transform: translateY(0)
```

---

## 6. Navigation

### Sticky Header

- Height: `80px` desktop.
- Use a semi-transparent Deep Navy background.
- Apply `backdrop-filter: blur(12px)`.
- Add a subtle bottom border after scrolling.
- Navigation:
  - About
  - Experience
  - Case Studies
  - Toolkit
  - Impact
- Right-side CTA: **Get in Touch**

### Navigation Animation

- Header transitions from transparent → blurred surface after scrolling.
- Active section receives a subtle animated underline.
- CTA gets a small hover lift.
- Mobile menu should slide/fade in rather than abruptly appearing.

---

## 7. Hero Section

### Layout

Desktop:

- 60% content
- 40% visual

Mobile:

- Single-column layout.

### Content

Badge:

**FinTech & Wealth Management Product Manager**

Headline:

**Building intuitive, scalable products for Capital Markets & Wealth Management**

Supporting copy should communicate:

- Product management
- Capital markets
- HNI users
- Trading
- Wealth management
- Technical/API understanding
- QA background

### Hero Visual

Use a premium dummy dashboard/product visual rather than a generic decorative illustration.

The visual can include:

- Trading chart
- Portfolio value
- Market indicators
- Order card
- Small metric cards

### Hero Motion

1. Badge fades/slides in.
2. Headline reveals in a short stagger.
3. Supporting copy fades in.
4. CTAs appear.
5. Dashboard visual gently floats into position.

Avoid infinite aggressive motion.

### CTAs

Primary:

**View Case Studies**

Secondary:

**Download Resume**

CTA hover:

- `translateY(-2px)`
- Slight shadow/glow
- Arrow/icon moves `3–4px` to the right

---

## 8. Impact Snapshot

### Purpose

This should be one of the strongest visual sections because recruiters should understand product impact within seconds.

### Layout

4-column desktop grid, 2-column tablet, 1-column mobile.

### Example Metrics

These are placeholders and must be replaced with verified numbers before publishing:

- `+42%` Digital onboarding completion
- `+31%` Trading journey adoption
- `+46%` Market insights engagement
- `-68%` Manual operational effort

### Number Animation

Numbers should animate from `0` to the target value when the section enters the viewport.

Example:

```text
0 → 10 → 25 → 42%
```

Use approximately `900–1200ms`.

Do not replay the animation every time the user scrolls past the section.

### Card Hover

- Translate upward `4px`.
- Border becomes slightly brighter.
- Subtle accent glow.
- Keep the effect restrained.

---

## 9. Impact Charts

Charts should be used where they communicate a story better than isolated numbers.

### Recommended Chart 1 — Product Impact

Illustrative comparison:

```text
Metric                      Before    After
Digital onboarding          58%       82%
Manual processing           100%      32%
Journey completion time     100       45
```

Use a clean grouped bar chart.

### Recommended Chart 2 — Feature Engagement

Illustrative values:

```text
Market Insights     46%
Stock Alerts        52%
Stock Fundamentals  38%
Trading Journey     31%
```

Use a horizontal bar chart.

### Chart Animation

- Bars grow from zero to their final value.
- Line charts draw from left to right.
- Data labels fade in after the primary chart animation.
- Tooltips appear on hover/focus.
- Animation duration: `700–1000ms`.
- Do not animate chart data continuously.

### Chart Style

- Background should remain transparent or use the card surface.
- Use Blue as the primary series.
- Use Emerald for positive/outcome series.
- Use Cyan only as a secondary series.
- Minimize gridline visual weight.
- Keep labels highly readable.

All metrics in this design specification are illustrative placeholders unless explicitly verified.

---

## 10. Experience Section

### Layout

Use a timeline-based experience layout.

### 360 One WAM

**Product Manager**  
**1 Year 10 Months**

Product domains:

- Trading
- Broking
- Demat
- HNI onboarding
- Market intelligence
- Stock research
- Stock alerts
- Account management

### Interaction

When the experience card enters the viewport:

1. Timeline line draws vertically.
2. Company marker appears.
3. Role/title fades upward.
4. Responsibilities reveal in small groups.

Do not animate every bullet individually if it makes the section slow to scan.

---

## 11. Product Areas

Use six interactive product cards:

### Trading Platform

NSE, BSE, Intraday, Delivery, MTF, AMO, order types, margin and brokerage visibility.

### Digital KYC & HNI Onboarding

Automated onboarding with CDSL, NSE, BSE, OMS and back-office integrations.

### Market Intelligence

Corporate actions, IPOs, announcements, bulk/block deals, FII/DII movement and market news.

### Stock Research

Yearly, quarterly, standalone, consolidated performance and shareholding patterns.

### Stock Alerts

Price and percentage-based alerts for NSE/BSE cash-segment stocks with push notifications.

### Account Management

Broking/demat details, account-opening information and account-freeze journey.

### Card Animation

On hover:

- Slight lift
- Icon moves subtly
- Accent border appears
- Supporting content remains stable

---

## 12. Featured Case Studies

Each case study should follow the same storytelling framework:

1. Problem
2. Goal
3. My Role
4. Approach
5. Solution
6. Integrations
7. Outcome
8. PM Takeaway

### Case Study List

1. Digital HNI Onboarding
2. Multi-Exchange Order Placement
3. Stock Alerts
4. Stock Fundamentals
5. Market Intelligence Dashboard
6. Account Freeze Journey

### Case Study Reveal

Use staggered section reveals:

```text
Problem → Goal → Approach → Solution → Outcome
```

The outcome section should have the strongest visual emphasis.

### Outcome Banner

Use:

- Large metric
- Short outcome statement
- Small explanatory text
- Subtle Emerald/Blue accent

### PM Takeaway

Use a left accent border:

`border-left: 4px solid #3B82F6`

Animate the accent line from `0% → 100%` when the takeaway enters the viewport.

---

## 13. Product Process

Visualize the product process as a connected journey:

```text
01 Discover
      ↓
02 Define
      ↓
03 Prioritize
      ↓
04 Design
      ↓
05 Build
      ↓
06 Validate
      ↓
07 Measure
```

### Animation

As the user scrolls:

- Each step fades in.
- Connecting line progressively fills.
- Active step receives a subtle blue glow.
- Avoid infinite animation.

---

## 14. Technical Toolkit

Organize skills into six categories.

### Product Management

Product Strategy, Roadmapping, PRD, BRD, User Stories, User Story Mapping, Sprint Management, Benchmarking.

### UX

Figma, FigJam, Wireframing, User Journey Mapping, UI/UX Optimization.

### Capital Markets

Broking, Demat, NSE, BSE, HNI Investing, MTF, Intraday, Delivery, Market Data.

### APIs & Integration

REST APIs, Postman, CMOTS APIs, Omnesys APIs, OMS Integration, CDSL Integration.

### QA

Functional Testing, Integration Testing, Regression Testing, STLC, Defect Lifecycle, Selenium, Jira, Mantis.

### Product / AI Tools

Jira, Confluence, Figma, FigJam, Whimsical, Lovable, n8n, Figma Make.

### Skill Tag Animation

Tags can appear with a subtle stagger on first viewport entry.

Do not continuously animate skill tags.

---

## 15. Success Metrics Dashboard

Create a premium analytics-style section.

### Product Impact

`+42%` Digital onboarding completion  
`-68%` Manual operational dependency  
`+31%` Trading journey adoption  
`+46%` Market intelligence engagement

### Customer Experience

`-55%` Journey completion time  
`-24%` Account-related support queries  
`+52%` Stock-alert engagement

### Product Quality

`-35%` Production defect rate  
`+28%` Illustrative test/release quality metric

All figures are placeholders until validated.

### Visual Treatment

Combine:

- Large animated number
- Mini sparkline or chart
- Short description
- Small category label

---

## 16. Testimonials

Use 2–3 cards after real testimonials are available.

Placeholder structure:

> “Testimonial about product ownership, collaboration, problem-solving and execution.”

Include:

- Name
- Role
- Company

Avoid fake testimonials in the published version.

---

## 17. Certifications & Education

### Certifications

**Product Management**  
NEXT Leap Institution

**QA Analyst**  
Q-Spider Institution

### Education

**BE — Mechanical Engineering**  
Mumbai University · 2019

Use subtle card hover and certificate thumbnail placeholders.

---

## 18. Product Thinking / Insights

Create four editorial cards:

### Designing for Trust in Financial Products

How transparency around margin, brokerage, account status and financial information affects confidence.

### Simplifying Complex Financial Journeys

How complex backend systems can be translated into simple customer experiences.

### From Feature to Habit

How stock alerts can create recurring engagement.

### Quality is a Product Responsibility

How a QA background improves requirements, edge-case thinking, acceptance criteria and release quality.

---

## 19. Final CTA

### Headline

**Have a product problem worth solving? Let's talk.**

### Supporting Copy

I’m interested in building products that simplify complex problems, create measurable business value, and deliver better customer experiences.

### Buttons

**Get in Touch**

**View LinkedIn**

### CTA Animation

- Background uses a very subtle animated gradient.
- Primary CTA lifts `2px` on hover.
- Arrow moves `3–4px`.
- Border/glow transitions smoothly.
- Do not use flashing effects.

---

## 20. Footer

Include:

- Name / monogram
- Product Manager · Capital Markets & FinTech
- LinkedIn
- Email
- Resume
- Copyright

Keep the footer visually quiet.

---

## 21. Responsive Behavior

### Desktop > 1024px

- 2–4 column grids
- Split hero
- Sticky navigation
- Full case-study layouts
- Charts beside supporting content where appropriate

### Tablet 768–1024px

- 2-column grids
- Reduced section padding
- Collapsible navigation
- Charts become full-width when necessary

### Mobile < 768px

- Single-column layouts
- Full-width CTAs
- Minimum tap target: `48px`
- Reduced heading scale
- Horizontal scrolling must never occur
- Charts should resize without clipping
- Case studies become vertical narratives

---

## 22. Accessibility & Reduced Motion

### Required

- WCAG AA contrast.
- Visible keyboard focus states.
- Semantic HTML.
- Buttons must have accessible labels.
- Charts must have textual summaries.
- Do not rely on color alone to communicate meaning.
- Support `prefers-reduced-motion`.

### Reduced Motion

When reduced motion is requested:

- Disable number counting animation.
- Disable floating dashboard animation.
- Disable chart drawing animations.
- Disable staggered reveals.
- Keep content immediately visible.
- Preserve hover/focus states where they improve usability.

---

## 23. Animation Timing Reference

| Interaction | Duration | Easing |
|---|---:|---|
| Text reveal | 500–700ms | Ease-out |
| Card reveal | 500–700ms | Ease-out |
| Metric counter | 900–1200ms | Ease-out |
| Bar chart | 700–1000ms | Ease-out |
| Line chart | 900–1200ms | Ease-out |
| CTA hover | 180–250ms | Ease-out |
| Card hover | 200–300ms | Ease-out |
| Navigation transition | 250–350ms | Ease-out |
| Case-study accent | 600–800ms | Ease-out |

---

## 24. Micro-interaction Rules

### Buttons

Hover:
- Slight upward movement
- Shadow/glow
- Icon movement

Focus:
- Strong visible outline

Active:
- Slight scale-down

### Cards

Hover:
- Maximum `4px` lift
- Subtle border change
- No aggressive zoom

### Links

Hover:
- Color transition
- Underline or accent indicator

### Charts

Hover:
- Highlight relevant data
- Display tooltip
- Avoid distracting animations

---

## 25. Visual Asset Direction

Use dummy assets initially:

- Professional portrait placeholder
- Trading dashboard placeholder
- Onboarding UI placeholder
- Stock fundamentals placeholder
- Market intelligence placeholder
- Stock alert placeholder
- Certificate placeholders

Images should use consistent:

- Rounded corners
- Subtle borders
- Soft shadows
- Dark FinTech treatment

Avoid generic stock photography where possible.

---

## 26. Final Page Architecture

```text
HEADER
  ↓
HERO
  ↓
IMPACT SNAPSHOT
  ↓
IMPACT CHARTS
  ↓
ABOUT / PRODUCT PHILOSOPHY
  ↓
EXPERIENCE
  ↓
PRODUCT AREAS
  ↓
FEATURED CASE STUDIES
  ↓
PRODUCT PROCESS
  ↓
SUCCESS METRICS
  ↓
TECHNICAL TOOLKIT
  ↓
PRODUCT THINKING
  ↓
CERTIFICATIONS + EDUCATION
  ↓
TESTIMONIALS
  ↓
FINAL CTA
  ↓
FOOTER
```

---

## 27. Design Principle

The portfolio should ultimately communicate one clear message:

> **I don't just define requirements. I understand the business problem, translate it into product experiences, collaborate with design and engineering, validate the implementation, and think about measurable outcomes.**

The combination of Product Management + QA + Capital Markets expertise should be positioned as a differentiator rather than as two separate career identities.
