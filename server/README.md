# Premium Portfolio — Backend API

A production-grade, secure, and beginner-friendly Node.js / Express / Prisma backend designed for the Premium Portfolio website.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack & Justifications](#tech-stack--justifications)
3. [Architecture & Folder Structure](#architecture--folder-structure)
4. [Windows Setup & Two-Terminal Workflow](#windows-setup--two-terminal-workflow)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Generating Secure Secrets (PowerShell)](#generating-secure-secrets-powershell)
7. [Reading & Managing Contact Messages](#reading--managing-contact-messages)
   - [Method A: Visual Web UI (Prisma Studio)](#method-a-visual-web-ui-prisma-studio)
   - [Method B: Admin REST API (PowerShell Examples)](#method-b-admin-rest-api-powershell-examples)
8. [Configuring Email Notifications (SMTP)](#configuring-email-notifications-smtp)
9. [Automated Testing](#automated-testing)
10. [Production Deployment Guide](#production-deployment-guide)
11. [Decisions Made for You](#decisions-made-for-you)
12. [Troubleshooting Guide](#troubleshooting-guide)
13. [Possible Future Work](#possible-future-work)

---

## 1. Overview

This backend powers the contact form on your portfolio website and provides a secure, bearer-token-protected administrative API to manage inbound messages.

### Core Capabilities:
- **Contact Form Submission (`POST /api/contact`)**:
  - Enforces strict input validation and character limit guards (2-100 chars for name, 3-150 for subject, 10-3000 for message).
  - CR/LF header injection prevention and control character sanitization.
  - Silent honeypot handling: bot submissions are acknowledged with `201 Created` but never stored or emailed.
  - Rate limiting (default: 5 submissions per 15 minutes per IP).
  - Privacy-preserving IP hashing: IP addresses are salted with `IP_HASH_SALT` and hashed via SHA-256 before storage; raw IPs are never saved or exposed.
  - Asynchronous email notifications: messages are persisted in SQLite first; if email is configured, notification is sent asynchronously without blocking the user response.
- **Health Check (`GET /api/health`)**:
  - Verifies database connectivity with a live query and reports uptime and database status (`200 OK` or `503 Service Unavailable`).
- **Protected Admin API (`/api/admin/messages`)**:
  - Bearer token authentication with timing-safe comparison (`crypto.timingSafeEqual`) to prevent timing attacks.
  - Brute-force lockout (10 failed attempts locks access for 1 hour).
  - Complete 404 stealth mode: if `ADMIN_API_TOKEN` is not configured in `.env`, all admin routes return `404 Not Found` rather than exposing an unauthorized endpoint.
  - Endpoints to list (with status filter and pagination), search, view, update status (`new`, `read`, `replied`, `archived`), and delete messages.
  - The `ipHash` field is stripped from all administrative JSON responses for privacy.

---

## 2. Tech Stack & Justifications

| Technology | Purpose | Why It Was Chosen |
|---|---|---|
| **Node.js 20+** | Runtime environment | Ubiquitous runtime with native ES module support and high performance. |
| **Express 4** | Web framework | Battle-tested, rock-solid stability and zero breaking changes compared to experimental Express 5 RC. |
| **TypeScript (Strict)** | Static typing | Prevents runtime bugs, validates contracts, and ensures clean refactoring. |
| **Prisma ORM** | Database access | Type-safe queries, automatic schema migrations, and zero handwritten raw SQL. Switching from dev SQLite to production PostgreSQL requires changing only 1 line in `schema.prisma`. |
| **SQLite (Dev)** | Database engine | Zero installation required; single-file storage (`dev.db`) makes Windows local setup completely friction-free. |
| **Zod** | Schema validation | Runtime schema validation and sanitization for environment variables and HTTP payloads. |
| **Pino & pino-http** | Logging | High-performance JSON logger. Redacts authorization headers and completely avoids logging request or response bodies. |
| **Helmet** | HTTP security headers | Automatically sets standard security headers (Content Security Policy, X-Frame-Options, DNS prefetch, etc.). |
| **CORS** | Cross-origin resource sharing | Configurable strict allowlist without wildcards (`*`). |
| **express-rate-limit** | Abuse prevention | Protects against spam bots, denial of service, and brute-force credential guessing. |
| **Nodemailer** | Email transport | Reliable SMTP client supporting Gmail, Resend, SendGrid, Amazon SES, and custom SMTP servers. |
| **Vitest & Supertest** | Automated testing | Fast, modern test runner with in-memory execution and integration test fixtures. |

---

## 3. Architecture & Folder Structure

```
server/
├── .env.example              # Template environment variables
├── .gitignore                # Prevents committing secrets, DBs, and dist
├── package.json              # Server dependencies and scripts
├── tsconfig.json             # TypeScript strict configuration
├── vitest.config.ts          # Vitest testing configuration
├── prisma/
│   ├── schema.prisma         # Database model definition
│   ├── seed.ts               # Database seeder (3 sample records)
│   ├── dev.db                # SQLite database (auto-generated)
│   └── migrations/           # Versioned SQL migrations
├── src/
│   ├── index.ts              # Server bootstrap and graceful shutdown
│   ├── app.ts                # Express app configuration & middleware pipeline
│   ├── config/
│   │   └── env.ts            # Zod-validated environment loader & accessors
│   ├── lib/
│   │   ├── prisma.ts         # Singleton Prisma client instance
│   │   ├── logger.ts         # Pino logger configuration
│   │   ├── hash.ts           # Salted SHA-256 IP hashing utility
│   │   └── mailer.ts         # Nodemailer SMTP transporter & email template
│   ├── middleware/
│   │   ├── requestId.ts      # UUID v4 request tracing
│   │   ├── rateLimiters.ts   # Global, contact, and admin rate limiters
│   │   ├── adminAuth.ts      # Bearer token timing-safe authentication
│   │   ├── validate.ts       # Generic Zod validation middleware
│   │   ├── notFound.ts       # 404 handler
│   │   └── errorHandler.ts   # Safe 500 handler (strips stack traces)
│   ├── schemas/
│   │   ├── contact.ts        # Contact form validation schema
│   │   └── admin.ts          # Admin query and patch schemas
│   ├── services/
│   │   ├── contactService.ts # Database operations for contact messages
│   │   └── notificationService.ts # Asynchronous email delivery handler
│   ├── controllers/
│   │   ├── healthController.ts # Health check handler
│   │   ├── contactController.ts# Contact submission handler
│   │   └── adminController.ts  # Admin CRUD handlers
│   └── routes/
│       ├── health.ts         # /api/health router
│       ├── contact.ts        # /api/contact router
│       └── admin.ts          # /api/admin router
├── tests/
│   ├── helpers/
│   │   ├── setup.ts          # Vitest global setup (applies test migrations)
│   │   └── testApp.ts        # Test application factory & Prisma client
│   ├── health.test.ts        # Health check endpoint tests
│   ├── contact.test.ts       # 21 validation, security, and DB integration tests
│   ├── admin.test.ts         # 15 authentication and CRUD integration tests
│   ├── cors.test.ts          # CORS origin allowlist tests
│   └── errorHandler.test.ts  # 500 and 404 error response tests
└── docs/
    └── TEST_REPORT.md        # Comprehensive automated & manual QA test report
```

---

## 4. Windows Setup & Two-Terminal Workflow

For local development on Windows, run the backend and frontend in two separate PowerShell terminals.

### Terminal 1: Backend Server (Port 4000)

```powershell
# 1. Navigate to the server folder
cd "c:\Users\Muskan waseem\Desktop\testask\server"

# 2. Copy the environment template if you haven't already
Copy-Item .env.example .env

# 3. Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev --name init_contact_messages

# 4. (Optional) Seed 3 sample messages to test with
npm run db:seed

# 5. Start the backend development server
npm run dev
```

The terminal will display:
```
Portfolio backend listening on port 4000
```

### Terminal 2: Frontend Website (Port 3000)

```powershell
# 1. In the project root folder
cd "c:\Users\Muskan waseem\Desktop\testask"

# 2. Make sure .env contains:
# VITE_API_BASE_URL=http://localhost:4000

# 3. Start the Vite dev server
npm run dev
```

Visit **http://localhost:3000** in your web browser. When you fill out and submit the contact form, the submission will be posted to `http://localhost:4000/api/contact`, validated, and saved in `server/prisma/dev.db`!

---

## 5. Environment Variables Reference

Create a `server/.env` file based on `server/.env.example`:

| Variable | Required? | Default / Example | Purpose |
|---|---|---|---|
| `NODE_ENV` | Yes | `development` | Environment mode (`development`, `production`, `test`). |
| `PORT` | Yes | `4000` | Port Express listens on. |
| `DATABASE_URL` | Yes | `"file:./prisma/dev.db"` | Prisma connection string. Use SQLite locally or PostgreSQL in production. |
| `CORS_ORIGINS` | Yes | `http://localhost:3000,http://127.0.0.1:3000` | Comma-separated list of allowed web origins. No wildcards (`*`). |
| `IP_HASH_SALT` | Yes | *(minimum 16 chars)* | Secret random salt used to hash client IPs for privacy before storage. |
| `CONTACT_RATE_LIMIT_MAX` | No | `5` | Maximum contact form submissions allowed per IP within the window. |
| `CONTACT_RATE_LIMIT_WINDOW_MINUTES` | No | `15` | Window duration in minutes for contact rate limiting. |
| `ADMIN_API_TOKEN` | Optional | *(minimum 32 chars)* | Secret Bearer token for the admin API. When left blank, all admin routes return `404 Not Found`. |
| `SMTP_HOST` | Optional | `smtp.gmail.com` | SMTP server hostname. |
| `SMTP_PORT` | Optional | `587` | SMTP port (`587` for STARTTLS, `465` for SSL). |
| `SMTP_SECURE` | Optional | `false` | `true` for port 465, `false` for port 587. |
| `SMTP_USER` | Optional | `you@gmail.com` | SMTP username or email. |
| `SMTP_PASS` | Optional | `your-app-password` | SMTP password or App Password. |
| `CONTACT_NOTIFY_TO` | Optional | `inbox@yourdomain.com` | Destination inbox where contact notifications are delivered. |
| `MAIL_FROM` | Optional | `"Portfolio Contact" <you@gmail.com>` | Sender address on outgoing notification emails. |
| `TRUST_PROXY` | Optional | `false` | Set to `true` when behind a reverse proxy (e.g. Nginx, Render, Railway). |

---

## 6. Generating Secure Secrets (PowerShell)

To generate cryptographically secure random tokens for `IP_HASH_SALT` and `ADMIN_API_TOKEN`, run this command in PowerShell:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Example output:
```
oG8U-mE4gZpD96lX1P3sQyL2bV4wA9cE7vT0rN8uI6kM5yH1zB3xF7jC9vD2wE5
```
Copy and paste this value into your `server/.env` file.

---

## 7. Reading & Managing Contact Messages

You have two convenient ways to view, manage, and delete incoming contact submissions:

### Method A: Visual Web UI (Prisma Studio)

Prisma includes a zero-configuration, browser-based database management interface.

In your server terminal, run:
```powershell
npm run db:studio
```
Prisma Studio opens automatically at `http://localhost:5555`. You can visually browse rows in `contact_messages`, sort by date, search by sender, change status (`new` → `read` → `replied`), or delete spam messages.

### Method B: Admin REST API (PowerShell Examples)

If you configured `ADMIN_API_TOKEN` in `server/.env`, you can interact with the API using PowerShell's built-in `Invoke-RestMethod`:

#### 1. Set your token in the PowerShell session:
```powershell
$token = "your_admin_api_token_here_minimum_32_characters"
$headers = @{ "Authorization" = "Bearer $token" }
```

#### 2. List all messages (paginated):
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/admin/messages" -Headers $headers -Method GET | ConvertTo-Json -Depth 4
```

#### 3. Filter messages by status (e.g. only new messages):
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/admin/messages?status=new" -Headers $headers -Method GET | ConvertTo-Json -Depth 4
```

#### 4. Search messages by keyword:
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/admin/messages?search=collaboration" -Headers $headers -Method GET | ConvertTo-Json -Depth 4
```

#### 5. View a single message by ID:
```powershell
$msgId = "MESSAGE_ID_HERE"
Invoke-RestMethod -Uri "http://localhost:4000/api/admin/messages/$msgId" -Headers $headers -Method GET | ConvertTo-Json -Depth 4
```

#### 6. Mark a message as read or replied:
```powershell
$body = @{ status = "read" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/api/admin/messages/$msgId" -Headers $headers -Method PATCH -ContentType "application/json" -Body $body | ConvertTo-Json
```

#### 7. Delete a message:
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/admin/messages/$msgId" -Headers $headers -Method DELETE
```

---

## 8. Configuring Email Notifications (SMTP)

By default, the backend stores every submission safely in SQLite even if email is not configured. When SMTP is configured, it sends an email notification every time a visitor submits the form.

To enable email notifications using Gmail:
1. Go to your **Google Account** → **Security** → **2-Step Verification**.
2. At the bottom, click **App Passwords**.
3. Generate an App Password named `Portfolio Backend`.
4. In `server/.env`, fill in all 6 variables:
```ini
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
CONTACT_NOTIFY_TO=your_email@gmail.com
MAIL_FROM="Portfolio Website" <your_email@gmail.com>
```
5. Restart the backend server (`npm run dev`). Any new form submission will be delivered straight to your inbox!

---

## 9. Automated Testing

The backend includes a comprehensive Vitest automated test suite covering:
- Health check and database ping
- Input validation (boundaries, control characters, Unicode international names)
- Header injection prevention (CR/LF stripping)
- Honeypot bot filtering
- Rate limiting and retry-after headers
- CORS allowlist enforcement
- Error handler sanitization (500 without stack traces, 404 JSON)
- Admin authentication, lockout, pagination, filtering, search, PATCH, and DELETE
- Privacy protection (verifying `ipHash` is never exposed)

To run the automated tests:
```powershell
cd "c:\Users\Muskan waseem\Desktop\testask\server"
npm test
```

Expected result:
```
 ✓ tests/contact.test.ts (21 tests)
 ✓ tests/admin.test.ts (15 tests)
 ✓ tests/errorHandler.test.ts (2 tests)
 ✓ tests/cors.test.ts (3 tests)
 ✓ tests/health.test.ts (1 test)

 Test Files  5 passed (5)
      Tests  42 passed (42)
```

---

## 10. Production Deployment Guide

When you are ready to deploy your portfolio to production (e.g. Railway, Render, Fly.io, Heroku, or VPS):

### Step 1: Switch to PostgreSQL
SQLite uses a local file (`dev.db`). Most serverless or container platforms have ephemeral filesystems where files are lost on restart. For production, switch to PostgreSQL:
1. In `server/prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. In production environment variables, set `DATABASE_URL` to your PostgreSQL connection string (e.g., from Supabase, Neon, or Railway):
   ```ini
   DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
   ```
3. Run `npx prisma migrate deploy` in your production build/release step.

### Step 2: Configure Production Environment Variables
On your backend host:
- `NODE_ENV=production`
- `PORT=80` or provided by host
- `CORS_ORIGINS=https://your-portfolio-domain.com` (your frontend production domain)
- `IP_HASH_SALT`=(a new, 48-byte random string generated via node crypto)
- `ADMIN_API_TOKEN`=(a new, 48-byte random string)
- `TRUST_PROXY=true` (since reverse proxies like Cloudflare/Render handle HTTPS termination)

### Step 3: Connect Frontend to Production Backend
In your frontend hosting provider (Vercel, Netlify, Cloudflare Pages):
Set the environment variable:
```ini
VITE_API_BASE_URL=https://api.yourdomain.com
```
and redeploy your frontend.

---

## 11. Decisions Made for You

To ensure maximum simplicity for a beginner maintaining this codebase, the following architectural choices were made:

1. **Express 4 instead of Express 5**: Express 5 was still in release-candidate status; Express 4.19+ is stable, reliable, and has zero breaking changes across libraries.
2. **SQLite for local development**: No need to install PostgreSQL or Docker on Windows. You can run `npx prisma migrate dev` and everything works instantly with zero setup.
3. **Prisma ORM**: Provides TypeScript autocompletion and handles SQL injection protection automatically. If you ever switch to PostgreSQL, it is a single-line change.
4. **Honeypot returns 201 Created**: When a bot fills the hidden honeypot field, the server returns a successful response without storing anything. This prevents bots from learning that they were detected.
5. **Admin 404 Stealth Mode**: When `ADMIN_API_TOKEN` is not set, admin routes return `404 Not Found` rather than `401 Unauthorized`, hiding the existence of admin endpoints entirely.
6. **Privacy-Preserving Salted IP Hashing**: To comply with privacy principles without sacrificing rate limiting, raw IP addresses are salted and hashed with SHA-256 before storage and never returned in API responses.

---

## 12. Troubleshooting Guide

### 1. `connect EACCES 127.0.0.1` during testing or startup
- Ensure no other application is using port 4000. Check with: `Get-NetTCPConnection -LocalPort 4000` in PowerShell.
- To use a different port, change `PORT=4005` in `server/.env` and `VITE_API_BASE_URL=http://localhost:4005` in root `.env`.

### 2. Frontend shows "Contact Form Service Not Configured Yet" banner
- Verify root `.env` contains `VITE_API_BASE_URL=http://localhost:4000`.
- In Vite, environment variables are loaded at dev server startup. **Restart the Vite frontend server** (`Ctrl+C` then `npm run dev`) after creating or editing `.env`.

### 3. Submissions fail with "Could not connect to the server"
- Make sure the backend server is running in Terminal 1 (`npm run dev` inside `server/`).
- Visit `http://localhost:4000/api/health` in your browser. It should respond with `{"status":"ok","database":"up"}`.

### 4. CORS error in browser console (`Access-Control-Allow-Origin`)
- Check that the exact origin in your browser address bar (e.g. `http://localhost:3000`) is listed in `server/.env` under `CORS_ORIGINS`.
- Note: `http://localhost:3000` and `http://127.0.0.1:3000` are treated as different origins; both are included by default in `.env.example`.

### 5. Resetting the Local Database
- If you ever want to wipe and restart the local database from scratch, run:
  ```powershell
  cd "c:\Users\Muskan waseem\Desktop\testask\server"
  npm run db:reset
  ```

---

## 13. Possible Future Work

This backend is scoped strictly to contact form handling and message management to keep maintenance simple. For future enhancements such as:
- A browser-based administrative dashboard with JWT/session login
- Dynamic CMS CRUD for projects, experience, skills, and testimonials
- File uploads for resume updates directly from an admin panel

Please refer to the comprehensive design specifications in `docs/ADMIN_ROADMAP.md` in the project root!

