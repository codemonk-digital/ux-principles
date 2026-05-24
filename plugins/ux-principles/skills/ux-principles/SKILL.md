---
name: ux-principles
description: Use this skill when designing, changing, reviewing, or explaining user-facing product work. Covers frontend features, UX decisions, product copy, forms, autosave, editable surfaces, generated artifacts, previews, errors, loading states, accessibility, and interaction polish.
license: MIT
allowed-tools: []
metadata:
  author: Andrei Gheorghiu / codemonk.digital
  version: "0.1.0"
---

# UX principles

Use this skill as a lightweight UX lens before designing, changing, reviewing, or explaining user-facing product work.

## When to Activate

- Designing, changing, or reviewing a user-facing product surface.
- Writing or improving product copy, empty states, labels, errors, tooltips, or confirmation text.
- Working on forms, autosave, editable surfaces, generated artifacts, previews, loading states, or failed states.
- Reviewing frontend behavior where user work, system state, permissions, configuration, or accessibility could affect trust.
- User says "review the UX", "make this clearer", "polish this flow", "check the copy", or asks for frontend/product judgment.

## How to apply

Before changing a user-facing surface, identify the interaction contract:

- What is the user trying to do?
- What work could they lose?
- What state does the system own, and what state does the user own?
- What needs confirmation before it becomes real?
- What should be visible, disabled, loading, failed, or recoverable?
- What words would a helpful person use here?

Use these principles to shape implementation, product copy, review comments, and test coverage.

## Key Principles

- Write like a helpful person: plain English, sentence case, and actions named after user intent.
- Protect user work: user edits lead, generated artifacts need confirmation, and context should survive movement.
- Make powerful tools humane: show configured features clearly, guide before blocking, and make errors useful.
- Keep feedback close to the task: status, previews, motion, and accessibility are part of the interaction contract.

## User Work Ownership Examples

```typescript
// BAD: A refetch can overwrite the user's in-progress draft.
const [title, setTitle] = useState(reportQuery.data.title);
useEffect(() => {
  setTitle(reportQuery.data.title);
}, [reportQuery.data.title]);

// GOOD: Server state hydrates once; the user-controlled draft leads after editing.
const [draftTitle, setDraftTitle] = useState("");
const [isDirty, setIsDirty] = useState(false);
useEffect(() => {
  if (!isDirty) setDraftTitle(reportQuery.data.title);
}, [reportQuery.data.title, isDirty]);
```

Check for:

- Server acknowledgements, refetches, or retries that replace dirty user input.
- Generated values that silently take ownership of user-authored text.
- Save failures that roll back authored content instead of preserving the draft.

## Product Copy Examples

```plain text
BAD: Submit
GOOD: Create report

BAD: Validation failed
GOOD: Add a report name before creating it.
```

Check for:

- Button text that describes implementation mechanics instead of user intent.
- Errors that omit what happened, what the user can do next, or whether their work is safe.
- Title case, jargon, raw identifiers, or stack traces in non-developer surfaces.

## Product posture

### Use plain English

Prefer clear, accessible, conversational copy over internal terminology, implementation language, or industry jargon. Users should not have to translate the interface before they can act.

Good product copy should say exactly what is needed, use active voice, avoid filler, stay scannable, and sound like a helpful person rather than a system pretending to be important.

### Prefer sentence case

Use sentence case for product UI copy by default.

Avoid title case for headings, buttons, labels, tooltips, empty states, messages, and product-guiding documentation. It can slow reading, feel robotic or ceremonial, create rigid rules, and make localization harder.

Use title case only for proper names, acronyms, established domain terms, imported third-party labels, or specific conventions the user would expect.

### Name actions after user intent

Buttons and tooltips should describe what the user is trying to do, not the implementation step that happens first.

Example: use "Create report" for a control that starts report creation, even if the next step is a preview modal. Preview is part of the creation flow; it is not the user's primary intent.

Use implementation language only where the user is intentionally managing implementation objects, such as JSON, queries, advanced configuration, or developer-facing diagnostics.

### Respect expertise without assuming it

Design for mixed expertise. The common path should be safe, obvious, and approachable. Experienced users should still be able to inspect, repair, and override where the product genuinely needs that power.

## User control and trust

### User edits are sovereign

Treat the user's current edits as the highest-priority state in any editable surface.

When someone types into a form, they are creating work. It may be a short sentence, a detailed note, a pasted analysis, or a carefully revised explanation. Losing that work is not a small UI bug; it tells the user the product may discard their effort without warning, and that breaks trust.

Server data may hydrate a form, acknowledge a save, reject a save, or offer a newer value. It must not silently overwrite text, selections, cursor position, unsaved field values, or in-progress form state once the user has started editing. Persistence should work around the user's draft, not take authority over it.

Default pattern:

```plain text
Server hydrates.
Field leads.
Save follows.
Server acknowledgement does not feed back into the field.
```

Keep separate:

```plain text
serverSnapshot: last known persisted data
draft: user-controlled editable state
saveState: idle | saving | saved | failed
```

On initial load, server data may populate the draft. After the user edits, inputs should bind to the draft, not directly to a server query result. Save success should update status and the clean baseline without replacing the visible draft, moving the cursor, changing selection, or reformatting visible text. Save failure should show a problem and leave the draft untouched.

Dirty fields should only rehydrate through explicit user action, such as reload, refresh, discard, reopen, or another clearly intentional path. External refetches may update safe non-dirty fields, but should never silently replace dirty user input. If remote data differs, show that newer data is available and let the user decide.

Rollback is not the default for authored input. It can make sense for simple reversible actions, such as toggling a star or moving a card. For text and form drafts, rollback means destroying work. Preserve the draft, explain the save problem, and provide retry, refresh, or discard where appropriate.

Important editable forms should cover these regressions:

- User types while save is in flight; the response returns; the field still contains the latest text.
- Cursor and selection survive save acknowledgement.
- Failed save leaves the field value unchanged.
- Out-of-order saves do not let an older response overwrite a newer draft.
- Explicit refresh or discard is the only path that replaces dirty values.

### Working copies beat surprise autosave for complex content

Complex authored content should generally use a working copy and explicit save, publish, or confirmation boundary.

Autosave can be useful for low-risk configuration surfaces, but it should not create noisy history, accidental published changes, or confusing collaboration conflicts.

### AI suggestions need explicit ownership

AI may assist with titles, descriptions, context, summaries, structured inputs, and authored content, but it must not silently take ownership of user-authored work.

If AI is allowed to keep a field updated, that ownership should be visible and user-controlled. A user-authored value should not be overwritten unless the user explicitly re-enables automatic ownership or accepts a proposed change.

### Preview before persisting generated artifacts

Generated or template-derived artifacts should be previewed before they are persisted when creation has meaningful side effects.

The preview should show what will be created and provide a clear confirmation action. No meaningful artifact should be created just because the user opened a preview.

### Preserve context when users move

When users move between surfaces, preserve enough context for them to continue without rebuilding the task mentally. Navigation, modal flows, sidebars, selected records, filters, and return paths should work together.

## Configuration and power

### Visible means configured enough to work

If a feature is visible, its configuration should be sufficient for it to work.

When a configured feature cannot work, prefer a small human-readable local error over hiding the entire surface. A visible failure can help the person using, demoing, or supporting the product recover. A missing feature can make users question whether they are in the right place.

### Prefer semantic controls over raw knobs

When users configure business-facing output, prefer controls that describe meaning rather than low-level mechanics.

Expose the domain decision first. Keep raw configuration secondary for diagnosis, advanced overrides, or development.

### Guide before blocking

Prefer non-blocking guidance over hard validation when a choice is unusual but not invalid.

Block only configurations that are invalid, misleading, destructive, or clearly harmful. If a choice is unavailable in the current context, show it disabled with a clear reason.

### Do not make users diagnose implementation details

Errors should explain what happened, what the user can do next, and whether their work is safe.

Avoid raw identifiers, internal contracts, stack traces, and architecture details unless the user is in an implementation or debugging surface.

### Make the valid path easier than the broken one

Many product failures are contract failures between configuration, data, permissions, backend capability, and UI.

Prefer source-of-truth fixes over local UI heuristics where practical. The UI should guide users and implementers toward valid configuration rather than normalize broken combinations.

### Treat visual symptoms as possible contract problems

A confusing visual symptom is not always a styling issue. Ask whether the underlying contract is wrong: missing capability, unclear source role, invalid data shape, stale state, inaccessible action, or misleading semantics.

## Feedback and presentation

### Show system status clearly

Loading, saving, generating, importing, retrying, and failing should be visible in the surface where the user is working. Feedback should be timely, local to the task, and clear about whether the user can continue.

### Keep preview close to configuration

When an editor controls visual or semantic output, provide a live preview close to the controls. Preview reduces guesswork and makes complex configuration feel editable rather than magical.

### Motion should communicate meaning

Animation should be subtle, professional, and tied to meaning. It should help users understand what changed, where something came from, or how information should be interpreted.

Respect reduced-motion preferences.

### Accessibility is part of the interaction contract

Copy, keyboard flow, focus, contrast, motion, loading states, and error recovery should be considered while designing behavior, not after the feature is visually complete.

## Verification Checklist

- [ ] The user-facing action is named after the user's intent.
- [ ] User-authored work is preserved across saves, refetches, retries, and failures.
- [ ] Generated or template-derived artifacts require explicit confirmation before meaningful persistence.
- [ ] Loading, saving, empty, failed, and disabled states are clear and local to the task.
- [ ] Errors explain what happened, what the user can do next, and whether their work is safe.
- [ ] Keyboard flow, focus, contrast, motion, and accessible names were considered.
- [ ] Tests cover fragile ownership, save, preview, or error-recovery behavior when relevant.

## Platform Notes

This skill is platform-agnostic. In Codex, Claude Code, Synapse, or another agent runtime, map the workflow to the local tool names and permissions available in that environment.

## Resources

| Type | Location | Description | Used for |
| --- | --- | --- | --- |
| repository | `https://github.com/codemonk-digital/ux-principles` | Open source home for this skill and plugin package | Installation, updates, and contribution context |
