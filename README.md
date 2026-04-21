# favourite image outputs

A static site showcasing favourite LLM-generated images.

## Adding images

1. Drop image files into `images/`.
2. Add entries to `images.json`:

```json
[
  { "file": "sunset.png", "caption": "gpt-image-1 — coastal sunset" },
  { "file": "robot.jpg", "caption": "nano banana — tiny robot" }
]
```

3. Commit and push. GitHub Pages redeploys automatically.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
