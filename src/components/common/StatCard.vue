<template>
  <div class="col-xxl-120-30 col-xl-120-30 col-lg-120-30 col-md-120-30 col-sm-120-60 col-xs-120-60 col-us-120-120 col-120-120">
    <div class="stat-card-wrapper">
      <div class="elegant-card">
        <!-- Decorative Star -->
        <div class="star-decoration">
          <svg viewBox="0 0 24 24" class="star-svg">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        
        <!-- Animated Circle Background -->
        <div class="circle-bg"></div>
        
        <!-- Card Content -->
        <div class="infotop">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon" :style="{ color: iconColor }">
            <path fill="currentColor" :d="iconPath"></path>
          </svg>
          <div class="label-text txt-label-lg">{{ label }}</div>
          <div class="name txt-h2-3xl" :style="{ minWidth: valueMinWidth }">{{ animatedValue }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    iconPath: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: '#ffd700' // Gold by default
    }
  },
  data() {
    return {
      animatedValue: 0,
      animationActivated: false // Track if animation has been triggered
    }
  },
  computed: {
    // Reserve space for final value to prevent layout shift during animation
    valueMinWidth() {
      const digits = String(this.value).length
      return `${digits * 0.6}em`
    }
  },
  mounted() {
    // LCP OPTIMIZATION: Show final value immediately, don't animate on mount
    // Animation will trigger on first user interaction
    this.animatedValue = this.value
    
    // Set up lightweight listener for first interaction
    this.$nextTick(() => {
      const card = this.$el.querySelector('.elegant-card')
      if (!card) return
      
      const activateAnimation = () => {
        if (!this.animationActivated) {
          this.animationActivated = true
          this.animateCounter()
          // Remove listeners after activation
          card.removeEventListener('touchstart', activateAnimation, { passive: true })
          card.removeEventListener('click', activateAnimation)
          card.removeEventListener('mouseenter', activateAnimation)
        }
      }
      
      card.addEventListener('touchstart', activateAnimation, { passive: true })
      card.addEventListener('click', activateAnimation)
      card.addEventListener('mouseenter', activateAnimation)
    })
  },
  watch: {
    value() {
      this.animateCounter()
    }
  },
  methods: {
    animateCounter() {
      const duration = 2000 // 2 seconds
      const startValue = 0
      const endValue = this.value
      const startTime = performance.now()
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuad = progress => 1 - (1 - progress) * (1 - progress)
        const easedProgress = easeOutQuad(progress)
        
        this.animatedValue = Math.floor(startValue + (endValue - startValue) * easedProgress)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          this.animatedValue = endValue
        }
      }
      
      requestAnimationFrame(animate)
    }
  }
}
</script>

<style scoped>
/* Stat Card Styling - Matching Contact Cards */

/* Card Wrapper */
.stat-card-wrapper {
  width: 100%;
  padding: 20.25px;
  isolation: isolate;
  transform: translateZ(0);
}

/* Elegant Card Container */
.elegant-card {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 10, 60, 0.95) 0%, rgba(20, 5, 40, 0.98) 50%, rgba(15, 0, 30, 1) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(167, 139, 250, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(124, 58, 237, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /* LCP OPTIMIZATION: Only use will-change on hover, use contain for isolation */
  contain: layout style paint;
}

.elegant-card:hover {
  will-change: transform;
  transform: translateY(-4px) translateZ(0);
  border-color: rgba(167, 139, 250, 0.6);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 8px 24px rgba(124, 58, 237, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Decorative Star */
.star-decoration {
  position: absolute;
  left: -40%;
  top: 0;
  z-index: 2;
  transition: all 0.3s ease;
  opacity: 0.1;
}

.star-svg {
  fill: rgba(167, 139, 250, 0.8);
  height: 200px;
  width: 200px;
  transform: rotate(24deg);
}

.elegant-card:hover .star-decoration {
  transform: rotate(12deg) scale(1.5);
  opacity: 0.25;
}

/* Animated Circle Background */
.circle-bg {
  position: absolute;
  left: 50%;
  top: 44%;
  height: 110%;
  width: 110%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 70%);
  z-index: 1;
  transition: all 0.3s ease;
}

.elegant-card:hover .circle-bg {
  top: 58%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(109, 40, 217, 0.15) 50%, transparent 70%);
}

/* Icon */
.icon {
  width: 3em;
  position: relative;
  z-index: 10;
  filter: drop-shadow(0 0 8px currentColor);
  transition: all 0.3s ease;
}

.elegant-card:hover .icon {
  transform: scale(1.1);
  filter: drop-shadow(0 0 12px currentColor);
}

/* Content */
.infotop {
  text-align: center;
  position: relative;
  z-index: 10;
  color: rgb(255, 255, 255);
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.label-text {
  color: rgba(255, 255, 255, 0.9);
}

.name {
  font-weight: 700;
  text-transform: none;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (pointer: coarse) {
  .elegant-card {
    height: 220px;
    padding: 28px 20px;
    gap: 16px;
  }
  
  .icon {
    width: 2.8em;
  }
}

@media (pointer: coarse) and (max-width: 480px) {
  .elegant-card {
    height: 200px;
    padding: 24px 16px;
    gap: 14px;
  }
  
  .icon {
    width: 2.5em;
  }
}
</style>
