# Clean-Cycle

**Clean-Cycle: A Web-Based Laundry Booking System with Pick-up and Delivery Service for D'Cassini Laundry Shop**

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

## About

Clean-Cycle is a web-based laundry booking system for D'Cassini Laundry Shop.
The full system is planned to cover online booking, pick-up and delivery
scheduling, order status tracking, digital record-keeping, an admin dashboard,
and a transaction and sales summary.

This repository is the **frontend web prototype** built from the approved Figma
high-fidelity design.

## Week 5 Scope

The Week 5 deliverable is the **frontend project setup and a working public
homepage** with functional navigation between the completed pages.

**This version is frontend-only.** It does not include a backend, a database,
real authentication, real payments, or persistent booking functionality. Screens
that will later use those features are shown as static UI or simple placeholder
pages.

## Technology Stack

- HTML5
- CSS3 (plain CSS, no framework)
- JavaScript
- Vue.js (Vue 3)
- Vue Router
- Vite

## Current Status

The public homepage is implemented from the Figma design, along with the
navigation and reusable components needed for Week 5. The Services, Book Now,
Login, and Sign Up routes are simple placeholder pages that demonstrate working
frontend navigation.

### Features demonstrated

- Public homepage (hero section + "Our Core Services" section)
- Responsive navigation bar
- Services placeholder route
- Book Now placeholder route
- Login placeholder route
- Sign Up placeholder route
- Reusable components: `BaseButton`, `AppNavbar`, `ServiceCard`, `PagePlaceholder`

## Getting Started

Requires [Node.js](https://nodejs.org/) (v22.18+ or v24.12+). Node is used only
for the Vite/npm frontend tooling.

```
git clone https://github.com/Iyani99/Clean-Cycle.git
cd clean-cycle
npm.cmd install
```

### Commands

On this development environment, PowerShell may block `npm.ps1`, so use `npm.cmd`:

| Command | Description |
|---|---|
| `npm.cmd install` | Install dependencies |
| `npm.cmd run dev` | Start the Vite development server |
| `npm.cmd run build` | Build the production bundle into `dist/` |
| `npm.cmd run lint` | Run the linters (oxlint + ESLint) |

## Project Context

See [docs/PROJECT-CONTEXT.md](docs/PROJECT-CONTEXT.md) for the full project
context, decisions, and planned development phases.
