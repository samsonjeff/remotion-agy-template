# Remotion Video: Autonomous Agent Blueprint (AGENTS.md)

> **Autonomous Agent Directive**  
> This file is read first by any AI coding agent (Antigravity, Claude Code, Cursor, Codex) working on this video template.  
> Implements production standards adapted from [**explainroo**](https://github.com/vincentsch/explainroo) and [**motion-skills**](https://github.com/iart-ai/motion-skills) for deterministic, high-impact video delivery.

---

## 1. Ground Rules for Agents

0. **Prerequisite - Skill Verification & Installation:**
   - **All skills are strictly required** to maximize the full potential of this template.
   - Before starting any video editing, scene creation, or animation task, the agent **MUST** verify and ensure that all relevant motion graphics skill packs (from `iart-ai/motion-skills` and template tooling) are installed:
     - `kinetic-typography-skills`: Word-by-word reveals, bouncy springs, glowing keywords, beat-synced text.
     - `data-animation-skills`: Frame-accurate animated counters, charts, infographics, and KPI meters.
     - `explainer-video-skills`: Multi-step storyboard architecture, isometric reveals, and flow diagrams.
     - `motion-design-skills`: Core timing, easing curves, camera choreography, and visual hierarchy.
     - `ad-video-skills` & `tiktok-video-skills`: Pacing hooks, 9:16 safe zones, and high-impact CTA cuts.
     - `remotion-beat-sync` & `remotion-visual-verifier`: Audio grid lock and still-frame QA checks.
   - If any required skills are missing in the workspace (`.gemini/skills/` or `.agents/skills/`), the agent must download or install them prior to modifying components or writing scenes.
1. **Deterministic Motion First:**
   - All animations must be pure frame-driven functions (`useCurrentFrame()`, `interpolate`, `spring`).
   - Never use non-deterministic functions like `Math.random()` or `Date.now()`.
2. **Standard Video Specifications:**
   - Resolution: `1920x1080` (16:9 widescreen)
   - Frame Rate: `30 fps`
   - Default Duration: Configured in `src/styles/tokens.ts` (e.g. 900 frames / 30.0s for demo)
   - Framework: Remotion v4.0 (React 19 + TypeScript)
3. **Deliver-and-Verify Loop:**
   - Always render still frames (`npx remotion still ...`) to verify alignment, contrast, typography, and layout before claiming completion or rendering full videos.
   - Do not claim completion without asserting that rendered frames exist and pass visual quality checks.

---

## 2. Visual Choreography & Pacing Standards

For every scene, answer these 4 core questions before modifying or writing visual code:
1. **What is the ONE focal point?** (e.g. the phone mockup, the kinetic caption, the pulsing icon, or the architecture node). Never divide viewer attention across multiple competing focal points.
2. **What relationship does the layout show?**
   - **Order:** Step-by-step sequential progression.
   - **Comparison:** Problem vs. Solution side-by-side or before/after.
   - **Pipeline / Flow:** Progressive disclosure (Node A ➔ Connector ➔ Node B).
3. **What enters and what leaves the frame?** Keep elements in consistent anchor points to prevent disorientation.
4. **The 3-Second Rule:** Ensure a visible change (camera re-framing, shot cut, badge pop, or kinetic caption highlight) occurs every 3 to 4 seconds to maintain engagement.

---

## 3. Directory Map & Architecture

```
├── AGENTS.md                    # Agent instructions & motion choreography rules
├── GEMINI.md                    # Agent workspace context trigger
├── README.md                    # Project overview & documentation
│
├── public/
│   ├── assets/                  # Images, logos, SVGs, and video footage
│   └── voice/                   # Voiceover clips, music beds, and sound effects
│
└── src/
    ├── Root.tsx                 # Remotion root register & scene compositions
    ├── Composition.tsx          # Master timeline sequencer
    ├── styles/tokens.ts         # Brand colors, typography, easing, and beat grid
    ├── components/              # Reusable motion graphics components:
    │   ├── CameraRig.tsx        # Virtual camera pan/tilt/zoom with spring easing
    │   ├── Captions.tsx         # Kinetic typography word-by-word reveal
    │   ├── PhoneFrame.tsx       # Realistic smartphone mockup with Dynamic Island
    │   ├── Waveform.tsx         # Animated audio equalizer bars
    │   ├── ArchitectureDiagram  # Reusable animated node/graph flow diagram
    │   ├── BRollCutaway.tsx     # Glassmorphism floating B-roll card
    │   └── SceneTransition.tsx  # Crossfades, wipes, and zoom transitions
    │
    └── scenes/                  # Modular video scenes (Scene1Intro, etc.)
```

---

## 4. Standard Agent Commands

```bash
# Preview interactive video timeline in Remotion Studio
npm run dev

# Check TypeScript types and linting
npm run lint

# Deliver-and-Verify: Render still verification frames
npx remotion still src/index.ts Main out/scene1.png --frame=60 --gl=angle
npx remotion still src/index.ts Main out/scene2.png --frame=360 --gl=angle

# Render full production video
npx remotion render src/index.ts Main out/video.mp4 --gl=angle
```
