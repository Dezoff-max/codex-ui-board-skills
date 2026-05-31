# Codex UI Board Skills

A curated set of four shareable Codex skills for building polished dual-theme UI systems. Each package includes a standalone HTML preview, CSS design tokens, a Tailwind preset, screenshots, and an installable `codex-skill` bundle.

## Included Skills

| Skill | Best for | Style language |
| --- | --- | --- |
| [Dual Theme Spec Board](./DualThemeSpecBoard) | SaaS dashboards, admin tools, workspace UI, settings screens | Structured light/dark product UI with full state coverage |
| [Liquid Glass Aurora Board](./LiquidGlassAuroraBoard) | Premium dashboards, AI tools, launchers, glossy settings surfaces | Frosted glass panels, aurora glow, translucent controls |
| [Neo Glow Control Board](./NeoGlowControlBoard) | Dense control boards, technical admin panels, QA/spec screens | Compact surfaces with blue/cyan glow on meaningful states |
| [Soft Neumorphic Dual Theme Board](./SoftNeumorphicDualThemeBoard) | Dashboards, productivity tools, internal apps, calm workspaces | Tactile soft-neumorphic surfaces in light and dark themes |

## Repository Layout

Each skill folder contains:

- `codex-skill/` - the installable Codex skill bundle
- `preview.html` - a standalone browser preview with theme support
- `*.css` - design-system styles and component rules
- `*.tokens.json` - semantic light/dark design tokens
- `tailwind.preset.cjs` - optional Tailwind token bridge
- `screenshots/` - light and dark preview captures

## Install All Skills

From the repository root:

```sh
mkdir -p ~/.codex/skills
cp -R DualThemeSpecBoard/codex-skill ~/.codex/skills/dual-theme-spec-board
cp -R LiquidGlassAuroraBoard/codex-skill ~/.codex/skills/liquid-glass-aurora-board
cp -R NeoGlowControlBoard/codex-skill ~/.codex/skills/neo-glow-control-board
cp -R SoftNeumorphicDualThemeBoard/codex-skill ~/.codex/skills/soft-neumorphic-dual-theme-board
```

After installing, reference a skill in Codex with prompts such as:

```text
Use $liquid-glass-aurora-board to restyle this dashboard.
Use $neo-glow-control-board to create a dense settings panel.
```

## Preview Locally

Open any `preview.html` file directly in a browser:

```sh
open LiquidGlassAuroraBoard/preview.html
```

Most previews support explicit theme URLs:

```text
preview.html?theme=light
preview.html?theme=dark
```

## Use in Frontend Projects

You can copy the CSS directly:

```html
<link rel="stylesheet" href="./NeoGlowControlBoard.css">
```

Or reuse the Tailwind preset when a project already uses Tailwind:

```js
module.exports = {
  presets: [require("./tailwind.preset.cjs")],
};
```

## License

MIT License. See [LICENSE](./LICENSE).
