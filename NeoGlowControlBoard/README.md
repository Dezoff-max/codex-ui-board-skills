# Neo Glow Control Board

A portable neo-glow control-board UI kit and Codex skill. It is built around calm light or dark neutral surfaces, compact technical modules, vertical icon rails, and blue/cyan glow reserved for meaningful active states.

![Neo Glow Control Board light preview](./screenshots/neo-glow-control-board-light.png)

## What's Included

- Dual-theme design tokens
- `NeoGlowControlBoard.css` with luminous controls, rails, cards, inputs, toggles, sliders, and state samples
- `NeoGlowControlBoard.tokens.json` for design-system handoff
- `tailwind.preset.cjs` for Tailwind projects
- `preview.html` with a complete control-board reference
- `codex-skill/` for installing the system as a Codex skill

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
<link rel="stylesheet" href="./NeoGlowControlBoard.css">
```

## Install the Codex Skill

```sh
mkdir -p ~/.codex/skills
cp -R codex-skill ~/.codex/skills/neo-glow-control-board
```

Then use it in Codex:

```text
Use $neo-glow-control-board to create a dense settings or control surface.
```

## Design Notes

The base interface should stay quiet and structured. Glow is an interaction signal for active rails, selected chips, focused fields, loading states, and primary actions.
