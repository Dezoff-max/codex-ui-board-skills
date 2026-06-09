# Soft Neumorphic Dual Theme Board

A shareable dual-theme soft-neumorphic UI kit and Codex skill. It is designed for dashboards, SaaS workspaces, internal tools, productivity surfaces, settings panels, and component previews that need tactile depth without visual noise.

![Soft Neumorphic Dual Theme Board light preview](./screenshots/soft-neumorphic-board-light.png)

## What's Included

- Light and dark soft-neumorphic themes
- Shared semantic tokens and CSS variables
- Raised cards, inset fields, tactile buttons, navigation, data display, and feedback patterns
- `SoftNeumorphicDualThemeBoard.tokens.json` for design-token handoff
- `tailwind.preset.cjs` for Tailwind projects
- Standalone `preview.html`
- `codex-skill/` for installing the system as a Codex skill

## Preview

Open the preview directly:

```sh
open preview.html
```

Theme URLs:

```text
preview.html?theme=light
preview.html?theme=dark
```

## Live Example

[SubPulse](https://subpulse.netlify.app/) is a public example of this skill's soft-neumorphic, dual-theme visual direction applied to a subscription calendar and spending analytics product site.

## Use the CSS

```html
<link rel="stylesheet" href="./SoftNeumorphicDualThemeBoard.css">
```

## Install the Codex Skill

```sh
mkdir -p ~/.codex/skills
cp -R codex-skill ~/.codex/skills/soft-neumorphic-dual-theme-board
```

Then use it in Codex:

```text
Use $soft-neumorphic-dual-theme-board to restyle this workspace UI.
```

## Design Notes

The system creates hierarchy through same-tone surfaces, soft shadows, inset fields, spacing, and restrained accent states. Light and dark themes share the same component semantics.
