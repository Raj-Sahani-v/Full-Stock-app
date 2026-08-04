# 📈 Stock Market Platform

A full-stack stock market platform with a public marketing site, a real-time authenticated trading dashboard, and a Node.js backend — featuring live price updates, watchlists, holdings tracking, and interactive charts.

## Features

- **Public site** — landing, about, contact, and login pages, accessible to everyone
- **Real-time market data** via WebSockets (Socket.IO) — live price ticks, chart updates, and symbol data without polling
- **Secure authentication** with JWT access + refresh token rotation (refresh token stored server-side, httpOnly cookie)
- **Watchlist** — track your favorite symbols with live updates
- **Holdings** — view your current portfolio positions
- **Buy/Sell** — execute simulated or live trades
- **Wallet** — track available balance
- **Interactive charts** — candlestick/line charts via Chart.js and Lightweight Charts
- **Protected dashboard** — only accessible to authenticated users; logged-out users are redirected back to the public site

## Tech Stack

**Frontend** *(public site)*
- React + React Router
- Vite

**Dashboard** *(authenticated app)*
- React 19
- React Router v7
- MUI (Material UI) + MUI Icons
- Chart.js / react-chartjs-2
- Lightweight Charts
- Socket.IO Client
- Axios (with interceptors for automatic token refresh)
- Vite

**Backend**
- Node.js / Express
- MongoDB (Mongoose)
- Socket.IO
- JWT (access + refresh token rotation)

## Architecture

This is a monorepo with three independent apps:

```
root/
├── frontend/    → public site: landing, about, contact, login (port 5173)
├── Dashboard/   → authenticated trading dashboard (port 5174)
└── Backend/     → REST API + Socket.IO server (port 7000)
```

**Flow:**

1. Users land on `frontend` (`localhost:5173`) — landing, about, contact, and login pages live here.
2. Logged-out users stay entirely within `frontend`. Any attempt to reach the dashboard without a valid session redirects back here.
3. On successful login, `frontend` redirects the user to `Dashboard` (`localhost:5174`).
4. `Dashboard` verifies the session on load by calling `Backend`'s `/refresh` endpoint (using the httpOnly refresh-token cookie). If it fails, the user is bounced back to `frontend`'s `/login`.
5. Once authenticated, `Dashboard` maintains a live Socket.IO connection to `Backend` for real-time price/chart/portfolio data.

```
┌──────────────────┐   login success    ┌──────────────────┐
│    frontend        │ ──────────────────► │    Dashboard       │
│  (port 5173)        │ ◄────────────────── │   (port 5174)       │
│  landing/about/      │   session invalid  │  live trading UI    │
│  contact/login       │                     │                      │
└──────────────────┘                     └──────────────────┘
           │                                        │
           └────────────────┬───────────────────────┘
                             ▼
                    ┌──────────────────┐
                    │     Backend         │
                    │   (port 7000)       │
                    │ REST API + Socket.IO │
                    └──────────────────┘
```

- Access tokens are kept **in memory** on the client (not localStorage) for security.
- Refresh tokens are stored in the database and set as an `httpOnly` cookie — rotated on every refresh, valid across both `frontend` and `Dashboard` since they share the same top-level domain (`localhost`).
- An Axios interceptor in `Dashboard` automatically retries failed requests after silently refreshing the access token.
- Cross-app navigation (`frontend` ↔ `Dashboard`) uses `window.location`, since React Router can only handle in-app routing — not cross-port redirects.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB running locally or a connection URI

### Installation

Each app has its own `package.json` — install dependencies separately.

```bash
git clone <repo-url>
cd <repo-root>

cd Backend && npm install
cd ../frontend && npm install
cd ../Dashboard && npm install
```

### Environment Variables

**`Backend/.env`**
```env
PORT=7000
MONGO_URI=mongodb://localhost:27017/stock-market
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:7000
VITE_DASHBOARD_URL=http://localhost:5174
```

**`Dashboard/.env`**
```env
VITE_API_URL=http://localhost:7000
VITE_SOCKET_URL=http://localhost:7000
VITE_LOGIN_URL=http://localhost:5173
```

### Run Locally

Run all three apps in separate terminals:

```bash
# Terminal 1 — Backend
cd Backend
npm run dev        # http://localhost:7000

# Terminal 2 — Public site
cd frontend
npm run dev        # http://localhost:5173

# Terminal 3 — Dashboard
cd Dashboard
npm run dev        # http://localhost:5174
```

Start at `http://localhost:5173` — log in there to be redirected into the dashboard.

## Project Structure

```
root/
├── frontend/                # Public site (port 5173)
│   └── src/
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   └── Login.jsx
│       └── App.jsx
│
├── Dashboard/                # Authenticated app (port 5174)
│   └── src/
│       ├── api.js            # Axios instance, interceptors, token refresh logic
│       ├── components/
│       │   ├── ContextVariable.jsx  # Global auth + app state (React Context)
│       │   ├── Protected.jsx         # Route guard, redirects to frontend/login if unauthenticated
│       │   ├── BuyAndSell.jsx
│       │   └── ...
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── WatchList.jsx
│       │   ├── Holdings.jsx
│       │   └── Wallet.jsx
│       └── App.jsx
│
└── Backend/                  # API + Socket.IO server (port 7000)
    └── src/
        ├── controllers/
        ├── middlewares/
        │   ├── auth.middleware.js         # Verifies access token
        │   └── refreshToken.middleware.js # Verifies + rotates refresh token
        ├── models/
        ├── routes/
        └── index.js
```

## Known Notes / Gotchas

- **Vite dev-mode import cost:** Barrel imports from `@mui/icons-material` and `@mui/material` (e.g. `import { Search } from "@mui/icons-material"`) force Vite to evaluate a huge module in dev mode, adding several seconds to page load. Use deep imports instead (`import SearchIcon from "@mui/icons-material/Search"`).
- **OneDrive / synced folders:** Running the project from inside a OneDrive-synced directory can significantly slow down Vite's dev server due to background file sync. Prefer a non-synced local path.
- **Refresh token race conditions:** All token refresh calls are funneled through a single shared function (`refreshAccessToken` in `api.js`) to avoid concurrent refresh requests invalidating each other during rotation.

## Roadmap

- [ ] Add order history page
- [ ] Add price alerts
- [ ] Add dark/light theme toggle
- [ ] Deploy to production

## License

MIT
