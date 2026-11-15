# Doctor Tracker (Client)

## Description

Doctor Tracker is an admin portal for managing doctors, patient records, and clinic workloads in one place. I built the frontend with Next.js (App Router), Tailwind CSS, Redux Toolkit (RTK Query), and Recharts, backed by a separate Express and MongoDB REST API. Coordinators can search and filter doctors or patients by date, condition, and specialization, assign patients directly under a doctor, and track clinic activity through live charts.

## Live Links & Demo Access

- **Live App (Vercel):** https://client-doctor-tracker.vercel.app
- **API Server (Render):** https://server-doctor-tracker.onrender.com/api/v1
- **Admin Login:** `admin@dt.com` / `Admin@123`

*(Note: The API runs on Render's free tier, so the first request after inactivity can take ~30–50 seconds to wake up.)*

## Setup Guide

### What You Need
- Node.js v20+
- npm v10+
- Running instance of the [Doctor Tracker Server](https://github.com/Ashraful2880/Server-Doctor-Tracker) (or use the live Render API)

### 1. Clone and install dependencies

```bash
git clone https://github.com/Ashraful2880/Client-Doctor-Tracker.git
cd Client-Doctor-Tracker
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

`.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

If you want to point your local frontend to the live Render backend instead, set `NEXT_PUBLIC_API_URL=https://server-doctor-tracker.onrender.com/api/v1`.

### 3. Run locally

Make sure the backend server is running and seeded (`npm run seed` in the server repo), then start the Next.js dev server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser and sign in with `admin@dt.com` / `Admin@123`.

## System Architecture

The client and server are two separate repositories communicating over REST (`/api/v1/*`):

```
Browser (Next.js App Router + RTK Query)
   │
   │  HTTPS + Bearer JWT
   ▼
Express API Server (Helmet, CORS, Zod Validation)
   │
   ▼
MongoDB Atlas (Indexed Queries + Aggregation Pipelines)
```

- **Pages & UI:** Public landing page (`/`), contact page (`/contact`), login (`/login`), and protected admin routes (`/dashboard`, `/doctors`, `/doctors/[id]`, `/patients`). Shared components (`FilterBar`, `DataTable`, `Pagination`, `Modal`, `CustomSelect`, `DatePicker`) keep the layout consistent across desktop and mobile.
- **State & Caching:** Redux Toolkit manages auth state in `localStorage` and RTK Query handles API requests and cache invalidation.
- **Auth Flow:** On login, the server returns a JWT token. Protected routes redirect unauthenticated users to `/login`, and RTK Query attaches the `Authorization: Bearer <token>` header automatically.

## Technical Decisions

### 1. Using RTK Query instead of Context API + `useEffect`
I chose Redux Toolkit with RTK Query because doctor counts, patient tables, and dashboard charts all depend on the same underlying data. When a patient is added or deleted, invalidating the `Patient`, `Doctor`, and `Analytics` tags updates every affected view automatically without manual refetch calls or prop drilling. It also gives consistent loading and error states across every table.

### 2. Moving analytics and filtering to MongoDB instead of the client
Rather than fetching all records and filtering or counting in React, pagination, regex search, date-range filters, and dashboard aggregations all run on the server. MongoDB computes patients-per-doctor (`$lookup`), condition counts (`$group`), and daily registration stats in a single pass, keeping payloads small even as records grow.

## Visual Evidence

Desktop (`1440x900`) and mobile (`390x844`) views of the app:

| Screen | Desktop | Mobile |
| :--- | :--- | :--- |
| Landing Page | `docs/screenshots/landing-desktop.png` | `docs/screenshots/landing-mobile.png` |
| Admin Dashboard | `docs/screenshots/dashboard-desktop.png` | `docs/screenshots/dashboard-mobile.png` |
| Doctors List | `docs/screenshots/doctors-desktop.png` | `docs/screenshots/doctors-mobile.png` |
| Patients List | `docs/screenshots/patients-desktop.png` | `docs/screenshots/patients-mobile.png` |
