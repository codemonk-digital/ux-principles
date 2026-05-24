# ux-principles

UX principles is a small skill for applying humane, cross-product UX judgment to user-facing product work.

## Skills

- `ux-principles` - Apply practical UX principles while designing, changing, reviewing, or explaining product surfaces.

## Usage

Install this plugin from a compatible marketplace, then invoke:

```plain text
/ux-principles:ux-principles
```

In tools that allow short skill names, this may also be available as:

```plain text
/ux-principles
```

## Codex

Codex plugin metadata lives in:

```plain text
.codex-plugin/plugin.json
```

The repository-level Codex marketplace is:

```plain text
../../.agents/plugins/marketplace.json
```

## Synapse and Claude Code

Synapse-compatible plugin metadata lives in:

```plain text
.claude-plugin/plugin.json
```

The repository-level Claude Code / Synapse marketplace is:

```plain text
../../.claude-plugin/marketplace.json
```

The skill itself lives at:

```plain text
skills/ux-principles/SKILL.md
```

## Manifest convention

This plugin does not keep a root-level `plugin.json`. The Codex and Claude Code / Synapse manifests are separate on purpose so each runtime can read the shape it expects without duplicate root metadata drifting out of sync.
