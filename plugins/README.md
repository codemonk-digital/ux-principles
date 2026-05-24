# Plugins

Each subdirectory is a self-contained, independently installable plugin.

## Plugin Catalog

| Plugin | Description | Skills | Commands |
| --- | --- | --- | --- |
| `ux-principles` | Cross-product UX principles for frontend features, product copy, forms, generated artifacts, previews, errors, loading states, accessibility, and other user-facing product surfaces. | 1 | - |

## Plugin Structure

```plain text
{plugin-name}/
  .codex-plugin/
    plugin.json
  .claude-plugin/
    plugin.json
  skills/
    {skill-name}/
      SKILL.md
```

## Installing Locally

For Codex-compatible plugin installation, use the repo-local marketplace at:

```plain text
.agents/plugins/marketplace.json
```

For Synapse or Claude Code-compatible marketplace installation, use:

```plain text
.claude-plugin/marketplace.json
```
