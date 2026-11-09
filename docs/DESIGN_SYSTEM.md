# Design System & Visual Specification

This document provides a comprehensive technical overview of the design system, design tokens, typography scale, accessibility standards, component states, and motion principles for the Personal Portfolio Website.

---

## 1. Design Philosophy

- **Sophistication & Clarity**: Pure black foundation (`#000000`), pure white primary accents, elegant gray midtones, and a focused visual hierarchy that directs emphasis toward projects and skills.
- **Accessibility by Default**: Built to conform strictly to WCAG 2.1 Level AA and AAA standards, guaranteeing that contrast, interactive tap targets, focus management, and screen reader announcements function seamlessly.
- **Single Token Surface**: All UI components utilize CSS Custom Properties (Design Tokens) to deliver a zero-friction light/dark mode switch without duplicating styling classes or HTML tags.

---

## 2. Color System & Contrast Validation

### Token Mapping (Pure Black Dark Mode & Monochrome Light Mode)

| Token Name | Light Theme Value (Monochrome) | Dark Theme Value (Pure Black Default) | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#ffffff` | `#000000` | Viewport primary foundation |
| `--bg-secondary` | `#f5f5f5` | `#0a0a0a` | Alternating section backgrounds & wells |
| `--bg-card` | `#ffffff` | `#111111` | Interactive cards, modal surfaces |
| `--bg-card-hover`| `#f0f0f0` | `#1a1a1a` | Elevated card hover state |
| `--bg-glass` | `rgba(255,255,255,0.85)` | `rgba(0,0,0,0.80)` | Blurred sticky header backdrop |
| `--text-primary` | `#0a0a0a` | `#ffffff` | Headings, hero greeting, primary labels |
| `--text-secondary`| `#404040` | `#d4d4d4` | Body copy, descriptions, article text |
| `--text-muted` | `#666666` | `#a3a3a3` | Metadata, timestamps, helper text |
| `--primary` | `#0a0a0a` | `#ffffff` | Primary CTA buttons, badges, active states |
| `--primary-hover`| `#262626` | `#e5e5e5` | Interactive hover state for primary elements |
| `--primary-foreground`| `#ffffff` | `#000000` | High-contrast text on primary elements |
| `--primary-subtle`| `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.08)` | Subtle accent backgrounds |
| `--accent` | `#404040` | `#d4d4d4` | Secondary text, borders, decorative elements |
| `--border` | `#e5e5e5` | `#262626` | Hairline card boundaries, dividers |
| `--border-hover` | `#d4d4d4` | `#404040` | Card hover outline, interactive element hover |
| `--border-strong`| `#8a8a8a` | `#666666` | Form control default borders (WCAG 1.4.11 ≥3:1) |
| `--ring` | `#0a0a0a` | `#ffffff` | High-visibility accessible focus ring |
| `--status-success`| `#16a34a` | `#22c55e` | Success toasts, verified credentials, availability badge |
| `--status-error` | `#dc2626` | `#ef4444` | Form validation errors, critical status warnings |
| `--status-warning`| `#d97706` | `#f59e0b` | Unconfigured placeholder warnings |

### WCAG Contrast Ratios

#### Dark Mode (Pure Black `#000000` Foundation):
- **Primary Text (`#ffffff`) on Black**: **21:1** (WCAG AAA passes, threshold 7:1).
- **Secondary Text (`#d4d4d4`) on Black**: **12.6:1** (WCAG AAA passes).
- **Muted Text (`#a3a3a3`) on Black**: **7.5:1** (WCAG AAA passes).
- **Form Borders (`--border-strong: #666666`) against Black**: **3.5:1** (WCAG 1.4.11 UI Boundary requirement ≥ 3:1 passes).
- **Primary Button**: Black text (`#000000`) on White (`#ffffff`) = **21:1** (WCAG AAA passes).
- **Semantic Success (`#22c55e`) on Black**: **8.0:1** (WCAG AAA passes).
- **Semantic Error (`#ef4444`) on Black**: **4.5:1** (WCAG AA passes).
- **Semantic Warning (`#f59e0b`) on Black**: **8.1:1** (WCAG AAA passes).

#### Light Mode (White `#ffffff` Foundation):
- **Primary Text (`#0a0a0a`) on White**: **19.8:1** (WCAG AAA passes).
- **Secondary Text (`#404040`) on White**: **9.3:1** (WCAG AAA passes).
- **Muted Text (`#666666`) on White**: **5.7:1** (WCAG AA passes).
- **Form Borders (`--border-strong: #8a8a8a`) against White**: **3.4:1** (WCAG 1.4.11 UI Boundary ≥ 3:1 passes).

---

## 3. Typography Scale

The typography pairing combines **Inter** and **Plus Jakarta Sans** for crisp, legible UI copy and display headings. Loaded with `font-display: swap` to prevent FOIT (Flash of Invisible Text).

| Element | Fluid Size (`clamp`) | Line Height | Tracking | Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | `text-4xl sm:text-6xl lg:text-7xl` | 1.1 | `-0.025em` | 800 (Extrabold) |
| **Section Heading (H2)** | `clamp(1.75rem, 3.5vw, 2.5rem)` | 1.2 | `-0.02em` | 700 (Bold) |
| **Card / Modal Title (H3)**| `clamp(1.125rem, 2vw, 1.35rem)` | 1.3 | `-0.015em` | 700 (Bold) |
| **Subheadings / Lead** | `clamp(1rem, 1.5vw, 1.125rem)` | 1.625 | `normal` | 400 (Regular) |
| **Body Copy** | `1rem` (`16px`) | 1.625 | `normal` | 400 (Regular) |
| **Captions & Meta** | `0.75rem` (`12px`) | 1.5 | `+0.025em` | 500 (Medium) |
| **Code / Monospace** | `0.875rem` (`14px`) | 1.5 | `normal` | 400 (Regular) |

---

## 4. Spacing, Elevation & Sizing

- **Container Widths**:
  - `sm`: 768px (Centered articles, 404, confirmation cards)
  - `md`: 1024px (Resume, About summary)
  - `lg`: 1280px (Standard grid containers)
  - Horizontal padding: `1rem` on mobile, `1.5rem` on tablet, `2rem` on desktop.
- **Section Padding**: `py-20` (80px top and bottom) for generous vertical cadence.
- **Section Heading Offset**: `scroll-margin-top: 5rem` (`80px`), ensuring anchored smooth-scroll targets clear the sticky navigation header.
- **Touch Target Requirement**: All buttons, inputs, links, and tabs have a minimum hit area of `44x44px`.
- **Border Radius Scale**:
  - Badges / Tag chips: `9999px` (Full pill)
  - Buttons & Inputs: `8px` (`0.5rem`)
  - Cards & Modals: `12px` to `16px` (`0.75rem` to `1rem`)
- **Shadow Scale**:
  - `shadow-subtle`: `0 1px 3px rgba(0,0,0,0.1)`
  - `shadow-card`: `0 4px 6px -1px rgba(0,0,0,0.2)`
  - `shadow-elevated`: `0 10px 25px -5px rgba(0,0,0,0.3)`
  - `shadow-glow`: `0 0 24px -6px rgba(255,255,255,0.10)` (subtle white luminescence)

---

## 5. Component Patterns & Hover Principles

### 1. Minimal Elegant Hover Rules
- Transitions are standard 150ms to 250ms ease.
- Hover changes are expressed via grayscale value shifts:
  - Surface step: `bg-bg-card` (`#111111`) to `bg-bg-card-hover` (`#1a1a1a`).
  - Border lightening: `border-border` (`#262626`) to `border-border-hover` (`#404040`).
  - Text shift: `text-text-secondary` (`#d4d4d4`) to `text-text-primary` (`#ffffff`).
- Focus rings are 2px solid white (`var(--ring)`) with ring-offset set to `var(--bg-primary)` (`#000000`), eliminating white gaps on black backgrounds.

### 2. Buttons (`Button.tsx`)
- **Primary**: Pure white background (`#ffffff`) with deep black text (`#000000`). On hover: light gray (`#e5e5e5`).
- **Secondary**: Elevated dark card surface (`#111111`) with hairline border (`#262626`). On hover: `#1a1a1a` and `#404040` border.
- **Outline**: Pure white border and white text. On hover: fills pure white with black text.
- **Ghost**: Minimalist text button with hover highlight.

### 3. Modals & Dialogs (`Modal.tsx`)
- Backdrop: `bg-black/75` with backdrop blur (`backdrop-blur-sm`), creating strong contrast separation against a pure black page.
- Focus trap strictly maintained via `useFocusTrap`.
