# Deployment & Hosting Guide

This guide provides step-by-step instructions for deploying your portfolio website to the web with custom domain setup, environment variable configuration, SPA redirects, and performance verification.

---

## 1. Prerequisites & Build Verification

Before deploying, verify that your project builds cleanly without errors:

```bash
# 1. Verify TypeScript types
npm run type-check

# 2. Compile the production bundle
npm run build

# 3. Preview the production build locally
npm run preview
```

Open the preview URL (typically `http://localhost:4173/`) in your browser and confirm that:
- The site renders instantly without console errors.
- Navigation links, modal dialogs, and theme toggling function as expected.
- Download CV triggers file download.

---

## 2. Recommended Hosting: Vercel (Fastest & Easiest for Beginners)

Vercel provides automated deployments, worldwide edge CDN caching, free automated SSL/HTTPS, and zero configuration for Vite React apps.

### Step-by-Step Deployment:
1. Push your code to a GitHub repository (e.g., `https://github.com/your-username/my-portfolio`).
2. Visit [Vercel](https://vercel.com/) and click **Sign Up** (or Log In with GitHub).
3. On the dashboard, click **Add New...** -> **Project**.
4. Select your portfolio repository and click **Import**.
5. In the configuration screen:
   - **Framework Preset**: Vite (detected automatically).
   - **Root Directory**: `./` (default).
   - **Build Command**: `npm run build`.
   - **Output Directory**: `dist`.
6. Expand **Environment Variables** and add:
   - `VITE_CONTACT_FORM_ENDPOINT`: `https://api.web3forms.com/submit`
   - `VITE_CONTACT_FORM_ACCESS_KEY`: *(Your Web3Forms Access Key)*
   - `VITE_SITE_URL`: `https://yourdomain.com`
7. Click **Deploy**. Within 60 seconds, your portfolio will be live at a `*.vercel.app` URL.

> **Note**: A `vercel.json` file is already included in your project root containing SPA rewrite rules, ensuring direct visits to any route (or 404 testing) render correctly.

---

## 3. Alternative Hosting Options

### Option B: Netlify
1. Connect your repository on [Netlify](https://www.netlify.com/).
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Add your environment variables under **Site configuration > Environment variables**.
4. A `public/_redirects` file is pre-configured with `/* /index.html 200` to handle SPA routing.

### Option C: Cloudflare Pages
1. On Cloudflare dashboard, navigate to **Compute (Workers) > Pages > Connect to Git**.
2. Select repository, set Framework preset to **Vite**, build output to `dist`.
3. Configure environment variables in the project settings.

### Option D: GitHub Pages
If using GitHub Pages, install `gh-pages` (`npm install gh-pages --save-dev`), set `base: '/repo-name/'` in `vite.config.ts`, and add `"deploy": "gh-pages -d dist"` to `package.json`.

---

## 4. Setting Up Your Custom Domain (e.g. `yourname.com`)

1. Purchase a domain from Namecheap, Cloudflare Registrar, Google Domains/Squarespace, or Porkbun.
2. In your Vercel/Netlify dashboard, go to **Settings > Domains** and enter your domain name (e.g., `janedoe.dev`).
3. Log in to your domain registrar's DNS settings and add the recommended DNS records:
   - **Type A Record**: `@` pointing to `76.76.21.21` (for Vercel)
   - **Type CNAME Record**: `www` pointing to `cname.vercel-dns.com`
4. Wait 5-30 minutes for DNS propagation. SSL certificates are issued and renewed automatically at no cost.

---

## 5. Setting Up the Contact Form Backend (Web3Forms)

This website uses **Web3Forms** (or Formspree) as the recommended lightweight form service:

1. Visit [Web3Forms](https://web3forms.com/) and enter your personal email address.
2. Check your email inbox to receive your free **Access Key**.
3. For local development:
   - Create a `.env` file in the project root:
     ```env
     VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
     VITE_CONTACT_FORM_ACCESS_KEY=your_actual_access_key_here
     ```
4. For production:
   - Add `VITE_CONTACT_FORM_ENDPOINT` and `VITE_CONTACT_FORM_ACCESS_KEY` to your hosting platform's Environment Variables dashboard.
5. Once configured, submissions on your contact form will land directly in your email inbox!

> **Security Reminder**: Variables prefixed with `VITE_` are public by nature. Web3Forms access keys are specifically engineered for public client-side form submission. Never put private server credentials, database passwords, or payment private keys into `.env` or client code.

---

## 6. Post-Deployment Verification Checklist

After deploying your live website, complete this 5-minute sanity check:
- [ ] Visit homepage in desktop and mobile browsers.
- [ ] Test Dark / Light theme toggle; refresh to verify theme persistence.
- [ ] Test Project category filtering and keyword search.
- [ ] Click a project card to open modal; verify `Escape` and arrow keys navigate projects.
- [ ] Click **Download CV** and confirm the PDF downloads successfully.
- [ ] Submit a test message through the Contact Form; verify you receive the email.
- [ ] Visit an invalid URL (e.g. `https://yourdomain.com/non-existent-page`) and verify the branded 404 page loads.
- [ ] Run a Google Lighthouse audit on the live URL to verify 90+ scores across all categories.

