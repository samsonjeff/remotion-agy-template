# Voice & Audio Directory

Place your project's voiceovers and sound effects here:

- Master narration tracks (`.mp3`, `.wav`)
- Modular section clips
- Sound effects (`.wav`, `.mp3`)

Reference these audio files in your components using Remotion's `<Audio>` component with `staticFile()`:

```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("voice/my-narration.mp3")} volume={1} />
```

