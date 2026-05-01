# Marketify

A full-stack product marketplace built with React, Express, PostgreSQL, Drizzle ORM, and Clerk authentication.

## Tech Stack

**Frontend**
- React + Vite
- TailwindCSS
- Clerk (authentication)
- Axios + TanStack Query

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL + Drizzle ORM
- Clerk (auth middleware)

## Local Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database (e.g. Neon, Supabase, or local)
- Clerk account

### 1. Clone the repo

```bash
git clone https://github.com/Billy1437/Marketify.git
cd Marketify
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=8000
DB_URL=your_postgresql_connection_string
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Push the database schema:

```bash
npm run db:push
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Deployment (Render)

This project is deployed as a single Render web service — the Express backend serves the built React frontend as static files.

### Environment variables on Render

| Key | Value |
|-----|-------|
| `PORT` | Set automatically by Render |
| `DB_URL` | Your PostgreSQL connection string |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://your-app.onrender.com` |
| `CLERK_PUBLISHABLE_KEY` | `pk_live_...` |
| `CLERK_SECRET_KEY` | `sk_live_...` |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_...` |
| `VITE_API_BASE_URL` | `https://your-app.onrender.com` |

### Render settings

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Start command** | `npm start` |
| **Root directory** | *(leave empty)* |

> `VITE_*` variables are baked into the frontend at build time — a full redeploy is required after changing them.

## Keeping the Server Alive (Cron Job)

Render's free tier spins down web services after 15 minutes of inactivity. To prevent this, set up a cron job to ping the health endpoint every 14 minutes.

### Option A — cron-job.org (recommended, free)

1. Go to [cron-job.org](https://cron-job.org) and sign up
2. Click **Create cronjob**
3. Set the URL to:
   ```
   https://your-app.onrender.com/api/health
   ```
4. Set execution schedule to **every 14 minutes**
5. Save

### Option B — UptimeRobot (free)

1. Go to [uptimerobot.com](https://uptimerobot.com) and sign up
2. Add a new **HTTP(S)** monitor
3. Set the URL to:
   ```
   https://your-app.onrender.com/api/health
   ```
4. Set interval to **5 minutes**
5. Save

UptimeRobot also sends downtime alerts as a bonus.
