# Featured video (local only)

The homepage featured section can play `LIMI AI x SF Playground.mp4` from this folder during local development.

That file is **not committed** (it exceeds GitHub’s 100MB limit).

For production, set in Vercel/host env:

```bash
NEXT_PUBLIC_FEATURED_VIDEO_URL=https://your-cdn-or-storage/path/to/video.mp4
```

Until then, the section shows the poster image and hides playback if the file is missing.
