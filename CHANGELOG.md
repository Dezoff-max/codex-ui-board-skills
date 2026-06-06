# Changelog

All notable changes to this project are documented here.

## Unreleased

### Added

- `codex-skill-lint` profiles for strict UI board repositories and portable Codex skill packs.
- Manual npm publishing workflow with a safe dry-run default and npm package content verification.
- Playwright screenshot capture script and workflow artifact generation for preview screenshots.
- npm package name prepared as `codex-skill-lint` for direct `npx codex-skill-lint` usage.

### Changed

- CI now verifies the portable `skill-pack` profile and npm package contents.
- GitHub Action usage examples now document the `profile` input.
- Contributor docs now explain screenshot capture commands and review artifacts.

## v1.0.0 - 2026-06-06

### Added

- Four installable Codex UI board skills:
  - Dual Theme Spec Board
  - Liquid Glass Aurora Board
  - Neo Glow Control Board
  - Soft Neumorphic Dual Theme Board
- Standalone HTML previews for every skill.
- Light and dark screenshots for each board.
- Design tokens, portable CSS, Tailwind presets, and Codex skill references.
- Static GitHub Pages gallery: https://dezoff-max.github.io/codex-ui-board-skills/
- `codex-skill-lint` CLI entry point and reusable GitHub Action.
- Repository validation for skill structure, token metadata, synced references, and gallery links.
- Contributor docs, security policy, release checklist, roadmap, and maintainer templates.

### Maintainer Workflow

- CI validates every push and pull request.
- Pages deploy publishes the static gallery from `main` to `gh-pages`.
- Issue templates capture bug reports, feature requests, and new skill proposals.
- PR template asks contributors to confirm validation, previews, screenshots, and docs.

### Release Assets

- Source archives are available from the GitHub release.
- A packaged ZIP asset should include the skill folders, `action.yml`, `scripts/validate-repo.mjs`, docs, examples, and release notes.
