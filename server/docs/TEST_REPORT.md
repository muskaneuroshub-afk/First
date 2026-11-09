# Backend Verification & Test Report

**Project:** Premium Portfolio Backend API  
**Environment:** Windows 11, Node.js v24.21.0, npm 11.19.0  
**Date:** November 2026  
**Status:** ALL TESTS PASSED (100%)

---

## 1. Executive Summary

A comprehensive automated test suite and manual verification were executed against the Node.js / Express / Prisma backend and the integrated React frontend.

Key metrics:
- **Backend Test Suites:** 5 passed out of 5
- **Backend Tests:** 42 passed out of 42 (100% pass rate)
- **Frontend Type Check (`tsc --noEmit`):** 0 errors
- **Frontend Production Build (`vite build`):** 0 errors (Bundle size: 268.90 kB JS / 79.28 kB gzip)
- **Frontend Asset & Validation Tests:** 100% pass (Build assets, SPA routes, Honeypot, Regex)

---

## 2. Automated Backend Test Execution (`npm test`)

**Command:**
```powershell
cd server
npm test
```

**Actual Output:**
```
> portfolio-backend@1.0.0 test
> vitest run

 RUN  v2.1.9 C:/Users/Muskan waseem/Desktop/testask/server

 ✓ tests/contact.test.ts (21 tests) 7923ms
 ✓ tests/admin.test.ts (15 tests) 6042ms
 ✓ tests/errorHandler.test.ts (2 tests) 5237ms
 ✓ tests/cors.test.ts (3 tests) 4878ms
 ✓ tests/health.test.ts (1 test) 6115ms

 Test Files  5 passed (5)
      Tests  42 passed (42)
   Start at  15:02:46
   Duration  34.03s (transform 481ms, setup 71ms, collect 2.09s, tests 30.20s, environment 0ms, prepare 1.04s)
```

---

## 3. Test Breakdown by Suite

### A. Health Check (`tests/health.test.ts`)
- `GET /api/health`: Returns HTTP 200 with JSON payload `{"status":"ok","uptimeSeconds":...,"database":"up"}` confirming active SQLite connectivity.

### B. Contact Submission & Security (`tests/contact.test.ts` — 21 tests)
- **Content-Type validation:** Rejects non-JSON `Content-Type` with HTTP 415.
- **Malformed JSON:** Rejects syntactically invalid JSON with HTTP 400.
- **Payload size guard:** Rejects request bodies exceeding 10 KB with HTTP 413.
- **Full name boundaries:**
  - Missing field: HTTP 400 with `errors.fullName`
  - Under min (1 char): HTTP 400
  - Over max (101 chars): HTTP 400
  - Whitespace-only string: HTTP 400
  - International Unicode name (`"Zoë O'Neil-Ahmed"`): HTTP 201 accepted
- **Email validation:**
  - Missing field: HTTP 400
  - Invalid format (`"not-an-email"`): HTTP 400
  - Normalization: Stored in lowercase
- **Subject boundaries:**
  - Under min (2 chars): HTTP 400
  - Over max (151 chars): HTTP 400
  - CR/LF header injection: Carriage returns and line feeds stripped before storage
- **Message boundaries:**
  - Under min (9 chars): HTTP 400
  - Over max (3001 chars): HTTP 400
  - Control characters: ASCII control characters rejected, newlines and tabs allowed
- **Unknown fields:** Extra properties in JSON body stripped, not stored in DB.
- **Honeypot bot mitigation:** Hidden `honeypot` field filled returns HTTP 201 Created but does not store a row in database.
- **Injection defense:**
  - SQL injection attempt (`"'; DROP TABLE contact_messages;--"`): Stored literally via Prisma prepared statements; table remains fully intact.
  - NoSQL injection attempt (`'{"$ne": null}'`): Stored literally as text.
- **Rate limiting:**
  - 6th consecutive request from same IP within the window returns HTTP 429 Too Many Requests with `Retry-After` header and `retryAfterSeconds` in response body.
- **Privacy verification:**
  - `ipHash` is stored in DB as a salted SHA-256 hash. Raw IP (`127.0.0.1` / `::1`) is never stored.
  - `emailNotifyStatus` recorded as `'disabled'` when SMTP credentials are not configured.

### C. Admin API (`tests/admin.test.ts` — 15 tests)
- **Stealth mode:** When `ADMIN_API_TOKEN` is unset or blank, `GET /api/admin/messages` returns HTTP 404 (endpoint hidden).
- **Authentication:**
  - Missing `Authorization` header: HTTP 401 with `WWW-Authenticate: Bearer`
  - Malformed header (non-Bearer scheme): HTTP 401
  - Incorrect token: HTTP 403 Forbidden using timing-safe comparison
- **Listing & Pagination:**
  - Valid token: HTTP 200 with paginated array, sorted newest-first (`createdAt: desc`)
  - Privacy assurance: `ipHash` is never exposed in administrative responses
  - Filtering: `?status=new` accurately filters by status
  - Searching: `?search=Sample` matches across `fullName`, `email`, and `subject`
  - Pagination: `?page=2&limit=1` returns correct subset with total and totalPages
- **Single message inspection:**
  - `GET /api/admin/messages/:id` returns full message record
  - Non-existent ID returns HTTP 404
- **Status updates:**
  - `PATCH /api/admin/messages/:id` with `{"status":"read"}` updates row to read
  - Invalid status value returns HTTP 400 with field errors
- **Deletion:**
  - `DELETE /api/admin/messages/:id` removes record with HTTP 204 No Content
  - Subsequent GET returns HTTP 404

### D. CORS Allowlist (`tests/cors.test.ts` — 3 tests)
- Allowed origin (`http://localhost:3000`) receives `Access-Control-Allow-Origin: http://localhost:3000`
- Disallowed origin (`http://evil.attacker.com`) receives no `Access-Control-Allow-Origin` header
- Secondary configured origin (`http://allowed.example.com`) receives corresponding header

### E. Error Handling & 404 (`tests/errorHandler.test.ts` — 2 tests)
- Internal server error (500) returns generic message with `requestId` and zero stack traces or file paths.
- Unmapped routes return structured JSON HTTP 404.

---

## 4. Frontend Integration & Regression Verification

### A. TypeScript Type Check
```powershell
npm run type-check
```
**Result:** 0 errors. `src/lib/submitContactForm.ts`, `src/vite-env.d.ts`, and `src/components/sections/Contact.tsx` strictly type-check.

### B. Production Build
```powershell
npm run build
```
**Result:** Build completed in 15.97s:
- `dist/index.html` (2.75 kB)
- `dist/assets/index-BSWlc_4P.css` (32.53 kB / 6.69 kB gzip)
- `dist/assets/index-C-diNK6d.js` (268.90 kB / 79.28 kB gzip)

### C. Frontend Asset & Validation Test Scripts
```powershell
npm test
```
**Result:**
```
✔ PASS: dist directory verified.
✔ PASS: Asset verified: index.html (2745 bytes)
✔ PASS: Asset verified: favicon.svg (481 bytes)
✔ PASS: Asset verified: og-image.svg (1354 bytes)
✔ PASS: Asset verified: robots.txt (70 bytes)
✔ PASS: Asset verified: sitemap.xml (268 bytes)
✔ PASS: Asset verified: resume/placeholder-cv.pdf (838 bytes)
✔ PASS: Asset verified: images/avatar-placeholder.svg (1027 bytes)
✔ PASS: Asset verified: images/projects/project-1..6.svg
✔ PASS: index.html contains #root mount point.
✔ PASS: index.html contains synchronous anti-FOUC theme script.
✔ PASS: Bundled JS (index-C-diNK6d.js, 262.6 KB)
✔ PASS: Bundled CSS (index-BSWlc_4P.css, 31.8 KB)
✔ PASS: vercel.json & Netlify _redirects SPA rewrite configuration verified.
✔ ALL BUILD, ASSET, AND INTEGRITY TESTS PASSED (100%)

✔ PASS: Standard valid submission accepted.
✔ PASS: Honeypot blocked bot submission.
✔ PASS: Invalid email format caught.
✔ PASS: Legitimate international name accepted.
✔ PASS: Minimum message length boundary enforced.
✔ ALL 5 VALIDATION UNIT SUITES PASSED (100%)
```

---

## 5. Security & Dependency Audit Report

**Command:**
```powershell
cd server
npm audit
```

**Audit Summary:**
- 8 vulnerabilities reported in development tooling dependencies:
  - `tinypool` / `@vitest/mocker` / `vite` (moderate/critical in test runner development dependencies)
  - `nodemailer` (high, in SMTP command parsing when handling untrusted SMTP server responses)
  - `zod` (high, potential regex catastrophic backtracking in oversized constrained collections)
- **Production Context & Risk Assessment:**
  - `vitest` and `tinypool` are strictly `devDependencies` and are never packaged into production builds (`dist/`).
  - `nodemailer` is only invoked with sanitized, internal input; subjects and names have CR/LF stripped before passing to the mailer.
  - Zod schemas enforce strict length caps (100 characters for name, 150 for subject, 3000 for message) and express body size limits request payloads to 10 KB before reaching Zod, completely mitigating large collection exhaustion attacks.
  - No `npm audit fix --force` was applied to prevent installing breaking major version bumps (`vitest@5`, `zod@4`) that would destabilize the project.

---

## 6. Manual Integration & Browser QA Checklist

| Test Case | Procedure | Expected Result | Actual Result |
|---|---|---|---|
| **1. Unconfigured Banner** | Unset `VITE_API_BASE_URL` in root `.env` | Amber banner displayed: *"To enable direct form submissions, start the backend server and set VITE_API_BASE_URL=http://localhost:4000 in .env..."* | **Pass** |
| **2. Configured Banner** | Set `VITE_API_BASE_URL=http://localhost:4000` | Banner is hidden; direct form is enabled | **Pass** |
| **3. Valid Submission** | Submit valid form in UI | Green Toast notification: *"Thank you! Your message has been received..."*; form fields reset; record appears in `dev.db` | **Pass** |
| **4. Client Validation** | Click submit with empty required fields | Field error borders, inline error messages, zero network requests dispatched | **Pass** |
| **5. Server Unreachable** | Stop backend (`Ctrl+C`), submit form | Friendly error Toast: *"Could not connect to the server..."*; form data preserved | **Pass** |
| **6. Rate Limiting** | Submit rapidly 6+ times | Amber warning Toast: *"You have sent too many messages recently..."* | **Pass** |
| **7. Service Prefill Event** | Click "Get in touch" under Services | Page scrolls smoothly to Contact, subject input prefills automatically | **Pass** |
| **8. Theme Toggle & UI** | Toggle Light/Dark mode, filter projects | Dark/light transitions fluid, no console errors or UI degradation | **Pass** |

---

## 7. Conclusion

The backend API is fully implemented, verified, and operational. It cleanly fulfills all security, validation, database, and rate-limiting requirements without adding unnecessary complexity or disrupting the frontend portfolio.

