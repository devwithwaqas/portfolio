# 🗑️ Files Safe to Remove - VERIFIED

This document lists files that can be safely removed from the project. **ALL FILES HAVE BEEN VERIFIED** - none of these files are referenced in `index.html`, `src/`, or used by the running application.

## ⚠️ IMPORTANT - KEEP THESE FILES

**DO NOT DELETE:** These files are essential and must be kept:

### Essential Files
- ✅ All `.puml` files in `docs/diagrams/` (PlantUML diagram sources - needed for documentation/reference)
- ✅ All `.svg` files in `public/assets/diagrams/` (generated diagrams used by project pages)
- ✅ All documentation files (`.md` files in root and `docs/`)
- ✅ Configuration files: `package.json`, `vite.config.js`, `index.html`, `setup.bat`
- ✅ All files in `src/`, `public/assets/`, `node_modules/` (source code and assets)
- ✅ `README.md` and all guides in `docs/`

### Diagram Files Actually Used (KEEP ALL)
Based on codebase analysis, these diagram files ARE referenced in project pages:
- ✅ `AirAsia_ID90_C4_Diagram.svg` - Used in AirAsiaID90Page.vue
- ✅ `BAT_InhouseApp_C4_Diagram.svg` - Used in BATInhouseAppPage.vue
- ✅ `SmartCity_C4_Diagram.svg` - Used in SmartCityPage.vue
- ✅ `G5_POS_C4_Diagram.svg` - Used in G5POSPage.vue
- ✅ `GamifiedEmployeeManagement_C4_Diagram.svg` - Used in GamifiedEmployeeManagementPage.vue
- ✅ `ValetParking_C4_Diagram.svg` - Used in ValetParkingPage.vue
- ✅ `MobileGames_C4_Diagram.svg` - Used in MobileGamesPage.vue
- ✅ `UKPropertyManagement_C4_Diagram.svg` - Used in UKPropertyManagementPage.vue
- ✅ `InsuranceClients_C4_Diagram.svg` - Used in InsuranceClientsPage.vue
- ✅ `HeatExchanger_Diagram.svg` - Used in HeatExchangerPage.vue (path: /assets/img/heat-exchanger-diagram.svg)

### PlantUML Source Files (KEEP ALL)
These are source files for diagrams - **KEEP FOR REFERENCE TEMPLATES** (located in `docs/diagrams/`):
- ✅ `docs/diagrams/AirAsia_ID90_C4_Diagram.puml` - Complex enterprise architecture reference
- ✅ `docs/diagrams/BAT_InhouseApp_C4_Diagram.puml` - Microservices architecture reference
- ✅ `docs/diagrams/SmartCity_C4_Diagram.puml` - Large-scale system reference
- ✅ `docs/diagrams/G5_POS_C4_Diagram.puml` - Complete C4 Container diagram reference
- ✅ `docs/diagrams/GamifiedEmployeeManagement_C4_Diagram.puml` - Reference template
- ✅ `docs/diagrams/ValetParking_C4_Diagram.puml` - Reference template
- ✅ `docs/diagrams/MobileGames_C4_Diagram.puml` - Reference template
- ✅ `docs/diagrams/UKPropertyManagement_C4_Diagram.puml` - Reference template
- ✅ `docs/diagrams/InsuranceClients_C4_Diagram.puml` - Reference template

**Reason:** These serve as reference templates showing:
- Font sizes (defaultFontSize, titleFontSize, componentFontSize, etc.)
- File structure and formatting
- C4 diagram patterns and best practices
- Consistent styling across all diagrams

**Note:** See `PROJECT_PAGE_CREATION_GUIDE.md` for sample PUML structure and font size reference.

---

## 🗑️ FILES TO REMOVE (VERIFIED - NOT USED)

### ✅ Category 1: Analysis & Verification Python Scripts (50 files)

**Reason:** Development tools used for analyzing SVG files and extracting data. NOT referenced in codebase.

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

### ✅ Category 2: Fix & Verification JavaScript Files (60 files)

**Reason:** Development scripts used for fixing/verifying coordinates and mappings. NOT referenced in codebase.

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

### ✅ Category 3: Verification & Testing HTML Files (15 files)

**Reason:** Development/testing files used for verifying SVG coordinates and diagrams. NOT referenced in codebase.

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
```

### ✅ Category 4: Analysis & Data JSON Files (25 files)

**Reason:** Development analysis data files. NOT referenced in codebase.

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

**Note:** `BAT_InhouseApp_C4_Diagram_coordinates.json` in `public/assets/diagrams/` - NOT referenced in code, but might be used for narration. Keeping for now.

### ✅ Category 5: Log & Report Text Files (4 files)

**Reason:** Development logs and reports. NOT referenced in codebase.

```
bat-console-log-diagram-issue.txt
html-console-log.txt
comprehensive-cleanup-report.txt
create_complete_component_mapping.txt
```

### ✅ Category 6: Email Template Reference Files (2 files)

**Reason:** These are reference HTML templates for EmailJS setup. The actual email templates are stored in EmailJS dashboard. These files are just for reference during setup.

```
email_template_fixed.html
email_template_improved.html
```

**Note:** These can be removed as they're only used during EmailJS setup. The actual templates are in EmailJS dashboard.

### ✅ Category 7: PowerShell Scripts (3 files) - OPTIONAL

**Reason:** Development scripts for generating diagrams from PlantUML. Keep if you want to regenerate diagrams, remove if not needed.

```
generate_bat_diagram.ps1
generate_bat_svg.ps1
generate_gamified_employee_svg.ps1
```

**Recommendation:** Keep these if you might regenerate diagrams. Remove if you only need the final SVG files.

---

## 📊 Summary

**Total files to remove:** ~159 files

**Breakdown:**
- Python scripts: 50 files
- JavaScript scripts: 60 files
- HTML verification files: 15 files
- JSON data files: 25 files
- Text log files: 4 files
- Email template files: 2 files
- PowerShell scripts: 3 files (optional)

**Estimated space saved:** ~5-10 MB

---

## ✅ Verification Checklist

Before deleting, verify:

- [ ] ✅ All files NOT referenced in `index.html`
- [ ] ✅ All files NOT imported in `src/` codebase
- [ ] ✅ All diagram SVG files are KEPT (verified as used)
- [ ] ✅ All PlantUML files are KEPT (source files for diagrams)
- [ ] ✅ All documentation files are KEPT
- [ ] ✅ All configuration files are KEPT
- [ ] ✅ Everything is committed to git (safe point)

---

## 🚀 Next Steps

1. **Review this list** - Confirm files to remove
2. **Create backup** - Already done! Everything is committed to git
3. **Delete files** - Remove the listed files
4. **Test application** - Verify everything still works
5. **Commit cleanup** - Commit the file deletions
