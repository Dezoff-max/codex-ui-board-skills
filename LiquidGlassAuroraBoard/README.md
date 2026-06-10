# Liquid Glass Aurora Board

A shareable Codex skill and UI kit for glossy liquid-glass interfaces. It combines frosted translucent panels, purple/cyan aurora glow, pill controls, circular actions, and a premium light-plus-dark material system.

![Liquid Glass Aurora Board light preview](./screenshots/liquid-glass-aurora-board-light.png)

## What's Included

- Standalone `preview.html` board with light and dark modes
- `LiquidGlassAuroraBoard.css` with glass materials, glow, layout, and animation rules
- `LiquidGlassAuroraBoard.tokens.json` with semantic design tokens
- `tailwind.preset.cjs` for Tailwind projects
- `codex-skill/` for installing the system as a Codex skill
- Screenshot-ready capture URLs

## Preview

Open the preview directly:

```sh
open preview.html
```

Theme and capture URLs:

```text
preview.html?theme=light
preview.html?theme=dark
preview.html?theme=light&capture=1
preview.html?theme=dark&capture=1
```

## Use the CSS

```html
<link rel="stylesheet" href="./LiquidGlassAuroraBoard.css">
```

## Install the Codex Skill

```sh
mkdir -p ~/.codex/skills
cp -R codex-skill ~/.codex/skills/liquid-glass-aurora-board
```

Then use it in Codex:

```text
Use $liquid-glass-aurora-board to restyle this dashboard with a premium glass UI.
```

## Design Notes

This style works best for premium dashboards, AI tools, launchers, polished settings surfaces, and concept demos where luminous atmosphere should still support real product interaction.
