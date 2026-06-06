# Install Skills in Codex

This example installs one or more UI board skills into a local Codex skills directory.

## Install All Skills

```sh
git clone https://github.com/Dezoff-max/codex-ui-board-skills.git
cd codex-ui-board-skills

mkdir -p ~/.codex/skills
cp -R DualThemeSpecBoard/codex-skill ~/.codex/skills/dual-theme-spec-board
cp -R LiquidGlassAuroraBoard/codex-skill ~/.codex/skills/liquid-glass-aurora-board
cp -R NeoGlowControlBoard/codex-skill ~/.codex/skills/neo-glow-control-board
cp -R SoftNeumorphicDualThemeBoard/codex-skill ~/.codex/skills/soft-neumorphic-dual-theme-board
```

## Install One Skill

```sh
mkdir -p ~/.codex/skills
cp -R NeoGlowControlBoard/codex-skill ~/.codex/skills/neo-glow-control-board
```

## Prompt Codex

```text
Use $neo-glow-control-board to redesign this admin panel as a dense technical control board. Keep the existing routes and data model, but improve hierarchy, active states, and light/dark theme coverage.
```

## Validate Before Sharing

```sh
npm run validate
```

The same validation can run in GitHub Actions through the reusable `Codex Skill Lint` action.
