#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const requestedChecks = new Set();
let root = defaultRoot;

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--root") {
    root = resolve(args[index + 1] || ".");
    index += 1;
  } else if (arg.startsWith("--root=")) {
    root = resolve(arg.slice("--root=".length));
  } else if (arg === "--help" || arg === "-h") {
    console.log(`codex-skill-lint

Usage:
  codex-skill-lint [--root <path>] [--structure] [--tokens] [--sync] [--gallery]

Options:
  --root <path>   Repository root to validate. Defaults to this package root.
  --structure     Check required repository and skill files.
  --tokens        Check package, skill, and design token metadata.
  --sync          Check codex-skill/references files are synced.
  --gallery       Check local links in index.html.
`);
    process.exit(0);
  } else {
    requestedChecks.add(arg);
  }
}

const runAll = requestedChecks.size === 0;

const checks = {
  structure: runAll || requestedChecks.has("--structure"),
  tokens: runAll || requestedChecks.has("--tokens"),
  sync: runAll || requestedChecks.has("--sync"),
  gallery: runAll || requestedChecks.has("--gallery")
};

const requiredRootFiles = [
  "README.md",
  "ROADMAP.md",
  "RELEASE_CHECKLIST.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  "AGENTS.md",
  "CHANGELOG.md",
  "MAINTAINERS.md",
  "action.yml",
  "docs/codex-skill-lint.md",
  "examples/install-skills.md",
  "examples/frontend-pr-workflow/README.md",
  ".github/CODEOWNERS",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/feature_request.yml",
  ".github/ISSUE_TEMPLATE/new_skill.yml",
  ".github/workflows/ci.yml",
  ".github/workflows/pages.yml",
  ".github/workflows/codex-skill-lint.yml",
  "index.html",
  "site.css",
  "package.json",
  "scripts/validate-repo.mjs",
  "LICENSE"
];

const requiredSkillFiles = (skillDir) => [
  "README.md",
  "package.json",
  "preview.html",
  "index.css",
  `${skillDir}.css`,
  `${skillDir}.tokens.json`,
  "tailwind.preset.cjs",
  "codex-skill/SKILL.md",
  "codex-skill/agents/openai.yaml",
  "codex-skill/references/usage.md",
  `codex-skill/references/${skillDir}.css`,
  `codex-skill/references/${skillDir}.tokens.json`,
  "codex-skill/references/preview.html",
  "codex-skill/references/tailwind.preset.cjs"
];

const referencePairs = (skillDir) => [
  [`${skillDir}.css`, `codex-skill/references/${skillDir}.css`],
  [`${skillDir}.tokens.json`, `codex-skill/references/${skillDir}.tokens.json`],
  ["preview.html", "codex-skill/references/preview.html"],
  ["tailwind.preset.cjs", "codex-skill/references/tailwind.preset.cjs"]
];

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${filePath.replace(`${root}/`, "")} is not valid JSON: ${error.message}`);
    return null;
  }
}

function fileExists(relativePath) {
  return existsSync(join(root, relativePath));
}

function discoverSkillDirs() {
  return readdirSync(root)
    .filter((entry) => {
      const absolutePath = join(root, entry);
      return statSync(absolutePath).isDirectory() && fileExists(`${entry}/codex-skill/SKILL.md`);
    })
    .sort();
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function assertStructure(skillDirs) {
  requiredRootFiles.forEach((file) => {
    fileExists(file) ? pass(`root file exists: ${file}`) : fail(`missing root file: ${file}`);
  });

  if (skillDirs.length === 0) {
    fail("no skill directories found");
    return;
  }

  skillDirs.forEach((skillDir) => {
    requiredSkillFiles(skillDir).forEach((file) => {
      const relativePath = `${skillDir}/${file}`;
      fileExists(relativePath) ? pass(`skill file exists: ${relativePath}`) : fail(`missing skill file: ${relativePath}`);
    });

    const screenshotsDir = join(root, skillDir, "screenshots");
    if (!existsSync(screenshotsDir)) {
      fail(`missing screenshots directory: ${skillDir}/screenshots`);
    } else {
      const screenshots = readdirSync(screenshotsDir).filter((file) => /\.(png|jpe?g)$/i.test(file));
      screenshots.length > 0
        ? pass(`${skillDir} has ${screenshots.length} screenshot asset(s)`)
        : fail(`${skillDir}/screenshots has no PNG or JPG assets`);
    }
  });
}

function assertTokens(skillDirs) {
  skillDirs.forEach((skillDir) => {
    const packageJson = readJson(join(root, skillDir, "package.json"));
    const tokensJson = readJson(join(root, skillDir, `${skillDir}.tokens.json`));
    if (!packageJson || !tokensJson) {
      return;
    }

    const expectedName = toKebabCase(skillDir);
    if (packageJson.name !== expectedName) {
      fail(`${skillDir}/package.json name should be ${expectedName}`);
    } else {
      pass(`${skillDir}/package.json name matches folder`);
    }

    if (!packageJson.version) {
      fail(`${skillDir}/package.json is missing version`);
    } else {
      pass(`${skillDir}/package.json has version ${packageJson.version}`);
    }

    const skillMarkdown = readFileSync(join(root, skillDir, "codex-skill/SKILL.md"), "utf8");
    const skillName = skillMarkdown.match(/^name:\s*([a-z0-9-]+)/m)?.[1];
    if (skillName !== packageJson.name) {
      fail(`${skillDir}/codex-skill/SKILL.md name should match package name ${packageJson.name}`);
    } else {
      pass(`${skillDir}/codex-skill/SKILL.md name matches package name`);
    }

    if (!tokensJson.name) {
      fail(`${skillDir}.tokens.json is missing name`);
    } else {
      pass(`${skillDir}.tokens.json has name`);
    }

    if (!tokensJson.themes || typeof tokensJson.themes !== "object") {
      fail(`${skillDir}.tokens.json is missing themes object`);
    } else {
      pass(`${skillDir}.tokens.json has themes object`);
    }
  });
}

function assertReferenceSync(skillDirs) {
  skillDirs.forEach((skillDir) => {
    referencePairs(skillDir).forEach(([source, reference]) => {
      const sourcePath = join(root, skillDir, source);
      const referencePath = join(root, skillDir, reference);

      if (!existsSync(sourcePath) || !existsSync(referencePath)) {
        fail(`${skillDir} cannot compare ${source} and ${reference}; one file is missing`);
        return;
      }

      const sourceBytes = readFileSync(sourcePath);
      const referenceBytes = readFileSync(referencePath);

      if (!sourceBytes.equals(referenceBytes)) {
        fail(`${skillDir} reference is out of sync: ${reference}`);
      } else {
        pass(`${skillDir} reference is in sync: ${basename(reference)}`);
      }
    });
  });
}

function assertStaticGallery() {
  const galleryPath = join(root, "index.html");
  const galleryHtml = readFileSync(galleryPath, "utf8");
  const localReferences = Array.from(galleryHtml.matchAll(/\b(?:src|href)="([^"]+)"/g))
    .map((match) => match[1])
    .filter((reference) => !/^(https?:|mailto:|#)/.test(reference))
    .map((reference) => reference.replace(/^\.?\//, "").split(/[?#]/)[0])
    .filter(Boolean);

  localReferences.forEach((reference) => {
    fileExists(reference)
      ? pass(`gallery local reference exists: ${reference}`)
      : fail(`gallery local reference is missing: ${reference}`);
  });
}

const skillDirs = discoverSkillDirs();

if (checks.structure) {
  assertStructure(skillDirs);
}

if (checks.tokens) {
  assertTokens(skillDirs);
}

if (checks.sync) {
  assertReferenceSync(skillDirs);
}

if (checks.gallery) {
  assertStaticGallery();
}

if (failures > 0) {
  console.error(`\n${failures} validation failure(s).`);
  process.exit(1);
}

console.log(`\nValidation passed for ${skillDirs.length} skill directory/directories.`);
