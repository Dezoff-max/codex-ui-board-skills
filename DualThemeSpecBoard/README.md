# Dual Theme Spec Board

A shareable dual-theme UI kit and Codex skill for structured product interfaces. It is designed for dashboards, admin panels, workspaces, configuration flows, settings screens, and handoff boards that need the same component system in both light and dark themes.

![Dual Theme Spec Board light preview](./screenshots/dual-theme-spec-board-light.png)

## What's Included

- Light and dark themes powered by shared semantic tokens
- Component CSS for surfaces, buttons, inputs, navigation, data display, and feedback states
- `DualThemeSpecBoard.tokens.json` for design-token handoff
- `tailwind.preset.cjs` for Tailwind projects
- `preview.html` with a complete UI state board
- `codex-skill/` for installing the system as a Codex skill

## Preview

Open the preview directly in a browser:

```sh
open preview.html
```

Theme-specific URLs:

```text
preview.html?theme=light
preview.html?theme=dark
```

## Use the CSS

```html
<link rel="stylesheet" href="./DualThemeSpecBoard.css">
```

Set the theme on the root container:

```html
<body class="dt-theme" data-theme="dark">
```

or:

```html
<body class="dt-theme" data-theme="light">
```

## Install the Codex Skill

```sh
mkdir -p ~/.codex/skills
cp -R codex-skill ~/.codex/skills/dual-theme-spec-board
```

Then use it in Codex:

```text
Use $dual-theme-spec-board to create or restyle this product interface.
```

## Design Notes

The system uses one semantic component model across both themes. Light and dark modes switch token values only, which keeps hierarchy, interaction states, spacing, radii, and component behavior consistent.
