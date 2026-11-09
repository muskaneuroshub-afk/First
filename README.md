# Premium Personal Portfolio Website

A modern, high-performance, fully accessible Personal Portfolio Website built with React 18+, Vite, TypeScript, and Tailwind CSS. Designed specifically so anyone can customize, maintain, and deploy it using simple edits and AI pair-programming assistance.

---

## ⚡ First 30 Minutes Quick-Start Checklist

If you are a beginner looking to get your portfolio customized and launched quickly, follow these steps in order:

- [ ] **Step 1: Install Dependencies**
  ```bash
  npm install
  ```
- [ ] **Step 2: Start the Local Development Server**
  ```bash
  npm run dev
  ```
  Open `http://localhost:3000` in your web browser. You will see the live website!
- [ ] **Step 3: Update Your Title & Contact Information**
  Open `src/data/site.ts` (name is set to Muskan Waseem) and update `[Your Professional Title]`, email, and social links with your genuine info. Set `isPlaceholder: false`.
- [ ] **Step 4: Update Your Profile Story**
  Open `src/data/about.ts` and customize your background paragraphs, career goals, and core interests.
- [ ] **Step 5: Replace the Profile Photo**
  Drop your picture into `public/images/profile.jpg` and update `avatarUrl` in `src/data/about.ts` and `src/components/sections/Hero.tsx`.
- [ ] **Step 6: Add Your Real Projects**
  Open `src/data/projects.ts` and replace the placeholder projects with your actual work, live demos, and GitHub links.
- [ ] **Step 7: Add Your Resume PDF**
  Save your resume as `public/resume/my-cv.pdf` and set `pdfPath: '/resume/my-cv.pdf'` in `src/data/resume.ts`.
- [ ] **Step 8: Configure the Contact Form**
  Copy `.env.example` to `.env` and add your free Web3Forms access key.
- [ ] **Step 9: Test and Build for Production**
  ```bash
  npm test
  npm run build
  ```
- [ ] **Step 10: Deploy to Vercel or Netlify**
  Follow the simple steps in [docs/DEPLOYMENT.md](file:///c:/Users/Muskan%20waseem/Desktop/testask/docs/DEPLOYMENT.md).

---

## 🚀 Technologies Used & Why

| Technology | Why It Was Chosen |
| :--- | :--- |
| **React 18+** | Industry-standard declarative component architecture with fast virtual DOM rendering and wide hosting support. |
| **Vite** | Instant server start, lightning-fast Hot Module Replacement (HMR), and optimized Rollup production builds. |
| **TypeScript (Strict Mode)** | Prevents runtime bugs, typo errors, and broken data shapes before your code ever runs in a browser. |
| **Tailwind CSS + Design Tokens** | Utility-first styling linked to CSS custom properties (`tokens.css`). Allows both light and dark themes to share the exact same components without code duplication. |
| **Lucide Icons** | Crisp, consistent SVG icons with tree-shaking support to keep the production bundle tiny and fast. |
| **React Router DOM** | Clean single-page application routing (`/` for home and `*` for the custom branded 404 page). |
| **Zero Heavy Animation Bloat** | Native IntersectionObserver and CSS transitions are used instead of heavy runtime animation libraries, keeping JavaScript bundle size ultra-light (only ~79 kB gzipped). |

---

## 📂 Project Folder Structure

```text
├── .env.example          # Template for contact form endpoint and keys
├── .gitignore            # Keeps secret files and dependencies out of Git
├── index.html            # Main HTML page with zero-FOUC theme script
├── package.json          # Project scripts and dependencies
├── tailwind.config.js    # Design token color mappings and animation keyframes
├── tsconfig.json         # Strict TypeScript compiler configuration
├── vite.config.ts        # Vite build tool and development server settings
├── vercel.json           # SPA rewrite configuration for Vercel
├── README.md             # This file
│
├── docs/                 # Detailed documentation guides
│   ├── CONTENT_GUIDE.md  # Where to edit every piece of content
│   ├── DEPLOYMENT.md     # How to deploy to Vercel, Netlify, custom domain
│   ├── DESIGN_SYSTEM.md  # Color palette, contrast ratios, typography scale
│   ├── ADMIN_ROADMAP.md  # How to add a real Supabase/Node backend in the future
│   └── TEST_REPORT.md    # Exhaustive QA test verification checklist
│
├── public/               # Static assets copied directly to build output
│   ├── favicon.svg       # Browser tab icon
│   ├── og-image.svg      # Social media preview card
│   ├── robots.txt        # Search engine indexing directives
│   ├── sitemap.xml       # Search engine site index
│   ├── _redirects        # Netlify & Cloudflare SPA rewrite rules
│   ├── images/           # Avatar and project mockups
│   └── resume/           # Downloadable CV PDF folder
│
├── src/
│   ├── App.tsx           # Router configuration (/ and 404 catch-all)
│   ├── main.tsx          # Application entry point
│   ├── components/
│   │   ├── layout/       # Navbar, MobileMenu, Footer, ThemeToggle, ScrollProgress
│   │   ├── sections/     # Hero, About, Skills, Projects, Experience, Services, Resume, Contact
│   │   └── ui/           # Reusable primitives: Button, Card, Badge, Modal, Carousel, Tabs, Input
│   ├── data/             # THE CONTENT LAYER: Edit your personal data here!
│   │   ├── site.ts       # Name, title, email, social links, SEO
│   │   ├── about.ts      # Bio narrative, highlights, interests, goals
│   │   ├── skills.ts     # Skills categorized with optional levels
│   │   ├── projects.ts   # Projects with categories, tags, and links
│   │   ├── experience.ts # Work timeline entries
│   │   ├── services.ts   # Offerings with confirmation flags
│   │   ├── resume.ts     # CV download configuration & summary
│   │   ├── certifications.ts # Certifications (auto-hidden when empty)
│   │   ├── testimonials.ts   # Testimonials (auto-hidden when empty)
│   │   └── navigation.ts # Header links
│   ├── hooks/            # Custom hooks (useTheme, useScrollSpy, useFocusTrap, etc.)
│   ├── lib/              # Helpers for validation, form submit, and placeholders
│   ├── pages/            # Home.tsx and NotFound.tsx
│   ├── styles/           # tokens.css (CSS variables) and globals.css
│   └── types/            # TypeScript interfaces
└── scripts/              # Automated build and validation test suites
```

---

## 🎨 Content & Placeholder Management

### Strict Policy on Data Integrity
This portfolio adheres to strict ethical standards:
- **Never Fake Metrics**: The `level` percentage on skills is completely optional. If removed, the progress meter is automatically hidden.
- **Auto-Hiding Empty Sections**: Both `certificationsData` and `testimonialsData` ship empty. The website automatically hides those sections until you add genuine entries.
- **Unconfirmed Offerings**: Services default to `confirmed: false` and display a clear "Unconfirmed Offering" badge until you confirm them.
- **Dev-Only Placeholder Banner**: While developing locally, a dismissible badge at the bottom-left shows you which files still contain `[Your Name]` placeholders. This banner is automatically stripped from production builds.

For detailed instructions and copy-paste examples for adding projects and skills, see [docs/CONTENT_GUIDE.md](file:///c:/Users/Muskan%20waseem/Desktop/testask/docs/CONTENT_GUIDE.md).

---

## 📬 Contact Form Setup (Web3Forms or Formspree)

1. Obtain a free access key from [Web3Forms](https://web3forms.com/).
2. Create a `.env` file in the project root:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
   VITE_CONTACT_FORM_ACCESS_KEY=your_key_here
   ```
3. If no key is set, the website honestly displays a "Contact form not configured yet" notice and guides visitors to your direct email and WhatsApp links.

---

## 🛠️ Decisions I Made for You

To make this project as simple, performant, and beginner-friendly as possible, the following architectural choices were made:

1. **Native CSS Variables for Theming instead of Tailwind Classes**: By mapping colors to CSS custom properties (`--bg-primary`, `--primary`), light and dark themes switch with zero runtime overhead or component class duplication.
2. **Synchronous Anti-FOUC Script in `<head>`**: A tiny inline script reads the theme from `localStorage` before the page renders, completely eliminating any "flash of white" when visiting in dark mode.
3. **Single Integration Point for Forms (`src/lib/submitContactForm.ts`)**: All submission handling, network error catching, honeypot bot rejection, and mailto fallback logic is concentrated in one file.
4. **Selective Icon Import Dictionary**: Rather than importing the entire 1,400+ icon library from Lucide, an optimized icon dictionary is used in `src/components/ui/Icon.tsx`, shrinking the JavaScript bundle by over 700 kB!
5. **No Heavy Animation Libraries**: CSS transitions and IntersectionObserver deliver fluid 60fps animations while strictly respecting `prefers-reduced-motion`.

---

## 🧪 Testing & Quality Assurance

Run the automated test suites anytime:

```bash
# Run full integrity tests and form validation unit tests
npm test

# Run TypeScript type checker
npm run type-check

# Run production build
npm run build
```

See [docs/TEST_REPORT.md](file:///c:/Users/Muskan%20waseem/Desktop/testask/docs/TEST_REPORT.md) for the verified test matrix covering keyboard navigation, focus traps, screen readers, and responsiveness.

---

## 🌐 Deploying to Production

See [docs/DEPLOYMENT.md](file:///c:/Users/Muskan%20waseem/Desktop/testask/docs/DEPLOYMENT.md) for full instructions on deploying to **Vercel** (recommended), Netlify, or Cloudflare Pages with custom domains and SSL.

