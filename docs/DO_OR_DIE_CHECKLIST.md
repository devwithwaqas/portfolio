# Do-or-die checklist — portfolio as your primary lead generator

Treat this as the single source of truth for “what’s done” vs “what you must do” so the portfolio actually brings in work.

---

## 1. What’s already done (codebase)

| Area | Status |
|------|--------|
| **SEO** | Question-based keywords, long-tail, FAQs, FAQPage schema, structured data (Person, Service, HowTo, Breadcrumb, JobPosting, WebSite), canonical (Firebase), sitemap, robots.txt, llms.txt, IndexNow. |
| **Reach** | Internal “Related services” links on every service page (2–3 links each). Single config in `src/config/relatedServices.js`. |
| **FAQs** | Accordion FAQs on home + every service page; “Show more FAQs” where there are many; client-style Q&A (process, differentiation, objection); no hidden content. |
| **Contact** | Contact section with form, email/phone/WhatsApp cards, **response-time promise** (“I typically respond within 24 hours”). Form fallback: on error, “email me directly at X”. |
| **CTA** | Hero “Get in touch”; nav “Contact”; ServiceCTA “Contact Me” + “View Portfolio”; **one-tap Email | WhatsApp** on every service page; **sticky “Get in touch” bar** on service pages after scroll. |
| **404** | “Go to Homepage”, **“Get in touch”** (/#contact), “Go Back”. |
| **Navigation from other pages** | Service/project/404 → “Contact” goes to home and scrolls to #contact (`navigateToSection`). |
| **Social proof** | Testimonials (names, titles); project outcomes (2.5M data points, Fortune 500, etc.) in copy and FAQs. |
| **Tech** | Firebase hosting, LCP/performance work, PWA, core Web Vitals–friendly setup. |

---

## 2. What you must do (owner actions)

These are not in the codebase; they determine whether the portfolio converts.

### 2.1 Discovery (so people can find you)

- [ ] **Google Search Console**  
  Add property for your live URL (e.g. `https://waqasahmad-portfolio.web.app`). Submit sitemap. Check “URL inspection” for key pages (home, 2–3 service pages). Fix any indexing errors.
- [ ] **Bing Webmaster**  
  Add site, submit sitemap. Optional but low effort.
- [ ] **LinkedIn**  
  In “About” or headline, add a clear link to this portfolio (full URL). Same in “Featured” if you use it.
- [ ] **GitHub**  
  In profile bio or “Website”, add the portfolio URL.
- [ ] **Backlinks**  
  Any guest post, talk, or interview: ask for a link to the portfolio. Even one or two quality backlinks help.

### 2.2 Trust and conversion (so people act)

- [ ] **Reply within 24 hours**  
  You state “I typically respond within 24 hours.” Set a rule: every contact form / email / WhatsApp gets a reply in &lt;24h. If you’re slow, they go to someone else.
- [ ] **Contact form and email**  
  Confirm the form actually sends (test from a different email). Confirm SMTP/Cloud Function and that messages land in your inbox. If something breaks, fix it the same day.
- [ ] **WhatsApp**  
  Ensure `VITE_WHATSAPP_URL` in `.env` is the full click-to-chat URL (e.g. `https://waqas.app/xxxx`). Test the link on mobile.
- [ ] **Testimonials**  
  If you get a new strong testimonial (client or colleague), add it to `src/config/testimonials.js` and keep the tone specific (“what we did / outcome”), not generic.

### 2.3 Optional but high impact

- [ ] **Calendly (or similar)**  
  If you add a “Book a 15-min call” link (e.g. in Contact or Hero), put the URL in env and add one button. Reduces friction for people who prefer to book instead of typing.
- [ ] **Gentle urgency**  
  If true, add one line in Hero or Contact: e.g. “Taking 1–2 new projects for [current quarter].” Update each quarter (or drive from env). Don’t fake it.
- [ ] **One “proof” asset**  
  One thing that’s easy to link: e.g. a short case study PDF, a conference talk, an open-source repo, or a cert. Link it from the portfolio (Resume, project, or a “Resources” link).

---

## 3. What to check regularly (maintenance)

| Check | Frequency |
|-------|-----------|
| Contact form test (send a message, get reply) | Monthly |
| GSC: coverage, sitemap, key URLs indexed | Monthly |
| LinkedIn / GitHub: portfolio link still correct | After any profile change |
| SMTP / Cloud Function logs if form fails | When you get a report |
| “Available” / urgency line (if you use it) | Each quarter |

---

## 4. Mindset

- **One job of the site:** Get a stranger to take one clear next step: fill the form, email you, or WhatsApp. Everything (copy, structure, CTAs, FAQs) should support that.
- **No “coming soon” or dead ends.** Every path should lead to Home, Contact, or a concrete external link (LinkedIn, GitHub, WhatsApp).
- **Speed of response beats perfection.** A fast, clear reply beats a perfect reply two days later. The 24h promise is a commitment.

If you treat the portfolio as do-or-die and keep this checklist updated, you’ve done the maximum the codebase can do; the rest is your execution (discovery, reply speed, and trust).
