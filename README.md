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

**All 21 approved UI states from the Figma design are implemented (21 of 21,
100%).** The screens follow the approved design and are connected through working
navigation (Vue Router). They are built from reusable Vue components and
responsive CSS.

The 21 UI states are served by 20 app routes, because the approved Customer Login
and Admin Login are two states of the same `/login` screen (see
[How Login works](#how-login-works)). There is also a supporting Not Found page
for unknown addresses, which is not counted as one of the 21.

| Area | Approved UI states | Implemented |
|---|---|---|
| Customer / public | 10 | 10 |
| Admin | 11 | 11 |
| **Total** | **21** | **21** |

### Customer / public screens (10 of 10)

| Screen | Route |
|---|---|
| Home | `/` |
| Login (Customer state) | `/login` |
| Sign Up | `/signup` |
| Dashboard | `/dashboard` |
| Services | `/services` |
| Book Now | `/book` |
| Payment | `/payment` |
| Service Tracking | `/tracking` |
| Settings / Profile | `/settings` |
| Notifications | `/notifications` |

### Admin screens (11 of 11)

| Screen | Route |
|---|---|
| Login (Admin state) | `/login` (same screen as Customer Login) |
| Dashboard | `/admin/dashboard` |
| Booking Management | `/admin/bookings` |
| Add New Booking | `/admin/bookings/new` |
| Customer Management | `/admin/customers` |
| Payment Management | `/admin/payments` |
| Logistics Management | `/admin/logistics` |
| Reports Overview | `/admin/reports` |
| Notifications | `/admin/notifications` |
| Settings | `/admin/settings` |
| Create Admin Account | `/admin/settings/admins/new` |

The approved Figma "Admin Signup" screen is implemented as an internal **Create
Admin Account** screen. Admin accounts are not created through a public sign-up
page, so this screen is reached from Admin Settings (Security > Administrator
Accounts > Add Administrator) and is not linked from Home, Login or Sign Up.

### How Login works

There is no real login. On the Login screen, choose **Customer** or **Admin**,
enter any email address and password, and submit.

- **Customer** opens the Customer Dashboard. A safe customer link such as
  `/login?redirect=/book` continues to that page after login.
- **Admin** opens the Admin Dashboard.
- The public **Sign Up** prompt is shown only while Customer is selected.
- **Logout** (Customer Settings and every Admin screen) returns to `/login`.

The Home page's **Book Now** and **Services** links also go through Login first.

## Features

**Customer**

- Dashboard with a service overview and updates
- Services list and a Book Now form with validation
- Order summary and payment screen
- Service tracking with a status journey
- Settings / profile and notifications (mark all as read, load more)

**Admin**

- Dashboard overview with a booking notification banner
- Booking management with search, status filters and confirming a booking
- Add New Booking form (customer details, service, transport option, schedule)
- Customer management with search, filter and sort
- Payment management with search and marking a payment as paid
- Logistics, reports and notification screens
- Settings, including an internal Create Admin Account form

**General**

- Responsive layouts, checked from wide desktop down to phone widths
- A Not Found page for unknown addresses
- Inline form validation with clear error messages

## Project Structure

Page layouts live in `src/views/`, reusable pieces in `src/components/`, and
routing in `src/router/`.

Reusable components: `AppNavbar`, `CustomerNavbar`, `BaseButton`, `ServiceCard`,
`BookingSection`, `AuthLayout`, `AuthField`, `AuthSubmit`, `AdminLayout`,
`AdminSidebar` and `AppIcon`. All Admin screens share the same `AdminLayout` and
`AdminSidebar`, and Login, Sign Up and Create Admin Account share the `Auth`
components.

## Testing Status

Verified in the browser and with the project tools:

- The production build, Oxlint and ESLint pass with no errors
- All 20 app routes render, and unknown addresses show the Not Found page
- The main Customer and Admin navigation flows work end to end
- No page-level horizontal scrolling was found at widths from 1360px down to 390px
- No application errors or warnings in the browser console

This is frontend verification only. There is no backend to test.

## Limitations (frontend only)

- Data is static sample data, and changes reset when the page is refreshed
- Bookings, admin accounts and payments are not saved anywhere
- There is no real authentication, so pages are not protected by a login
- There is no real payment processing, live tracking, customer lookup, or
  email/SMS
- Some controls shown in the Figma design have no approved behavior yet and are
  intentionally left inactive

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
| `npm run lint` | Runs Oxlint and ESLint with automatic fixes enabled |

> On Windows PowerShell, a restrictive execution policy can block `npm.ps1`. If
> that happens, use the `npm.cmd` shim instead (`npm.cmd install`,
> `npm.cmd run dev`, and so on).

## Repository

GitHub: https://github.com/Iyani99/Clean-Cycle.git

This repository holds SYNAPSE's frontend implementation of Clean-Cycle.
