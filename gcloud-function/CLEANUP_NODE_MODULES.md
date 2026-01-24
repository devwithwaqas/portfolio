# Fix `npm install` errors in gcloud-function (EPERM / ENOTEMPTY)

If you see **EPERM** or **ENOTEMPTY** when running `npm install` in this folder:

1. **Close** Cursor (or VS Code), all terminals, and any Node processes.
2. **Delete** `node_modules`:
   ```powershell
   cd c:\portfolio\gcloud-function
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   ```
3. **Restore** `package.json` from the read template (this folder uses `package-read` / `package-update` for deploy):
   ```powershell
   Copy-Item package-read.json package.json -Force
   ```
4. **Reinstall**:
   ```powershell
   npm install
   ```
5. Reopen the project.

You **do not** need `@google-analytics/admin`. GA4 property access is done manually in the [Google Analytics UI](https://analytics.google.com/) (see `docs/GA4_FIREBASE_SETUP.md`).
