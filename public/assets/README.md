# Assets Directory

Place your project's visual and media assets here:

- Images (`.png`, `.jpg`, `.webp`)
- Vector graphics (`.svg`)
- Screen recordings and video clips (`.mp4`, `.webm`)
- Background soundtrack (`bg-music.mp3`)

Reference these files in your components using Remotion's `staticFile()` helper:

```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("assets/my-image.png")} />
```

