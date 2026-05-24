---
name: ux-principles
description: Apply cross-product UX principles when working on frontend features, UX decisions, user-facing copy, forms, autosave, editable surfaces, generated artifacts, previews, errors, loading states, accessibility, or any product surface a user directly interacts with.
---

# UX principles

Use this skill as a lightweight UX lens before designing, changing, reviewing, or explaining user-facing product work.

## How to apply

Before changing a user-facing surface, identify the interaction contract:

- What is the user trying to do?
- What work could they lose?
- What state does the system own, and what state does the user own?
- What needs confirmation before it becomes real?
- What should be visible, disabled, loading, failed, or recoverable?
- What words would a helpful person use here?

Use these principles to shape implementation, product copy, review comments, and test coverage.

## At a glance

- Write like a helpful person: plain English, sentence case, and actions named after user intent.
- Protect user work: user edits lead, generated artifacts need confirmation, and context should survive movement.
- Make powerful tools humane: show configured features clearly, guide before blocking, and make errors useful.
- Keep feedback close to the task: status, previews, motion, and accessibility are part of the interaction contract.

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

User-authored edits are the highest-priority state in an editable surface.

Losing edits is not a small UI bug. It tells the user their work may disappear without warning, and that damages trust.

Server data may hydrate a form, acknowledge a save, reject a save, or offer a newer value. It must not silently overwrite text, selections, cursor position, unsaved field values, or in-progress form state once the user has started editing.

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

Save success should update status and the clean baseline without replacing the visible draft. Save failure should show a problem and leave the draft untouched. Dirty fields should only rehydrate by explicit user action, such as reload, refresh, discard, reopen, or another clearly intentional path.

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
