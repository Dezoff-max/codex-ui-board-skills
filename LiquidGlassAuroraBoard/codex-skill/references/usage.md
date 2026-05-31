# LiquidGlassAuroraBoard Reference

## Purpose

This skill packages a liquid-glass UI system inspired by the provided image: frosted translucent panels, glossy purple and cyan controls, circular glass actions, ambient aurora glow, and a premium dual-theme board that feels soft rather than industrial.

## Source Map

- `LiquidGlassAuroraBoard.tokens.json`: semantic tokens and light/dark values
- `LiquidGlassAuroraBoard.css`: glass material, glow, layout, and animation rules
- `tailwind.preset.cjs`: Tailwind token bridge based on CSS variables
- `preview.html`: full board with theme query and `capture=1` mode for clean screenshots

## System Model

One material language, two atmospheric modes:

- light theme uses milky glass and pastel blooms
- dark theme uses smoky translucent panels and brighter localized glow
- both themes keep the same radii, component shapes, and accent logic

## Board Areas

- Left hero board: title, CTA buttons, search input, chips, and icon rail
- Right feature column: search card, mini actions, toggle, and premium feature card
- Lower board: foundations, controls, tokens, and usage metrics

## Good Fits

- premium SaaS dashboards
- workspace launchers
- AI tools and copilots
- polished settings surfaces
- design-system boards
- concept demos with shareable screenshots

## Avoid

- spreadsheet-heavy enterprise screens
- severe admin consoles
- minimalist flat UIs
- visually crowded dashboards with many unrelated accent colors

## Working Guidance

- Start from surface opacity, border brightness, and blur before tuning shadows.
- Let background blooms create atmosphere, but keep them behind the interaction layer.
- Treat primary glow as a hierarchy tool, not a wallpaper effect.
- If adapting an existing interface, remap the shell, inputs, buttons, and cards first.
