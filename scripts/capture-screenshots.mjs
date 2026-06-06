#!/usr/bin/env node

import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const defaultRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const themes = ["light", "dark"];
const skills = [
  { dir: "DualThemeSpecBoard", outputPrefix: "dual-theme-spec-board" },
  { dir: "LiquidGlassAuroraBoard", outputPrefix: "liquid-glass-aurora-board" },
  { dir: "NeoGlowControlBoard", outputPrefix: "neo-glow-control-board" },
  { dir: "SoftNeumorphicDualThemeBoard", outputPrefix: "soft-neumorphic-board" }
];

let root = defaultRoot;
let outputDir = "";
let selectedSkills = new Set();
let selectedThemes = new Set(themes);
let viewport = { width: 1280, height: 1200 };
let waitMs = 500;
let dryRun = false;

function printHelp() {
  console.log(`capture-screenshots

Usage:
  node scripts/capture-screenshots.mjs [--root <path>] [--output-dir <path>] [--skill <folder>] [--theme <light|dark|all>] [--viewport <width>x<height>] [--wait-ms <number>] [--dry-run]

Options:
  --root <path>        Repository root. Defaults to this package root.
  --output-dir <path>  Write screenshots under this directory, grouped by skill folder.
                       Defaults to each skill's screenshots/ folder.
  --skill <folder>     Capture one skill folder. Can be passed more than once.
  --theme <value>      Capture light, dark, or all themes. Defaults to all.
  --viewport <size>    Browser viewport such as 1280x1200. Defaults to 1280x1200.
  --wait-ms <number>   Wait after page load before capture. Defaults to 500.
  --dry-run            Print the capture plan without launching a browser.
`);
}

function exitUsage(message) {
  console.error(`ERROR ${message}\n`);
  printHelp();
  process.exit(2);
}

function readNextArg(args, index, flag) {
  const nextArg = args[index + 1];
  if (!nextArg || nextArg.startsWith("--")) {
    exitUsage(`${flag} requires a value.`);
  }
  return nextArg;
}

function parseTheme(value) {
  if (value === "all") {
    selectedThemes = new Set(themes);
    return;
  }

  if (!themes.includes(value)) {
    exitUsage(`Unsupported theme: ${value}`);
  }

  selectedThemes = new Set([value]);
}

function parseViewport(value) {
  const match = value.match(/^(\d+)x(\d+)$/);
  if (!match) {
    exitUsage("--viewport must use <width>x<height>, for example 1280x1200.");
  }

  viewport = {
    width: Number(match[1]),
    height: Number(match[2])
  };
}

const args = process.argv.slice(2);
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--root") {
    root = resolve(readNextArg(args, index, arg));
    index += 1;
  } else if (arg.startsWith("--root=")) {
    root = resolve(arg.slice("--root=".length));
  } else if (arg === "--output-dir") {
    outputDir = resolve(readNextArg(args, index, arg));
    index += 1;
  } else if (arg.startsWith("--output-dir=")) {
    outputDir = resolve(arg.slice("--output-dir=".length));
  } else if (arg === "--skill") {
    selectedSkills.add(readNextArg(args, index, arg));
    index += 1;
  } else if (arg.startsWith("--skill=")) {
    selectedSkills.add(arg.slice("--skill=".length));
  } else if (arg === "--theme") {
    parseTheme(readNextArg(args, index, arg));
    index += 1;
  } else if (arg.startsWith("--theme=")) {
    parseTheme(arg.slice("--theme=".length));
  } else if (arg === "--viewport") {
    parseViewport(readNextArg(args, index, arg));
    index += 1;
  } else if (arg.startsWith("--viewport=")) {
    parseViewport(arg.slice("--viewport=".length));
  } else if (arg === "--wait-ms") {
    waitMs = Number(readNextArg(args, index, arg));
    if (!Number.isFinite(waitMs) || waitMs < 0) {
      exitUsage("--wait-ms must be a positive number.");
    }
    index += 1;
  } else if (arg.startsWith("--wait-ms=")) {
    waitMs = Number(arg.slice("--wait-ms=".length));
    if (!Number.isFinite(waitMs) || waitMs < 0) {
      exitUsage("--wait-ms must be a positive number.");
    }
  } else if (arg === "--dry-run") {
    dryRun = true;
  } else if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  } else {
    exitUsage(`Unknown argument: ${arg}`);
  }
}

const selectedSkillConfigs = skills.filter((skill) => selectedSkills.size === 0 || selectedSkills.has(skill.dir));

if (selectedSkillConfigs.length === 0) {
  exitUsage(`No matching skills found for: ${Array.from(selectedSkills).join(", ")}`);
}

const capturePlan = selectedSkillConfigs.flatMap((skill) => {
  const previewPath = join(root, skill.dir, "preview.html");
  if (!existsSync(previewPath)) {
    throw new Error(`Missing preview: ${skill.dir}/preview.html`);
  }

  return Array.from(selectedThemes).map((theme) => {
    const url = new URL(pathToFileURL(previewPath));
    url.searchParams.set("theme", theme);
    url.searchParams.set("capture", "1");

    const fileName = `${skill.outputPrefix}-${theme}.png`;
    const targetDir = outputDir ? join(outputDir, skill.dir) : join(root, skill.dir, "screenshots");

    return {
      skill: skill.dir,
      theme,
      url: url.href,
      outputPath: join(targetDir, fileName)
    };
  });
});

console.log(`Screenshot capture plan: ${capturePlan.length} file(s), viewport ${viewport.width}x${viewport.height}`);
capturePlan.forEach((item) => {
  console.log(`- ${item.skill} ${item.theme} -> ${item.outputPath}`);
});

if (dryRun) {
  process.exit(0);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (error) {
  console.error("ERROR Playwright is required to capture screenshots.");
  console.error("Install it locally with: npm install --no-save --no-package-lock playwright@1.60.0");
  console.error("Then install Chromium with: npx playwright install chromium");
  console.error(error.message);
  process.exit(1);
}

const browser = await chromium.launch();

try {
  for (const item of capturePlan) {
    mkdirSync(dirname(item.outputPath), { recursive: true });

    const page = await browser.newPage({ viewport });
    await page.goto(item.url, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(waitMs);
    await page.screenshot({ path: item.outputPath, fullPage: true });
    await page.close();

    console.log(`Wrote ${item.outputPath}`);
  }
} finally {
  await browser.close();
}
