# test-login-app

A minimal React + Vite + TypeScript login app built for E2E testing practice.

## Getting started

```bash
npm install
npm run dev
```

App runs at http://localhost:5173

## Test credentials

| Email | Password | Role |
|---|---|---|
| user@example.com | password123 | Standard User |
| admin@example.com | admin123 | Administrator |

## Routes

| Route | Access |
|---|---|
| `/login` | Public |
| `/dashboard` | Protected |
| `/profile` | Protected |

## data-testid reference

All interactive elements and key UI regions carry `data-testid` attributes for reliable E2E selectors.

| Selector | Element |
|---|---|
| `login-form` | The login form |
| `email-input` | Email field |
| `password-input` | Password field |
| `login-submit` | Submit button |
| `login-error` | Error alert |
| `email-error` | Email field error |
| `password-error` | Password field error |
| `navbar` | Top navigation bar |
| `navbar-brand` | App name/logo |
| `navbar-user-email` | Logged-in user email |
| `logout-button` | Log out button |
| `nav-dashboard` | Dashboard nav link |
| `nav-profile` | Profile nav link |
| `dashboard-page` | Dashboard page wrapper |
| `dashboard-heading` | Dashboard h1 |
| `dashboard-welcome` | Welcome message |
| `dashboard-status` | Live badge |
| `stats-grid` | Stats card grid |
| `stat-sessions` | Sessions stat card |
| `stat-users` | Active users card |
| `stat-uptime` | Uptime card |
| `stat-errors` | Errors card |
| `profile-page` | Profile page wrapper |
| `profile-name` | User full name |
| `profile-email` | User email |
| `profile-role` | User role |
| `profile-status` | Account status |
