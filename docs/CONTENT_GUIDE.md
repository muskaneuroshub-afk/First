# Beginner's Content Management Guide

Welcome! This guide explains how to edit every piece of text, project, photo, and link on your website without touching complex React code. All personal content is stored in clean, editable TypeScript files inside `src/data/` or asset files in `public/`.

---

## 1. Quick Reference: Where to Edit What

| Content Item | File to Edit | Key Fields to Update |
| :--- | :--- | :--- |
| **Your Name, Title & Bio** | `src/data/site.ts` | `name`, `title`, `roles`, `bioShort` |
| **Email & Location** | `src/data/site.ts` | `email`, `location`, `whatsappNumber` |
| **Social Media Links** | `src/data/site.ts` | `socialLinks` array |
| **Profile Photo / Avatar** | `public/images/` | Replace `avatar-placeholder.svg` with your photo |
| **About Story & Goals** | `src/data/about.ts` | `intro`, `background`, `highlights`, `goals`, `interests` |
| **Skills & Tooling** | `src/data/skills.ts` | `skillsData` and `skillCategories` |
| **Projects & Portfolio** | `src/data/projects.ts`| `projectsData` array |
| **Project Screenshots** | `public/images/projects/` | Drop screenshots (`.webp`, `.png`, or `.svg`) |
| **Career History (Timeline)** | `src/data/experience.ts` | `experienceData` array |
| **Services & Offerings** | `src/data/services.ts` | `servicesData` array (set `confirmed: true`) |
| **Resume Summary & PDF** | `src/data/resume.ts` | `pdfPath`, `pdfAvailable`, `summary`, `highlights` |
| **CV PDF Document** | `public/resume/` | Place your CV PDF file here (e.g. `my-cv.pdf`) |
| **Certifications** | `src/data/certifications.ts` | Uncomment and fill `certificationsData` |
| **Client Testimonials** | `src/data/testimonials.ts` | Uncomment and fill `testimonialsData` |
| **Navigation Menu Links** | `src/data/navigation.ts` | `navigationLinks` array |
| **SEO & Social Share Image** | `src/data/site.ts` & `public/`| `seo` object in `site.ts` and `public/og-image.svg` |
| **Theme Colors & Tokens** | `src/styles/tokens.css` | Light and dark mode hex color variables |

---

## 2. Copy-Paste Code Examples

### A. How to Add a New Project
Open `src/data/projects.ts` and add a new object to the `projectsData` array:

```typescript
{
  id: 'my-custom-project',
  title: 'Realtime Task Collaboration App',
  shortDescription: 'Collaborative task planner with instant sync, drag-and-drop boards, and dark mode.',
  fullDescription: 'A production web app designed for agile teams. Features WebSocket sync, optimistic UI updates, and accessible drag-and-drop interactions.',
  category: 'Web Applications',
  technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  thumbnailUrl: '/images/projects/project-1.svg', // Or '/images/projects/my-screenshot.png'
  demoUrl: 'https://my-live-demo.com',
  sourceUrl: 'https://github.com/my-username/my-project',
  featured: true, // Set to true to highlight this project first
  role: 'Frontend Architect',
  challenges: 'Synchronizing board state between multiple concurrent clients with zero flicker.',
  outcomes: 'Achieved sub-50ms synchronization across WebSockets and 98 Lighthouse performance.',
  isPlaceholder: false, // Set to false once it is your real project
},
```

> **Note on buttons**: If your project is private or does not have a live demo, simply omit `demoUrl` or `sourceUrl` (or set them to `undefined`). The website will automatically render an honest disabled button with an explanatory tooltip instead of a broken link!

---

### B. How to Add a New Skill
Open `src/data/skills.ts` and add an item to `skillsData`:

```typescript
{
  name: 'GraphQL & Apollo Client',
  category: 'frontend', // Matches an id in skillCategories
  icon: 'Layers',       // Any Lucide icon name
  level: 85,            // Optional (0-100). Remove this line if you do not want to show a proficiency meter!
  isPlaceholder: false,
},
```

---

### C. How to Add an Experience Timeline Entry
Open `src/data/experience.ts` and add an item to `experienceData`:

```typescript
{
  id: 'exp-acme-corp',
  company: 'Acme Corporation',
  companyUrl: 'https://acme.example.com',
  jobTitle: 'Senior Frontend Engineer',
  employmentType: 'Full-time',
  startDate: '2022',
  endDate: 'Present',
  responsibilities: [
    'Spearheaded the migration from legacy monolithic views to modular React components.',
    'Partnered with product and design teams to standardize accessible UI design tokens.',
  ],
  achievements: [
    'Cut initial dashboard load times by 35% through bundle optimization and lazy loading.',
    'Recognized with the 2023 Engineering Excellence Award.',
  ],
  isPlaceholder: false,
},
```

---

### D. How to Replace Your Profile Image
1. Prepare a photo of yourself (recommended: square aspect ratio, e.g., 600x600px in `.png`, `.jpg`, or `.webp`).
2. Save it to `public/images/profile-photo.jpg`.
3. Open `src/data/about.ts` and update:
   ```typescript
   avatarUrl: '/images/profile-photo.jpg',
   avatarAlt: 'Portrait of Jane Doe',
   ```
4. Also open `src/components/sections/Hero.tsx` and ensure the `<img>` src matches `/images/profile-photo.jpg`.

---

### E. How to Update Your CV PDF
1. Export your resume as a PDF file.
2. Save it to `public/resume/jane-doe-resume.pdf`.
3. Open `src/data/resume.ts` and update:
   ```typescript
   export const resumeConfig: ResumeData = {
     pdfPath: '/resume/jane-doe-resume.pdf',
     pdfAvailable: true,
     lastUpdated: 'November 2026',
     summary: '...',
     highlights: [ ... ],
   };
   ```
4. Now, whenever visitors click **"Download CV"**, the browser will download your real PDF file.

---

## 3. What Happens When Sections Are Left Empty?

This website is designed with **data integrity guards**:
- **Certifications**: Ships with an empty array in `src/data/certifications.ts`. As a result, the Certifications section is **automatically hidden** from the website. No empty containers or broken cards are rendered. Once you uncomment or add at least one certification, the section will appear automatically.
- **Testimonials**: Ships with an empty array in `src/data/testimonials.ts`. The Testimonials carousel is **automatically hidden** until you add authentic testimonials.
- **WhatsApp**: If `whatsappNumber` in `src/data/site.ts` is empty `""`, the WhatsApp link is completely omitted from the contact card.
- **Services**: Each service has a `confirmed` field. If `confirmed: false`, it displays an "Unconfirmed Offering" badge. Once you set `confirmed: true`, the badge disappears.

