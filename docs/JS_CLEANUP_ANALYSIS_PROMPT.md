# JavaScript Cleanup Analysis - Detailed Prompt

## Context
I have a Vue.js portfolio project and I've just run a comprehensive JavaScript analysis using `npm run analyze-js`. The analysis has completed and generated a report file `js-analysis-report.json` in the root directory.

## What I Need

Please read the `js-analysis-report.json` file and provide me with a **detailed, human-readable summary** in the chat that includes:

### 1. Executive Summary (Top of Response)
- Total files analyzed
- Total functions found vs unused
- Total variables found vs unused
- Vue components analyzed
- Unused Vue component internals (computed, methods, data properties)
- Duplicate code found (computed properties and methods across components)

### 2. Unused Functions Breakdown
Show me:
- **Count**: How many unused functions total
- **Top 20 unused functions** with:
  - Function name
  - Type (function, arrow_function, method)
  - File location
  - Reason (not_found, used_internally, etc.)
- **Group by file** - Show which files have the most unused functions
- **Identify critical files** - Flag if any unused functions are in:
  - `src/main.js`
  - `src/router/index.js`
  - Any Vue component files in `src/components/` or `src/views/`

### 3. Unused Variables Breakdown
Show me:
- **Count**: How many unused variables total
- **Top 20 unused variables** with:
  - Variable name
  - Type (variable, constant)
  - File location
  - Reason
- **Group by file** - Show which files have the most unused variables

### 4. Vue Component Internals Analysis
Show me:
- **Unused computed properties**: List all unused computed properties with component name
- **Unused methods**: List all unused methods with component name
- **Unused data properties**: List all unused data properties with component name
- **Component files with most unused internals**: Rank components by number of unused internals

### 5. Duplicate Code Analysis
Show me:
- **Duplicate computed properties**: 
  - Name of computed property
  - Which components have the same computed property
  - Suggest if they can be extracted to a mixin or utility
- **Duplicate methods**:
  - Name of method
  - Which components have the same method
  - Suggest if they can be extracted to a mixin or utility

### 6. Recommendations
Based on the analysis, provide:
- **High priority cleanup**: Functions/variables that are definitely safe to remove
- **Medium priority**: Things that might be used but appear unused (need manual review)
- **Low priority**: Things that are likely false positives (lifecycle hooks, event handlers, etc.)
- **Refactoring opportunities**: Duplicate code that should be extracted to shared utilities/mixins
- **Files to focus on**: Which files would benefit most from cleanup

### 7. Safety Warnings
Flag any potential issues:
- Functions that might be called dynamically (via strings, eval, etc.)
- Variables that might be accessed via bracket notation
- Vue component internals that might be used in templates but not detected
- Any exports that are used but marked as unused

## Format Requirements

Please format the response as:
1. **Clear sections** with headers (##)
2. **Bullet points** for lists
3. **Code blocks** for file paths and function names
4. **Tables** where appropriate (for duplicate code across components)
5. **Emoji indicators** for priority levels (🔴 High, 🟡 Medium, 🟢 Low)
6. **File paths** should be relative to project root (e.g., `src/components/Home.vue`)

## Example Output Structure

```
## 📊 JavaScript Cleanup Analysis Summary

### Overall Statistics
- **Total Files**: 140
- **Total Functions**: 1,141 (965 used, 176 unused - 15.4% unused)
- **Total Variables**: 3,219 (2,935 used, 284 unused - 8.8% unused)
- **Vue Components**: 80
- **Unused Vue Internals**: 23 (computed: X, methods: Y, data: Z)
- **Duplicate Code**: 3 computed properties, 6 methods

### 🔴 High Priority Cleanup

#### Unused Functions (Top 20)
1. `pickLocalFromUrl` - `public/assets/js/diag4-prehook.js` (function, not_found)
2. `_panZoom` - `public/assets/js/diagram-utils.js` (method, not_found)
...

#### Files with Most Unused Code
- `public/assets/js/hx-inline-backup.js`: 12 unused functions
- `src/components/SomeComponent.vue`: 5 unused methods
...

### 🟡 Medium Priority (Needs Review)
[List items that might be false positives]

### 🟢 Low Priority (Likely False Positives)
[List lifecycle hooks, event handlers that are actually used]

### 🔄 Duplicate Code Opportunities

#### Computed Properties
- `calculatedTotalExperience` appears in:
  - `src/components/home/Resume.vue`
  - `src/components/home/About.vue`
  - **Recommendation**: Extract to a composable or mixin

#### Methods
- `validateForm` appears in:
  - `src/components/common/ContactForm.vue`
  - `src/components/common/SomeOtherForm.vue`
  - **Recommendation**: Extract to a shared utility

### ⚠️ Safety Warnings
- [List any potential false positives or dynamic usage]

### 📋 Next Steps
1. Review high priority items
2. Extract duplicate code to shared utilities
3. Remove unused code from backup files first (safest)
4. Test after each cleanup batch
```

## Important Notes

- The analysis report is at: `js-analysis-report.json` (root directory)
- The analysis script is at: `scripts/analyze-js-usage.js`
- Focus on actionable insights, not just raw data
- Prioritize safety - flag anything that might break the app
- Be specific about file locations and function names
- Suggest concrete refactoring steps for duplicate code

## What to Do

1. Read `js-analysis-report.json`
2. Parse and analyze the data
3. Present the information in the format above
4. Make it actionable with clear priorities
5. Include safety warnings for anything that might be a false positive

---

**Start by reading the report file and providing the comprehensive analysis summary as described above.**
