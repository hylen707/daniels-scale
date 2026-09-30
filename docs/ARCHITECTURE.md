# Architecture

## Phase
Initiation

## Goal
Build a secure Korean-language school administration web application for managing student points, reflection status, and manually administered discipline.

## Initial boundaries
- Students do not authenticate.
- Only authorized administrators can access the system.
- Authentication role and manually entered record author are separate concepts.
- Historical records must remain available for audit and weekly calculations.
- Automatic rules calculate eligibility/status; they do not silently create disciplinary actions.

## Planned layers
- UI: Next.js App Router, React, Tailwind CSS, shadcn/ui
- Application/API: server-side authorization, Zod validation, business-rule services
- Persistence: PostgreSQL + Prisma
- Authentication: secure password hashing and session management

## Initial development principle
Prefer small, reviewable feature commits after the initialization milestone.
