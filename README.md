# Codex UI Board Skills

Reusable Codex UI board skills for building polished dual-theme interface systems.

This repository collects open-source Codex skills that package visual direction, design tokens, CSS, Tailwind presets, screenshots, documentation, and standalone HTML previews. The goal is to make it easier to start high-quality SaaS dashboards, admin panels, AI tools, internal tools, and productivity apps with a coherent light and dark design system.

## Why This Exists

Great UI work is easier when the starting point is concrete. A reusable Codex skill can give an agent a complete visual language: the token model, component behavior, preview surface, and implementation references needed to build consistently.

This project exists to provide practical, inspectable UI starter kits for Codex-driven frontend work. Each skill is designed to be copied, installed, previewed, and adapted without requiring a build step.

## Why This Matters for OSS Maintainers

Maintainers spend review time on repeated frontend questions: whether a UI has enough states, whether tokens are synced, whether screenshots match the implementation, and whether a contribution follows the project's skill structure.

Codex UI Board Skills turns those checks into reusable assets and automation:

- speeds up UI pull request review with concrete visual references
- standardizes Codex skill structure across contributors
- reduces manual design-token and reference-file checks
- gives maintainers a repeatable GitHub Action for validating skill packs
- makes release notes, examples, screenshots, and gallery links easier to audit

## Who This Is For

This project is useful for:

- developers using Codex to build or restyle product interfaces
- designers and frontend engineers who want reusable design-system starter kits
- open-source maintainers documenting Codex skills
- teams prototyping SaaS dashboards, admin panels, AI tools, internal tools, and productivity apps
- contributors who want to add new UI board skills with clear structure and expectations

## Included Skills

| Skill | Folder | Best for | Style language |
| --- | --- | --- | --- |
| Dual Theme Spec Board | [`DualThemeSpecBoard`](./DualThemeSpecBoard) | SaaS dashboards, admin tools, workspaces, settings screens | Structured light/dark product UI with broad state coverage |
| Liquid Glass Aurora Board | [`LiquidGlassAuroraBoard`](./LiquidGlassAuroraBoard) | Premium dashboards, AI tools, launchers, glossy settings surfaces | Frosted glass panels, aurora glow, translucent controls |
| Neo Glow Control Board | [`NeoGlowControlBoard`](./NeoGlowControlBoard) | Dense control boards, technical admin panels, QA/spec screens | Compact surfaces with blue/cyan glow on meaningful states |
| Soft Neumorphic Dual Theme Board | [`SoftNeumorphicDualThemeBoard`](./SoftNeumorphicDualThemeBoard) | Dashboards, productivity tools, internal apps, calm workspaces | Tactile soft-neumorphic surfaces in light and dark themes |

## Screenshots

Each skill includes light and dark screenshots in its `screenshots/` folder.

| Skill | Light | Dark |
| --- | --- | --- |
| [Dual Theme Spec Board](./DualThemeSpecBoard) | <img src="./DualThemeSpecBoard/screenshots/dual-theme-spec-board-light.png" alt="Dual Theme Spec Board light preview" width="360"> | <img src="./DualThemeSpecBoard/screenshots/dual-theme-spec-board-dark.png" alt="Dual Theme Spec Board dark preview" width="360"> |
| [Liquid Glass Aurora Board](./LiquidGlassAuroraBoard) | <img src="./LiquidGlassAuroraBoard/screenshots/liquid-glass-aurora-board-light.png" alt="Liquid Glass Aurora Board light preview" width="360"> | <img src="./LiquidGlassAuroraBoard/screenshots/liquid-glass-aurora-board-dark.png" alt="Liquid Glass Aurora Board dark preview" width="360"> |
| [Neo Glow Control Board](./NeoGlowControlBoard) | <img src="./NeoGlowControlBoard/screenshots/neo-glow-control-board-light.png" alt="Neo Glow Control Board light preview" width="360"> | <img src="./NeoGlowControlBoard/screenshots/neo-glow-control-board-dark.png" alt="Neo Glow Control Board dark preview" width="360"> |
| [Soft Neumorphic Dual Theme Board](./SoftNeumorphicDualThemeBoard) | <img src="./SoftNeumorphicDualThemeBoard/screenshots/soft-neumorphic-board-light.png" alt="Soft Neumorphic Dual Theme Board light preview" width="360"> | <img src="./SoftNeumorphicDualThemeBoard/screenshots/soft-neumorphic-board-dark.png" alt="Soft Neumorphic Dual Theme Board dark preview" width="360"> |

## Live Example

- [SubPulse](https://subpulse.netlify.app/) is a public example of the Soft Neumorphic Dual Theme Board visual direction applied to a subscription calendar and spending analytics product site.

## Installation

Clone the repository:

```sh
git clone https://github.com/Dezoff-max/codex-ui-board-skills.git
cd codex-ui-board-skills
```

Install all skills into your local Codex skills directory:

```sh
mkdir -p ~/.codex/skills
cp -R DualThemeSpecBoard/codex-skill ~/.codex/skills/dual-theme-spec-board
cp -R LiquidGlassAuroraBoard/codex-skill ~/.codex/skills/liquid-glass-aurora-board
cp -R NeoGlowControlBoard/codex-skill ~/.codex/skills/neo-glow-control-board
cp -R SoftNeumorphicDualThemeBoard/codex-skill ~/.codex/skills/soft-neumorphic-dual-theme-board
```

Install one skill only:

```sh
mkdir -p ~/.codex/skills
cp -R NeoGlowControlBoard/codex-skill ~/.codex/skills/neo-glow-control-board
```

## Local Preview

Every skill has a standalone `preview.html` that can be opened directly:

```sh
open LiquidGlassAuroraBoard/preview.html
```

Most previews support theme query parameters:

```text
preview.html?theme=light
preview.html?theme=dark
```

Some previews also support capture-safe URLs for screenshots:

```text
preview.html?theme=light&capture=1
preview.html?theme=dark&capture=1
```

## Static Gallery

The repository includes a static gallery for GitHub Pages:

```sh
open index.html
```

After the Pages workflow is enabled on `main`, the expected public URL is:

```text
https://dezoff-max.github.io/codex-ui-board-skills/
```

Live gallery: <https://dezoff-max.github.io/codex-ui-board-skills/>

## Quality Checks

Run the repository validation before opening a pull request or release:

```sh
npm run validate
```

Run the same checks explicitly through the strict UI board profile:

```sh
npm run check:ui-board
```

Run the portable profile that external Codex skill packs can reuse:

```sh
npm run check:skill-pack
```

The validation checks:

- required repository and skill files
- valid `package.json` and `*.tokens.json` files
- skill names matching package names
- screenshot asset presence
- synced `codex-skill/references/` files

## Codex Skill Lint Action

This repository also ships `codex-skill-lint`, a CLI entry point and reusable GitHub Action for checking Codex skill packs.

It includes two profiles:

- `ui-board-repo` for this repository's full UI board layout
- `skill-pack` for portable Codex skill repositories that may only contain `SKILL.md`, optional `package.json`, and optional `*.tokens.json` files

Use it in a workflow:

```yaml
name: Codex Skill Lint

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6.0.3
      - uses: Dezoff-max/codex-ui-board-skills@v1.0.0
        with:
          root: "."
          profile: "ui-board-repo"
```

Run only selected checks:

```yaml
- uses: Dezoff-max/codex-ui-board-skills@v1.0.0
  with:
    root: "."
    profile: "ui-board-repo"
    args: "--structure --tokens"
```

Use the portable profile in another Codex skill repository:

```yaml
- uses: Dezoff-max/codex-ui-board-skills@v1.0.0
  with:
    root: "."
    profile: "skill-pack"
    args: "--structure --tokens"
```

See [docs/codex-skill-lint.md](./docs/codex-skill-lint.md) for full usage.

## Codex Prompt Examples

Use the skills directly in Codex prompts:

```text
Use $dual-theme-spec-board to design a settings dashboard with light and dark themes.
```

```text
Use $liquid-glass-aurora-board to restyle this AI workspace with premium glass surfaces.
```

```text
Use $neo-glow-control-board to create a dense admin panel with clear active states.
```

```text
Use $soft-neumorphic-dual-theme-board to build a calm productivity dashboard.
```

Good prompts usually include:

- the target product surface
- the desired theme behavior
- any existing design constraints
- whether the result should be a full page, component set, or focused restyle

## Examples

- [Install skills in Codex](./examples/install-skills.md)
- [Frontend PR workflow with before/after screenshots](./examples/frontend-pr-workflow/README.md)
- [Detailed Codex prompt examples](./docs/EXAMPLE_PROMPTS.md)
- [SubPulse live site using the Soft Neumorphic Dual Theme Board visual direction](https://subpulse.netlify.app/)

## Repository Structure

```text
.
├── DualThemeSpecBoard/
├── LiquidGlassAuroraBoard/
├── NeoGlowControlBoard/
├── SoftNeumorphicDualThemeBoard/
├── index.html
├── site.css
├── action.yml
├── CHANGELOG.md
├── MAINTAINERS.md
├── docs/
├── examples/
├── ROADMAP.md
├── RELEASE_CHECKLIST.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── package.json
├── scripts/
├── AGENTS.md
└── .github/
```

Each skill folder follows this pattern:

```text
SkillName/
├── README.md
├── package.json
├── preview.html
├── index.css
├── SkillName.css
├── SkillName.tokens.json
├── tailwind.preset.cjs
├── screenshots/
└── codex-skill/
    ├── SKILL.md
    ├── agents/
    ├── assets/
    └── references/
```

## Use CSS Directly

Copy or link a skill stylesheet into a frontend project:

```html
<link rel="stylesheet" href="./NeoGlowControlBoard.css">
```

Then use the preview and CSS class names as the implementation reference. The CSS is intended to be readable and portable.

## Use Tailwind Presets

Each skill includes a `tailwind.preset.cjs` file that maps the skill's design tokens into Tailwind-friendly values.

Example:

```js
module.exports = {
  presets: [require("./NeoGlowControlBoard/tailwind.preset.cjs")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

Use the preset when you want the token system available inside an existing Tailwind project. Use the plain CSS when you want a standalone implementation reference.

## Maintainer and Quality Docs

This repository includes lightweight maintainer documentation for reviewing and expanding the skill collection:

- [Skill comparison guide](./docs/SKILL_COMPARISON.md)
- [Example Codex prompts](./docs/EXAMPLE_PROMPTS.md)
- [Accessibility checklist](./docs/ACCESSIBILITY_CHECKLIST.md)
- [Maintainer checklist](./docs/MAINTAINER_CHECKLIST.md)

## Roadmap Summary

Near-term roadmap themes:

- improve documentation and screenshot presentation
- maintain the static gallery for GitHub Pages
- add more example prompts for each skill
- keep validation for token files, folder structure, and synced references
- add automated screenshot generation
- expand the collection with more specialized UI board skills
- add accessibility and quality checklists

See [ROADMAP.md](./ROADMAP.md) for the full roadmap.
See [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) before publishing a tag, package, or public release.

## Contributing

Contributions are welcome. Useful contributions include:

- improving documentation
- adding screenshots or examples
- tightening accessibility guidance
- improving design token consistency
- adding new UI board skills
- improving Tailwind preset documentation

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## How Codex Can Help Maintain This Project

Codex can help with:

- adding new skills from a documented visual direction
- keeping `preview.html`, CSS, tokens, and `codex-skill/references/` in sync
- generating example prompts and usage documentation
- checking for broken links and missing screenshots
- drafting issue templates, roadmap updates, and release notes
- reviewing whether a new skill follows the existing repository conventions

When using Codex in this repository, keep changes small, inspectable, and grounded in the existing folder structure.

## License

MIT License. See [LICENSE](./LICENSE).
