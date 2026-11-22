# Antigravity Agent Workspace Context: Video Editing Template

Before executing any commands, modifying React components, or rendering video, adhere to:

1. **Primary References:**
   - [**`AGENTS.md`**](file:///D:/mume-video/AGENTS.md): Autonomous agent blueprint, deliver-and-verify loop, and visual choreography principles adapted from `explainroo` and `motion-skills`.
   - [**`README.md`**](file:///D:/mume-video/README.md): Template architecture and usage guide.

2. **Core Guidelines:**
   - **Prerequisite Skills Check:** All skills are required to maximize the full potential of this template. Before starting any video editing, verify and install all necessary motion design skills (e.g., `kinetic-typography-skills`, `data-animation-skills`, `explainer-video-skills`, `motion-design-skills`, `ad-video-skills`, and beat-sync/visual QA tools) in `.gemini/skills/` or workspace skills.
   - **Resolution:** `1920x1080` @ `30 fps`.
   - **Deterministic Animation:** Pure frame-driven interpolations (`useCurrentFrame()`, `interpolate`, `spring`).
   - **Reusable Components:** Leverage `CameraRig`, `PhoneFrame`, `Waveform`, `Captions`, and `SceneTransition` from `src/components/`.
   - **Verification:** Always verify visual changes with still frame renders (`npx remotion still ...`) before claiming task completion.
