# ❤️ OpenClaw HEARTBEAT

## Purpose
This document defines the health checks, expected behavior, and recovery steps for the OpenClaw Gateway and Control UI.

---

## 🩺 System Components

| Component      | Default Port | Expected State |
|---------------|-------------|----------------|
| Control UI    | 18789       | Running       |
| Gateway       | 18790       | Running       |

---

## 🔍 Health Check

### 1. Control UI
- URL: http://localhost:18789
- Status Indicator (top right):
  - 🟢 Online → OK
  - 🔴 Offline → Gateway issue

### 2. Gateway Process

Check if running:

```bash
ps aux | grep openclaw
