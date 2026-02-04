# Documents and files — what to keep vs remove

**Purpose:** Clarify what is kept (required for new projects + SEO) and what was removed (one-time checklists / redundant).

---

## Kept (required)

**SEO (final checklist + procedures):**
- `docs/FINAL_GO_CHECKLIST.md` — final SEO go checklist
- `docs/SEO_POST_IMPLEMENTATION_AUDIT.md` — SEO implementation audit / procedures
- `docs/BLOG_AUTHORITY_SECTIONS_AUDIT.md` — authority audit (generated; referenced by checklist)

**Setup (for new projects — Bing, GA4, Google, etc.):**
- `docs/BING_API_SETUP.md`
- `docs/BING_INDEXNOW_SETUP.md`
- `docs/GA4_STEP_BY_STEP_GUIDE.md`
- `docs/GOOGLE_API_KEY_SECURITY.md`
- `docs/GOOGLE_CSE_QUICK_SETUP.md`
- `docs/GOOGLE_SEARCH_CONSOLE_SETUP.md`
- `docs/GITHUB_SECRETS_SETUP.md`
- `docs/KEYWORD_RANKING_TEST_SETUP.md`
- `docs/CLOUD_FUNCTIONS_SECURITY.md`
- `docs/CSE_SETUP_COMPLETE.md`

**Project / reference:**
- `README.md` (root)
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/PROJECT_PAGE_CREATION_GUIDE.md`
- `docs/SERVICE_PAGE_CREATION_GUIDE.md`
- `docs/DIAGRAM_SETUP_GUIDE.md`
- `docs/KROKI_DIAGRAMS.md`
- `docs/IMAGE_OPTIMIZATION_GUIDE.md`
- `docs/STRUCTURED_DATA_VALIDATION_GUIDE.md`
- `docs/SEO_GOOGLE_GUIDELINES_COMPLIANCE.md`
- `docs/SEO_CODE_SPLITTING_SAFETY.md`
- `docs/STYLE_RULES.md`
- `docs/FREE_TIER_CAPACITY_AND_OPTIONS.md`

---

## Removed (one-time checklists and redundant docs)

These were deleted so only necessary + setup + SEO docs remain:

- One-time checklists: `DO_OR_DIE_CHECKLIST`, `AUTHORITY_UPGRADE_CHECKLIST`, `AUTHORITY_UPGRADE_SAFE_PLAN`, `AUTHORITY_UPGRADE_COMPREHENSIVE_PLAN`, `BLOG_ARTICLE_CHECKLIST`, `BLOG_ARTICLE_CHECKLIST_CORRECT`, `SEO_REACH_CHECKLIST`
- One-time audits/corrections: `BLOG_ARTICLE_AUDIT_AND_CHANGELIST`, `LINKEDIN_URL_CORRECTION`, `PERSONAL_INFO_SEO_VERIFICATION`, `SOCIAL_MEDIA_URLS_CORRECTION`, `SOCIAL_MEDIA_URLS_VERIFICATION`, `INDEXING_STATUS_AND_FIXES`
- Superseded plans: `AI_SEO_AUDIT_PLAN`, `BLOG_ARTICLE_STRUCTURE_AND_WORKFLOW`, `BLOG_POST_PAGE_STRUCTURE_AND_REVAMP_GUIDE`, `BLOG_SPLIT_AND_SEO`, `SEO_BLOG_AND_SITEWIDE_PLAN`, `SEO_UPGRADE_IMPLEMENTATION_PLAN`, `ENTERPRISE_SEO_EXPANSION_COMPLETE`, `DEEP_KEYWORD_EXPANSION_SUMMARY`, `AI_KEYWORD_AUDIT_FIXES`, `REACH_AND_FAQ_STRATEGY`, `GOOGLE_VS_BING_RANKINGS`, `AUTHENTIC_GOOGLE_SEARCH_METHODS`
- Root: `DEPLOYMENT_COMMANDS.md`, `README_LOCAL_DEV.md`

---

## Vue starter (fixed)

- **Was:** `docs/PROJECT_PAGE_TEMPLATE.vue` (misplaced).
- **Now:** `src/views/projects/ProjectPageStarter.vue` — copy from here when creating a new project page. See `docs/PROJECT_PAGE_CREATION_GUIDE.md`.

---

## Other (review only)

- `downloads/`, `resumes/` — consider `.gitignore` if private.
- `docs/diagrams/` — .puml files; keep if you use PlantUML/Kroki.
