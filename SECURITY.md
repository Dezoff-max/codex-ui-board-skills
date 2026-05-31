# Security Policy

## Scope

Codex UI Board Skills is mostly a static HTML, CSS, design-token, and documentation repository. It does not currently ship a backend service, hosted application, or production runtime.

Security issues may still matter if a contribution introduces:

- unsafe scripts in previews
- malicious or unexpected dependencies
- unsafe examples that encourage credential exposure
- external resource loading that is not clearly documented
- generated files that include secrets or private data

## Reporting a Security Issue

If you find a security concern, please open a GitHub issue with enough detail to reproduce and evaluate the problem.

Do not include secrets, tokens, private keys, or private user data in public reports.

## Maintainer Response

Security reports should be reviewed with priority. If a risky file or example is confirmed, the expected fix is to remove or replace the unsafe behavior and document the safer pattern.
