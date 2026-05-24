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

This repository supports three installation shapes:

- As a plain Codex skill from the root `SKILL.md`.
- As a Codex plugin marketplace containing `plugins/ux-principles`.
- As a Claude Code / Synapse-style plugin marketplace containing `plugins/ux-principles`.

Start by cloning the repository:

```bash
git clone https://github.com/codemonk-digital/ux-principles.git
cd ux-principles
```

### Plain Codex skill

Use the root `SKILL.md` directly if your agent runtime supports installing a skill from a local folder or repository path.

### Codex plugin marketplace

Codex-compatible plugin metadata is available at these paths:

```plain text
.agents/plugins/marketplace.json
plugins/ux-principles/.codex-plugin/plugin.json
```

Add the marketplace file to Codex, then install the `ux-principles` plugin from that marketplace.

### Claude Code / Synapse plugin marketplace

Claude Code / Synapse-compatible marketplace metadata is available at these paths:

```plain text
.claude-plugin/marketplace.json
plugins/ux-principles/.claude-plugin/plugin.json
```

Add the marketplace file to the compatible runtime, then install the `ux-principles` plugin from that marketplace.

The skill itself lives at:

```plain text
plugins/ux-principles/skills/ux-principles/SKILL.md
```

### Plugin layout

There is intentionally no root-level `plugins/ux-principles/plugin.json`. The plugin manifests live exclusively in:

```plain text
plugins/ux-principles/.codex-plugin/plugin.json
plugins/ux-principles/.claude-plugin/plugin.json
```

### Validation

Run the local structural validator with:

```bash
npm test
```

## License

MIT
