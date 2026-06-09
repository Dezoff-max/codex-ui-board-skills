# Maintainer Checklist

Use this checklist before merging a skill update, publishing screenshots, or preparing a release.

## Skill Folder

- [ ] The top-level skill folder uses PascalCase.
- [ ] The installed Codex skill name in `codex-skill/SKILL.md` uses kebab-case.
- [ ] `preview.html`, CSS, tokens, Tailwind preset, screenshots, and `codex-skill/references/` are present.
- [ ] The skill README explains what the skill is for, how to preview it, and how to install it.
- [ ] The `codex-skill/references/` files match the top-level implementation files.

## Preview

- [ ] `preview.html` opens locally without a build step.
- [ ] Light and dark theme URLs work when supported.
- [ ] The preview demonstrates foundations, controls, navigation, data display, and feedback states where relevant.
- [ ] The preview avoids remote scripts unless they are clearly justified.
- [ ] The UI copy is realistic, concise, and in English.

## Design Tokens

- [ ] Token names are semantic rather than one-off visual descriptions.
- [ ] Light and dark values are present for dual-theme skills.
- [ ] Surface, text, border, accent, radius, shadow, and spacing tokens are covered where relevant.
- [ ] CSS variables and Tailwind preset values stay aligned with the token file.

## Screenshots

- [ ] Light screenshot is current.
- [ ] Dark screenshot is current.
- [ ] Screenshots show the full preview or a representative top section.
- [ ] Screenshot file names are descriptive and stable.
- [ ] README references screenshot paths that exist in the repository.

## Documentation

- [ ] Root README is still accurate.
- [ ] Skill README is updated.
- [ ] Example prompts are updated when a skill changes.
- [ ] Accessibility notes are updated when interaction patterns change.
- [ ] ROADMAP items are checked only after the work is actually present.

## Release Readiness

- [ ] No unrelated files are included.
- [ ] No generated system clutter is committed.
- [ ] No fake metrics, badges, downloads, CI claims, or production adoption claims were added.
- [ ] The repository remains useful when cloned and inspected offline.
- [ ] The change can be explained clearly in a short release note.

