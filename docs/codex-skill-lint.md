# Codex Skill Lint

`codex-skill-lint` validates Codex skill packs so maintainers can review structure, metadata, optional design tokens, synced references, and gallery links before merging.

## Profiles

`codex-skill-lint` supports two profiles:

| Profile | Use when | Checks |
| --- | --- | --- |
| `ui-board-repo` | Validating this full UI board collection | Strict root files, skill files, screenshots, package metadata, tokens, synced references, and gallery links |
| `skill-pack` | Validating a portable Codex skill repository | `SKILL.md` discovery, frontmatter metadata, optional package metadata, and optional token files |

The default profile is `ui-board-repo`.

## Run Locally

Run the full repository validation:

```sh
npm run validate
```

Run explicit profiles:

```sh
npm run check:ui-board
npm run check:skill-pack
```

Run a focused check:

```sh
npm run check:structure
npm run check:tokens
npm run check:sync
npm run check:gallery
```

Run the CLI entry point directly:

```sh
node scripts/validate-repo.mjs --root . --profile ui-board-repo --tokens --sync
node scripts/validate-repo.mjs --root . --profile skill-pack --structure --tokens
```

## Use as a GitHub Action

Use this repository as a reusable action in a Codex skill pack:

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
          profile: "skill-pack"
          args: "--structure --tokens"
```

Use the strict UI board profile for repositories that follow this project's layout:

```yaml
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

## What It Checks

The `ui-board-repo` profile checks:

- required repository files
- required skill files
- package names and skill names
- design token JSON shape
- screenshot assets
- synced `codex-skill/references/` files
- local links in the static gallery

The `skill-pack` profile checks:

- a root `SKILL.md`, `codex-skill/SKILL.md`, or skill folders with either layout
- kebab-case skill names
- descriptive skill frontmatter
- optional package names and versions when `package.json` exists
- optional `*.tokens.json` files when they exist

## Publish to npm

The repository includes a manual `Publish npm Package` workflow. It runs with `dry_run: true` by default, validates the repository, verifies tarball contents with `npm pack --dry-run`, and then runs `npm publish --dry-run --access public`.

For a real publish, add an `NPM_TOKEN` repository secret and dispatch the workflow with `dry_run: false`. The real publish step uses npm provenance.

You can run the local dry-run check with:

```sh
npm run check:npm
```

## Maintainer Value

The action turns manual review steps into repeatable checks. Maintainers can ask contributors to fix validation failures before spending review time on visual quality, accessibility, or product fit.
