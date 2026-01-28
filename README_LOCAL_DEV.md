# Local Development Setup

## First Time Setup

**1. Create `.env.local` file (one-time only):**
```powershell
Copy-Item env.local.template .env.local
```

This creates your local environment file. You only need to do this **once**.

**2. Run the dev server:**
```powershell
npm run dev
```

That's it! Vite automatically reads `.env.local` every time you run `npm run dev`.

---

## What Happens

- **First time:** Copy the template to create `.env.local`
- **Every time after:** Just run `npm run dev` - Vite reads `.env.local` automatically
- **CORS:** Automatically handled via proxy in dev mode (no manual setup needed)

---

## When to Re-copy

You only need to copy the template again if:
- You delete `.env.local` by accident
- You want to reset to default values
- The template file was updated with new variables

---

## Notes

- `.env.local` is in `.gitignore` (not committed to git)
- CORS proxy is **automatic** in dev mode - no configuration needed
- Production builds (Firebase) use direct URLs (no proxy)
