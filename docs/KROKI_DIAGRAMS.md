# Kroki diagrams (PlantUML in the blog)

Some blog articles (e.g. Behavioral Design Patterns) render **PlantUML** class diagrams via [Kroki](https://kroki.io). The app sends diagram source to Kroki and displays the returned SVG.

## Default behaviour

- **Kroki URL:** `https://kroki.io` (public service).
- **Limits:** The public instance may rate-limit or throttle under heavy traffic.
- **No server needed:** Works out of the box for low traffic.

## Self-hosting Kroki (recommended for production / no rate limits)

To avoid rate limits and have full control, run your own Kroki instance.

### Option 1: Docker (simplest)

```bash
docker run -p 8000:8000 -d yuzutech/kroki
```

Then set in `.env` or `.env.local`:

```env
VITE_KROKI_URL=http://localhost:8000
```

For production, use your server URL, e.g. `https://kroki.yourdomain.com`.

### Option 2: Free / cheap hosting

- **Fly.io** – Run the `yuzutech/kroki` image; free tier available.
- **Railway / Render** – Deploy the same Docker image; free or low-cost tiers.
- **Google Cloud Run** – Run Kroki as a container; pay per request.

Point `VITE_KROKI_URL` at the deployed URL when building the app.

### Build-time note

`VITE_KROKI_URL` is read at **build time**. For production:

```bash
VITE_KROKI_URL=https://your-kroki.example.com npm run build
```

(or set it in your CI/CD environment).

## Alternative: Mermaid (no Kroki)

If you prefer **no external service**, you can use **Mermaid** for class diagrams instead of PlantUML:

- **Mermaid** runs 100% in the browser (no Kroki, no rate limits).
- The content would use ` ```mermaid ` code blocks instead of ` ```plantuml `.
- Styling and text wrapping are different; Mermaid is simpler and fully client-side.

To switch an article back to Mermaid, change the diagram source in the article content from PlantUML syntax to [Mermaid classDiagram](https://mermaid.js.org/syntax/classDiagram.html) and use the `mermaid` fence. The app already supports both `mermaid` and `plantuml` blocks.

## Summary

| Approach              | Pros                          | Cons                          |
|-----------------------|-------------------------------|-------------------------------|
| Default (kroki.io)    | No setup                     | May rate-limit, external dep  |
| Self-host Kroki       | No limits, full control      | Need to run a server          |
| Mermaid (no Kroki)    | No server, no rate limits    | Different syntax and styling  |
