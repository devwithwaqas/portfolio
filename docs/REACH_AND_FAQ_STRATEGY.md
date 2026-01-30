# Reach & FAQ Strategy — Research Summary

## 1. What else increases reach (beyond question-based keywords)

| Lever | Status / Action |
|-------|------------------|
| **FAQ depth per service** | 10–14 FAQs per service; client-style questions (what would a hiring client ask?). Implemented. |
| **Accordion + “Show more”** | First 5–6 FAQs visible; “Show more FAQs” reveals rest. Keeps page scannable, all content crawlable when expanded. |
| **Internal linking** | Done: “Related services” on each service page (2–3 links per page) via `RelatedServices` + `src/config/relatedServices.js`. Single source of truth; no duplication. |
| **People Also Ask (PAA)** | 1–2 FAQs per service phrased like common PAA queries (e.g. “How long does X take?”). We’re adding these. |
| **Differentiation FAQs** | One “Why choose you / why this service?” per service. Added. |
| **Objection / process FAQs** | Cost, timeline, what client needs to provide, availability. Added per service. |
| **FAQ schema** | Already in place; all FAQs (including “more”) in same list → one FAQPage per page. No change. |
| **Avoid FAQ spam** | Google: don’t overload; 10–14 focused, useful questions per service is a good target. We stay in range. |

## 2. FAQ best practices (applied)

- **Collapsible accordion only** — No hidden content; user can expand any Q. Compliant with Google’s guidance.
- **Answers match schema** — FAQPage schema uses the same question/answer text as the visible content.
- **Natural language** — Questions and answers read like a real client–consultant Q&A, not keyword stuffing.
- **Per-service specificity** — Each service has its own FAQs (timeline, tech, process, engagement) so content is relevant and non-duplicate.

## 3. Client-style questions we’re adding (examples)

- **Process:** “What do I need to provide before we start?”, “How do we handle changes mid-project?”
- **Engagement:** “Do you work part-time or full-time?”, “What’s the typical engagement length?”
- **Differentiation:** “Why choose you for [service] over a larger agency?”
- **Objection:** “What if our timeline is tight?”, “Do you work with clients in [USA/Europe]?”
- **Outcome:** “What deliverables should I expect?”, “Do you hand over code and documentation?”

All phrased as a client would ask, with clear, specific answers suitable for SEO and for real users.
