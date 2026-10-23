# TaskFlow — Project Management Dashboard

A responsive task dashboard for creating and managing work, tracking progress, and finding tasks with combined search and filters.

## Features

- Create, edit, delete, and cycle tasks through to do, in progress, and done
- Required-field validation with accessible error messages
- Search task titles and combine status and priority filters
- Statistics for total, completed, in-progress, and overdue tasks
- Local storage persistence with safe fallback for invalid saved data
- Responsive layout with mobile-friendly task table scrolling
- Emerald theme, status and priority badges, and a no-results state

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Oxlint

## Run locally

```bash
git clone https://github.com/Ahesanali20/project-management-dashboard.git
cd project-management-dashboard
npm install
npm run dev
```

## Quality checks

```bash
npm run build
npm run lint
```

There is currently no automated test script configured.

## Screenshots

Add desktop and mobile screenshots here after capturing the running dashboard.

## Deploy

Import this GitHub repository into [Vercel](https://vercel.com/), keep the framework preset as **Vite**, and deploy with the default build command (`npm run build`) and output directory (`dist`). Future pushes to `main` will trigger new deployments.

## Portfolio description

TaskFlow is a responsive project management dashboard built with typed React components. It demonstrates task lifecycle management, combined filtering, local persistence, accessible form validation, and at-a-glance delivery statistics.
