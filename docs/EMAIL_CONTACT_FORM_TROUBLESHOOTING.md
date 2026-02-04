# Contact Form Email – "Invalid API key" Troubleshooting

**Reasonable setup:** Keep the API key for security (stops direct abuse of the function URL). Rate limiting + CORS + API key together are a good balance. The site must be built with `VITE_SMTP_API_KEY` set to the **same** value as the function's `API_KEY`, then deployed.

---

If the contact form shows:

**"Email service error: Unauthorized. Invalid API key."**

the **sendEmail** Cloud Function is rejecting the request because the API key check failed.

## How it works

- **Cloud Function** (`serverless/sendEmail`): If the function’s environment has **`API_KEY`** set, **every** request must send the header **`X-API-Key`** with the **exact same** value.
- **Frontend**: The site sends `X-API-Key` only when it was **built** with **`VITE_SMTP_API_KEY`** set. That value is baked into the bundle at **build time** (e.g. when you run `npm run build:firebase` or deploy to Firebase).

So the error means one of:

1. The function has `API_KEY` set, but the **deployed site** was built **without** `VITE_SMTP_API_KEY` → no header is sent → 401.
2. The function has `API_KEY` set to value **A**, but the site was built with `VITE_SMTP_API_KEY` = **B** (or with an old/different key) → header doesn’t match → 401.

Documents and policies don’t fix this; the **values** must match and the **site must be rebuilt** after setting the client key.

---

## Fix 1: Align client and function (recommended)

Use the **same** secret on both sides.

1. **Choose one API key**  
   Pick a long, random string (e.g. 32+ chars). Keep it secret.

2. **Set it on the Cloud Function**  
   - Google Cloud Console → **Cloud Functions** → **sendEmail** → **Edit** → **Runtime, build, connections and security** → **Environment variables** (or **Secrets**).  
   - Set **`API_KEY`** to that value (or create a secret and reference it as `API_KEY`).

3. **Set it when building the site**  
   When you build the **production** bundle (e.g. for Firebase), the build must see **`VITE_SMTP_API_KEY`** with that **same** value:
   - **Local build:** In `.env` or `.env.production`:  
     `VITE_SMTP_API_KEY=your_exact_api_key_here`
   - **CI/Firebase:** In your build config (e.g. GitHub Actions, Firebase env), set the env var **`VITE_SMTP_API_KEY`** to the same value (e.g. from a secret).  
   Do **not** commit the real key to the repo.

4. **Rebuild and redeploy the site**  
   After setting `VITE_SMTP_API_KEY`, run a **new** build and deploy that build. Old deployments will keep sending the old or empty key until you deploy a build that was made with the correct env.

5. **Verify**  
   Submit the contact form again. If the key matches, the function returns 200 and the email is sent.

---

## Fix 2: Stop requiring an API key (quick, less secure)

If you don’t want to use an API key at all:

1. **Remove `API_KEY` from the sendEmail function**  
   In Google Cloud Console → Cloud Functions → **sendEmail** → **Edit** → remove the **`API_KEY`** environment variable (or secret reference).  
   Save / redeploy the function.

2. **No change needed on the frontend**  
   The function will no longer check `X-API-Key`. CORS and rate limiting still apply.

Use this only if you’re okay with anyone who can hit the function URL being able to send through your form (origin and rate limits still apply).

---

## Checklist

- [ ] Cloud Function **sendEmail** has required env: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `TO_EMAIL`.
- [ ] If you use an API key: **`API_KEY`** is set on the function and **`VITE_SMTP_API_KEY`** is set to the **same** value when building the site.
- [ ] The **deployed** site was built **after** setting `VITE_SMTP_API_KEY` (so the bundle contains the correct key).
- [ ] No typos or extra spaces in either key; they must match exactly.
