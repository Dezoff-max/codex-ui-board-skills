# DualThemeSpecBoard Skill Reference

## Purpose

This skill packages a complete system board for product UI that must exist in both light and dark themes. It is intended for dashboards, admin panels, workspaces, configuration flows, operations tools, and other structured product surfaces.

## Source Map

- `DualThemeSpecBoard.tokens.json`: semantic token names and theme values
- `DualThemeSpecBoard.css`: variables and component styles
- `tailwind.preset.cjs`: Tailwind mapping to the CSS variables
- `preview.html`: full state board and composition reference

## System Model

One component system, two themes:

- light and dark share the same semantic structure
- themes switch token values only
- component class names do not need to change between themes

## Board Areas

- Foundations: surfaces, elevation, iconography, borders, radii, spacing
- Controls: buttons, inputs, selection, switches, slider, dropdown, date picker
- Navigation: tabs, breadcrumbs, pagination, process stepper
- Workspace layout: sidebar, search, KPIs, chart panel, inspector
- Data display: cards, list items, badges, compact table header, tooltip, table rows, chart widgets
- Feedback: modal, toast stack, alert banner, progress, skeleton, empty state

## Good Fits

- SaaS dashboards
- admin tools
- internal tools
- settings and configuration panels
- multi-step product workflows
- handoff boards for designers and frontend developers

## Avoid

- marketing landing pages with editorial art direction
- playful illustration-first brand pages
- visual systems that depend on transparent glass, huge gradients, or multiple competing accent colors

## Working Guidance

- Start from semantic tokens and surface logic.
- Use the preview board to maintain consistency across categories.
- If restyling an existing app, remap its existing button, field, panel, and badge primitives to this system instead of creating duplicate component families.
- If only one theme is requested in the final UI, keep the dual-theme architecture anyway unless the user explicitly asks for a single-theme-only system.
- Keep motion restrained but visible: buttons, cards, chart widgets, and loading states should feel alive without turning into decorative noise.
