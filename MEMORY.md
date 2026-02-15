# 🧠 OpenClaw Workspace Memory

## Purpose

This document defines how persistent memory is stored,
updated, and validated inside this OpenClaw workspace.

Memory ensures continuity across sessions and restarts.

---

# 1️⃣ Memory Scope

Memory applies to:

- Session context
- Long-term project goals
- Persistent configuration decisions
- Environment assumptions
- Known system behaviors

Memory does NOT store:
- Temporary debug logs
- Transient errors
- Sensitive secrets (tokens, passwords)

---

# 2️⃣ Memory Sources

Primary storage locations:

