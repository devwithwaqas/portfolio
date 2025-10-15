# Style Refactoring Dependencies Analysis

This report shows CSS class dependencies for width/height refactoring.

## Action Legend:

- 🔄 **REPLACE**: Class only sets size properties → Replace with standardized classes
- 🤔 **CONSIDER_REPLACE**: Class has size + structural props only → Might replace entirely
- ➕ **KEEP_BOTH**: Class has other important properties → Keep class + add standardized classes
- ⚪ **NO_SIZE**: Class doesn't set size (false positive)

---

## 📄 `src\components\common\ContactCard.vue`

### 🔄 **REPLACE**

#### Line 375: `.icon-container`

**Properties:**
- 📏 `height: 90px`
- 📏 `width: 90px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 374: `.icon-container`

**Properties:**
- 📏 `height: 90px`
- 📏 `width: 90px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 370: `.emoji-3d`

**Properties:**
- 📏 `height: 24px`
- 📏 `width: 24px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 369: `.emoji-3d`

**Properties:**
- 📏 `height: 24px`
- 📏 `width: 24px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 365: `.emoji-wrapper`

**Properties:**
- 📏 `height: 40px`
- 📏 `width: 40px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 364: `.emoji-wrapper`

**Properties:**
- 📏 `height: 40px`
- 📏 `width: 40px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 350: `.icon-container`

**Properties:**
- 📏 `height: 100px`
- 📏 `width: 100px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 349: `.icon-container`

**Properties:**
- 📏 `height: 100px`
- 📏 `width: 100px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 345: `.emoji-3d`

**Properties:**
- 📏 `height: 26px`
- 📏 `width: 26px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 344: `.emoji-3d`

**Properties:**
- 📏 `height: 26px`
- 📏 `width: 26px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 340: `.emoji-wrapper`

**Properties:**
- 📏 `height: 44px`
- 📏 `width: 44px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 339: `.emoji-wrapper`

**Properties:**
- 📏 `height: 44px`
- 📏 `width: 44px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### 🤔 **CONSIDER_REPLACE**

#### Line 300: `.info-row`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 🔧 `justify-content: center`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: display, align-items, justify-content

---

### ➕ **KEEP_BOTH**

#### Line 358: `.elegant-card`

**Properties:**
- 🔧 `gap: 14px`
- 📏 `height: 340px`
- 🔧 `padding: 24px 16px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, gap

---

#### Line 333: `.elegant-card`

**Properties:**
- 🔧 `gap: 16px`
- 📏 `height: 360px`
- 🔧 `padding: 28px 20px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, gap

---

#### Line 289: `.card-content`

**Properties:**
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `gap: 8px`
- 🔧 `position: relative`
- 🔧 `text-align: center`
- 📏 `width: 100%`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, display, flex-direction, gap, text-align

---

#### Line 259: `.icon-container`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(255, 255, 255, 0.05)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.4)`
- 🔧 `border-radius: 16px`
- 🔧 `display: flex`
- 📏 `height: 120px`
- 🔧 `justify-content: center`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 120px`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, border-radius, background, border, display, align-items, justify-content, transition

---

#### Line 258: `.icon-container`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(255, 255, 255, 0.05)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.4)`
- 🔧 `border-radius: 16px`
- 🔧 `display: flex`
- 📏 `height: 120px`
- 🔧 `justify-content: center`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 120px`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, border-radius, background, border, display, align-items, justify-content, transition

---

#### Line 238: `.emoji-3d`

**Properties:**
- 🔧 `display: block`
- 🔧 `filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`
- 📏 `height: 28px`
- 🔧 `object-fit: contain`
- 📏 `width: 28px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, display, filter

---

#### Line 237: `.emoji-3d`

**Properties:**
- 🔧 `display: block`
- 🔧 `filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`
- 📏 `height: 28px`
- 🔧 `object-fit: contain`
- 📏 `width: 28px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, display, filter

---

#### Line 216: `.emoji-wrapper`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(124, 58, 237, 0.3) 100%)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.4)`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)`
- 🔧 `display: flex`
- 📏 `height: 48px`
- 🔧 `justify-content: center`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 48px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, background, border, display, align-items, justify-content, box-shadow, transition

---

#### Line 215: `.emoji-wrapper`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(124, 58, 237, 0.3) 100%)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.4)`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)`
- 🔧 `display: flex`
- 📏 `height: 48px`
- 🔧 `justify-content: center`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 48px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, background, border, display, align-items, justify-content, box-shadow, transition

---

#### Line 188: `.circle-bg`

**Properties:**
- 🔧 `background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 70%)`
- 🔧 `border-radius: 50%`
- 📏 `height: 110%`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 44%`
- 🔧 `transform: translateX(-50%)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 110%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, left, top, transform, border-radius, background, z-index, transition

---

#### Line 187: `.circle-bg`

**Properties:**
- 🔧 `background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 70%)`
- 🔧 `border-radius: 50%`
- 📏 `height: 110%`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 44%`
- 🔧 `transform: translateX(-50%)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 110%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, left, top, transform, border-radius, background, z-index, transition

---

#### Line 133: `.elegant-card`

**Properties:**
- 🔧 `-webkit-backdrop-filter: blur(20px)`
- 🔧 `-webkit-backface-visibility: hidden`
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: linear-gradient(135deg, rgba(30, 10, 60, 0.95) 0%, rgba(20, 5, 40, 0.98) 50%, rgba(15, 0, 30, 1) 100%)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              0 4px 16px rgba(124, 58, 237, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `gap: 20px`
- 📏 `height: 380px`
- 🔧 `justify-content: center`
- 🔧 `overflow: hidden`
- 🔧 `padding: 32px 24px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `will-change: transform`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, background, backdrop-filter, -webkit-backdrop-filter, border, box-shadow, overflow, cursor, padding, display, flex-direction, align-items, justify-content, gap, transition, will-change, backface-visibility, -webkit-backface-visibility

---

#### Line 132: `.elegant-card`

**Properties:**
- 🔧 `-webkit-backdrop-filter: blur(20px)`
- 🔧 `-webkit-backface-visibility: hidden`
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: linear-gradient(135deg, rgba(30, 10, 60, 0.95) 0%, rgba(20, 5, 40, 0.98) 50%, rgba(15, 0, 30, 1) 100%)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              0 4px 16px rgba(124, 58, 237, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `gap: 20px`
- 📏 `height: 380px`
- 🔧 `justify-content: center`
- 🔧 `overflow: hidden`
- 🔧 `padding: 32px 24px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `will-change: transform`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, background, backdrop-filter, -webkit-backdrop-filter, border, box-shadow, overflow, cursor, padding, display, flex-direction, align-items, justify-content, gap, transition, will-change, backface-visibility, -webkit-backface-visibility

---

#### Line 111: `.contact-card-wrapper`

**Properties:**
- 🔧 `isolation: isolate`
- 🔧 `margin-bottom: 20px`
- 🔧 `padding: 8px`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, margin-bottom, isolation, transform

---

### ⚪ **NO_SIZE**

#### Line 356: `@media (pointer: coarse) and (max-width: 480px)`

**Properties:**
- 🔧 `.elegant-card {
    height: 340px`
- 🔧 `gap: 14px`
- 🔧 `padding: 24px 16px`

---

#### Line 331: `@media (pointer: coarse) and (max-width: 768px)`

**Properties:**
- 🔧 `.elegant-card {
    height: 360px`
- 🔧 `gap: 16px`
- 🔧 `padding: 28px 20px`

---

#### Line 327: `.info-subtitle`

**Properties:**
- 🔧 `-webkit-background-clip: text`
- 🔧 `-webkit-text-fill-color: transparent`
- 🔧 `/* Font size managed by font-sizes.css */
  color: rgba(255, 255, 255, 0.7)`
- 🔧 `background: linear-gradient(135deg, #ffeb3b 0%, #ff9800 100%)`
- 🔧 `background-clip: text`
- 🔧 `margin: 0`
- 🔧 `max-width: 100%`
- 🔧 `word-break: break-word`

---

#### Line 314: `.info-value`

**Properties:**
- 🔧 `-webkit-background-clip: text`
- 🔧 `-webkit-text-fill-color: transparent`
- 🔧 `/* Font size managed by font-sizes.css */
  font-weight: 600`
- 🔧 `background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)`
- 🔧 `background-clip: text`
- 🔧 `color: white`
- 🔧 `margin: 0`
- 🔧 `max-width: 100%`
- 🔧 `overflow-wrap: anywhere`
- 🔧 `padding: 0 8px`
- 🔧 `word-break: break-all`

---

#### Line 207: `.card-header-section`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `gap: 8px`
- 🔧 `line-height: 1.2`
- 🔧 `position: relative`
- 🔧 `text-align: center`
- 🔧 `text-transform: uppercase`
- 🔧 `z-index: 10`

---



## 📄 `src\components\common\ContactForm.vue`

### 🤔 **CONSIDER_REPLACE**

#### Line 386: `.epic-buttons`

**Properties:**
- 🔧 `display: flex`
- 🔧 `gap: 8px`
- 🔧 `justify-content: center`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: display, gap, justify-content

---

### ➕ **KEEP_BOTH**

#### Line 446: `.button_sl`

**Properties:**
- 🔧 `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #7c3aed 100%)`
- 🔧 `bottom: -1px`
- 🔧 `display: block`
- 🔧 `left: -8px`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 🔧 `transform: skew(-15deg)`
- 🔧 `transition: all .2s ease`
- 📏 `width: 0`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, position, top, bottom, left, background, transform, transition

---

#### Line 435: `.button_lg::after`

**Properties:**
- 🔧 `background-color: #0f1923`
- 🔧 `bottom: 0`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 4px`
- 🔧 `position: absolute`
- 🔧 `right: 0`
- 🔧 `transition: all .2s ease`
- 📏 `width: 4px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, right, bottom, background-color, transition

---

#### Line 434: `.button_lg::after`

**Properties:**
- 🔧 `background-color: #0f1923`
- 🔧 `bottom: 0`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 4px`
- 🔧 `position: absolute`
- 🔧 `right: 0`
- 🔧 `transition: all .2s ease`
- 📏 `width: 4px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, right, bottom, background-color, transition

---

#### Line 424: `.button_lg::before`

**Properties:**
- 🔧 `background-color: #0f1923`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 2px`
- 🔧 `left: 0`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 2px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, top, left, background-color

---

#### Line 423: `.button_lg::before`

**Properties:**
- 🔧 `background-color: #0f1923`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 2px`
- 🔧 `left: 0`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 2px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, top, left, background-color

---

#### Line 297: `.form-header h3::after`

**Properties:**
- 🔧 `background: linear-gradient(90deg, #3b82f6, #7c3aed, #a855f7)`
- 🔧 `border-radius: 2px`
- 🔧 `bottom: -8px`
- 🔧 `box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4)`
- 🔧 `content: ''`
- 📏 `height: 3px`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `transform: translateX(-50%)`
- 📏 `width: 60px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, bottom, left, transform, background, border-radius, box-shadow

---

#### Line 296: `.form-header h3::after`

**Properties:**
- 🔧 `background: linear-gradient(90deg, #3b82f6, #7c3aed, #a855f7)`
- 🔧 `border-radius: 2px`
- 🔧 `bottom: -8px`
- 🔧 `box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4)`
- 🔧 `content: ''`
- 📏 `height: 3px`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `transform: translateX(-50%)`
- 📏 `width: 60px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, bottom, left, transform, background, border-radius, box-shadow

---

#### Line 224: `.clean-form-container`

**Properties:**
- 🔧 `-webkit-backdrop-filter: blur(20px) saturate(180%)`
- 🔧 `backdrop-filter: blur(20px) saturate(180%)`
- 🔧 `background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)`
- 🔧 `border: 2px solid rgba(255, 255, 255, 0.4)`
- 🔧 `border-radius: 24px`
- 🔧 `box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15),
    0 15px 40px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.9),
    inset 0 -1px 2px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(124, 58, 237, 0.1)`
- 📏 `height: auto`
- 🔧 `min-height: auto`
- 🔧 `overflow: visible`
- 🔧 `padding: 30px`
- 🔧 `position: relative`
- 🔧 `transform: translateY(0)`
- 🔧 `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100% !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, backdrop-filter, -webkit-backdrop-filter, border, border-radius, padding, box-shadow, min-height, overflow, position, transform, transition

---

#### Line 200: `.contact-form-wrapper`

**Properties:**
- 🔧 `box-sizing: border-box`
- 🔧 `display: block`
- 📏 `height: auto`
- 🔧 `margin-bottom: 20px`
- 🔧 `min-height: auto`
- 🔧 `padding: 10px`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, display, min-height, margin-bottom, box-sizing

---

### ⚪ **NO_SIZE**

#### Line 328: `.form-header p`

**Properties:**
- 🔧 `color: #4b5563`
- 🔧 `font-weight: 500`
- 🔧 `line-height: 1.6`
- 🔧 `margin-bottom: 0`
- 🔧 `opacity: 0.8`
- 🔧 `position: relative`
- 🔧 `text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)`

---



## 📄 `src\components\common\CustomSlider.vue`

### 🔄 **REPLACE**

#### Line 402: `.slider-dot`

**Properties:**
- 📏 `height: 10px`
- 📏 `width: 10px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 401: `.slider-dot`

**Properties:**
- 📏 `height: 10px`
- 📏 `width: 10px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 396: `.slider-arrow`

**Properties:**
- 📏 `height: 50px`
- 📏 `width: 50px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 395: `.slider-arrow`

**Properties:**
- 📏 `height: 50px`
- 📏 `width: 50px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 379: `.slider-dot`

**Properties:**
- 📏 `height: 12px`
- 📏 `width: 12px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 378: `.slider-dot`

**Properties:**
- 📏 `height: 12px`
- 📏 `width: 12px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 373: `.slider-arrow`

**Properties:**
- 📏 `height: 55px`
- 📏 `width: 55px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 372: `.slider-arrow`

**Properties:**
- 📏 `height: 55px`
- 📏 `width: 55px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### 🤔 **CONSIDER_REPLACE**

#### Line 218: `.slider-slides`

**Properties:**
- 🔧 `transition: height 0.3s ease-in-out`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: transition

---

### ➕ **KEEP_BOTH**

#### Line 355: `.slider-dot`

**Properties:**
- 🔧 `border-radius: 50% !important`
- 🔧 `flex-shrink: 0 !important`
- 📏 `height: 12px !important`
- 🔧 `min-height: 12px !important`
- 🔧 `min-width: 12px !important`
- 📏 `width: 12px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, flex-shrink, min-width, min-height

---

#### Line 354: `.slider-dot`

**Properties:**
- 🔧 `border-radius: 50% !important`
- 🔧 `flex-shrink: 0 !important`
- 📏 `height: 12px !important`
- 🔧 `min-height: 12px !important`
- 🔧 `min-width: 12px !important`
- 📏 `width: 12px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, flex-shrink, min-width, min-height

---

#### Line 351: `.slider-dot`

**Properties:**
- 🔧 `border-radius: 50% !important`
- 🔧 `flex-shrink: 0 !important`
- 📏 `height: 12px !important`
- 🔧 `min-height: 12px !important`
- 🔧 `min-width: 12px !important`
- 📏 `width: 12px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, flex-shrink, min-width, min-height

---

#### Line 350: `.slider-dot`

**Properties:**
- 🔧 `border-radius: 50% !important`
- 🔧 `flex-shrink: 0 !important`
- 📏 `height: 12px !important`
- 🔧 `min-height: 12px !important`
- 🔧 `min-width: 12px !important`
- 📏 `width: 12px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, flex-shrink, min-width, min-height

---

#### Line 321: `.slider-dot`

**Properties:**
- 🔧 `background: rgba(60, 20, 120, 0.3)`
- 🔧 `border: none`
- 🔧 `border-radius: 50%`
- 🔧 `cursor: pointer`
- 📏 `height: 12px`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 12px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border, border-radius, background, cursor, transition

---

#### Line 320: `.slider-dot`

**Properties:**
- 🔧 `background: rgba(60, 20, 120, 0.3)`
- 🔧 `border: none`
- 🔧 `border-radius: 50%`
- 🔧 `cursor: pointer`
- 📏 `height: 12px`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 12px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border, border-radius, background, cursor, transition

---

#### Line 284: `.slider-arrow`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  cursor: pointer`
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%)`
- 🔧 `border: none`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3)`
- 🔧 `color: white`
- 🔧 `display: flex`
- 📏 `height: 50px`
- 🔧 `justify-content: center`
- 🔧 `pointer-events: auto`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 50px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border, border-radius, background, color, /* Font size handled by font-sizes.css */
  cursor, transition, pointer-events, display, align-items, justify-content, box-shadow

---

#### Line 283: `.slider-arrow`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  cursor: pointer`
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%)`
- 🔧 `border: none`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3)`
- 🔧 `color: white`
- 🔧 `display: flex`
- 📏 `height: 50px`
- 🔧 `justify-content: center`
- 🔧 `pointer-events: auto`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 50px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border, border-radius, background, color, /* Font size handled by font-sizes.css */
  cursor, transition, pointer-events, display, align-items, justify-content, box-shadow

---

#### Line 224: `.slider-slide`

**Properties:**
- 🔧 `animation: slideIn 0.3s ease-in-out`
- 📏 `height: auto`
- 🔧 `min-height: 200px`
- 🔧 `opacity: 1`
- 🔧 `overflow: visible`
- 🔧 `transition: all 0.3s ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: min-height, overflow, opacity, transition, animation

---

#### Line 223: `.slider-slide`

**Properties:**
- 🔧 `animation: slideIn 0.3s ease-in-out`
- 📏 `height: auto`
- 🔧 `min-height: 200px`
- 🔧 `opacity: 1`
- 🔧 `overflow: visible`
- 🔧 `transition: all 0.3s ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: min-height, overflow, opacity, transition, animation

---

#### Line 212: `.slider-track`

**Properties:**
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 🔧 `transition: height 0.3s ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, transition, overflow

---

#### Line 207: `.custom-slider`

**Properties:**
- 🔧 `min-height: 200px`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 🔧 `transition: height 0.3s ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, overflow, transition, min-height

---

#### Line 204: `.custom-slider`

**Properties:**
- 🔧 `min-height: 200px`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 🔧 `transition: height 0.3s ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, overflow, transition, min-height

---

### ⚪ **NO_SIZE**

#### Line 383: `@media (pointer: coarse) and (max-width: 480px)`

**Properties:**
- 🔧 `.slider-controls {
    gap: 15px`
- 🔧 `margin-top: 15px`
- 🔧 `padding: 15px 0`

---

#### Line 360: `@media (pointer: coarse) and (max-width: 768px)`

**Properties:**
- 🔧 `.slider-controls {
    gap: 15px`
- 🔧 `margin-top: 15px`
- 🔧 `padding: 15px 0`

---

#### Line 341: `@media (pointer: coarse) and (max-width: 768px)`

**Properties:**
- 🔧 `.slider-pagination {
    flex-direction: row !important`
- 🔧 `align-items: center !important`
- 🔧 `flex-wrap: nowrap !important`
- 🔧 `justify-content: center !important`

---



## 📄 `src\components\common\EpicCard.vue`

### 🔄 **REPLACE**

#### Line 1040: `.tech-icon-box`

**Properties:**
- 📏 `height: 24px`
- 📏 `width: 24px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 1039: `.tech-icon-box`

**Properties:**
- 📏 `height: 24px`
- 📏 `width: 24px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 1035: `.banner-section`

**Properties:**
- 📏 `height: 160px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 1019: `.button`

**Properties:**
- 📏 `width: 100%`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 1006: `.tech-icon-box`

**Properties:**
- 📏 `height: 28px`
- 📏 `width: 28px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 1005: `.tech-icon-box`

**Properties:**
- 📏 `height: 28px`
- 📏 `width: 28px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 1001: `.banner-section`

**Properties:**
- 📏 `height: 180px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### 🤔 **CONSIDER_REPLACE**

#### Line 1015: `.epic-buttons`

**Properties:**
- 🔧 `flex-direction: column`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: flex-direction

---

#### Line 727: `.epic-buttons`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 🔧 `gap: 8px`
- 🔧 `justify-content: center`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: display, gap, justify-content, align-items

---

### ➕ **KEEP_BOTH**

#### Line 1023: `.button_lg`

**Properties:**
- 🔧 `text-align: center`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: text-align

---

#### Line 982: `.card-glow`

**Properties:**
- 🔧 `background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)`
- 📏 `height: 80%`
- 🔧 `left: 50%`
- 🔧 `opacity: 0`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: 50%`
- 🔧 `transform: translate(-50%, -50%)`
- 🔧 `transition: opacity 0.4s ease`
- 📏 `width: 80%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, background, opacity, transition, pointer-events, z-index

---

#### Line 981: `.card-glow`

**Properties:**
- 🔧 `background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)`
- 📏 `height: 80%`
- 🔧 `left: 50%`
- 🔧 `opacity: 0`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: 50%`
- 🔧 `transform: translate(-50%, -50%)`
- 🔧 `transition: opacity 0.4s ease`
- 📏 `width: 80%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, background, opacity, transition, pointer-events, z-index

---

#### Line 837: `.button_sl`

**Properties:**
- 🔧 `bottom: -1px`
- 🔧 `display: block`
- 🔧 `left: -8px`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 🔧 `transform: skew(-15deg)`
- 🔧 `transition: all .2s ease`
- 📏 `width: 0`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, position, top, bottom, left, transform, transition

---

#### Line 826: `.button_lg::after`

**Properties:**
- 🔧 `background-color: #1a0b2e`
- 🔧 `bottom: 0`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 4px`
- 🔧 `position: absolute`
- 🔧 `right: 0`
- 🔧 `transition: all .2s ease`
- 📏 `width: 4px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, right, bottom, background-color, transition

---

#### Line 825: `.button_lg::after`

**Properties:**
- 🔧 `background-color: #1a0b2e`
- 🔧 `bottom: 0`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 4px`
- 🔧 `position: absolute`
- 🔧 `right: 0`
- 🔧 `transition: all .2s ease`
- 📏 `width: 4px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, right, bottom, background-color, transition

---

#### Line 815: `.button_lg::before`

**Properties:**
- 🔧 `background-color: #1a0b2e`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 2px`
- 🔧 `left: 0`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 2px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, top, left, background-color

---

#### Line 814: `.button_lg::before`

**Properties:**
- 🔧 `background-color: #1a0b2e`
- 🔧 `content: ''`
- 🔧 `display: block`
- 📏 `height: 2px`
- 🔧 `left: 0`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 2px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, display, position, top, left, background-color

---

#### Line 753: `.button`

**Properties:**
- 🔧 `-moz-appearance: none`
- 🔧 `-webkit-appearance: none`
- 🔧 `/* Font size handled by font-sizes.css */
  transition: all .15s ease`
- 🔧 `appearance: none`
- 🔧 `background: none`
- 🔧 `border: none`
- 🔧 `color: #0f1923`
- 🔧 `cursor: pointer`
- 🔧 `display: block`
- 🔧 `flex: 1`
- 🔧 `font-weight: bold`
- 🔧 `padding: 8px`
- 🔧 `position: relative`
- 🔧 `text-decoration: none`
- 🔧 `text-transform: uppercase`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: -moz-appearance, -webkit-appearance, appearance, border, background, color, cursor, position, padding, text-transform, font-weight, /* Font size handled by font-sizes.css */
  transition, text-decoration, flex, display

---

#### Line 688: `.text-overlay`

**Properties:**
- 🔧 `background: radial-gradient(circle at center, rgba(124,58,237,0.1) 0%, transparent 70%)`
- 📏 `height: 100%`
- 🔧 `left: 0`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 100%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, pointer-events, z-index

---

#### Line 687: `.text-overlay`

**Properties:**
- 🔧 `background: radial-gradient(circle at center, rgba(124,58,237,0.1) 0%, transparent 70%)`
- 📏 `height: 100%`
- 🔧 `left: 0`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 100%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, pointer-events, z-index

---

#### Line 614: `.banner-overlay`

**Properties:**
- 🔧 `background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)`
- 📏 `height: 100%`
- 🔧 `left: 0`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, pointer-events

---

#### Line 613: `.banner-overlay`

**Properties:**
- 🔧 `background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)`
- 📏 `height: 100%`
- 🔧 `left: 0`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, pointer-events

---

#### Line 600: `.banner-img`

**Properties:**
- 📏 `height: 100%`
- 🔧 `object-fit: cover`
- 🔧 `transition: transform 0.4s ease`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, transition

---

#### Line 599: `.banner-img`

**Properties:**
- 📏 `height: 100%`
- 🔧 `object-fit: cover`
- 🔧 `transition: transform 0.4s ease`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, transition

---

#### Line 591: `.banner-section`

**Properties:**
- 🔧 `border-radius: 8px`
- 🔧 `flex-shrink: 0`
- 📏 `height: 200px`
- 🔧 `margin: 0`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, overflow, border-radius, margin, flex-shrink

---

#### Line 590: `.banner-section`

**Properties:**
- 🔧 `border-radius: 8px`
- 🔧 `flex-shrink: 0`
- 📏 `height: 200px`
- 🔧 `margin: 0`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, overflow, border-radius, margin, flex-shrink

---

#### Line 582: `.tech-stack-icon`

**Properties:**
- 🔧 `filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`
- 📏 `height: 100%`
- 🔧 `object-fit: contain`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, filter

---

#### Line 581: `.tech-stack-icon`

**Properties:**
- 🔧 `filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))`
- 📏 `height: 100%`
- 🔧 `object-fit: contain`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, filter

---

#### Line 563: `.tech-icon-box`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(255, 255, 255, 0.05)`
- 🔧 `border: 1px solid rgba(255, 255, 255, 0.1)`
- 🔧 `border-radius: 6px`
- 🔧 `display: flex`
- 📏 `height: 32px`
- 🔧 `justify-content: center`
- 🔧 `padding: 4px`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 32px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, justify-content, background, border-radius, padding, transition, border

---

#### Line 562: `.tech-icon-box`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(255, 255, 255, 0.05)`
- 🔧 `border: 1px solid rgba(255, 255, 255, 0.1)`
- 🔧 `border-radius: 6px`
- 🔧 `display: flex`
- 📏 `height: 32px`
- 🔧 `justify-content: center`
- 🔧 `padding: 4px`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 32px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, justify-content, background, border-radius, padding, transition, border

---

#### Line 478: `.epic-card`

**Properties:**
- 🔧 `--border-width: 12px`
- 🔧 `/* Allow card to fill available container width */
  min-height: 450px`
- 🔧 `/* Subtle rounded corners */
  overflow: visible`
- 🔧 `backdrop-filter: blur(15px)`
- 🔧 `background: linear-gradient(135deg, rgba(30,20,50,0.95), rgba(45,30,70,0.9))`
- 🔧 `border: 1px solid rgba(124,58,237,0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1)`
- 🔧 `box-sizing: border-box`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `max-width: 100%`
- 🔧 `padding: 8px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `z-index: 3`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: --border-width, position, /* Allow card to fill available container width */
  min-height, background, border, box-shadow, backdrop-filter, border-radius, /* Subtle rounded corners */
  overflow, cursor, transition, display, flex-direction, z-index, padding, box-sizing, max-width

---

#### Line 477: `.epic-card`

**Properties:**
- 🔧 `--border-width: 12px`
- 🔧 `/* Allow card to fill available container width */
  min-height: 450px`
- 🔧 `/* Subtle rounded corners */
  overflow: visible`
- 🔧 `backdrop-filter: blur(15px)`
- 🔧 `background: linear-gradient(135deg, rgba(30,20,50,0.95), rgba(45,30,70,0.9))`
- 🔧 `border: 1px solid rgba(124,58,237,0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1)`
- 🔧 `box-sizing: border-box`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `max-width: 100%`
- 🔧 `padding: 8px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `z-index: 3`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: --border-width, position, /* Allow card to fill available container width */
  min-height, background, border, box-shadow, backdrop-filter, border-radius, /* Subtle rounded corners */
  overflow, cursor, transition, display, flex-direction, z-index, padding, box-sizing, max-width

---

#### Line 475: `.epic-card`

**Properties:**
- 🔧 `--border-width: 12px`
- 🔧 `/* Allow card to fill available container width */
  min-height: 450px`
- 🔧 `/* Subtle rounded corners */
  overflow: visible`
- 🔧 `backdrop-filter: blur(15px)`
- 🔧 `background: linear-gradient(135deg, rgba(30,20,50,0.95), rgba(45,30,70,0.9))`
- 🔧 `border: 1px solid rgba(124,58,237,0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1)`
- 🔧 `box-sizing: border-box`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `max-width: 100%`
- 🔧 `padding: 8px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `z-index: 3`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: --border-width, position, /* Allow card to fill available container width */
  min-height, background, border, box-shadow, backdrop-filter, border-radius, /* Subtle rounded corners */
  overflow, cursor, transition, display, flex-direction, z-index, padding, box-sizing, max-width

---

#### Line 465: `.card-container`

**Properties:**
- 🔧 `/* Allow container to fill available column width */
  max-width: 100%`
- 🔧 `/* Remove any background */
  border: none !important`
- 🔧 `/* Remove any borders */
  box-shadow: none !important`
- 🔧 `/* Remove fixed max-width to prevent overflow */
  min-height: 450px`
- 🔧 `align-items: center`
- 🔧 `background: transparent !important`
- 🔧 `display: flex`
- 🔧 `justify-content: center`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, /* Allow container to fill available column width */
  max-width, /* Remove fixed max-width to prevent overflow */
  min-height, display, justify-content, align-items, background, /* Remove any background */
  border, /* Remove any borders */
  box-shadow

---

#### Line 464: `.card-container`

**Properties:**
- 🔧 `/* Allow container to fill available column width */
  max-width: 100%`
- 🔧 `/* Remove any background */
  border: none !important`
- 🔧 `/* Remove any borders */
  box-shadow: none !important`
- 🔧 `/* Remove fixed max-width to prevent overflow */
  min-height: 450px`
- 🔧 `align-items: center`
- 🔧 `background: transparent !important`
- 🔧 `display: flex`
- 🔧 `justify-content: center`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, /* Allow container to fill available column width */
  max-width, /* Remove fixed max-width to prevent overflow */
  min-height, display, justify-content, align-items, background, /* Remove any background */
  border, /* Remove any borders */
  box-shadow

---

#### Line 463: `.card-container`

**Properties:**
- 🔧 `/* Allow container to fill available column width */
  max-width: 100%`
- 🔧 `/* Remove any background */
  border: none !important`
- 🔧 `/* Remove any borders */
  box-shadow: none !important`
- 🔧 `/* Remove fixed max-width to prevent overflow */
  min-height: 450px`
- 🔧 `align-items: center`
- 🔧 `background: transparent !important`
- 🔧 `display: flex`
- 🔧 `justify-content: center`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, /* Allow container to fill available column width */
  max-width, /* Remove fixed max-width to prevent overflow */
  min-height, display, justify-content, align-items, background, /* Remove any background */
  border, /* Remove any borders */
  box-shadow

---

### ⚪ **NO_SIZE**

#### Line 1030: `.epic-card`

**Properties:**
- 🔧 `min-height: 380px`
- 🔧 `padding: 6px`

---

#### Line 1028: `@media (max-width: 480px)`

**Properties:**
- 🔧 `.epic-card {
    min-height: 380px`
- 🔧 `padding: 6px`

---

#### Line 997: `.epic-card`

**Properties:**
- 🔧 `min-height: 400px`

---

#### Line 995: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.epic-card {
    min-height: 400px`

---

#### Line 967: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 14px !important`
- 🔧 `padding: 2px 4px !important`
- 🔧 `text-align: center !important`

---

#### Line 963: `@media (max-width: 399px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 2px 4px !important`
- 🔧 `min-height: 14px !important`
- 🔧 `text-align: center !important`

---

#### Line 954: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 16px !important`
- 🔧 `padding: 2px 6px !important`
- 🔧 `text-align: center !important`

---

#### Line 950: `@media (min-width: 400px) and (max-width: 549px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 2px 6px !important`
- 🔧 `min-height: 16px !important`
- 🔧 `text-align: center !important`

---

#### Line 941: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 18px !important`
- 🔧 `padding: 3px 6px !important`
- 🔧 `text-align: center !important`

---

#### Line 937: `@media (min-width: 400px) and (max-width: 575px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 3px 6px !important`
- 🔧 `min-height: 18px !important`
- 🔧 `text-align: center !important`

---

#### Line 928: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 20px !important`
- 🔧 `padding: 3px 8px !important`
- 🔧 `text-align: center !important`

---

#### Line 924: `@media (min-width: 576px) and (max-width: 767px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 3px 8px !important`
- 🔧 `min-height: 20px !important`
- 🔧 `text-align: center !important`

---

#### Line 915: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 22px !important`
- 🔧 `padding: 4px 10px !important`
- 🔧 `text-align: center !important`

---

#### Line 911: `@media (min-width: 768px) and (max-width: 991px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 4px 10px !important`
- 🔧 `min-height: 22px !important`
- 🔧 `text-align: center !important`

---

#### Line 902: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 24px !important`
- 🔧 `padding: 4px 12px !important`
- 🔧 `text-align: center !important`

---

#### Line 898: `@media (min-width: 992px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 4px 12px !important`
- 🔧 `min-height: 24px !important`
- 🔧 `text-align: center !important`

---

#### Line 889: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 26px !important`
- 🔧 `padding: 5px 15px !important`
- 🔧 `text-align: center !important`

---

#### Line 885: `@media (min-width: 1200px) and (max-width: 1399px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 5px 15px !important`
- 🔧 `min-height: 26px !important`
- 🔧 `text-align: center !important`

---

#### Line 876: `.epic-buttons .button_lg`

**Properties:**
- 🔧 `min-height: 28px !important`
- 🔧 `padding: 6px 18px !important`
- 🔧 `text-align: center !important`

---

#### Line 872: `@media (min-width: 1400px)`

**Properties:**
- 🔧 `.epic-buttons .button_lg {
    padding: 6px 18px !important`
- 🔧 `min-height: 28px !important`
- 🔧 `text-align: center !important`

---

#### Line 776: `.button::after`

**Properties:**
- 🔧 `border-top-width: 0`
- 🔧 `bottom: 0`

---

#### Line 771: `.button::before`

**Properties:**
- 🔧 `border-bottom-width: 0`
- 🔧 `top: 0`

---

#### Line 733: `.epic-buttons > *`

**Properties:**
- 🔧 `flex: 1`
- 🔧 `min-width: 0`

---

#### Line 710: `.project-subtitle`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.8)`
- 🔧 `line-height: 1.4`
- 🔧 `margin: 0`
- 🔧 `text-shadow: 0 0 8px rgba(255, 255, 255, 0.2)`

---

#### Line 513: `.epic-card`

**Properties:**
- 🔧 `--stroke-width-viewbox: 70`
- 🔧 `/* Base offset from epic-card edge */
  /* Auto-calculated: stroke-width in pixels = (70/400) * cardWidth ≈ 61px for 350px card */
  --stroke-half: 30.5px`
- 🔧 `/* Half of actual stroke width (70/400 * 350 / 2) - UPDATE when changing stroke-width */
  --stroke-full: 61px`
- 🔧 `/* Stroke width in viewBox units (change this to adjust thickness) */
  --viewbox-width: 400`
- 🔧 `/* ViewBox width */
  --base-offset: 10px`

---



## 📄 `src\components\common\ImagePreview.vue`

### 🔄 **REPLACE**

#### Line 472: `.toolbar-btn`

**Properties:**
- 📏 `height: 40px`
- 📏 `width: 40px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 471: `.toolbar-btn`

**Properties:**
- 📏 `height: 40px`
- 📏 `width: 40px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 459: `.zoom-wrapper`

**Properties:**
- 📏 `height: calc(100dvh - 160px)`
- 📏 `width: 95%`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### ➕ **KEEP_BOTH**

#### Line 418: `.toolbar-btn`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(139, 92, 246, 0.2)`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.4)`
- 🔧 `border-radius: 8px`
- 🔧 `color: #ffffff`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 📏 `height: 44px`
- 🔧 `justify-content: center`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 44px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border, border-radius, color, cursor, display, align-items, justify-content, transition

---

#### Line 417: `.toolbar-btn`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(139, 92, 246, 0.2)`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.4)`
- 🔧 `border-radius: 8px`
- 🔧 `color: #ffffff`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 📏 `height: 44px`
- 🔧 `justify-content: center`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 44px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border, border-radius, color, cursor, display, align-items, justify-content, transition

---

#### Line 387: `.preview-image`

**Properties:**
- 🔧 `-webkit-user-select: none`
- 🔧 `/* Prevent browser drag/select */
  -webkit-user-drag: none`
- 🔧 `border-radius: 20px`
- 🔧 `box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6)`
- 🔧 `display: block`
- 📏 `height: auto`
- 🔧 `max-height: 100%`
- 🔧 `max-width: 100%`
- 🔧 `touch-action: none`
- 🔧 `user-select: none`
- 📏 `width: auto`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, max-height, display, border-radius, box-shadow, /* Prevent browser drag/select */
  -webkit-user-drag, user-select, -webkit-user-select, touch-action

---

#### Line 386: `.preview-image`

**Properties:**
- 🔧 `-webkit-user-select: none`
- 🔧 `/* Prevent browser drag/select */
  -webkit-user-drag: none`
- 🔧 `border-radius: 20px`
- 🔧 `box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6)`
- 🔧 `display: block`
- 📏 `height: auto`
- 🔧 `max-height: 100%`
- 🔧 `max-width: 100%`
- 🔧 `touch-action: none`
- 🔧 `user-select: none`
- 📏 `width: auto`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, max-height, display, border-radius, box-shadow, /* Prevent browser drag/select */
  -webkit-user-drag, user-select, -webkit-user-select, touch-action

---

#### Line 370: `.zoom-wrapper`

**Properties:**
- 🔧 `-webkit-user-select: none`
- 🔧 `/* CRITICAL: Capture touch/pointer gestures */
  touch-action: none`
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 📏 `height: calc(100dvh - 180px)`
- 🔧 `justify-content: center`
- 🔧 `max-height: 800px`
- 🔧 `max-width: 1200px`
- 🔧 `overflow: visible`
- 🔧 `pointer-events: auto`
- 🔧 `position: relative`
- 🔧 `user-select: none`
- 📏 `width: 90%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, max-height, overflow, display, align-items, justify-content, /* CRITICAL, pointer-events, user-select, -webkit-user-select, position

---

#### Line 367: `.zoom-wrapper`

**Properties:**
- 🔧 `-webkit-user-select: none`
- 🔧 `/* CRITICAL: Capture touch/pointer gestures */
  touch-action: none`
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 📏 `height: calc(100dvh - 180px)`
- 🔧 `justify-content: center`
- 🔧 `max-height: 800px`
- 🔧 `max-width: 1200px`
- 🔧 `overflow: visible`
- 🔧 `pointer-events: auto`
- 🔧 `position: relative`
- 🔧 `user-select: none`
- 📏 `width: 90%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, max-height, overflow, display, align-items, justify-content, /* CRITICAL, pointer-events, user-select, -webkit-user-select, position

---

#### Line 366: `.zoom-wrapper`

**Properties:**
- 🔧 `-webkit-user-select: none`
- 🔧 `/* CRITICAL: Capture touch/pointer gestures */
  touch-action: none`
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 📏 `height: calc(100dvh - 180px)`
- 🔧 `justify-content: center`
- 🔧 `max-height: 800px`
- 🔧 `max-width: 1200px`
- 🔧 `overflow: visible`
- 🔧 `pointer-events: auto`
- 🔧 `position: relative`
- 🔧 `user-select: none`
- 📏 `width: 90%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, max-height, overflow, display, align-items, justify-content, /* CRITICAL, pointer-events, user-select, -webkit-user-select, position

---

#### Line 333: `.image-preview-modal`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `background: rgba(0, 0, 0, 0.95)`
- 🔧 `display: flex`
- 📏 `height: 100dvh`
- 🔧 `justify-content: center`
- 🔧 `left: 0`
- 🔧 `padding: 80px 20px 100px`
- 🔧 `position: fixed`
- 🔧 `top: 0`
- 📏 `width: 100vw`
- 🔧 `z-index: 999999`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, backdrop-filter, z-index, display, align-items, justify-content, padding

---

#### Line 332: `.image-preview-modal`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `background: rgba(0, 0, 0, 0.95)`
- 🔧 `display: flex`
- 📏 `height: 100dvh`
- 🔧 `justify-content: center`
- 🔧 `left: 0`
- 🔧 `padding: 80px 20px 100px`
- 🔧 `position: fixed`
- 🔧 `top: 0`
- 📏 `width: 100vw`
- 🔧 `z-index: 999999`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, backdrop-filter, z-index, display, align-items, justify-content, padding

---

#### Line 331: `.image-preview-modal`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `background: rgba(0, 0, 0, 0.95)`
- 🔧 `display: flex`
- 📏 `height: 100dvh`
- 🔧 `justify-content: center`
- 🔧 `left: 0`
- 🔧 `padding: 80px 20px 100px`
- 🔧 `position: fixed`
- 🔧 `top: 0`
- 📏 `width: 100vw`
- 🔧 `z-index: 999999`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, background, backdrop-filter, z-index, display, align-items, justify-content, padding

---

### ⚪ **NO_SIZE**

#### Line 448: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.image-preview-modal {
    padding: 70px 10px 90px`

---



## 📄 `src\components\common\NavButton.vue`

### ➕ **KEEP_BOTH**

#### Line 260: `.test-icon`

**Properties:**
- 🔧 `flex-shrink: 0`
- 📏 `height: 22px`
- 🔧 `stroke: rgba(255, 255, 255, 0.7)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 22px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: flex-shrink, stroke, transition

---

#### Line 259: `.test-icon`

**Properties:**
- 🔧 `flex-shrink: 0`
- 📏 `height: 22px`
- 🔧 `stroke: rgba(255, 255, 255, 0.7)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 22px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: flex-shrink, stroke, transition

---

#### Line 190: `.test-nav-link`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: transparent`
- 🔧 `border: none`
- 🔧 `border-left: 3px solid transparent`
- 🔧 `border-radius: 0`
- 🔧 `color: rgba(255, 255, 255, 0.7)`
- 🔧 `display: flex`
- 🔧 `font-weight: 500`
- 🔧 `gap: 10px`
- 📏 `height: auto !important`
- 🔧 `margin: 0`
- 🔧 `margin-left: 0`
- 🔧 `min-height: 44px`
- 🔧 `padding: 12px 16px`
- 🔧 `position: relative`
- 🔧 `text-decoration: none`
- 🔧 `transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 85%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, gap, padding, min-height, margin, margin-left, color, background, border, border-left, text-decoration, border-radius, font-weight, position, transition

---

#### Line 189: `.test-nav-link`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: transparent`
- 🔧 `border: none`
- 🔧 `border-left: 3px solid transparent`
- 🔧 `border-radius: 0`
- 🔧 `color: rgba(255, 255, 255, 0.7)`
- 🔧 `display: flex`
- 🔧 `font-weight: 500`
- 🔧 `gap: 10px`
- 📏 `height: auto !important`
- 🔧 `margin: 0`
- 🔧 `margin-left: 0`
- 🔧 `min-height: 44px`
- 🔧 `padding: 12px 16px`
- 🔧 `position: relative`
- 🔧 `text-decoration: none`
- 🔧 `transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 85%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, gap, padding, min-height, margin, margin-left, color, background, border, border-left, text-decoration, border-radius, font-weight, position, transition

---



## 📄 `src\components\common\ProjectPageTemplate.vue`

### ➕ **KEEP_BOTH**

#### Line 81: `.portfolio-details .container`

**Properties:**
- 🔧 `max-width: 100% !important`
- 🔧 `padding-left: 0`
- 🔧 `padding-right: 0`
- 📏 `width: 100% !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, padding-left, padding-right

---

#### Line 80: `.portfolio-details .container`

**Properties:**
- 🔧 `max-width: 100% !important`
- 🔧 `padding-left: 0`
- 🔧 `padding-right: 0`
- 📏 `width: 100% !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, padding-left, padding-right

---

### ⚪ **NO_SIZE**

#### Line 103: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.portfolio-details {
    padding: 10px 0`

---

#### Line 87: `@media (hover: hover) and (pointer: fine) and (min-width: 1200px)`

**Properties:**
- 🔧 `.portfolio-details .container {
    padding-left: 10px`
- 🔧 `padding-right: 10px`

---



## 📄 `src\components\common\ReusableCard.vue`

### ➕ **KEEP_BOTH**

#### Line 260: `.header-glow-effect`

**Properties:**
- 🔧 `animation: glowPulse 3s ease-in-out infinite`
- 🔧 `background: radial-gradient(circle, rgba(80, 30, 140, 0.15) 0%, transparent 70%)`
- 🔧 `border-radius: 50%`
- 📏 `height: 200px`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 50%`
- 🔧 `transform: translate(-50%, -50%)`
- 📏 `width: 200px`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, background, border-radius, animation, z-index

---

#### Line 259: `.header-glow-effect`

**Properties:**
- 🔧 `animation: glowPulse 3s ease-in-out infinite`
- 🔧 `background: radial-gradient(circle, rgba(80, 30, 140, 0.15) 0%, transparent 70%)`
- 🔧 `border-radius: 50%`
- 📏 `height: 200px`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 50%`
- 🔧 `transform: translate(-50%, -50%)`
- 📏 `width: 200px`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, background, border-radius, animation, z-index

---

#### Line 248: `.title-underline`

**Properties:**
- 🔧 `animation: underlineGlow 2s ease-in-out infinite`
- 🔧 `background: linear-gradient(90deg, #a855f7 0%, #9333ea 100%)`
- 🔧 `border-radius: 2px`
- 🔧 `bottom: -5px`
- 📏 `height: 3px`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `transform: translateX(-50%)`
- 📏 `width: 60px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, left, transform, background, border-radius, animation

---

#### Line 247: `.title-underline`

**Properties:**
- 🔧 `animation: underlineGlow 2s ease-in-out infinite`
- 🔧 `background: linear-gradient(90deg, #a855f7 0%, #9333ea 100%)`
- 🔧 `border-radius: 2px`
- 🔧 `bottom: -5px`
- 📏 `height: 3px`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `transform: translateX(-50%)`
- 📏 `width: 60px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, left, transform, background, border-radius, animation

---

#### Line 186: `.header-particles .particle`

**Properties:**
- 🔧 `animation: particleFloat 4s ease-in-out infinite`
- 🔧 `background: rgba(100, 50, 200, 0.8)`
- 🔧 `border-radius: 50%`
- 📏 `height: 4px`
- 🔧 `position: absolute`
- 📏 `width: 4px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, background, border-radius, animation

---

#### Line 185: `.header-particles .particle`

**Properties:**
- 🔧 `animation: particleFloat 4s ease-in-out infinite`
- 🔧 `background: rgba(100, 50, 200, 0.8)`
- 🔧 `border-radius: 50%`
- 📏 `height: 4px`
- 🔧 `position: absolute`
- 📏 `width: 4px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, background, border-radius, animation

---

### ⚪ **NO_SIZE**

#### Line 324: `@media (pointer: coarse) and (max-width: 576px)`

**Properties:**
- 🔧 `.card-body {
    padding: 0 !important`

---

#### Line 318: `@media (pointer: coarse) and (max-width: 768px)`

**Properties:**
- 🔧 `.card-body {
    padding: 0 5px !important`

---



## 📄 `src\components\common\SkillCard.vue`

### 🔄 **REPLACE**

#### Line 823: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 65px`
- 📏 `width: 65px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 822: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 65px`
- 📏 `width: 65px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 818: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 105px`
- 📏 `width: 105px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 817: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 105px`
- 📏 `width: 105px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 810: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 64px`
- 📏 `width: 64px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 809: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 64px`
- 📏 `width: 64px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 805: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 103px`
- 📏 `width: 103px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 804: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 103px`
- 📏 `width: 103px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 797: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 62px`
- 📏 `width: 62px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 796: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 62px`
- 📏 `width: 62px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 792: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 100px`
- 📏 `width: 100px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 791: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 100px`
- 📏 `width: 100px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 784: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 63px`
- 📏 `width: 63px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 783: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 63px`
- 📏 `width: 63px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 779: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 102px`
- 📏 `width: 102px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 778: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 102px`
- 📏 `width: 102px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 771: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 61px`
- 📏 `width: 61px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 770: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 61px`
- 📏 `width: 61px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 766: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 98px`
- 📏 `width: 98px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 765: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 98px`
- 📏 `width: 98px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 758: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 62px`
- 📏 `width: 62px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 757: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 62px`
- 📏 `width: 62px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 753: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 100px`
- 📏 `width: 100px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 752: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 100px`
- 📏 `width: 100px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 745: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 60px`
- 📏 `width: 60px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 744: `.cyber-skill-icon img`

**Properties:**
- 📏 `height: 60px`
- 📏 `width: 60px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 740: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 95px`
- 📏 `width: 95px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 739: `.cyber-skill-icon`

**Properties:**
- 📏 `height: 95px`
- 📏 `width: 95px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### 🤔 **CONSIDER_REPLACE**

#### Line 145: `.cyber-card-content`

**Properties:**
- 📏 `height: 100%`
- 🔧 `position: relative`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: position

---

#### Line 144: `.cyber-card-content`

**Properties:**
- 📏 `height: 100%`
- 🔧 `position: relative`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: position

---

### ➕ **KEEP_BOTH**

#### Line 815: `@media (min-width: 320px) and (max-width: 479px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 105px`
- 📏 `height: 105px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 802: `@media (min-width: 480px) and (max-width: 575px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 103px`
- 📏 `height: 103px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 789: `@media (min-width: 576px) and (max-width: 767px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 100px`
- 📏 `height: 100px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 776: `@media (min-width: 768px) and (max-width: 991px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 102px`
- 📏 `height: 102px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 763: `@media (min-width: 992px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 98px`
- 📏 `height: 98px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 750: `@media (min-width: 1200px) and (max-width: 1399px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 100px`
- 📏 `height: 100px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 737: `@media (min-width: 1400px)`

**Properties:**
- 🔧 `.cyber-skill-icon {
    width: 95px`
- 📏 `height: 95px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .cyber-skill-icon {
    width

---

#### Line 692: `.cyber-progress-bar-fill`

**Properties:**
- 🔧 `background: linear-gradient(90deg, #00ffaa 0%, #00a2ff 100%)`
- 🔧 `border-radius: 10px`
- 🔧 `box-shadow: 0 0 10px rgba(0, 255, 170, 0.5)`
- 📏 `height: 100%`
- 🔧 `position: relative`
- 🔧 `transition: width 0.8s ease`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border-radius, transition, position, box-shadow

---

#### Line 688: `.cyber-progress-bar-bg`

**Properties:**
- 🔧 `background: rgba(255, 255, 255, 0.1)`
- 🔧 `border: 1px solid rgba(0, 255, 170, 0.2)`
- 🔧 `border-radius: 10px`
- 🔧 `flex: 1`
- 📏 `height: 10px`
- 🔧 `max-width: 120px`
- 🔧 `overflow: hidden`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: flex, background, border-radius, overflow, border, max-width

---

#### Line 683: `.cyber-progress-bar-bg`

**Properties:**
- 🔧 `background: rgba(255, 255, 255, 0.1)`
- 🔧 `border: 1px solid rgba(0, 255, 170, 0.2)`
- 🔧 `border-radius: 10px`
- 🔧 `flex: 1`
- 📏 `height: 10px`
- 🔧 `max-width: 120px`
- 🔧 `overflow: hidden`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: flex, background, border-radius, overflow, border, max-width

---

#### Line 652: `.cyber-skill-name`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  font-weight: 700`
- 🔧 `align-items: center`
- 🔧 `color: #ffffff`
- 🔧 `display: flex`
- 🔧 `hyphens: auto`
- 🔧 `justify-content: center`
- 🔧 `left: 50%`
- 🔧 `letter-spacing: 0.5px`
- 🔧 `line-height: 1.1`
- 🔧 `max-width: 170px`
- 🔧 `overflow-wrap: break-word`
- 🔧 `padding: 0 10px`
- 🔧 `position: absolute`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 10px rgba(0, 255, 170, 0.5)`
- 🔧 `top: 120px`
- 🔧 `transform: translateX(-50%)`
- 🔧 `white-space: normal`
- 📏 `width: 100%`
- 🔧 `word-break: keep-all`
- 🔧 `word-wrap: break-word`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, /* Font size handled by font-sizes.css */
  font-weight, color, text-align, z-index, letter-spacing, text-shadow, padding, max-width, line-height, display, align-items, justify-content, word-wrap, hyphens, white-space, overflow-wrap, word-break

---

#### Line 651: `.cyber-skill-name`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  font-weight: 700`
- 🔧 `align-items: center`
- 🔧 `color: #ffffff`
- 🔧 `display: flex`
- 🔧 `hyphens: auto`
- 🔧 `justify-content: center`
- 🔧 `left: 50%`
- 🔧 `letter-spacing: 0.5px`
- 🔧 `line-height: 1.1`
- 🔧 `max-width: 170px`
- 🔧 `overflow-wrap: break-word`
- 🔧 `padding: 0 10px`
- 🔧 `position: absolute`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 10px rgba(0, 255, 170, 0.5)`
- 🔧 `top: 120px`
- 🔧 `transform: translateX(-50%)`
- 🔧 `white-space: normal`
- 📏 `width: 100%`
- 🔧 `word-break: keep-all`
- 🔧 `word-wrap: break-word`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, /* Font size handled by font-sizes.css */
  font-weight, color, text-align, z-index, letter-spacing, text-shadow, padding, max-width, line-height, display, align-items, justify-content, word-wrap, hyphens, white-space, overflow-wrap, word-break

---

#### Line 650: `.cyber-skill-name`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  font-weight: 700`
- 🔧 `align-items: center`
- 🔧 `color: #ffffff`
- 🔧 `display: flex`
- 🔧 `hyphens: auto`
- 🔧 `justify-content: center`
- 🔧 `left: 50%`
- 🔧 `letter-spacing: 0.5px`
- 🔧 `line-height: 1.1`
- 🔧 `max-width: 170px`
- 🔧 `overflow-wrap: break-word`
- 🔧 `padding: 0 10px`
- 🔧 `position: absolute`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 10px rgba(0, 255, 170, 0.5)`
- 🔧 `top: 120px`
- 🔧 `transform: translateX(-50%)`
- 🔧 `white-space: normal`
- 📏 `width: 100%`
- 🔧 `word-break: keep-all`
- 🔧 `word-wrap: break-word`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, /* Font size handled by font-sizes.css */
  font-weight, color, text-align, z-index, letter-spacing, text-shadow, padding, max-width, line-height, display, align-items, justify-content, word-wrap, hyphens, white-space, overflow-wrap, word-break

---

#### Line 628: `.cyber-skill-icon img`

**Properties:**
- 🔧 `/* GPU acceleration for icons */
  will-change: transform, filter`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 🔧 `filter: brightness(1.2) contrast(1.1)`
- 📏 `height: 65px`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 65px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: filter, /* GPU acceleration for icons */
  will-change, transform, contain, backface-visibility

---

#### Line 627: `.cyber-skill-icon img`

**Properties:**
- 🔧 `/* GPU acceleration for icons */
  will-change: transform, filter`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 🔧 `filter: brightness(1.2) contrast(1.1)`
- 📏 `height: 65px`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 65px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: filter, /* GPU acceleration for icons */
  will-change, transform, contain, backface-visibility

---

#### Line 611: `.cyber-skill-icon`

**Properties:**
- 🔧 `/* GPU acceleration for icons */
  will-change: transform, filter`
- 🔧 `align-items: center`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: rgba(255, 255, 255, 0.1)`
- 🔧 `border: 2px solid rgba(0, 255, 170, 0.3)`
- 🔧 `border-radius: 50%`
- 🔧 `contain: layout style paint`
- 🔧 `display: flex`
- 📏 `height: 105px`
- 🔧 `justify-content: center`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 15px`
- 🔧 `transform: translateX(-50%) translateZ(0)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 105px`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, z-index, display, align-items, justify-content, background, border-radius, border, transition, /* GPU acceleration for icons */
  will-change, contain, backface-visibility

---

#### Line 610: `.cyber-skill-icon`

**Properties:**
- 🔧 `/* GPU acceleration for icons */
  will-change: transform, filter`
- 🔧 `align-items: center`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: rgba(255, 255, 255, 0.1)`
- 🔧 `border: 2px solid rgba(0, 255, 170, 0.3)`
- 🔧 `border-radius: 50%`
- 🔧 `contain: layout style paint`
- 🔧 `display: flex`
- 📏 `height: 105px`
- 🔧 `justify-content: center`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 15px`
- 🔧 `transform: translateX(-50%) translateZ(0)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 105px`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, transform, z-index, display, align-items, justify-content, background, border-radius, border, transition, /* GPU acceleration for icons */
  will-change, contain, backface-visibility

---

#### Line 518: `.cyber-corner-elements span`

**Properties:**
- 🔧 `border: 2px solid rgba(92, 103, 255, 0.3)`
- 📏 `height: 15px`
- 🔧 `position: absolute`
- 📏 `width: 15px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border

---

#### Line 517: `.cyber-corner-elements span`

**Properties:**
- 🔧 `border: 2px solid rgba(92, 103, 255, 0.3)`
- 📏 `height: 15px`
- 🔧 `position: absolute`
- 📏 `width: 15px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border

---

#### Line 509: `.cyber-lines span:nth-child(4)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite 1.5s`
- 📏 `height: 1px`
- 🔧 `right: 0`
- 🔧 `top: 80%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: right`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, right, transform, transform-origin, animation

---

#### Line 508: `.cyber-lines span:nth-child(4)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite 1.5s`
- 📏 `height: 1px`
- 🔧 `right: 0`
- 🔧 `top: 80%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: right`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, right, transform, transform-origin, animation

---

#### Line 499: `.cyber-lines span:nth-child(3)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite 2s`
- 📏 `height: 1px`
- 🔧 `left: 0`
- 🔧 `top: 60%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: left`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, left, transform, transform-origin, animation

---

#### Line 498: `.cyber-lines span:nth-child(3)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite 2s`
- 📏 `height: 1px`
- 🔧 `left: 0`
- 🔧 `top: 60%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: left`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, left, transform, transform-origin, animation

---

#### Line 489: `.cyber-lines span:nth-child(2)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite 1s`
- 📏 `height: 1px`
- 🔧 `right: 0`
- 🔧 `top: 40%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: right`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, right, transform, transform-origin, animation

---

#### Line 488: `.cyber-lines span:nth-child(2)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite 1s`
- 📏 `height: 1px`
- 🔧 `right: 0`
- 🔧 `top: 40%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: right`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, right, transform, transform-origin, animation

---

#### Line 479: `.cyber-lines span:nth-child(1)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite`
- 📏 `height: 1px`
- 🔧 `left: 0`
- 🔧 `top: 20%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: left`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, left, transform, transform-origin, animation

---

#### Line 478: `.cyber-lines span:nth-child(1)`

**Properties:**
- 🔧 `animation: cyber-lineGrow 4s linear infinite`
- 📏 `height: 1px`
- 🔧 `left: 0`
- 🔧 `top: 20%`
- 🔧 `transform: scaleX(0)`
- 🔧 `transform-origin: left`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: top, left, transform, transform-origin, animation

---

#### Line 366: `.cyber-tracker`

**Properties:**
- 🔧 `/* GPU acceleration for better performance */
  will-change: transform`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 📏 `height: 100%`
- 🔧 `position: absolute`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`
- 🔧 `z-index: 200`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, /* GPU acceleration for better performance */
  will-change, transform, contain, backface-visibility

---

#### Line 365: `.cyber-tracker`

**Properties:**
- 🔧 `/* GPU acceleration for better performance */
  will-change: transform`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 📏 `height: 100%`
- 🔧 `position: absolute`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`
- 🔧 `z-index: 200`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, /* GPU acceleration for better performance */
  will-change, transform, contain, backface-visibility

---

#### Line 350: `#cyber-card::before`

**Properties:**
- 🔧 `background: radial-gradient(
    circle at center,
    rgba(0, 255, 170, 0.1) 0%,
    rgba(0, 162, 255, 0.05) 50%,
    transparent 100%
  )`
- 🔧 `content: ""`
- 🔧 `filter: blur(10px)`
- 📏 `height: 150%`
- 🔧 `left: 50%`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `top: 50%`
- 🔧 `transform: translate(-50%, -50%)`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 150%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, background, filter, opacity, position, left, top, transform, transition

---

#### Line 349: `#cyber-card::before`

**Properties:**
- 🔧 `background: radial-gradient(
    circle at center,
    rgba(0, 255, 170, 0.1) 0%,
    rgba(0, 162, 255, 0.05) 50%,
    transparent 100%
  )`
- 🔧 `content: ""`
- 🔧 `filter: blur(10px)`
- 📏 `height: 150%`
- 🔧 `left: 50%`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `top: 50%`
- 🔧 `transform: translate(-50%, -50%)`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 150%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, background, filter, opacity, position, left, top, transform, transition

---

#### Line 261: `.cyber-card-particles span`

**Properties:**
- 🔧 `/* GPU acceleration for particle animations */
  will-change: opacity, transform`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: #00ffaa`
- 🔧 `border-radius: 50%`
- 🔧 `contain: layout style paint`
- 📏 `height: 3px`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `transform: translateZ(0)`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 3px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, background, border-radius, opacity, transition, /* GPU acceleration for particle animations */
  will-change, transform, contain, backface-visibility

---

#### Line 260: `.cyber-card-particles span`

**Properties:**
- 🔧 `/* GPU acceleration for particle animations */
  will-change: opacity, transform`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: #00ffaa`
- 🔧 `border-radius: 50%`
- 🔧 `contain: layout style paint`
- 📏 `height: 3px`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `transform: translateZ(0)`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 3px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, background, border-radius, opacity, transition, /* GPU acceleration for particle animations */
  will-change, transform, contain, backface-visibility

---

#### Line 221: `.cyber-glow-3`

**Properties:**
- 🔧 `background: radial-gradient(
    circle at center,
    rgba(0, 255, 170, 0.3) 0%,
    rgba(0, 255, 170, 0) 70%
  )`
- 🔧 `border-radius: 50%`
- 🔧 `filter: blur(8px)`
- 📏 `height: 100px`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 100px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, background, filter, opacity, transition

---

#### Line 220: `.cyber-glow-3`

**Properties:**
- 🔧 `background: radial-gradient(
    circle at center,
    rgba(0, 255, 170, 0.3) 0%,
    rgba(0, 255, 170, 0) 70%
  )`
- 🔧 `border-radius: 50%`
- 🔧 `filter: blur(8px)`
- 📏 `height: 100px`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 100px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, background, filter, opacity, transition

---

#### Line 187: `.cyber-subtitle`

**Properties:**
- 🔧 `/* Add padding to prevent text from touching edges */
  display: flex`
- 🔧 `/* Font size handled by font-sizes.css - using skill-percentage sizes */
  letter-spacing: 1px`
- 🔧 `/* Hidden on all devices */
  position: absolute`
- 🔧 `/* Removed translateY for proper centering */
  color: rgba(255, 255, 255, 0.6)`
- 🔧 `align-items: center`
- 🔧 `bottom: 20px`
- 🔧 `display: none !important`
- 🔧 `flex-direction: column`
- 🔧 `justify-content: center`
- 🔧 `padding: 0 20px`
- 🔧 `text-align: center`
- 🔧 `transform: translateY(0px)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, /* Hidden on all devices */
  position, bottom, text-align, /* Font size handled by font-sizes.css - using skill-percentage sizes */
  letter-spacing, transform, /* Removed translateY for proper centering */
  color, padding, /* Add padding to prevent text from touching edges */
  display, align-items, justify-content, flex-direction

---

#### Line 171: `.cyber-title`

**Properties:**
- 🔧 `-webkit-background-clip: text`
- 🔧 `-webkit-text-fill-color: transparent`
- 🔧 `background: linear-gradient(45deg, #00ffaa, #00a2ff)`
- 🔧 `background-clip: text`
- 🔧 `filter: drop-shadow(0 0 15px rgba(0, 255, 170, 0.3))`
- 📏 `font-size: 28px`
- 🔧 `font-weight: 800`
- 🔧 `letter-spacing: 4px`
- 🔧 `opacity: 0`
- 🔧 `padding-top: 20px`
- 🔧 `position: absolute`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 10px rgba(92, 103, 255, 0.5),
    0 0 20px rgba(92, 103, 255, 0.3)`
- 🔧 `transition: 300ms ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: opacity, transition, position, font-weight, letter-spacing, text-align, padding-top, background, -webkit-background-clip, background-clip, -webkit-text-fill-color, filter, text-shadow

---

#### Line 167: `.cyber-title`

**Properties:**
- 🔧 `-webkit-background-clip: text`
- 🔧 `-webkit-text-fill-color: transparent`
- 🔧 `background: linear-gradient(45deg, #00ffaa, #00a2ff)`
- 🔧 `background-clip: text`
- 🔧 `filter: drop-shadow(0 0 15px rgba(0, 255, 170, 0.3))`
- 📏 `font-size: 28px`
- 🔧 `font-weight: 800`
- 🔧 `letter-spacing: 4px`
- 🔧 `opacity: 0`
- 🔧 `padding-top: 20px`
- 🔧 `position: absolute`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 10px rgba(92, 103, 255, 0.5),
    0 0 20px rgba(92, 103, 255, 0.3)`
- 🔧 `transition: 300ms ease-in-out`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: opacity, transition, position, font-weight, letter-spacing, text-align, padding-top, background, -webkit-background-clip, background-clip, -webkit-text-fill-color, filter, text-shadow

---

#### Line 153: `.cyber-prompt`

**Properties:**
- 🔧 `bottom: 100px`
- 🔧 `color: rgba(255, 255, 255, 0.7)`
- 📏 `font-size: 16px`
- 🔧 `font-weight: 600`
- 🔧 `left: 50%`
- 🔧 `letter-spacing: 2px`
- 🔧 `position: absolute`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 10px rgba(255, 255, 255, 0.3)`
- 🔧 `transform: translateX(-50%)`
- 🔧 `transition: 300ms ease-in-out`
- 🔧 `z-index: 20`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: bottom, left, transform, z-index, font-weight, letter-spacing, transition, position, text-align, color, text-shadow

---

#### Line 122: `.cyber-container:active`

**Properties:**
- 📏 `height: 225px`
- 🔧 `max-width: 180px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width

---

#### Line 121: `.cyber-container:active`

**Properties:**
- 📏 `height: 225px`
- 🔧 `max-width: 180px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width

---

#### Line 110: `.cyber-container`

**Properties:**
- 🔧 `/* GPU acceleration for better performance */
  will-change: transform`
- 🔧 `/* Keep max width for desktop */
  height: 230px`
- 🔧 `/* Make it responsive to parent container */
  max-width: 190px`
- 🔧 `/* Reduced from 254px for compact design */
  transition: 200ms`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 🔧 `margin: 0 auto`
- 🔧 `position: relative`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, /* Make it responsive to parent container */
  max-width, /* Keep max width for desktop */
  height, /* Reduced from 254px for compact design */
  transition, margin, /* GPU acceleration for better performance */
  will-change, transform, contain, backface-visibility

---

#### Line 109: `.cyber-container`

**Properties:**
- 🔧 `/* GPU acceleration for better performance */
  will-change: transform`
- 🔧 `/* Keep max width for desktop */
  height: 230px`
- 🔧 `/* Make it responsive to parent container */
  max-width: 190px`
- 🔧 `/* Reduced from 254px for compact design */
  transition: 200ms`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 🔧 `margin: 0 auto`
- 🔧 `position: relative`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, /* Make it responsive to parent container */
  max-width, /* Keep max width for desktop */
  height, /* Reduced from 254px for compact design */
  transition, margin, /* GPU acceleration for better performance */
  will-change, transform, contain, backface-visibility

---

#### Line 108: `.cyber-container`

**Properties:**
- 🔧 `/* GPU acceleration for better performance */
  will-change: transform`
- 🔧 `/* Keep max width for desktop */
  height: 230px`
- 🔧 `/* Make it responsive to parent container */
  max-width: 190px`
- 🔧 `/* Reduced from 254px for compact design */
  transition: 200ms`
- 🔧 `backface-visibility: hidden`
- 🔧 `contain: layout style paint`
- 🔧 `margin: 0 auto`
- 🔧 `position: relative`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, /* Make it responsive to parent container */
  max-width, /* Keep max width for desktop */
  height, /* Reduced from 254px for compact design */
  transition, margin, /* GPU acceleration for better performance */
  will-change, transform, contain, backface-visibility

---

### ⚪ **NO_SIZE**

#### Line 719: `.cyber-skill-percentage`

**Properties:**
- 🔧 `color: #00ffaa`
- 🔧 `font-weight: 600`
- 🔧 `min-width: 30px`
- 🔧 `text-align: center`
- 🔧 `text-shadow: 0 0 5px rgba(0, 255, 170, 0.5)`

---



## 📄 `src\components\common\StatCard.vue`

### 🔄 **REPLACE**

#### Line 239: `.icon`

**Properties:**
- 📏 `width: 2.5em`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 227: `.icon`

**Properties:**
- 📏 `width: 2.8em`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### ➕ **KEEP_BOTH**

#### Line 233: `.elegant-card`

**Properties:**
- 🔧 `gap: 14px`
- 📏 `height: 200px`
- 🔧 `padding: 24px 16px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, gap

---

#### Line 221: `.elegant-card`

**Properties:**
- 🔧 `gap: 16px`
- 📏 `height: 220px`
- 🔧 `padding: 28px 20px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, gap

---

#### Line 182: `.icon`

**Properties:**
- 🔧 `filter: drop-shadow(0 0 8px currentColor)`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 3em`
- 🔧 `z-index: 10`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, filter, transition

---

#### Line 167: `.circle-bg`

**Properties:**
- 🔧 `background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 70%)`
- 🔧 `border-radius: 50%`
- 📏 `height: 110%`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 44%`
- 🔧 `transform: translateX(-50%)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 110%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, left, top, transform, border-radius, background, z-index, transition

---

#### Line 166: `.circle-bg`

**Properties:**
- 🔧 `background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 70%)`
- 🔧 `border-radius: 50%`
- 📏 `height: 110%`
- 🔧 `left: 50%`
- 🔧 `position: absolute`
- 🔧 `top: 44%`
- 🔧 `transform: translateX(-50%)`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 110%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, left, top, transform, border-radius, background, z-index, transition

---

#### Line 152: `.star-svg`

**Properties:**
- 🔧 `fill: rgba(167, 139, 250, 0.8)`
- 📏 `height: 200px`
- 🔧 `transform: rotate(24deg)`
- 📏 `width: 200px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: fill, transform

---

#### Line 151: `.star-svg`

**Properties:**
- 🔧 `fill: rgba(167, 139, 250, 0.8)`
- 📏 `height: 200px`
- 🔧 `transform: rotate(24deg)`
- 📏 `width: 200px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: fill, transform

---

#### Line 107: `.elegant-card`

**Properties:**
- 🔧 `-webkit-backdrop-filter: blur(20px)`
- 🔧 `-webkit-backface-visibility: hidden`
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: linear-gradient(135deg, rgba(30, 10, 60, 0.95) 0%, rgba(20, 5, 40, 0.98) 50%, rgba(15, 0, 30, 1) 100%)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(124, 58, 237, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `gap: 20px`
- 📏 `height: 240px`
- 🔧 `justify-content: center`
- 🔧 `overflow: hidden`
- 🔧 `padding: 32px 24px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `will-change: transform`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, background, backdrop-filter, -webkit-backdrop-filter, border, box-shadow, overflow, padding, display, flex-direction, align-items, justify-content, gap, transition, will-change, backface-visibility, -webkit-backface-visibility

---

#### Line 106: `.elegant-card`

**Properties:**
- 🔧 `-webkit-backdrop-filter: blur(20px)`
- 🔧 `-webkit-backface-visibility: hidden`
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(20px)`
- 🔧 `backface-visibility: hidden`
- 🔧 `background: linear-gradient(135deg, rgba(30, 10, 60, 0.95) 0%, rgba(20, 5, 40, 0.98) 50%, rgba(15, 0, 30, 1) 100%)`
- 🔧 `border: 2px solid rgba(167, 139, 250, 0.3)`
- 🔧 `border-radius: 12px`
- 🔧 `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(124, 58, 237, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 🔧 `gap: 20px`
- 📏 `height: 240px`
- 🔧 `justify-content: center`
- 🔧 `overflow: hidden`
- 🔧 `padding: 32px 24px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 100%`
- 🔧 `will-change: transform`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, background, backdrop-filter, -webkit-backdrop-filter, border, box-shadow, overflow, padding, display, flex-direction, align-items, justify-content, gap, transition, will-change, backface-visibility, -webkit-backface-visibility

---

#### Line 97: `.stat-card-wrapper`

**Properties:**
- 🔧 `isolation: isolate`
- 🔧 `padding: 20.25px`
- 🔧 `transform: translateZ(0)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, isolation, transform

---

### ⚪ **NO_SIZE**

#### Line 231: `@media (pointer: coarse) and (max-width: 480px)`

**Properties:**
- 🔧 `.elegant-card {
    height: 200px`
- 🔧 `gap: 14px`
- 🔧 `padding: 24px 16px`

---



## 📄 `src\components\home\Resume.vue`

### ➕ **KEEP_BOTH**

#### Line 626: `.fancy-bullet`

**Properties:**
- 🔧 `animation: bulletPulse 2.5s ease-in-out infinite`
- 🔧 `background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)`
- 🔧 `border-radius: 2px`
- 🔧 `box-shadow: 0 0 8px rgba(139, 92, 246, 0.7),
    0 0 15px rgba(139, 92, 246, 0.4),
    inset 0 0 4px rgba(255, 255, 255, 0.4)`
- 🔧 `display: inline-block`
- 🔧 `flex-shrink: 0`
- 📏 `height: 8px`
- 🔧 `margin-right: 8px`
- 🔧 `transform: rotate(45deg)`
- 📏 `width: 8px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, margin-right, background, border-radius, transform, flex-shrink, box-shadow, animation

---

#### Line 625: `.fancy-bullet`

**Properties:**
- 🔧 `animation: bulletPulse 2.5s ease-in-out infinite`
- 🔧 `background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)`
- 🔧 `border-radius: 2px`
- 🔧 `box-shadow: 0 0 8px rgba(139, 92, 246, 0.7),
    0 0 15px rgba(139, 92, 246, 0.4),
    inset 0 0 4px rgba(255, 255, 255, 0.4)`
- 🔧 `display: inline-block`
- 🔧 `flex-shrink: 0`
- 📏 `height: 8px`
- 🔧 `margin-right: 8px`
- 🔧 `transform: rotate(45deg)`
- 📏 `width: 8px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, margin-right, background, border-radius, transform, flex-shrink, box-shadow, animation

---

#### Line 608: `.resume-item p strong`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 🔧 `margin-bottom: 8px`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, margin-bottom

---

#### Line 600: `.resume-item li strong + div`

**Properties:**
- 🔧 `display: block`
- 🔧 `padding-left: 0`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, padding-left

---

#### Line 593: `.resume-item li strong`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `display: flex`
- 🔧 `margin-bottom: 6px`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, margin-bottom

---



## 📄 `src\components\home\Skills.vue`

### ➕ **KEEP_BOTH**

#### Line 252: `.category-icon`

**Properties:**
- 🔧 `filter: drop-shadow(0 4px 8px rgba(5, 99, 187, 0.3))`
- 📏 `height: 40px`
- 🔧 `object-fit: contain`
- 📏 `width: 40px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, filter

---

#### Line 251: `.category-icon`

**Properties:**
- 🔧 `filter: drop-shadow(0 4px 8px rgba(5, 99, 187, 0.3))`
- 📏 `height: 40px`
- 🔧 `object-fit: contain`
- 📏 `width: 40px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, filter

---



## 📄 `src\components\home\Stats.vue`

### ⚪ **NO_SIZE**

#### Line 109: `@media (pointer: coarse) and (max-width: 576px)`

**Properties:**
- 🔧 `.card-body {
    padding: 0 !important`

---

#### Line 99: `@media (pointer: coarse) and (max-width: 768px)`

**Properties:**
- 🔧 `.card-body {
    padding: 0 5px !important`

---



## 📄 `src\components\home\Testimonials.vue`

### 🔄 **REPLACE**

#### Line 243: `.author-avatar`

**Properties:**
- 📏 `height: 45px`
- 📏 `width: 45px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 242: `.author-avatar`

**Properties:**
- 📏 `height: 45px`
- 📏 `width: 45px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 228: `.author-avatar`

**Properties:**
- 📏 `height: 50px`
- 📏 `width: 50px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 227: `.author-avatar`

**Properties:**
- 📏 `height: 50px`
- 📏 `width: 50px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### ➕ **KEEP_BOTH**

#### Line 181: `.author-avatar`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%)`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 5px 15px rgba(60, 20, 120, 0.4)`
- 🔧 `color: white`
- 🔧 `display: flex`
- 🔧 `flex-shrink: 0`
- 🔧 `font-weight: bold`
- 📏 `height: 60px`
- 🔧 `justify-content: center`
- 📏 `width: 60px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, background, display, align-items, justify-content, color, font-weight, box-shadow, flex-shrink

---

#### Line 180: `.author-avatar`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%)`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 5px 15px rgba(60, 20, 120, 0.4)`
- 🔧 `color: white`
- 🔧 `display: flex`
- 🔧 `flex-shrink: 0`
- 🔧 `font-weight: bold`
- 📏 `height: 60px`
- 🔧 `justify-content: center`
- 📏 `width: 60px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, background, display, align-items, justify-content, color, font-weight, box-shadow, flex-shrink

---

#### Line 144: `.testimonial-content::before`

**Properties:**
- 🔧 `background: linear-gradient(180deg, rgba(60, 20, 120, 0.9) 0%, rgba(50, 15, 100, 0.95) 50%, rgba(40, 10, 80, 1) 100%)`
- 🔧 `border-radius: 4px`
- 🔧 `bottom: 0`
- 🔧 `box-shadow: 0 0 15px rgba(60, 20, 120, 0.5)`
- 🔧 `content: ''`
- 🔧 `left: -8px`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 📏 `width: 8px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, left, top, bottom, background, border-radius, box-shadow

---

#### Line 130: `.testimonial-content`

**Properties:**
- 🔧 `border-image: linear-gradient(180deg, rgba(60, 20, 120, 0.9), rgba(50, 15, 100, 0.95), rgba(40, 10, 80, 1)) 1`
- 🔧 `border-left: 8px solid transparent`
- 🔧 `border-radius: 4px`
- 🔧 `padding-left: 30px`
- 🔧 `position: relative`
- 🔧 `text-align: center`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: text-align, border-left, border-image, border-radius, padding-left, position

---

#### Line 123: `.testimonial-item`

**Properties:**
- 🔧 `padding: 20px`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding

---

### ⚪ **NO_SIZE**

#### Line 236: `@media (pointer: coarse) and (max-width: 480px)`

**Properties:**
- 🔧 `.testimonial-item {
    padding: 10px`

---

#### Line 221: `@media (pointer: coarse) and (max-width: 768px)`

**Properties:**
- 🔧 `.testimonial-item {
    padding: 15px`

---

#### Line 153: `.testimonial-text`

**Properties:**
- 🔧 `font-style: italic`
- 🔧 `line-height: 1.8`
- 🔧 `margin-bottom: 25px`

---



## 📄 `src\components\layout\BackToTop.vue`

### ➕ **KEEP_BOTH**

#### Line 100: `.scroll-top svg`

**Properties:**
- 🔧 `flex-shrink: 0 !important`
- 📏 `height: 20px !important`
- 🔧 `pointer-events: none !important`
- 🔧 `stroke: currentColor !important`
- 🔧 `transition: all 0.3s ease !important`
- 📏 `width: 20px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: flex-shrink, stroke, transition, pointer-events

---

#### Line 99: `.scroll-top svg`

**Properties:**
- 🔧 `flex-shrink: 0 !important`
- 📏 `height: 20px !important`
- 🔧 `pointer-events: none !important`
- 🔧 `stroke: currentColor !important`
- 🔧 `transition: all 0.3s ease !important`
- 📏 `width: 20px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: flex-shrink, stroke, transition, pointer-events

---

#### Line 56: `.scroll-top`

**Properties:**
- 🔧 `align-items: center !important`
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(18, 18, 18, 0.9) !important`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3) !important`
- 🔧 `border-radius: 50% !important`
- 🔧 `bottom: 20px !important`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important`
- 🔧 `color: rgba(255, 255, 255, 0.8) !important`
- 🔧 `cursor: pointer !important`
- 🔧 `display: flex !important`
- 📏 `height: 50px !important`
- 🔧 `justify-content: center !important`
- 🔧 `line-height: 1 !important`
- 🔧 `margin: 0 !important`
- 🔧 `max-height: 50px !important`
- 🔧 `max-width: 50px !important`
- 🔧 `min-height: 50px !important`
- 🔧 `min-width: 50px !important`
- 🔧 `opacity: 0`
- 🔧 `outline: none !important`
- 🔧 `padding: 0 !important`
- 🔧 `position: fixed !important`
- 🔧 `right: 20px !important`
- 🔧 `text-decoration: none !important`
- 🔧 `transform: translateY(20px)`
- 🔧 `transition: all 0.3s ease !important`
- 🔧 `visibility: hidden`
- 📏 `width: 50px !important`
- 🔧 `z-index: 9998 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, right, z-index, min-width, min-height, max-width, max-height, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow, visibility, opacity, transform, padding, margin, outline, text-decoration, line-height

---

#### Line 55: `.scroll-top`

**Properties:**
- 🔧 `align-items: center !important`
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(18, 18, 18, 0.9) !important`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3) !important`
- 🔧 `border-radius: 50% !important`
- 🔧 `bottom: 20px !important`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important`
- 🔧 `color: rgba(255, 255, 255, 0.8) !important`
- 🔧 `cursor: pointer !important`
- 🔧 `display: flex !important`
- 📏 `height: 50px !important`
- 🔧 `justify-content: center !important`
- 🔧 `line-height: 1 !important`
- 🔧 `margin: 0 !important`
- 🔧 `max-height: 50px !important`
- 🔧 `max-width: 50px !important`
- 🔧 `min-height: 50px !important`
- 🔧 `min-width: 50px !important`
- 🔧 `opacity: 0`
- 🔧 `outline: none !important`
- 🔧 `padding: 0 !important`
- 🔧 `position: fixed !important`
- 🔧 `right: 20px !important`
- 🔧 `text-decoration: none !important`
- 🔧 `transform: translateY(20px)`
- 🔧 `transition: all 0.3s ease !important`
- 🔧 `visibility: hidden`
- 📏 `width: 50px !important`
- 🔧 `z-index: 9998 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, right, z-index, min-width, min-height, max-width, max-height, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow, visibility, opacity, transform, padding, margin, outline, text-decoration, line-height

---

#### Line 54: `.scroll-top`

**Properties:**
- 🔧 `align-items: center !important`
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(18, 18, 18, 0.9) !important`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3) !important`
- 🔧 `border-radius: 50% !important`
- 🔧 `bottom: 20px !important`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important`
- 🔧 `color: rgba(255, 255, 255, 0.8) !important`
- 🔧 `cursor: pointer !important`
- 🔧 `display: flex !important`
- 📏 `height: 50px !important`
- 🔧 `justify-content: center !important`
- 🔧 `line-height: 1 !important`
- 🔧 `margin: 0 !important`
- 🔧 `max-height: 50px !important`
- 🔧 `max-width: 50px !important`
- 🔧 `min-height: 50px !important`
- 🔧 `min-width: 50px !important`
- 🔧 `opacity: 0`
- 🔧 `outline: none !important`
- 🔧 `padding: 0 !important`
- 🔧 `position: fixed !important`
- 🔧 `right: 20px !important`
- 🔧 `text-decoration: none !important`
- 🔧 `transform: translateY(20px)`
- 🔧 `transition: all 0.3s ease !important`
- 🔧 `visibility: hidden`
- 📏 `width: 50px !important`
- 🔧 `z-index: 9998 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, right, z-index, min-width, min-height, max-width, max-height, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow, visibility, opacity, transform, padding, margin, outline, text-decoration, line-height

---

#### Line 53: `.scroll-top`

**Properties:**
- 🔧 `align-items: center !important`
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(18, 18, 18, 0.9) !important`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3) !important`
- 🔧 `border-radius: 50% !important`
- 🔧 `bottom: 20px !important`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important`
- 🔧 `color: rgba(255, 255, 255, 0.8) !important`
- 🔧 `cursor: pointer !important`
- 🔧 `display: flex !important`
- 📏 `height: 50px !important`
- 🔧 `justify-content: center !important`
- 🔧 `line-height: 1 !important`
- 🔧 `margin: 0 !important`
- 🔧 `max-height: 50px !important`
- 🔧 `max-width: 50px !important`
- 🔧 `min-height: 50px !important`
- 🔧 `min-width: 50px !important`
- 🔧 `opacity: 0`
- 🔧 `outline: none !important`
- 🔧 `padding: 0 !important`
- 🔧 `position: fixed !important`
- 🔧 `right: 20px !important`
- 🔧 `text-decoration: none !important`
- 🔧 `transform: translateY(20px)`
- 🔧 `transition: all 0.3s ease !important`
- 🔧 `visibility: hidden`
- 📏 `width: 50px !important`
- 🔧 `z-index: 9998 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, right, z-index, min-width, min-height, max-width, max-height, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow, visibility, opacity, transform, padding, margin, outline, text-decoration, line-height

---

#### Line 52: `.scroll-top`

**Properties:**
- 🔧 `align-items: center !important`
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(18, 18, 18, 0.9) !important`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3) !important`
- 🔧 `border-radius: 50% !important`
- 🔧 `bottom: 20px !important`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important`
- 🔧 `color: rgba(255, 255, 255, 0.8) !important`
- 🔧 `cursor: pointer !important`
- 🔧 `display: flex !important`
- 📏 `height: 50px !important`
- 🔧 `justify-content: center !important`
- 🔧 `line-height: 1 !important`
- 🔧 `margin: 0 !important`
- 🔧 `max-height: 50px !important`
- 🔧 `max-width: 50px !important`
- 🔧 `min-height: 50px !important`
- 🔧 `min-width: 50px !important`
- 🔧 `opacity: 0`
- 🔧 `outline: none !important`
- 🔧 `padding: 0 !important`
- 🔧 `position: fixed !important`
- 🔧 `right: 20px !important`
- 🔧 `text-decoration: none !important`
- 🔧 `transform: translateY(20px)`
- 🔧 `transition: all 0.3s ease !important`
- 🔧 `visibility: hidden`
- 📏 `width: 50px !important`
- 🔧 `z-index: 9998 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, right, z-index, min-width, min-height, max-width, max-height, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow, visibility, opacity, transform, padding, margin, outline, text-decoration, line-height

---

#### Line 51: `.scroll-top`

**Properties:**
- 🔧 `align-items: center !important`
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(18, 18, 18, 0.9) !important`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3) !important`
- 🔧 `border-radius: 50% !important`
- 🔧 `bottom: 20px !important`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important`
- 🔧 `color: rgba(255, 255, 255, 0.8) !important`
- 🔧 `cursor: pointer !important`
- 🔧 `display: flex !important`
- 📏 `height: 50px !important`
- 🔧 `justify-content: center !important`
- 🔧 `line-height: 1 !important`
- 🔧 `margin: 0 !important`
- 🔧 `max-height: 50px !important`
- 🔧 `max-width: 50px !important`
- 🔧 `min-height: 50px !important`
- 🔧 `min-width: 50px !important`
- 🔧 `opacity: 0`
- 🔧 `outline: none !important`
- 🔧 `padding: 0 !important`
- 🔧 `position: fixed !important`
- 🔧 `right: 20px !important`
- 🔧 `text-decoration: none !important`
- 🔧 `transform: translateY(20px)`
- 🔧 `transition: all 0.3s ease !important`
- 🔧 `visibility: hidden`
- 📏 `width: 50px !important`
- 🔧 `z-index: 9998 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, bottom, right, z-index, min-width, min-height, max-width, max-height, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow, visibility, opacity, transform, padding, margin, outline, text-decoration, line-height

---

### ⚪ **NO_SIZE**

#### Line 123: `@media (pointer: coarse), (max-width: 1199px)`

**Properties:**
- 🔧 `.scroll-top {
    right: 20px !important`
- 🔧 `bottom: 20px !important`

---

#### Line 115: `@media (hover: hover) and (pointer: fine) and (min-width: 1200px)`

**Properties:**
- 🔧 `.scroll-top {
    right: 30px !important`
- 🔧 `bottom: 30px !important`

---



## 📄 `src\components\layout\Footer.vue`

### 🔄 **REPLACE**

#### Line 569: `.footer-icon-wrapper`

**Properties:**
- 📏 `height: 24px`
- 📏 `width: 24px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 568: `.footer-icon-wrapper`

**Properties:**
- 📏 `height: 24px`
- 📏 `width: 24px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### 🤔 **CONSIDER_REPLACE**

#### Line 548: `.footer-nav-links`

**Properties:**
- 🔧 `align-items: stretch`
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: display, flex-direction, align-items

---

### ➕ **KEEP_BOTH**

#### Line 552: `.footer-nav-link`

**Properties:**
- 🔧 `justify-content: center`
- 🔧 `margin: 0`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: justify-content, margin

---

#### Line 415: `.social-btn`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  transition: all 0.3s ease`
- 🔧 `align-items: center`
- 🔧 `border: 2px solid transparent`
- 🔧 `border-radius: 50%`
- 🔧 `display: inline-flex`
- 📏 `height: 45px`
- 🔧 `justify-content: center`
- 🔧 `text-decoration: none`
- 📏 `width: 45px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, justify-content, border-radius, text-decoration, /* Font size handled by font-sizes.css */
  transition, border

---

#### Line 414: `.social-btn`

**Properties:**
- 🔧 `/* Font size handled by font-sizes.css */
  transition: all 0.3s ease`
- 🔧 `align-items: center`
- 🔧 `border: 2px solid transparent`
- 🔧 `border-radius: 50%`
- 🔧 `display: inline-flex`
- 📏 `height: 45px`
- 🔧 `justify-content: center`
- 🔧 `text-decoration: none`
- 📏 `width: 45px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, justify-content, border-radius, text-decoration, /* Font size handled by font-sizes.css */
  transition, border

---

#### Line 310: `.footer-icon-wrapper`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `border-radius: 6px`
- 🔧 `display: flex`
- 📏 `height: 28px`
- 🔧 `justify-content: center`
- 🔧 `margin-right: 10px`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 🔧 `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 28px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, justify-content, margin-right, border-radius, transition, position, overflow

---

#### Line 309: `.footer-icon-wrapper`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `border-radius: 6px`
- 🔧 `display: flex`
- 📏 `height: 28px`
- 🔧 `justify-content: center`
- 🔧 `margin-right: 10px`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 🔧 `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`
- 📏 `width: 28px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, align-items, justify-content, margin-right, border-radius, transition, position, overflow

---

#### Line 271: `.footer-nav-link::before`

**Properties:**
- 🔧 `background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)`
- 🔧 `content: ''`
- 📏 `height: 100%`
- 🔧 `left: -100%`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 🔧 `transition: left 0.6s ease`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, top, left, background, transition

---

#### Line 270: `.footer-nav-link::before`

**Properties:**
- 🔧 `background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)`
- 🔧 `content: ''`
- 📏 `height: 100%`
- 🔧 `left: -100%`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 🔧 `transition: left 0.6s ease`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, top, left, background, transition

---

### ⚪ **NO_SIZE**

#### Line 562: `@media (max-width: 576px)`

**Properties:**
- 🔧 `.footer-nav-link {
    padding: 8px 10px`

---

#### Line 539: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.footer-section {
    text-align: center`

---

#### Line 511: `.copyright-text`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.7)`
- 🔧 `line-height: 1.6`
- 🔧 `margin: 0`

---

#### Line 197: `.footer-description-text`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.8)`
- 🔧 `line-height: 1.6`
- 🔧 `margin-bottom: 20px`

---



## 📄 `src\components\layout\Navigation.vue`

### ➕ **KEEP_BOTH**

#### Line 364: `.mobile-nav-toggle`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(10px)`
- 🔧 `background: rgba(18, 18, 18, 0.9)`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3)`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)`
- 🔧 `color: rgba(255, 255, 255, 0.8)`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 📏 `height: 50px`
- 🔧 `justify-content: center`
- 🔧 `position: fixed`
- 🔧 `right: 20px`
- 🔧 `top: 20px`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 50px`
- 🔧 `z-index: 9998`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, right, z-index, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow

---

#### Line 363: `.mobile-nav-toggle`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `backdrop-filter: blur(10px)`
- 🔧 `background: rgba(18, 18, 18, 0.9)`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.3)`
- 🔧 `border-radius: 50%`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)`
- 🔧 `color: rgba(255, 255, 255, 0.8)`
- 🔧 `cursor: pointer`
- 🔧 `display: flex`
- 📏 `height: 50px`
- 🔧 `justify-content: center`
- 🔧 `position: fixed`
- 🔧 `right: 20px`
- 🔧 `top: 20px`
- 🔧 `transition: all 0.3s ease`
- 📏 `width: 50px`
- 🔧 `z-index: 9998`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, right, z-index, background, backdrop-filter, border, border-radius, display, align-items, justify-content, color, cursor, transition, box-shadow

---

#### Line 349: `.navmenu`

**Properties:**
- 🔧 `display: flex`
- 🔧 `flex-direction: column`
- 📏 `height: 100%`
- 🔧 `margin: 0`
- 🔧 `padding: 20px 0 0 0`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, margin, display, flex-direction

---

#### Line 330: `.header`

**Properties:**
- 🔧 `background: linear-gradient(180deg, rgba(30, 15, 50, 1) 0%, rgba(20, 10, 35, 1) 100%)`
- 🔧 `border-right: 1px solid rgba(139, 92, 246, 0.2)`
- 🔧 `bottom: 0`
- 🔧 `left: -100%`
- 🔧 `overflow-x: hidden`
- 🔧 `overflow-y: auto`
- 🔧 `padding: 0`
- 🔧 `position: fixed`
- 🔧 `top: 0`
- 🔧 `transition: all 0.3s ease-in-out`
- 📏 `width: 280px`
- 🔧 `z-index: 996`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, bottom, padding, background, overflow-y, overflow-x, z-index, border-right, transition

---

#### Line 324: `@media (pointer: coarse), (max-width: 1199px)`

**Properties:**
- 🔧 `.header {
    position: fixed`
- 🔧 `background: linear-gradient(180deg, rgba(30, 15, 50, 1) 0%, rgba(20, 10, 35, 1) 100%)`
- 🔧 `border-right: 1px solid rgba(139, 92, 246, 0.2)`
- 🔧 `bottom: 0`
- 🔧 `left: -100%`
- 🔧 `overflow-x: hidden`
- 🔧 `overflow-y: auto`
- 🔧 `padding: 0`
- 🔧 `top: 0`
- 🔧 `transition: all 0.3s ease-in-out`
- 📏 `width: 280px`
- 🔧 `z-index: 996`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: .header {
    position, top, left, bottom, padding, background, overflow-y, overflow-x, z-index, border-right, transition

---

#### Line 313: `.header`

**Properties:**
- 🔧 `background: linear-gradient(180deg, rgba(30, 15, 50, 1) 0%, rgba(20, 10, 35, 1) 100%)`
- 🔧 `border-right: 1px solid rgba(139, 92, 246, 0.2)`
- 🔧 `bottom: 0`
- 🔧 `left: 0`
- 🔧 `overflow-x: hidden`
- 🔧 `overflow-y: auto`
- 🔧 `padding: 0`
- 🔧 `position: fixed`
- 🔧 `top: 0`
- 📏 `width: 16.66%`
- 🔧 `z-index: 996`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, top, left, bottom, padding, background, overflow-y, overflow-x, z-index, border-right

---

### ⚪ **NO_SIZE**

#### Line 393: `@media (hover: hover) and (pointer: fine) and (min-width: 1200px)`

**Properties:**
- 🔧 `.mobile-nav-toggle {
    display: none`

---



## 📄 `src\components\projects\ArchitectureOverview.vue`

### ⚪ **NO_SIZE**

#### Line 218: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.architecture-content {
    grid-template-columns: 1fr`
- 🔧 `gap: 25px`

---

#### Line 211: `.benefits-description`

**Properties:**
- 🔧 `color: #374151`
- 🔧 `line-height: 1.6`
- 🔧 `margin: 0`

---

#### Line 186: `.feature-description`

**Properties:**
- 🔧 `color: #4b5563`
- 🔧 `line-height: 1.5`
- 🔧 `margin: 0`

---

#### Line 142: `.layer-description`

**Properties:**
- 🔧 `color: #374151`
- 🔧 `line-height: 1.6`
- 🔧 `margin-bottom: 20px`

---

#### Line 102: `.architecture-content`

**Properties:**
- 🔧 `/* Horizontal gap between columns */
  row-gap: 0`
- 🔧 `/* No vertical gap between grid items */
  align-items: start`
- 🔧 `column-gap: 30px`
- 🔧 `display: grid`
- 🔧 `grid-template-columns: 1fr 1fr`
- 🔧 `line-height: 1.7`

---



## 📄 `src\components\projects\Breadcrumbs.vue`

### ⚪ **NO_SIZE**

#### Line 114: `.page-title`

**Properties:**
- 🔧 `min-height: 48px`
- 🔧 `padding: 14px 0`

---

#### Line 111: `@media (pointer: coarse) and (max-width: 767px)`

**Properties:**
- 🔧 `.page-title {
    padding: 14px 0`
- 🔧 `min-height: 48px`

---

#### Line 106: `.page-title`

**Properties:**
- 🔧 `min-height: 52px`
- 🔧 `padding: 16px 0`

---

#### Line 103: `@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.page-title {
    padding: 16px 0`
- 🔧 `min-height: 52px`

---

#### Line 98: `.page-title`

**Properties:**
- 🔧 `min-height: 56px`
- 🔧 `padding: 18px 0`

---

#### Line 95: `@media (hover: hover) and (pointer: fine) and (min-width: 1200px)`

**Properties:**
- 🔧 `.page-title {
    padding: 18px 0`
- 🔧 `min-height: 56px`

---

#### Line 91: `.breadcrumbs .current`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.8)`
- 🔧 `font-weight: 500`
- 🔧 `line-height: 1`

---

#### Line 80: `.breadcrumbs a`

**Properties:**
- 🔧 `color: #7c3aed`
- 🔧 `line-height: 1`
- 🔧 `text-decoration: none`
- 🔧 `transition: color 0.3s ease`

---

#### Line 73: `.breadcrumbs li + li::before`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.4)`
- 🔧 `content: '/'`
- 🔧 `line-height: 1`
- 🔧 `padding: 0 10px`

---

#### Line 45: `.page-title`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: linear-gradient(135deg, rgba(30, 15, 50, 0.95) 0%, rgba(20, 10, 35, 0.98) 100%)`
- 🔧 `border-bottom: 1px solid rgba(139, 92, 246, 0.2)`
- 🔧 `display: flex`
- 🔧 `min-height: 60px`
- 🔧 `padding: 20px 0`

---



## 📄 `src\components\projects\DiagramViewer.vue`

### ⚪ **NO_SIZE**

#### Line 189: `.diagram-container`

**Properties:**
- 🔧 `min-height: 400px`

---

#### Line 172: `@media (pointer: coarse) and (max-width: 767px)`

**Properties:**
- 🔧 `.diagram-toolbar {
    gap: 6px`

---

#### Line 163: `.diagram-container`

**Properties:**
- 🔧 `min-height: 500px`

---

#### Line 161: `@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.diagram-container {
    min-height: 500px`

---

#### Line 114: `.diagram-container`

**Properties:**
- 🔧 `align-items: center`
- 🔧 `background: rgba(0, 0, 0, 0.02)`
- 🔧 `border: 2px dashed rgba(139, 92, 246, 0.2)`
- 🔧 `border-radius: 12px`
- 🔧 `display: flex`
- 🔧 `justify-content: center`
- 🔧 `min-height: 600px`

---



## 📄 `src\components\projects\EngineeringChallenges.vue`

### ⚪ **NO_SIZE**

#### Line 215: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.challenges-content {
    grid-template-columns: 1fr`
- 🔧 `gap: 25px`

---

#### Line 208: `.impact-description`

**Properties:**
- 🔧 `color: #374151`
- 🔧 `line-height: 1.6`
- 🔧 `margin: 0`

---

#### Line 183: `.solution-description`

**Properties:**
- 🔧 `color: #4b5563`
- 🔧 `line-height: 1.5`
- 🔧 `margin: 0`

---

#### Line 139: `.challenge-description`

**Properties:**
- 🔧 `color: #374151`
- 🔧 `line-height: 1.6`
- 🔧 `margin-bottom: 20px`

---

#### Line 99: `.challenges-content`

**Properties:**
- 🔧 `align-items: start`
- 🔧 `column-gap: 30px`
- 🔧 `display: grid`
- 🔧 `grid-template-columns: 1fr 1fr`
- 🔧 `line-height: 1.7`
- 🔧 `row-gap: 0`

---



## 📄 `src\components\projects\MetricsFramework.vue`

### ⚪ **NO_SIZE**

#### Line 451: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.metrics-framework-content {
    grid-template-columns: 1fr`
- 🔧 `gap: 25px`

---

#### Line 446: `.framework-item-description`

**Properties:**
- 🔧 `color: #4b5563`
- 🔧 `line-height: 1.6`
- 🔧 `margin: 0`

---

#### Line 373: `.detail-text`

**Properties:**
- 🔧 `color: #4b5563`
- 🔧 `line-height: 1.6`
- 🔧 `margin: 0`
- 🔧 `padding-left: 12px`

---

#### Line 253: `.framework-intro`

**Properties:**
- 🔧 `background: rgba(139, 92, 246, 0.04)`
- 🔧 `border-left: 4px solid rgba(139, 92, 246, 0.3)`
- 🔧 `border-radius: 8px`
- 🔧 `color: #374151`
- 🔧 `grid-column: 1 / -1`
- 🔧 `line-height: 1.6`
- 🔧 `margin-bottom: 30px`
- 🔧 `padding: 20px`

---

#### Line 243: `.metrics-framework-content`

**Properties:**
- 🔧 `align-items: start`
- 🔧 `column-gap: 30px`
- 🔧 `display: grid`
- 🔧 `grid-template-columns: 1fr 1fr`
- 🔧 `line-height: 1.7`
- 🔧 `row-gap: 0`

---



## 📄 `src\components\projects\PerformanceMetricsSection.vue`

### 🔄 **REPLACE**

#### Line 297: `.chart-canvas-wrapper`

**Properties:**
- 📏 `height: 300px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### 🤔 **CONSIDER_REPLACE**

#### Line 274: `.chart-canvas-wrapper`

**Properties:**
- 📏 `height: 350px`
- 🔧 `position: relative`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: position

---

#### Line 273: `.chart-canvas-wrapper`

**Properties:**
- 📏 `height: 350px`
- 🔧 `position: relative`
- 📏 `width: 100%`

**💡 Recommendation**: Consider replacing with standardized classes + inline structural styles if needed

**Other Props**: position

---

### ➕ **KEEP_BOTH**

#### Line 256: `.chart-container`

**Properties:**
- 🔧 `background: rgba(255, 255, 255, 0.95)`
- 🔧 `border: 1px solid rgba(139, 92, 246, 0.15)`
- 🔧 `border-radius: 16px`
- 🔧 `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)`
- 📏 `height: 100%`
- 🔧 `padding: 25px`
- 🔧 `transition: all 0.3s ease`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, padding, border-radius, box-shadow, border, transition

---

### ⚪ **NO_SIZE**

#### Line 301: `@media (max-width: 480px)`

**Properties:**
- 🔧 `.stats-cards-grid {
    grid-template-columns: 1fr`

---

#### Line 278: `@media (max-width: 768px)`

**Properties:**
- 🔧 `.performance-metrics-section {
    padding: 30px 20px`

---



## 📄 `src\components\projects\ProjectGallery.vue`

### 🔄 **REPLACE**

#### Line 325: `:deep(.carousel__icon)`

**Properties:**
- 📏 `height: 14px !important`
- 📏 `width: 14px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 324: `:deep(.carousel__icon)`

**Properties:**
- 📏 `height: 14px !important`
- 📏 `width: 14px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 320: `:deep(.carousel__next)`

**Properties:**
- 📏 `height: 35px !important`
- 📏 `width: 35px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 319: `:deep(.carousel__next)`

**Properties:**
- 📏 `height: 35px !important`
- 📏 `width: 35px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 314: `:deep(.carousel__slide)`

**Properties:**
- 📏 `height: 300px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 310: `:deep(.carousel__track)`

**Properties:**
- 📏 `height: 300px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 305: `.carousel-slide`

**Properties:**
- 📏 `height: 300px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 287: `:deep(.carousel__next)`

**Properties:**
- 📏 `height: 40px !important`
- 📏 `width: 40px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 286: `:deep(.carousel__next)`

**Properties:**
- 📏 `height: 40px !important`
- 📏 `width: 40px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 281: `:deep(.carousel__slide)`

**Properties:**
- 📏 `height: 420px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 277: `:deep(.carousel__track)`

**Properties:**
- 📏 `height: 420px !important`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

#### Line 272: `.carousel-slide`

**Properties:**
- 📏 `height: 420px`

**✅ Recommendation**: Remove class entirely, use standardized size classes in template

---

### ➕ **KEEP_BOTH**

#### Line 301: `.gallery-carousel`

**Properties:**
- 📏 `height: 300px`
- 🔧 `max-width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width

---

#### Line 300: `.gallery-carousel`

**Properties:**
- 📏 `height: 300px`
- 🔧 `max-width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width

---

#### Line 268: `.gallery-carousel`

**Properties:**
- 📏 `height: 420px`
- 🔧 `max-width: 750px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width

---

#### Line 267: `.gallery-carousel`

**Properties:**
- 📏 `height: 420px`
- 🔧 `max-width: 750px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width

---

#### Line 253: `:deep(.carousel__pagination-button--active)`

**Properties:**
- 🔧 `background: linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(168, 85, 247, 1)) !important`
- 🔧 `border-color: rgba(168, 85, 247, 0.8) !important`
- 🔧 `border-radius: 8px !important`
- 🔧 `box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(168, 85, 247, 0.4) !important`
- 📏 `width: 40px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border-radius, box-shadow, border-color

---

#### Line 242: `:deep(.carousel__pagination-button)`

**Properties:**
- 🔧 `background: rgba(255, 255, 255, 0.8) !important`
- 🔧 `border: 2px solid rgba(139, 92, 246, 0.5) !important`
- 🔧 `border-radius: 50% !important`
- 📏 `height: 14px !important`
- 🔧 `margin: 0 !important`
- 🔧 `padding: 0 !important`
- 🔧 `transition: all 0.4s ease !important`
- 📏 `width: 14px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, background, border, padding, margin, transition

---

#### Line 241: `:deep(.carousel__pagination-button)`

**Properties:**
- 🔧 `background: rgba(255, 255, 255, 0.8) !important`
- 🔧 `border: 2px solid rgba(139, 92, 246, 0.5) !important`
- 🔧 `border-radius: 50% !important`
- 📏 `height: 14px !important`
- 🔧 `margin: 0 !important`
- 🔧 `padding: 0 !important`
- 🔧 `transition: all 0.4s ease !important`
- 📏 `width: 14px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: border-radius, background, border, padding, margin, transition

---

#### Line 228: `:deep(.carousel__icon)`

**Properties:**
- 🔧 `fill: rgba(255, 255, 255, 0.95) !important`
- 📏 `height: 20px !important`
- 📏 `width: 20px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: fill

---

#### Line 227: `:deep(.carousel__icon)`

**Properties:**
- 🔧 `fill: rgba(255, 255, 255, 0.95) !important`
- 📏 `height: 20px !important`
- 📏 `width: 20px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: fill

---

#### Line 198: `:deep(.carousel__next)`

**Properties:**
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(30, 15, 50, 0.9) !important`
- 🔧 `border: 2px solid rgba(139, 92, 246, 0.5) !important`
- 🔧 `border-radius: 8px !important`
- 🔧 `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important`
- 📏 `height: 45px !important`
- 🔧 `position: absolute !important`
- 🔧 `top: 50% !important`
- 🔧 `transform: translateY(-50%) !important`
- 🔧 `transition: all 0.3s ease !important`
- 📏 `width: 45px !important`
- 🔧 `z-index: 10 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border-radius, backdrop-filter, border, transition, box-shadow, position, top, transform, z-index

---

#### Line 197: `:deep(.carousel__next)`

**Properties:**
- 🔧 `backdrop-filter: blur(10px) !important`
- 🔧 `background: rgba(30, 15, 50, 0.9) !important`
- 🔧 `border: 2px solid rgba(139, 92, 246, 0.5) !important`
- 🔧 `border-radius: 8px !important`
- 🔧 `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important`
- 📏 `height: 45px !important`
- 🔧 `position: absolute !important`
- 🔧 `top: 50% !important`
- 🔧 `transform: translateY(-50%) !important`
- 🔧 `transition: all 0.3s ease !important`
- 📏 `width: 45px !important`
- 🔧 `z-index: 10 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border-radius, backdrop-filter, border, transition, box-shadow, position, top, transform, z-index

---

#### Line 190: `:deep(.carousel__slide)`

**Properties:**
- 🔧 `background: transparent !important`
- 📏 `height: 500px !important`
- 🔧 `padding: 0 !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: padding, background

---

#### Line 183: `:deep(.carousel__track)`

**Properties:**
- 🔧 `background: transparent !important`
- 📏 `height: 500px !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background

---

#### Line 176: `:deep(.carousel__viewport)`

**Properties:**
- 🔧 `background: transparent !important`
- 🔧 `border-radius: 12px !important`
- 📏 `height: 500px !important`
- 🔧 `overflow: hidden !important`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: background, border-radius, overflow

---

#### Line 162: `.carousel-slide img`

**Properties:**
- 🔧 `border-radius: 0`
- 🔧 `display: block`
- 📏 `height: 100%`
- 🔧 `object-fit: cover`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, display, border-radius

---

#### Line 161: `.carousel-slide img`

**Properties:**
- 🔧 `border-radius: 0`
- 🔧 `display: block`
- 📏 `height: 100%`
- 🔧 `object-fit: cover`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: object-fit, display, border-radius

---

#### Line 154: `.carousel-slide`

**Properties:**
- 🔧 `border-radius: 0`
- 📏 `height: 100%`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, overflow

---

#### Line 153: `.carousel-slide`

**Properties:**
- 🔧 `border-radius: 0`
- 📏 `height: 100%`
- 🔧 `overflow: hidden`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, border-radius, overflow

---

#### Line 146: `.gallery-carousel`

**Properties:**
- 🔧 `border-radius: 12px`
- 📏 `height: 500px`
- 🔧 `max-width: 900px`
- 🔧 `overflow: visible`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, position, border-radius, overflow

---

#### Line 145: `.gallery-carousel`

**Properties:**
- 🔧 `border-radius: 12px`
- 📏 `height: 500px`
- 🔧 `max-width: 900px`
- 🔧 `overflow: visible`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, position, border-radius, overflow

---

#### Line 144: `.gallery-carousel`

**Properties:**
- 🔧 `border-radius: 12px`
- 📏 `height: 500px`
- 🔧 `max-width: 900px`
- 🔧 `overflow: visible`
- 🔧 `position: relative`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: max-width, position, border-radius, overflow

---

#### Line 127: `.gallery-carousel-container::before`

**Properties:**
- 🔧 `animation: floatingOrbs 20s ease-in-out infinite`
- 🔧 `background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
- 🔧 `content: ''`
- 📏 `height: 200%`
- 🔧 `left: -50%`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: -50%`
- 📏 `width: 200%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, top, left, background, animation, pointer-events

---

#### Line 126: `.gallery-carousel-container::before`

**Properties:**
- 🔧 `animation: floatingOrbs 20s ease-in-out infinite`
- 🔧 `background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
- 🔧 `content: ''`
- 📏 `height: 200%`
- 🔧 `left: -50%`
- 🔧 `pointer-events: none`
- 🔧 `position: absolute`
- 🔧 `top: -50%`
- 📏 `width: 200%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, top, left, background, animation, pointer-events

---

### ⚪ **NO_SIZE**

#### Line 292: `@media (pointer: coarse) and (max-width: 767px)`

**Properties:**
- 🔧 `.gallery-carousel-container {
    padding: 25px 15px 35px 15px`
- 🔧 `gap: 15px`
- 🔧 `min-height: auto`

---

#### Line 260: `@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.gallery-carousel-container {
    padding: 30px 25px 40px 25px`
- 🔧 `min-height: auto`

---



## 📄 `src\components\projects\ProjectHeroCard.vue`

### ➕ **KEEP_BOTH**

#### Line 224: `.achievements-grid`

**Properties:**
- 🔧 `display: grid`
- 🔧 `gap: 20px`
- 🔧 `grid-template-columns: repeat(2, 1fr)`
- 📏 `width: 100%`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: display, grid-template-columns, gap

---

#### Line 166: `.hero-content`

**Properties:**
- 🔧 `max-width: 100%`
- 🔧 `position: relative`
- 📏 `width: 100%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, max-width

---

#### Line 165: `.hero-content`

**Properties:**
- 🔧 `max-width: 100%`
- 🔧 `position: relative`
- 📏 `width: 100%`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, z-index, max-width

---

#### Line 124: `.project-hero-card::before`

**Properties:**
- 🔧 `background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 100%
  )`
- 🔧 `content: ''`
- 📏 `height: 1px`
- 🔧 `left: 0`
- 🔧 `position: absolute`
- 🔧 `right: 0`
- 🔧 `top: 0`
- 🔧 `z-index: 1`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, top, left, right, background, z-index

---

### ⚪ **NO_SIZE**

#### Line 283: `@media (pointer: coarse) and (max-width: 767px)`

**Properties:**
- 🔧 `.project-hero-card {
    padding: 25px`

---

#### Line 268: `@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.project-hero-card {
    padding: 35px`

---

#### Line 255: `.achievement-emoji`

**Properties:**
- 🔧 `display: inline-block`
- 🔧 `flex-shrink: 0`
- 🔧 `font-style: normal`
- 🔧 `line-height: 1`
- 🔧 `min-width: 24px`

---

#### Line 252: `.achievement-emoji`

**Properties:**
- 🔧 `display: inline-block`
- 🔧 `flex-shrink: 0`
- 🔧 `font-style: normal`
- 🔧 `line-height: 1`
- 🔧 `min-width: 24px`

---

#### Line 181: `.project-description`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.9)`
- 🔧 `line-height: 1.8`
- 🔧 `margin-bottom: 30px`
- 🔧 `text-align: justify`
- 🔧 `text-justify: inter-word`

---

#### Line 174: `.hero-main-title`

**Properties:**
- 🔧 `color: #ffffff`
- 🔧 `font-weight: 600 !important`
- 🔧 `line-height: 1.3`
- 🔧 `margin-bottom: 20px`
- 🔧 `text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)`

---



## 📄 `src\components\projects\ROISection.vue`

### ⚪ **NO_SIZE**

#### Line 247: `@media (pointer: coarse) and (max-width: 767px)`

**Properties:**
- 🔧 `.roi-section {
    padding: 25px`

---

#### Line 235: `@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px)`

**Properties:**
- 🔧 `.roi-section {
    padding: 35px`

---

#### Line 158: `.impact-item`

**Properties:**
- 🔧 `color: rgba(255, 255, 255, 0.95)`
- 🔧 `line-height: 1.6`

---



## 📄 `src\components\projects\TechnologyStack.vue`

### ➕ **KEEP_BOTH**

#### Line 281: `.tech-item::before`

**Properties:**
- 🔧 `background: linear-gradient(180deg, 
    rgba(139, 92, 246, 0.8) 0%, 
    rgba(236, 72, 153, 0.8) 100%
  )`
- 🔧 `bottom: 0`
- 🔧 `content: ''`
- 🔧 `left: 0`
- 🔧 `opacity: 0`
- 🔧 `position: absolute`
- 🔧 `top: 0`
- 🔧 `transition: opacity 0.3s ease`
- 📏 `width: 3px`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: content, position, left, top, bottom, background, opacity, transition

---

#### Line 184: `.tech-category-card`

**Properties:**
- 🔧 `background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 245, 255, 0.9) 100%
  )`
- 🔧 `background-clip: padding-box`
- 🔧 `border: 2px solid transparent`
- 🔧 `border-radius: 16px`
- 🔧 `box-shadow: 0 4px 20px rgba(139, 92, 246, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06)`
- 📏 `height: 100%`
- 🔧 `overflow: hidden`
- 🔧 `padding: 28px`
- 🔧 `position: relative`
- 🔧 `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`

**📌 Recommendation**: Keep class for non-size properties, add standardized size class in template

**Important Props**: position, background, border, border-radius, padding, transition, box-shadow, overflow, background-clip

---

### ⚪ **NO_SIZE**

#### Line 352: `@media (max-width: 767px)`

**Properties:**
- 🔧 `.tech-item {
    grid-template-columns: 36px 1fr`
- 🔧 `gap: 10px`

---

#### Line 338: `.tech-content`

**Properties:**
- 🔧 `align-items: baseline`
- 🔧 `display: flex`
- 🔧 `flex-wrap: wrap`
- 🔧 `line-height: 1.6`
- 🔧 `padding-top: 4px`

---



## 📊 Summary by Action

| Action | Count | What to Do |
|--------|-------|------------|
| 🔄 REPLACE | 79 | Remove class, use standardized classes |
| 🤔 CONSIDER_REPLACE | 10 | Evaluate if can replace entirely |
| ➕ KEEP_BOTH | 202 | Keep class + add standardized |
| ⚪ NO_SIZE | 98 | Ignore (false positive) |
