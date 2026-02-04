# 🗑️ Files Safe to Remove

This document lists files that can be safely removed from the project. These are development/analysis/verification files that are not needed for the portfolio to function.

## ⚠️ IMPORTANT

**DO NOT DELETE:** These files are essential and must be kept:
- All `.puml` files (PlantUML diagram sources - needed for documentation)
- All `.svg` files in `public/assets/diagrams/` (diagram assets)
- All documentation files (`.md` files in root and `docs/`)
- Configuration files: `package.json`, `vite.config.js`, `index.html`
- All files in `src/`, `public/`, `node_modules/` (source code and assets)
- `setup.bat` (helpful setup script)

---

## 🗑️ Files to Remove (Categorized)

### 📊 Analysis & Verification Python Scripts

**Reason:** Development tools used for analyzing SVG files and extracting data. No longer needed.

```
analyze_airasia_svg_comprehensive.py
analyze_bat_svg_comprehensive.py
analyze_cluster_contents.py
check_all_shapes.py
check_svg_coords.py
check_svg_structure.py
extract_accurate_shapes.py
extract_actual_svg_parts.py
extract_all_bat_shapes.py
extract_all_components.py
extract_bat_all_components.py
extract_bat_architectural_components.py
extract_bat_complete.py
extract_bat_components_proper.py
extract_bat_coordinates_enhanced.py
extract_bat_correct.py
extract_bat_final.py
extract_bat_final_complete.py
extract_bat_shapes_enhanced.py
extract_bat_shapes_simple.py
extract_bat_svg_coordinates.py
extract_real_bat_coordinates.py
extract_real_coords.py
extract_smartcity_by_color.py
extract_smartcity_complete.py
extract_smartcity_components.py
extract_smartcity_correct_coords.py
extract_smartcity_enhanced.py
extract_smartcity_final.py
extract_smartcity_final_coords.py
extract_smartcity_real_coords.py
extract_users.py
find_all_39_components.py
find_components_in_groups.py
find_databases.py
find_groups_and_databases.py
find_real_database_area.py
create_bat_coordinate_mapping.py
create_bat_verification_html.py
create_complete_bat_verification.py
create_enhanced_bat_verification.py
create_proper_bat_verification.py
create_simple_visual_verification.py
create_svg_snippets_verification.py
create_svg_visual_verification.py
create_visual_verification.py
comprehensive_bat_fix.py
update_bat_narration.py
update_valet_parking_content.py
fill_insurance_clients_complete.py
fill_mobile_games_complete.py
fill_uk_property_complete.py
fill_valet_parking_complete.py
generate_cover_letter.py
generate_resumes.py
get_exact_user_and_missing.py
debug_event_grid.py
```

### 🔧 Fix & Verification JavaScript Files

**Reason:** Development scripts used for fixing/verifying coordinates and mappings. No longer needed.

```
apply_correct_bat_coordinates.js
apply_correct_highlights.js
complete_bat_mapping.js
complete_valet_parking_sections.js
comprehensive_bat_audit.js
comprehensive_bat_final_fix.js
create_complete_bat_narration.js
create_correct_bat_mapping.js
create_full_bat_narration.js
create_proper_bat_mapping.js
create_ultimate_bat_mapping.js
direct_bat_coordinate_fix.js
direct_bat_fix.js
final_bat_coordinate_mapping.js
final_bat_coordinate_swap.js
final_bat_mapping.js
final_bat_verification.js
fix_all_bat_coordinates_properly.js
fix_all_bat_redundancies.js
fix_all_coords.js
fix_all_duplicates_final.js
fix_all_remaining_bat_steps.js
fix_bat_actual_highlights.js
fix_bat_actual_mapping.js
fix_bat_coordinates_manually.js
fix_bat_group_coordinates.js
fix_bat_groups.js
fix_bat_mapping_correctly.js
fix_bat_mapping_final.js
fix_bat_narration_format.js
fix_bat_with_real_coordinates.js
fix_complete_bat_mapping.js
fix_database_coordinates_properly.js
fix_duplicate_highlights.js
fix_narration_coords.js
fix_real_database_coordinates.js
fix_remaining_duplicates.js
fix_specific_bat_components.js
fix_user_mapping.js
fix_workflow_and_layer_highlights.js
force_bat_fix.js
force_fix_stream_analytics.js
permanent_fix.js
rebuild_airasia_highlights.js
simple_bat_analysis.js
simple_bat_verification.js
ultimate_bat_final_fix.js
ultimate_bat_fix.js
update_bat_narration_coords.js
verify_bat_coordinates.js
verify_bat_fixes.js
verify_final_bat_fix.js
verify_final_bat_mapping.js
verify_swapped_coordinates.js
diagnose_airasia_highlights.js
calculate_layer_boundaries.js
```

### 📄 Verification & Testing HTML Files

**Reason:** Development/testing files used for verifying SVG coordinates and diagrams. No longer needed.

```
bat_actual_svg_portions.html
bat_complete_verification.html
bat_complete_verification_final.html
bat_real_svg_verification.html
bat_svg_real_time_cropper.html
bat_svg_real_time_cropper_new.html
bat_svg_snippets_verification.html
bat_svg_visual_verification.html
bat_verification_page.html
bat_visual_verification.html
smartcity_real_svg_verification.html
smartcity_simple_verification.html
smartcity_svg_verification.html
smartcity_test_simple.html
test_coordinates.html
email_template_fixed.html
email_template_improved.html
```

### 📊 Analysis & Data JSON Files

**Reason:** Development analysis data files. No longer needed.

```
accurate_shapes_data.json
all_components_data.json
all_shapes_analysis.json
airasia_svg_detailed_analysis.json
bat_all_components_data.json
bat_architectural_components_data.json
bat_component_mapping.json
bat_coordinate_corrections.json
bat_correct_components_data.json
bat_enhanced_coordinates.json
bat_final_complete_data.json
bat_final_components_data.json
bat_real_coordinates.json
bat_svg_analysis.json
bat_svg_coordinates.json
smartcity_color_components.json
smartcity_components_data.json
smartcity_correct_coordinates.json
smartcity_enhanced_components.json
smartcity_final_components.json
smartcity_final_coordinates.json
smartcity_real_coordinates.json
component_id_mapping.json
```

### 📝 Log & Report Text Files

**Reason:** Development logs and reports. No longer needed.

```
bat-console-log-diagram-issue.txt
html-console-log.txt
comprehensive-cleanup-report.txt
create_complete_component_mapping.txt
```

### 🔨 PowerShell Scripts (Diagram Generation)

**Reason:** Development scripts for generating diagrams. Can be kept for reference or removed.

**Note:** If you want to keep diagram source files (.puml), you might want to keep these scripts too for regenerating diagrams.

```
generate_bat_diagram.ps1
generate_bat_svg.ps1
generate_gamified_employee_svg.ps1
```

---

## ✅ Files to KEEP (Important!)

These files are essential and must NOT be deleted:

### Documentation (KEEP ALL)
- `README.md` - Main README
- `docs/` - All documentation files
- All `.md` files in root (guides and documentation)

### Diagram Sources (KEEP ALL)
- All `.puml` files (PlantUML diagram sources)
- All `.svg` files in `public/assets/diagrams/` (generated diagrams)

### Configuration (KEEP ALL)
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `index.html` - Main HTML file
- `setup.bat` - Setup script

### Source Code (KEEP ALL)
- `src/` - All source code
- `public/` - All public assets (except verification HTML files listed above)

### Essential Files (KEEP ALL)
- `.gitignore`
- `node_modules/` (if present)
- `dist/` (build output - can be regenerated)

---

## 📋 Summary

**Total files to remove:** ~170+ files

**Categories:**
- Python scripts: ~50 files
- JavaScript scripts: ~60 files
- HTML verification files: ~15 files
- JSON data files: ~25 files
- Text log files: ~4 files
- PowerShell scripts: ~3 files (optional)

**Estimated space saved:** ~5-10 MB

---

## ⚠️ Before Deleting

1. **Review this list** - Make sure you agree with each category
2. **Double-check** - Ensure no essential files are listed
3. **Test first** - Try deleting a small batch to verify
4. **Commit first** - Already done! Everything is committed.

---

## 🚀 Next Steps

Once you approve, I will:
1. Show you the final list for confirmation
2. Delete the files (or you can delete them manually)
3. Update `.gitignore` if needed
4. Commit the cleanup
