# NeoGlowControlBoard Reference

## Purpose

This skill packages a control-board style UI system inspired by the provided image: bright white or dark neutral panels, compact technical spacing, blue and cyan glow on active states, and a strong emphasis on control samples rather than marketing layout.

## Source Map

- `NeoGlowControlBoard.tokens.json`: semantic tokens and theme values
- `NeoGlowControlBoard.css`: glow behavior, surfaces, and component styles
- `tailwind.preset.cjs`: Tailwind mapping based on the CSS variables
- `preview.html`: full board plus `capture=1` mode for clean screenshots

## System Model

One design language, two themes:

- same component semantics in light and dark
- neutral surfaces carry the structure
- glow accents mark active, focused, loading, or highlighted states

## Board Areas

- Icon rail: dense vertical navigation and active chip
- Center controls: buttons, selects, sliders, toggles, modal and scale cards
- Spec column: radius, border weight, state checklist, auxiliary date picker and tabs

## Good Fits

- admin tools
- setup or configuration surfaces
- hardware dashboards
- QA or state specification boards
- control room UI
- dense design-system handoff pages

## Avoid

- editorial landing pages
- playful consumer app interfaces
- rainbow dashboards with many accent colors
- systems where glow would compete with content density

## Working Guidance

- Keep glow concentrated on active controls, rails, and selected chips.
- Use pale or dark surfaces to support the halo effect.
- Prefer compact module groupings over broad marketing composition.
- If adapting an existing app, remap controls and focus states first; do not start with decorative effects.
