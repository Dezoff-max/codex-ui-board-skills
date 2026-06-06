#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const supportedProfiles = new Set(["ui-board-repo", "skill-pack"]);
const checkFlags = new Set(["--structure", "--tokens", "--sync", "--gallery"]);
const args = process.argv.slice(2);
const requestedChecks = new Set();
let root = defaultRoot;
let profileName = "ui-board-repo";

function printHelp() {
  console.log(`codex-skill-lint

Usage:
  codex-skill-lint [--root <path>] [--profile <name>] [--structure] [--tokens] [--sync] [--gallery]

Profiles:
  ui-board-repo   Strict checks for this repository's UI board skill layout. Default.
  skill-pack      Portable checks for generic Codex skill packs.

Options:
  --root <path>      Repository root to validate. Defaults to this package root.
  --profile <name>   Validation profile: ui-board-repo or skill-pack.
  --structure        Check required repository and skill files.
  --tokens           Check package, skill, and design token metadata.
  --sync             Check codex-skill/references files are synced.
  --gallery          Check local links in index.html.
`);
}

function exitUsage(message) {
  console.error(`ERROR ${message}\n`);
  printHelp();
  process.exit(2);
}

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--root") {
    const nextArg = args[index + 1];
    if (!nextArg || nextArg.startsWith("--")) {
      exitUsage("--root requires a path.");
    }
    root = resolve(nextArg);
    index += 1;
  } else if (arg.startsWith("--root=")) {
    root = resolve(arg.slice("--root=".length));
  } else if (arg === "--profile") {
    const nextArg = args[index + 1];
    if (!nextArg || nextArg.startsWith("--")) {
      exitUsage("--profile requires a profile name.");
    }
    profileName = nextArg;
    index += 1;
  } else if (arg.startsWith("--profile=")) {
    profileName = arg.slice("--profile=".length);
  } else if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  } else if (checkFlags.has(arg)) {
    requestedChecks.add(arg);
  } else {
    exitUsage(`Unknown argument: ${arg}`);
  }
}

if (!supportedProfiles.has(profileName)) {
  exitUsage(`Unsupported profile: ${profileName}`);
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
  ".github/workflows/npm-publish.yml",
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

function relativePath(filePath) {
  return filePath.startsWith(`${root}/`) ? filePath.slice(root.length + 1) : filePath;
}

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function skip(message) {
  console.log(`SKIP ${message}`);
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${relativePath(filePath)} is not valid JSON: ${error.message}`);
    return null;
  }
}

function fileExists(relativeFilePath) {
  return existsSync(join(root, relativeFilePath));
}

function isDirectory(relativeFilePath) {
  const absolutePath = join(root, relativeFilePath);
  return existsSync(absolutePath) && statSync(absolutePath).isDirectory();
}

function skillLabel(skill) {
  return skill.dir === "." ? basename(root) : skill.dir;
}

function skillFile(skill, filePath) {
  return skill.dir === "." ? filePath : `${skill.dir}/${filePath}`;
}

function addSkill(entries, seen, dir, skillMarkdown, layout) {
  const key = `${dir}:${skillMarkdown}`;
  if (seen.has(key)) {
    return;
  }
  seen.add(key);
  entries.push({ dir, skillMarkdown, layout });
}

function discoverSkillEntries() {
  const entries = [];
  const seen = new Set();

  if (profileName === "skill-pack") {
    if (fileExists("SKILL.md")) {
      addSkill(entries, seen, ".", "SKILL.md", "skill-root");
    }

    if (fileExists("codex-skill/SKILL.md")) {
      addSkill(entries, seen, ".", "codex-skill/SKILL.md", "codex-skill-root");
    }
  }

  readdirSync(root)
    .filter((entry) => isDirectory(entry))
    .sort()
    .forEach((entry) => {
      if (profileName === "ui-board-repo") {
        if (fileExists(`${entry}/codex-skill/SKILL.md`)) {
          addSkill(entries, seen, entry, `${entry}/codex-skill/SKILL.md`, "ui-board");
        }
        return;
      }

      if (fileExists(`${entry}/SKILL.md`)) {
        addSkill(entries, seen, entry, `${entry}/SKILL.md`, "skill-folder");
      } else if (fileExists(`${entry}/codex-skill/SKILL.md`)) {
        addSkill(entries, seen, entry, `${entry}/codex-skill/SKILL.md`, "ui-board-folder");
      }
    });

  return entries;
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function readSkillMetadata(skill) {
  const content = readFileSync(join(root, skill.skillMarkdown), "utf8");
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const metadata = {};

  if (!frontmatter) {
    return metadata;
  }

  frontmatter[1].split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      return;
    }

    metadata[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  });

  return metadata;
}

function assertSkillMetadata(skill, expectedName) {
  const metadata = readSkillMetadata(skill);
  const label = skillLabel(skill);

  if (!metadata.name) {
    fail(`${skill.skillMarkdown} is missing frontmatter name`);
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.name)) {
    fail(`${skill.skillMarkdown} name should be kebab-case`);
  } else {
    pass(`${skill.skillMarkdown} has kebab-case name ${metadata.name}`);
  }

  if (expectedName && metadata.name !== expectedName) {
    fail(`${skill.skillMarkdown} name should match ${expectedName}`);
  } else if (expectedName) {
    pass(`${skill.skillMarkdown} name matches ${expectedName}`);
  }

  if (!metadata.description) {
    fail(`${skill.skillMarkdown} is missing frontmatter description`);
  } else if (metadata.description.length < 40) {
    fail(`${skill.skillMarkdown} description should explain when to use the skill`);
  } else {
    pass(`${label} has descriptive skill metadata`);
  }

  return metadata;
}

function discoverTokenFiles(skill) {
  const tokenFiles = [];
  const skillDir = skill.dir === "." ? "" : `${skill.dir}/`;
  const dirPath = join(root, skill.dir);

  readdirSync(dirPath)
    .filter((file) => /\.tokens\.json$/i.test(file))
    .sort()
    .forEach((file) => {
      tokenFiles.push(`${skillDir}${file}`);
    });

  const referencesDir = skillFile(skill, "codex-skill/references");
  if (isDirectory(referencesDir)) {
    readdirSync(join(root, referencesDir))
      .filter((file) => /\.tokens\.json$/i.test(file))
      .sort()
      .forEach((file) => {
        tokenFiles.push(`${referencesDir}/${file}`);
      });
  }

  return tokenFiles;
}

function assertStructure(skillEntries) {
  if (profileName === "ui-board-repo") {
    requiredRootFiles.forEach((file) => {
      fileExists(file) ? pass(`root file exists: ${file}`) : fail(`missing root file: ${file}`);
    });
  } else {
    skip("root file checklist skipped for skill-pack profile");
  }

  if (skillEntries.length === 0) {
    fail(`no skill directories found for ${profileName} profile`);
    return;
  }

  skillEntries.forEach((skill) => {
    const label = skillLabel(skill);

    if (profileName === "skill-pack") {
      fileExists(skill.skillMarkdown)
        ? pass(`skill entry exists: ${skill.skillMarkdown}`)
        : fail(`missing skill entry: ${skill.skillMarkdown}`);
      return;
    }

    requiredSkillFiles(skill.dir).forEach((file) => {
      const relativeFilePath = `${skill.dir}/${file}`;
      fileExists(relativeFilePath)
        ? pass(`skill file exists: ${relativeFilePath}`)
        : fail(`missing skill file: ${relativeFilePath}`);
    });

    const screenshotsDir = join(root, skill.dir, "screenshots");
    if (!existsSync(screenshotsDir)) {
      fail(`missing screenshots directory: ${skill.dir}/screenshots`);
    } else {
      const screenshots = readdirSync(screenshotsDir).filter((file) => /\.(png|jpe?g)$/i.test(file));
      screenshots.length > 0
        ? pass(`${label} has ${screenshots.length} screenshot asset(s)`)
        : fail(`${skill.dir}/screenshots has no PNG or JPG assets`);
    }
  });
}

function assertUiBoardTokens(skillEntries) {
  skillEntries.forEach((skill) => {
    const skillDir = skill.dir;
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

    assertSkillMetadata(skill, packageJson.name);

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

function assertSkillPackTokens(skillEntries) {
  skillEntries.forEach((skill) => {
    const metadata = assertSkillMetadata(skill);
    const label = skillLabel(skill);
    const packagePath = skillFile(skill, "package.json");

    if (fileExists(packagePath)) {
      const packageJson = readJson(join(root, packagePath));
      if (packageJson) {
        if (!packageJson.name) {
          fail(`${packagePath} is missing name`);
        } else if (metadata.name && packageJson.name !== metadata.name && !packageJson.name.endsWith(`/${metadata.name}`)) {
          fail(`${packagePath} name should match skill name ${metadata.name} or a scoped package ending in /${metadata.name}`);
        } else {
          pass(`${packagePath} name is compatible with skill metadata`);
        }

        if (!packageJson.version) {
          fail(`${packagePath} is missing version`);
        } else {
          pass(`${packagePath} has version ${packageJson.version}`);
        }
      }
    } else {
      skip(`${label} has no package.json; package metadata check skipped`);
    }

    const tokenFiles = discoverTokenFiles(skill);
    if (tokenFiles.length === 0) {
      skip(`${label} has no *.tokens.json files; design token check skipped`);
      return;
    }

    tokenFiles.forEach((tokenFile) => {
      const tokensJson = readJson(join(root, tokenFile));
      if (!tokensJson) {
        return;
      }

      if (!tokensJson.name) {
        fail(`${tokenFile} is missing name`);
      } else {
        pass(`${tokenFile} has name`);
      }

      if (tokensJson.themes && typeof tokensJson.themes === "object") {
        pass(`${tokenFile} has themes object`);
      } else {
        skip(`${tokenFile} has no themes object; generic skill-pack profile does not require themes`);
      }
    });
  });
}

function assertTokens(skillEntries) {
  if (profileName === "ui-board-repo") {
    assertUiBoardTokens(skillEntries);
    return;
  }

  assertSkillPackTokens(skillEntries);
}

function assertReferenceSync(skillEntries) {
  if (profileName !== "ui-board-repo") {
    skip("reference sync skipped for skill-pack profile; no standard source/reference pairs");
    return;
  }

  skillEntries.forEach((skill) => {
    referencePairs(skill.dir).forEach(([source, reference]) => {
      const sourcePath = join(root, skill.dir, source);
      const referencePath = join(root, skill.dir, reference);

      if (!existsSync(sourcePath) || !existsSync(referencePath)) {
        fail(`${skill.dir} cannot compare ${source} and ${reference}; one file is missing`);
        return;
      }

      const sourceBytes = readFileSync(sourcePath);
      const referenceBytes = readFileSync(referencePath);

      if (!sourceBytes.equals(referenceBytes)) {
        fail(`${skill.dir} reference is out of sync: ${reference}`);
      } else {
        pass(`${skill.dir} reference is in sync: ${basename(reference)}`);
      }
    });
  });
}

function assertStaticGallery() {
  const galleryPath = join(root, "index.html");

  if (!existsSync(galleryPath)) {
    if (profileName === "skill-pack") {
      skip("gallery check skipped: index.html not present for skill-pack profile");
    } else {
      fail("missing gallery file: index.html");
    }
    return;
  }

  const galleryHtml = readFileSync(galleryPath, "utf8");
  const localReferences = Array.from(galleryHtml.matchAll(/\b(?:src|href)="([^"]+)"/g))
    .map((match) => match[1])
    .filter((reference) => !/^(https?:|mailto:|data:|javascript:|#)/.test(reference))
    .map((reference) => reference.replace(/^\.?\//, "").split(/[?#]/)[0])
    .filter(Boolean);

  if (localReferences.length === 0) {
    skip("gallery has no local references");
    return;
  }

  localReferences.forEach((reference) => {
    fileExists(reference)
      ? pass(`gallery local reference exists: ${reference}`)
      : fail(`gallery local reference is missing: ${reference} (referenced from index.html; add the asset or remove the link)`);
  });
}

const skillEntries = discoverSkillEntries();

if (checks.structure) {
  assertStructure(skillEntries);
}

if (checks.tokens) {
  assertTokens(skillEntries);
}

if (checks.sync) {
  assertReferenceSync(skillEntries);
}

if (checks.gallery) {
  assertStaticGallery();
}

if (failures > 0) {
  console.error(`\n${failures} validation failure(s).`);
  process.exit(1);
}

console.log(`\nValidation passed for ${skillEntries.length} skill directory/directories using ${profileName} profile.`);
