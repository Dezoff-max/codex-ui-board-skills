# Contributing

Thanks for your interest in improving Codex UI Board Skills. This project is meant to be practical, readable, and easy to adapt.

## Ways to Contribute

You can help by:

- improving documentation
- adding screenshots or example prompts
- refining CSS, tokens, or Tailwind presets
- improving accessibility guidance
- adding validation scripts
- proposing or building new UI board skills

## New Skill Folder Structure

New skills should follow the existing structure:

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
    │   └── openai.yaml
    ├── assets/
    └── references/
        ├── SkillName.css
        ├── SkillName.tokens.json
        ├── preview.html
        ├── tailwind.preset.cjs
        └── usage.md
```

## Naming Conventions

- Use PascalCase for the top-level skill folder, for example `FinanceDashboardBoard`.
- Use kebab-case for the Codex skill name in `SKILL.md`, for example `finance-dashboard-board`.
- Use clear file names that include the skill name where helpful.
- Keep screenshot names descriptive, for example `finance-dashboard-board-light.png`.

## Preview Requirements

Each skill should include a standalone `preview.html` that:

- works without a build step
- links to local CSS files
- demonstrates light and dark themes when the skill is dual-theme
- shows realistic UI states, not only decorative fragments
- avoids external runtime dependencies unless clearly documented
- includes enough component coverage to guide Codex implementation work

## Design Token Requirements

Each skill should include a `*.tokens.json` file with:

- semantic token names
- light and dark values when applicable
- surface, text, border, accent, radius, shadow, and spacing tokens where relevant
- names that can be mapped into CSS variables and Tailwind presets

Avoid one-off hardcoded values when a semantic token would make the design system clearer.

## Accessibility Expectations

Previews and examples should aim for:

- readable contrast in light and dark themes
- visible focus states
- clear disabled states
- non-color-only status communication where possible
- simple semantic HTML
- reduced visual noise in dense interfaces

This project is still evolving, so accessibility improvements are welcome.

## Validation Checks

Before opening a pull request, run:

```sh
npm run validate
```

This checks folder structure, token JSON, skill/package naming, screenshot assets, and whether `codex-skill/references/` files are in sync with the top-level skill files.

Preview the screenshot capture plan before changing visual assets:

```sh
npm run capture:screenshots:dry-run
```

To regenerate screenshots locally, install Playwright as described in [docs/screenshot-capture.md](./docs/screenshot-capture.md), then run:

```sh
npm run capture:screenshots
```

For a more complete review flow, use [docs/ACCESSIBILITY_CHECKLIST.md](./docs/ACCESSIBILITY_CHECKLIST.md).

## Maintainer Review

Before proposing a larger change, review [docs/MAINTAINER_CHECKLIST.md](./docs/MAINTAINER_CHECKLIST.md). It covers folder structure, preview behavior, design tokens, screenshots, documentation, and release readiness.

## Pull Request Checklist

Before opening a pull request, please check:

- [ ] `npm run validate` passes.
- [ ] Screenshot capture artifact was reviewed when visual output changed.
- [ ] The preview works locally.
- [ ] Light and dark themes were tested when applicable.
- [ ] Documentation was updated.
- [ ] Screenshots were updated if the visual output changed.
- [ ] Accessibility was reviewed.
- [ ] No unrelated files were changed.
- [ ] The skill folder structure remains consistent with the project conventions.
