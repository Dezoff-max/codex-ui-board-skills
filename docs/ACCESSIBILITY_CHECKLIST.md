# Accessibility Checklist

Use this checklist when adding or updating a Codex UI board skill. The goal is not to claim perfect compliance, but to keep every preview practical, readable, and safer to adapt.

## Theme Coverage

- [ ] Light and dark themes both have readable text contrast.
- [ ] Accent colors remain visible against surfaces in both themes.
- [ ] Borders, dividers, and muted text do not disappear in dark mode.
- [ ] Screenshots show the same core UI states in light and dark themes.

## Keyboard and Focus

- [ ] Interactive controls have visible focus states.
- [ ] Buttons, inputs, tabs, toggles, and links can be reached in a logical order.
- [ ] Disabled controls are visibly disabled and not styled like active controls.
- [ ] Hover-only information is also available through visible labels or helper text.

## Semantic HTML

- [ ] The preview uses real buttons for actions.
- [ ] Links are used for navigation.
- [ ] Inputs have visible labels or clear accessible names.
- [ ] Sections use headings in a logical order.
- [ ] Tables, lists, and form groups use appropriate HTML where possible.

## State Communication

- [ ] Error, warning, success, and loading states are not communicated by color alone.
- [ ] Icons that carry meaning have nearby text or labels.
- [ ] Badges and status pills are readable at small sizes.
- [ ] Empty states and helper text are concise and understandable.

## Motion and Visual Load

- [ ] Animations are subtle and do not distract from task completion.
- [ ] Any animated effects can be reduced or avoided in implementation examples.
- [ ] Dense layouts preserve enough spacing for scanning.
- [ ] Decorative effects do not reduce legibility.

## Preview Quality

- [ ] The preview works without a build step.
- [ ] The preview does not require remote scripts for core behavior.
- [ ] The preview does not include unsafe example code.
- [ ] The design remains usable at common desktop widths.
- [ ] Mobile or narrow-width behavior is documented when relevant.

