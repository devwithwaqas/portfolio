<template>
  <div class="test-nav-wrapper">
    <a 
      href="#" 
      class="test-nav-link"
      :class="buttonClasses"
      :style="customStyles"
      :aria-label="`Navigate to ${label} section`"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <svg class="test-icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path v-for="(path, index) in svgPaths" :key="'path-' + index" :d="path.d"></path>
        <polyline v-for="(polyline, index) in svgPolylines" :key="'polyline-' + index" :points="polyline.points"></polyline>
        <circle v-for="(circle, index) in svgCircles" :key="'circle-' + index" :cx="circle.cx" :cy="circle.cy" :r="circle.r"></circle>
        <rect v-for="(rect, index) in svgRects" :key="'rect-' + index" :x="rect.x" :y="rect.y" :width="rect.width" :height="rect.height" :rx="rect.rx" :ry="rect.ry"></rect>
        <line v-for="(line, index) in svgLines" :key="'line-' + index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"></line>
      </svg>
      <span class="txt-nav-btn-md">{{ label }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    href: {
      type: String,
      default: '#hero'
    },
    label: {
      type: String,
      default: 'Home'
    },
    isActive: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: '236, 72, 153' // RGB values as string (pink by default)
    },
    svgPaths: {
      type: Array,
      default: () => [{
        d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
      }]
    },
    svgPolylines: {
      type: Array,
      default: () => []
    },
    svgCircles: {
      type: Array,
      default: () => []
    },
    svgRects: {
      type: Array,
      default: () => []
    },
    svgLines: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isHovered: false,
      isFocused: false,
      wasClicked: false, // Track if button was recently clicked
      showActiveState: false, // Track if we should show full active state
      transitionTimeout: null // Store timeout reference for cleanup
    }
  },
  computed: {
    buttonClasses() {
      // Priority: active > focused > hovered
      // Only show active if button is actually active AND we should show active state
      const shouldShowActive = this.isActive && this.showActiveState
      // Only show focused if button is NOT active (to avoid conflicts) and was clicked
      const shouldShowFocused = (this.isFocused || this.wasClicked) && !this.isActive && !shouldShowActive
      // Only show hovered if button is NOT active, NOT focused, and NOT clicked
      const shouldShowHovered = this.isHovered && !this.isActive && !shouldShowFocused && !this.wasClicked && !this.isFocused
      
      return {
        'is-active': shouldShowActive,
        'is-hovered': shouldShowHovered,
        'is-focused': shouldShowFocused
      }
    },
    customStyles() {
      // Split RGB string and create CSS variables
      const [r, g, b] = this.buttonColor.split(',').map(v => v.trim())
      // Calculate a lighter variant (increase RGB values by ~20%)
      const lighterR = Math.min(255, Math.round(parseInt(r) * 1.2))
      const lighterG = Math.min(255, Math.round(parseInt(g) * 1.2))
      const lighterB = Math.min(255, Math.round(parseInt(b) * 1.2))
      
      return {
        '--btn-r': r,
        '--btn-g': g,
        '--btn-b': b,
        '--btn-lighter-r': lighterR,
        '--btn-lighter-g': lighterG,
        '--btn-lighter-b': lighterB
      }
    }
  },
  watch: {
    isActive(newVal, oldVal) {
      // Clear any existing timeout immediately
      if (this.transitionTimeout) {
        clearTimeout(this.transitionTimeout)
        this.transitionTimeout = null
      }

      // When button becomes active (via scroll or click)
      if (newVal && !oldVal) {
        // If it was clicked, show focused transition first
        if (this.wasClicked) {
          this.showActiveState = false
          this.isFocused = false
          
          // After 300ms, show full active state
          this.transitionTimeout = setTimeout(() => {
            // Only set active if still active (check again)
            if (this.isActive) {
              this.wasClicked = false
              this.isFocused = false
              this.showActiveState = true
            } else {
              // If no longer active, clear everything
              this.wasClicked = false
              this.isFocused = false
              this.showActiveState = false
            }
            this.transitionTimeout = null
          }, 300)
        } else {
          // If activated via scroll, show active state immediately
          this.wasClicked = false
          this.isFocused = false
          this.showActiveState = true
        }
      }
      // Clear all states when button becomes inactive (via scroll or click on another button)
      if (!newVal && oldVal) {
        // Clear timeout if button becomes inactive
        if (this.transitionTimeout) {
          clearTimeout(this.transitionTimeout)
          this.transitionTimeout = null
        }
        // Immediately clear all states
        this.wasClicked = false
        this.isFocused = false
        this.showActiveState = false
      }
    }
  },
  mounted() {
    // If button is already active on mount (page load), show active state immediately
    if (this.isActive) {
      this.showActiveState = true
    }
  },
  beforeUnmount() {
    // Clean up timeout on component unmount
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout)
    }
  },
  methods: {
    handleClick(event) {
      // Only set wasClicked if button is not already active
      if (!this.isActive) {
        this.wasClicked = true
      }
      this.$emit('navigate', event)
    },
    handleMouseEnter() {
      // Only show hover if button is not active
      if (!this.isActive) {
        this.isHovered = true
      }
    },
    handleMouseLeave() {
      this.isHovered = false
    },
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    },
  },
}
</script>

<style scoped>
/* Clean Nav Button - 80% width with smooth alignment transition */

.test-nav-wrapper {
  padding: 0 8px 0 0;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 12px;
}

/* Base State - 85% width, left aligned */
.test-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  height: auto !important;
  min-height: 42px;
  width: 85%;
  margin: 0;
  margin-left: 0;
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: none;
  border-left: 3px solid transparent;
  text-decoration: none;
  border-radius: 0;
  font-weight: 500;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hovered State - Rectangular borders + blur glow */
.test-nav-link.is-hovered {
  color: rgba(255, 255, 255, 1);
  border-left-color: rgba(var(--btn-r), var(--btn-g), var(--btn-b), 1);
  background: rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.12);
  text-shadow: 
    0 0 8px rgba(255, 255, 255, 0.8),
    0 0 16px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.6);
  box-shadow: 
    inset 3px 0 0 rgba(var(--btn-r), var(--btn-g), var(--btn-b), 1),
    inset 0 0 40px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.15),
    0 0 0 4px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.3),
    0 0 0 8px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.15),
    0 0 20px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.6),
    0 0 40px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.3);
}

/* Focused State - Bland with silver borders, slides to right */
.test-nav-link.is-focused {
  color: rgba(255, 255, 255, 0.9);
  border-left-color: rgba(var(--btn-r), var(--btn-g), var(--btn-b), 1);
  background: transparent;
  margin-left: calc(15% - 4px) !important;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset -1px 0 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: none;
}

/* Active State - Rectangular borders + blur glow + gradient background, stays right aligned */
.test-nav-link.is-active {
  color: rgba(255, 255, 255, 1);
  border-left-color: rgba(var(--btn-r), var(--btn-g), var(--btn-b), 1);
  background: linear-gradient(
    90deg,
    rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.35) 0%,
    rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.22) 50%,
    rgba(var(--btn-lighter-r), var(--btn-lighter-g), var(--btn-lighter-b), 0.15) 100%
  );
  margin-left: calc(15% - 4px);
  text-shadow: 
    0 0 8px rgba(255, 255, 255, 0.8),
    0 0 16px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.6);
  box-shadow: 
    inset 3px 0 0 rgba(var(--btn-r), var(--btn-g), var(--btn-b), 1),
    inset 0 0 40px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.15),
    0 0 0 2px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.3),
    0 0 0 4px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.15),
    0 0 15px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.7),
    0 0 30px rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.4);
}

/* Icon Styling */
.test-icon {
  flex-shrink: 0;
  stroke: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.test-nav-link.is-hovered .test-icon {
  stroke: rgb(var(--btn-r), var(--btn-g), var(--btn-b));
  transform: scale(1.1);
  filter: drop-shadow(0 0 4px rgb(var(--btn-r), var(--btn-g), var(--btn-b)));
}

.test-nav-link.is-focused .test-icon {
  stroke: rgb(var(--btn-r), var(--btn-g), var(--btn-b));
  transform: scale(1);
  filter: none;
}

.test-nav-link.is-active .test-icon {
  stroke: rgb(var(--btn-r), var(--btn-g), var(--btn-b));
  transform: scale(1.1);
  filter: drop-shadow(0 0 4px rgb(var(--btn-r), var(--btn-g), var(--btn-b)));
}

.test-nav-link:focus {
  outline: none;
}

/* Sidenav (mobile): clearer inactive vs focused vs active */
@media (max-width: 1199px), (pointer: coarse) {
  /* Inactive: muted, no slide, no accent */
  .test-nav-link {
    color: rgba(255, 255, 255, 0.55);
  }

  .test-nav-link .test-icon {
    stroke: rgba(255, 255, 255, 0.5);
  }

  /* Focused (tapped / button down): distinct from inactive */
  .test-nav-link.is-focused {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.06);
  }

  .test-nav-link.is-focused .test-icon {
    stroke: rgba(255, 255, 255, 0.85);
  }

  /* Active: keep strong emphasis */
  .test-nav-link.is-active {
    color: rgba(255, 255, 255, 1);
  }

  .test-nav-link.is-active .test-icon {
    stroke: rgb(var(--btn-r), var(--btn-g), var(--btn-b));
  }

  /* Physical press :active - clearly "button down" */
  .test-nav-link:active {
    background: rgba(255, 255, 255, 0.08);
  }

  .test-nav-link.is-active:active {
    background: linear-gradient(
      90deg,
      rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.4) 0%,
      rgba(var(--btn-r), var(--btn-g), var(--btn-b), 0.25) 50%,
      rgba(var(--btn-lighter-r), var(--btn-lighter-g), var(--btn-lighter-b), 0.18) 100%
    );
  }
}
</style>
