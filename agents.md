---

# 10. `agents.md`

This is important because it is one of the **Advanced Stage 1 requirements**. This should not just be a decorative file. It should genuinely govern how we use ChatGPT, Claude, Gemini and Kimi.

:::writing{variant="document" id="58321" title="agents.md — HNG15 Team Gannet Development Contract"}
# AGENTS.md

## HNG15 Team Gannet — AI Development Contract

This document defines the rules, context, workflow, and quality standards that AI agents must follow when contributing to this project.

The purpose is to ensure that AI-assisted development remains consistent, deliberate, verifiable, and aligned with the actual project requirements.

---

## 1. Project Identity

**Project:** TaskFlow

**Program:** HNG Cohort 15

**Track:** AI Product Builder / Engineer

**Team:** Gannet

**Stage:** Stage 1

**Project Type:** Responsive task management web application

---

## 2. Stage 1 Requirements

The project must satisfy the following HNG Stage 1 requirements:

1. Participant joins an HNG team.
2. Participant joins the team's Telegram group.
3. Build a Todo List using AI.
4. Deploy the Todo List to the web.
5. Advanced: create and use an `agents.md` file to structure AI-assisted development.
6. Advanced: push the project to a private GitHub repository.

Team membership and Telegram participation are external project requirements and are not implemented in this repository.

---

## 3. Product Goal

TaskFlow is a focused task-management application that allows users to:

- create tasks
- assign priority
- complete tasks
- delete tasks
- search tasks
- filter tasks
- clear completed tasks
- view task completion progress
- retain tasks between browser sessions

The product should remain intentionally focused.

Do not add features merely because they are technically possible.

---

## 4. Source-of-Truth Hierarchy

When information conflicts, use this order:

1. Explicit HNG requirements
2. Current project requirements
3. Existing project implementation
4. Documented architecture decisions
5. `agents.md`
6. Agent recommendations
7. General assumptions

AI agents must never silently override a higher-priority source.

If a requirement is ambiguous, identify the ambiguity instead of inventing a requirement.

---

## 5. Core Engineering Principles

### 5.1 No silent assumptions

Never invent:

- requirements
- APIs
- dependencies
- business rules
- user personas
- infrastructure
- credentials
- deployment configuration

If something is unknown, explicitly identify it.

### 5.2 No unnecessary scope

Do not introduce:

- authentication
- backend services
- databases
- state-management frameworks
- unnecessary packages
- AI APIs
- payment systems
- analytics
- notifications

unless a future requirement explicitly justifies them.

### 5.3 Prefer the simplest appropriate solution

The current product does not require React or another frontend framework.

The current architecture therefore uses:

- HTML
- CSS
- modern JavaScript
- browser localStorage

Framework adoption should require an actual product or technical reason.

### 5.4 Do not rewrite working code without justification

Existing working functionality should be preserved unless:

- it contains a defect
- it violates a requirement
- it creates a measurable technical problem
- the architecture explicitly requires a change

When changing an existing implementation, explain why.

---

## 6. Architecture

```text
Browser
  │
  ▼
index.html
  │
  ▼
app.js
  │
  ├── state.js
  │     │
  │     └── storage.js
  │
  └── ui.js
```
