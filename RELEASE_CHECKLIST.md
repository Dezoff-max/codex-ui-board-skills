# Release Checklist

Use this checklist before publishing a tag, GitHub release, npm package, or public announcement.

## Pre-Release Validation

- [ ] Run `npm run validate`.
- [ ] Open each `preview.html` locally and test light and dark themes.
- [ ] Confirm screenshots are current when visual output changed.
- [ ] Confirm `codex-skill/references/` files match the top-level skill files.
- [ ] Review `README.md`, skill READMEs, and `ROADMAP.md` for stale claims.
- [ ] Check that no secrets, private data, generated clutter, or unrelated files are included.

## Release Notes

- [ ] Summarize what changed and why it matters for Codex users.
- [ ] List added, changed, fixed, and documentation updates.
- [ ] Mention validation status, screenshot updates, and compatibility notes.
- [ ] Link relevant issues or pull requests.

## GitHub Release

- [ ] Create a version tag such as `v1.0.0`.
- [ ] Publish a GitHub release with screenshots or preview links.
- [ ] Mark follow-up issues for unfinished roadmap items.
- [ ] Verify that the default branch CI passes after the release commit.

## Optional Package Publishing

- [ ] Decide whether to publish one collection package or individual skill packages.
- [ ] Confirm package names, descriptions, keywords, exports, and files.
- [ ] Run `npm pack --dry-run` for every package that will be published.
- [ ] Publish only packages that have accurate install documentation.

## Post-Release Maintenance

- [ ] Update `ROADMAP.md` with completed release work.
- [ ] Open issues for the next small contributor-friendly improvements.
- [ ] Share the release link in the project README, profile README, or community channels.
