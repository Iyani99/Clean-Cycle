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

## Week 5 Scope

For the Week 5 milestone (Frontend Project Setup and Code Repository), we focused
on the project setup and a working public homepage with functional navigation
between the completed pages.

**This version is frontend-only.** It does not include a backend, a database,
real authentication, real payments, or persistent booking. Screens that will
later depend on those features are shown as static UI or simple placeholder
pages.

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

The public homepage is the only fully implemented screen from the Figma design.
The approved Figma design was translated into reusable Vue components and
responsive CSS, together with the site navigation. The Services, Book Now, Login,
and Sign Up routes are placeholder pages that demonstrate working navigation —
they are not finished screens.

### Implemented

- Public homepage — hero section and "Our Core Services" section
- Responsive navigation bar
- Reusable components: `AppNavbar`, `BaseButton`, `ServiceCard`, `PagePlaceholder`

### Placeholder routes (navigation only)

- Services
- Book Now
- Login
- Sign Up

## Getting Started

Requires [Node.js](https://nodejs.org/) (v22.18+ or v24.12+). Node is used only
for the Vite/npm frontend tooling; the project has no Node.js backend.

```
git clone https://github.com/Iyani99/Clean-Cycle.git
cd clean-cycle
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

This repository holds SYNAPSE's frontend implementation of Clean-Cycle for the
Week 5 project requirement.
