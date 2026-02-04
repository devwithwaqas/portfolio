# Google API Key Security

**Do not commit Google API keys to the repo.** If a key was ever committed (e.g. in a script), treat it as compromised.

## If You Received a "Publicly Accessible API Key" Alert

1. **Regenerate or delete the key** in [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Go to **APIs & Services → Credentials**
   - Find the affected key → **Edit** → **Regenerate Key** (or delete it if you no longer use Google CSE)

2. **Optional: Disable Custom Search API** if you are not using it (we use SerpAPI for ranking tests):
   - Go to **APIs & Services → Library**
   - Search for "Custom Search API" → **Disable** for the project

3. **Never put API keys in source code.** Use:
   - `.env.local` (already in `.gitignore`) for local scripts
   - Environment variables only: `$env:GOOGLE_API_KEY` (PowerShell) or `GOOGLE_API_KEY` (Node)

## Ranking Tests: Use SerpAPI (Recommended)

We use SerpAPI for Google ranking tests (no Google API key in repo):

- Get a key: https://serpapi.com/manage-api-key
- Run: `npm run setup:serpapi` then `npm run test:google-serpapi`

Scripts that previously hardcoded a Google key have been updated to use env vars or to direct you to SerpAPI.
