# UX principles

A small Codex and Synapse-compatible plugin for applying humane, cross-product UX principles while working on frontend features and user-facing product surfaces.

It is intentionally practical rather than exhaustive. The skill helps an agent pause before making user-facing changes and ask:

- What is the user trying to do?
- What work could they lose?
- What state does the system own, and what state does the user own?
- What needs confirmation before it becomes real?
- What words would a helpful person use here?

## Use cases

Use this skill when working on:

- frontend features
- UX decisions
- product copy
- forms and editable surfaces
- autosave and save flows
- generated artifacts and previews
- loading, saving, and error states
- accessibility and interaction polish

## Installation

This repository supports two installation shapes:

- As a plain Codex skill from the root `SKILL.md`.
- As a plugin marketplace containing `plugins/ux-principles`.

### Codex plugin marketplace

Codex-compatible plugin metadata is available at:

```plain text
.agents/plugins/marketplace.json
plugins/ux-principles/.codex-plugin/plugin.json
```

The installable plugin is `ux-principles`.

### Synapse / Claude Code marketplace

Synapse-compatible marketplace metadata is available at:

```plain text
.claude-plugin/marketplace.json
plugins/ux-principles/.claude-plugin/plugin.json
```

The skill itself lives at:

```plain text
plugins/ux-principles/skills/ux-principles/SKILL.md
```

### Validation

Run the local structural validator with:

```bash
npm test
```

## License

MIT
