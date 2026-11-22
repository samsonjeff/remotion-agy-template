# Remotion AGY Template

[![Remotion v4](https://img.shields.io/badge/Remotion-v4.0-blue?style=flat-square&logo=react)](https://www.remotion.dev/)
[![React 19](https://img.shields.io/badge/React-19.3-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

An open-source, deterministic motion graphics and explainer video template built for **[Google Antigravity](https://antigravity.google/)**, **[Remotion v4](https://www.remotion.dev/)**, **React 19**, and **TypeScript**.

Adapted from production visual choreography standards in [**explainroo**](https://github.com/vincentsch/explainroo) and [**motion-skills**](https://github.com/iart-ai/motion-skills), this template empowers both human creators and AI coding agents to edit frame-accurate, beat-synced videos with zero render guesswork.

---

## What You Can Build With This Template

As an open-source video-as-code template, this project gives developers, creators, and AI agents the building blocks to create studio-quality motion graphics without After Effects or Premiere:

- **Tech Product Demos and SaaS Launches:** Show off mobile applications, Web3 dApps, and web dashboards using a realistic smartphone mockup with Dynamic Island, camera glare, ambient edge glow, floating glass B-roll cards, and conversational chat bubbles.
- **Technical Architecture and Pipeline Explainers:** Create step-by-step ByteByteGo- or Vox-style animated architecture diagrams with progressive disclosure nodes, pulse glows, and flowing connectors.
- **Podcast and Audio Snippets with Kinetic Subtitles:** Generate punchy, word-by-word highlighted kinetic captions (`Captions.tsx`) and deterministic, frame-accurate audio waveforms (`Waveform.tsx`) for social clips.
- **Autonomous AI Video Generation:** Prompt coding agents (Antigravity, Claude Code, Cursor, Codex) to build and modify scenes deterministically following pre-baked rules for easing, layout hierarchy, and still-frame QA verification.
- **Music Beat-Snapped Motion:** Build video edits locked to a musical beat grid (100 BPM / 18-frame intervals) with automated audio ducking and rhythmic glow pulsing.

---

## Features

- **Antigravity & AI Agent Native:** Pre-configured with [`AGENTS.md`](AGENTS.md) and [`GEMINI.md`](GEMINI.md) directives mandating prerequisite motion skills verification, deterministic motion, visual hierarchy, and deliver-and-verify loops.
- **Required Motion Skills Integration:** Designed to integrate seamlessly with the `iart-ai/motion-skills` ecosystem (`kinetic-typography-skills`, `data-animation-skills`, `explainer-video-skills`, `motion-design-skills`, `ad-video-skills`, and beat-sync tools) so agents deliver agency-grade animations with zero guesswork.
- **PhoneFrame Component:** Realistic smartphone mockup with Dynamic Island, camera cutout, and ambient edge glow.
- **CameraRig Component:** Multi-shot virtual camera providing spring-smoothed pan, tilt, and subtle push-in zooms to uphold the 3-second engagement rule.
- **Kinetic Captions:** Word-by-word kinetic subtitle typography with glowing keyword highlights.
- **Architecture Diagrams:** Progressive disclosure node-and-flow diagrams for technical walkthroughs, pipelines, and product architectures.
- **Deterministic Waveform:** Frame-exact audio reactive equalizer bars.
- **Declarative Transitions:** Crossfades, directional wipes (LTR/RTL), and zoom transitions with 15-frame overlaps.
- **Beat-Snapped Edit Grid:** 100 BPM / 18-frame timing utilities for music ducking, rhythmic glow pulsing, and shot synchronization.

---

## Directory Structure

```
├── AGENTS.md                    # Autonomous agent execution blueprint & rules
├── GEMINI.md                    # Antigravity agent workspace context
├── LICENSE                      # MIT Open Source License
├── README.md                    # Project documentation
├── remotion.config.ts           # Remotion CLI configuration
│
├── public/
│   ├── assets/                  # Put your images, SVGs, and video clips here
│   └── voice/                   # Put your voiceover audio and SFX here
│
└── src/
    ├── Root.tsx                 # Remotion root register & scene compositions
    ├── Composition.tsx          # Master timeline sequencer
    ├── timeline.ts              # Timeline helpers and beat calculation utilities
    ├── styles/tokens.ts         # Design tokens (colors, fonts, beat timing, easing)
    │
    ├── components/              # Reusable motion graphics components
    │   ├── CameraRig.tsx        # Virtual camera pan/tilt/zoom
    │   ├── Captions.tsx         # Kinetic typography word reveal
    │   ├── PhoneFrame.tsx       # Realistic phone frame mockup
    │   ├── Waveform.tsx         # Animated audio equalizer bars
    │   ├── ArchitectureDiagram  # Reusable animated graph diagram
    │   ├── BRollCutaway.tsx     # Glassmorphism floating B-roll card
    │   └── SceneTransition.tsx  # Crossfades, wipes, and zoom transitions
    │
    └── scenes/                  # Modular scene components
        ├── Scene1Intro.tsx      # Intro title and hook
        ├── Scene2Showcase.tsx   # Phone mockup and feature showcase
        └── Scene3Closing.tsx    # Summary, feature highlights, and call to action
```

---

## Quick Start

### 1. Clone & Use This Template

Click **"Use this template"** on GitHub or clone directly:

```bash
git clone https://github.com/samsonjeff/remotion-agy-template.git
cd remotion-agy-template
```

### 2. Install Dependencies & Required Motion Skills

Install project dependencies:

```bash
npm install
```

> **Note for AI Agent Workflows:**  
> All motion skills are strictly required for AI coding agents (Antigravity, Claude Code, Cursor, Codex) to maximize video quality. Ensure your agent has loaded the prerequisite motion skills (`kinetic-typography-skills`, `data-animation-skills`, `explainer-video-skills`, `motion-design-skills`, `ad-video-skills`, `tiktok-video-skills`, and beat-sync QA tools) as detailed in [`AGENTS.md`](AGENTS.md) before prompting scene creation or edits.

### 3. Start Remotion Studio

Preview your video interactively in the browser with real-time scrubbing:

```bash
npm run dev
```

### 4. Verify Types and Code Quality

```bash
npm run lint
```

### 5. Render Verification Stills

Render still frames to verify layout, contrast, and alignment:

```bash
npx remotion still src/index.ts Main out/preview.png --frame=60
```

### 6. Render Full Video

Export the final 1080p production video:

```bash
npx remotion render src/index.ts Main out/video.mp4
```

---

## Motion Graphics Standards

When editing videos with this template (or prompting an AI agent to edit for you), adhere to the 4 core choreography questions:

1. **What is the ONE focal point?** Never divide viewer attention across multiple competing focal points.
2. **What relationship does the layout show?** Order (step progression), Comparison (before vs. after), or Pipeline (node flow).
3. **What enters and what leaves the frame?** Keep elements in consistent anchor points to prevent viewer disorientation.
4. **The 3-Second Rule:** Ensure a visible change (camera re-frame, shot cut, badge pop, or kinetic highlight) occurs every 3 to 4 seconds.

---

## Contributing

Contributions, feature suggestions, and reusable component additions are welcome.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingComponent`)
3. Ensure types and linter pass (`npm run lint`)
4. Commit your Changes (`git commit -m 'Add AmazingComponent'`)
5. Push to the Branch (`git push origin feature/AmazingComponent`)
6. Open a Pull Request

---

## License & Standards

This project is open-source and distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

All derivative work and contributions should uphold deterministic animation standards and keep components decoupled from proprietary media assets.
