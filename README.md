# Clean-Cycle

**Clean-Cycle: A Web-Based Laundry Booking System with Pick-up and Delivery Service for D'Cassini Laundry Shop**

Clean-Cycle is a frontend web-based laundry booking system developed by **SYNAPSE**
for D'Cassini Laundry Shop. It is a student group project.

- **Group:** SYNAPSE
- **Repository:** https://github.com/Iyani99/Clean-Cycle.git

## Team

| Member | Role |
|---|---|
| Jerson E. Tomas | Project Manager / UI/UX |
| Chadwick | UI/UX |
| Jayrence | Researcher |
| Jhon Jhon | Researcher |
| Lian | Developer |
| Andrey | Developer |

Clean-Cycle is being developed by SYNAPSE, with team members contributing through
project management, UI/UX design, research, and frontend development.

## About

Clean-Cycle is our group's frontend web prototype for a laundry booking system.
The full system is planned to cover online booking, pick-up and delivery
scheduling, order status tracking, digital record-keeping, an admin dashboard,
and a transaction and sales summary.

This repository contains the frontend implementation, built from the team's
approved Figma high-fidelity design.

## Scope

**This version is frontend-only.** It does not include a backend, a database,
real authentication, real payments, or persistent booking. Screens use static
sample data and simple local interactions (for example filtering a table,
confirming a booking, or marking a notification as read), and everything resets
when the page is refreshed.

## Technology Stack

- HTML5
- CSS3 (plain CSS, no framework)
- JavaScript
- Vue.js (Vue 3)
- Vue Router
- Vite
- ESLint / Oxlint
- Figma (visual source of truth)

## Current Status

**Frontend Development Checkpoint 2: 17 of 21 planned screens are implemented
(about 81%).** The screens follow the approved Figma design and are connected
through working navigation (Vue Router). They are built from reusable Vue
components and responsive CSS.

### Customer / public screens (10 of 10)

| Screen | Route |
|---|---|
| Home | `/` |
| Login | `/login` |
| Sign Up | `/signup` |
| Dashboard | `/dashboard` |
| Services | `/services` |
| Book Now | `/book` |
| Payment | `/payment` |
| Service Tracking | `/tracking` |
| Settings / Profile | `/settings` |
| Notifications | `/notifications` |

### Admin screens (7 of 11)

| Screen | Route |
|---|---|
| Dashboard | `/admin/dashboard` |
| Booking Management | `/admin/bookings` |
| Customer Management | `/admin/customers` |
| Payment Management | `/admin/payments` |
| Logistics Management | `/admin/logistics` |
| Reports Overview | `/admin/reports` |
| Notifications | `/admin/notifications` |

### Remaining screens

- Admin Settings
- Admin New Record
- Admin Login
- Admin Signup

### Trying the prototype

There is no real login. On the Login screen, choose **Customer** or **Admin**,
enter any email address and password, and submit to open the customer screens or
the admin area. The Home page's **Book Now** and **Services** links also go
through Login first.

### Reusable components

`AppNavbar`, `CustomerNavbar`, `BaseButton`, `ServiceCard`, `AuthLayout`,
`BookingSection`, `AdminLayout`, `AdminSidebar`, and `AppIcon`.

## Getting Started

Requires [Node.js](https://nodejs.org/) (v22.18+ or v24.12+). Node is used only
for the Vite/npm frontend tooling; the project has no Node.js backend.

```
git clone https://github.com/Iyani99/Clean-Cycle.git
cd Clean-Cycle
npm install
```

### Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run lint` | Run the linters (Oxlint + ESLint) |

> On Windows PowerShell, a restrictive execution policy can block `npm.ps1`. If
> that happens, use the `npm.cmd` shim instead (`npm.cmd install`,
> `npm.cmd run dev`, and so on).

## Repository

GitHub: https://github.com/Iyani99/Clean-Cycle.git

This repository holds SYNAPSE's frontend implementation of Clean-Cycle.
