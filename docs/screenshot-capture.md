# Screenshot Capture

The repository includes a Playwright-based screenshot generator for each standalone `preview.html`.

## Local Setup

Install Playwright without changing `package.json`:

```sh
npm install --no-save --no-package-lock playwright@1.60.0
npx playwright install chromium
```

Preview the capture plan:

```sh
npm run capture:screenshots:dry-run
```

Capture all light and dark previews into each skill's `screenshots/` folder:

```sh
npm run capture:screenshots
```

Capture into a temporary directory instead of updating tracked screenshots:

```sh
npm run capture:screenshots -- --output-dir dist/screenshots
```

## Focused Capture

Capture one skill:

```sh
npm run capture:screenshots -- --skill NeoGlowControlBoard
```

Capture one theme:

```sh
npm run capture:screenshots -- --theme dark
```

Set a custom viewport:

```sh
npm run capture:screenshots -- --viewport 1440x1200
```

## GitHub Action

The `Capture Screenshots` workflow runs on pull requests that change preview, CSS, token, or capture-script files. It stores generated screenshots as a `preview-screenshots` artifact so maintainers can inspect visual output without automatically committing generated PNG files.

The workflow can also be started manually from the Actions tab.
