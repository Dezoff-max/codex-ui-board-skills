# Codex Skill Lint

`codex-skill-lint` validates Codex UI board skill packs so maintainers can review structure, tokens, screenshots, synced references, and gallery links before merging.

## Run Locally

```sh
npm run validate
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
node scripts/validate-repo.mjs --root . --tokens --sync
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
```

Run only selected checks:

```yaml
- uses: Dezoff-max/codex-ui-board-skills@v1.0.0
  with:
    root: "."
    args: "--structure --tokens"
```

## What It Checks

- required repository files
- required skill files
- package names and skill names
- design token JSON shape
- screenshot assets
- synced `codex-skill/references/` files
- local links in the static gallery

## Maintainer Value

The action turns manual review steps into repeatable checks. Maintainers can ask contributors to fix validation failures before spending review time on visual quality, accessibility, or product fit.
