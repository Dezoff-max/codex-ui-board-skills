# Soft Neumorphic Dual Theme Board Reference

## Purpose

This skill packages a complete soft-neumorphic UI board that works in both light and dark themes. It is intended for dashboards, SaaS workspaces, internal tools, settings surfaces, and design-system previews where tactile surfaces and quiet hierarchy matter.

## Source Map

- `SoftNeumorphicDualThemeBoard.tokens.json`: semantic token names and theme values
- `SoftNeumorphicDualThemeBoard.css`: CSS variables and component rules
- `tailwind.preset.cjs`: Tailwind mapping based on the CSS variables
- `preview.html`: complete board showing foundations, controls, navigation, data display, and feedback

## System Model

One design language, two themes:

- light and dark use the same component semantics
- themes switch token values only
- the preview board is a source of truth for the full system
- raised elements invert to inset on hover, and inset elements invert to raised on hover

## Board Areas

- Foundations: surfaces, elevation, iconography, radii, spacing
- Controls: buttons, fields, selection, slider, dropdown, date picker
- Navigation: tabs, breadcrumbs, pagination, process stepper
- Workspace layout: sidebar, search, KPI cards, chart panel, inspector
- Data display: cards, list items, badges, compact table surfaces, tooltip, table rows, chart widgets
- Feedback: modal, toast stack, progress, banner, skeleton, empty state

## Good Fits

- SaaS dashboards
- admin interfaces
- team workspaces
- settings panels
- productivity tools
- component and state board templates

## Avoid

- loud marketing landing pages
- glassmorphic interfaces
- flat border-first enterprise visual systems
- highly ornamental visual systems with many competing accents

## Working Guidance

- Start from tokens, then surfaces, then components.
- Keep cards and buttons raised, fields inset, and state changes subtle.
- If adapting an existing app, remap its primitives to this system instead of introducing a second competing component family.
- If only one theme is visible in the final deliverable, preserve the dual-theme token architecture unless the user explicitly asks for a single-theme-only setup.
