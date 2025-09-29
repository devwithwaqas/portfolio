<template>
  <section id="stats" class="stats section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <!-- Stats Card -->
      <ReusableCard 
        title="Professional Statistics" 
        icon="📊"
        body-padding="0"
      >
        <div class="row mb-5 g-4">
            <div class="col-12">
              <div class="text-center mb-4" style="color: #0563bb; font-weight: 600;">
                <span>📊</span> Professional Statistics
              </div>
            </div>
                <div class="col-xxl-120-30 col-xl-120-30 col-lg-120-30 col-md-120-30 col-sm-120-60 col-xs-120-60 col-us-120-120 col-120-120">
                  <div class="e-card playing">
                    <div class="image"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="infotop">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                      </svg><br>      
                      Happy Clients
                      <br>
                      <div class="name">{{ animatedStats.happyClients }}</div>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-120-30 col-xl-120-30 col-lg-120-30 col-md-120-30 col-sm-120-60 col-xs-120-60 col-us-120-120 col-120-120">
                  <div class="e-card playing">
                    <div class="image"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="infotop">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon">
                        <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
                      </svg><br>      
                      Projects
                      <br>
                      <div class="name">{{ animatedStats.totalProjects }}</div>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-120-30 col-xl-120-30 col-lg-120-30 col-md-120-30 col-sm-120-60 col-xs-120-60 col-us-120-120 col-120-120">
                  <div class="e-card playing">
                    <div class="image"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="infotop">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon">
                        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"></path>
                      </svg><br>      
                      Years Experience
                      <br>
                      <div class="name">{{ animatedStats.yearsExperience }}</div>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-120-30 col-xl-120-30 col-lg-120-30 col-md-120-30 col-sm-120-60 col-xs-120-60 col-us-120-120 col-120-120">
                  <div class="e-card playing">
                    <div class="image"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="infotop">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon">
                        <path fill="currentColor" d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,5.9A2.1,2.1 0 0,0 13.9,8A2.1,2.1 0 0,0 16,10.1A2.1,2.1 0 0,0 18.1,8A2.1,2.1 0 0,0 16,5.9M16,13C18.67,13 24,14.33 24,17V20H8V17C8,14.33 13.33,13 16,13M2,12V20H0V12H2M22,12V20H20V12H22M6,12V20H4V12H6M18,12V20H16V12H18M10,12V20H8V12H10M14,12V20H12V12H14Z"></path>
                      </svg><br>      
                      Years as Tech Lead
                      <br>
                      <div class="name">{{ animatedStats.yearsAsTechLead }}</div>
                    </div>
                  </div>
                </div>
        </div>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import ReusableCard from './ReusableCard.vue'
import { APP_CONFIG, ANIMATION_CONFIG } from '../config/constants.js'

export default {
  components: {
    ReusableCard
  },
  name: 'Stats',
  data() {
    return {
      // VUE PROPER: Import constants from centralized config
      stats: APP_CONFIG.stats,
      // VUE-NATIVE: Replace external PureCounter with Vue reactive counters 
      animatedStats: {
        happyClients: 0,
        totalProjects: 0,
        yearsExperience: 0,
        yearsAsTechLead: 0
      }
    }
  },
  mounted() {
    // PROPER VUE: Initialize Vue-native counters instead of external PureCounter  
    this.startVueCounterAnimations()
  },
  methods: {
    startVueCounterAnimations() {
      // VUE PROPER: Use animation configuration constants
      const config = APP_CONFIG instanceof Object && 'stats' in APP_CONFIG ? ANIMATION_CONFIG : {
        counter: { duration: 2000 }, 
        scrollAnimations: { threshold: 0.1 }
      }
      
      const statList = [
        { name: 'happyClients', value: this.stats.happyClients },
        { name: 'totalProjects', value: this.stats.totalProjects },
        { name: 'yearsExperience', value: this.stats.yearsExperience },
        { name: 'yearsAsTechLead', value: this.stats.yearsAsTechLead }
      ]
      
      statList.forEach((stat) => {
        this.animateCounter(stat.value, stat.name, config.counter.duration)
      })
    },
    animateCounter(targetValue, property, duration = 2000) {
      let startTime = null
      
      const animationStep = (timestamp) => {
        if (startTime === null) startTime = timestamp
        const elapsedTime = timestamp - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const easedProgress = this.easeOutQuart(progress)
        const currentValue = Math.floor(easedProgress * targetValue)
        
        // VUE REACTIVITY: Vue automatically updates DOM when reactive data changes
        this.animatedStats[property] = currentValue
        
        if (progress < 1) {
          requestAnimationFrame(animationStep)
        }
      }
      
      requestAnimationFrame(animationStep)
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t
    }
  }
}
</script>

<style scoped>
/* From Uiverse.io by MikeAndrewDesigner */ 
.e-card {
  margin: 0 auto;
  background: transparent;
  box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
}

.wave {
  position: absolute;
  width: 540px;
  height: 700px;
  opacity: 0.6;
  left: 0;
  top: 0;
  margin-left: -50%;
  margin-top: -70%;
  background: linear-gradient(744deg,#af40ff,#5b42f3 60%,#00ddeb);
}

.icon {
  width: 3em;
  margin-top: -1em;
  padding-bottom: 1em;
}

.infotop {
  text-align: center;
  font-size: 1.1rem;
  position: absolute;
  top: 3.8em;
  left: 0;
  right: 0;
  color: rgb(255, 255, 255);
  font-weight: 600;
  padding: 0 20px;
  line-height: 1.3;
}

.name {
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  top: 1em;
  text-transform: none;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.wave:nth-child(2),
.wave:nth-child(3) {
  top: 210px;
}

.playing .wave {
  border-radius: 40%;
  animation: wave 3000ms infinite linear;
}

.wave {
  border-radius: 40%;
  animation: wave 55s infinite linear;
}

.playing .wave:nth-child(2) {
  animation-duration: 4000ms;
}

.wave:nth-child(2) {
  animation-duration: 50s;
}

.playing .wave:nth-child(3) {
  animation-duration: 5000ms;
}

.wave:nth-child(3) {
  animation-duration: 45s;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}


/* Colorful Icons */
.infotop .icon path {
  fill: #ffd700; /* Gold for Happy Clients */
}

/* Use more specific selectors that work with 120-column system */
.col-xxl-120-30:nth-child(2) .infotop .icon path,
.col-xl-120-30:nth-child(2) .infotop .icon path,
.col-lg-120-30:nth-child(2) .infotop .icon path,
.col-md-120-30:nth-child(2) .infotop .icon path,
.col-sm-120-60:nth-child(2) .infotop .icon path,
.col-xs-120-60:nth-child(2) .infotop .icon path,
.col-us-120-120:nth-child(2) .infotop .icon path,
.col-120-120:nth-child(2) .infotop .icon path {
  fill: #00ff88; /* Bright green for Projects */
}

.col-xxl-120-30:nth-child(3) .infotop .icon path,
.col-xl-120-30:nth-child(3) .infotop .icon path,
.col-lg-120-30:nth-child(3) .infotop .icon path,
.col-md-120-30:nth-child(3) .infotop .icon path,
.col-sm-120-60:nth-child(3) .infotop .icon path,
.col-xs-120-60:nth-child(3) .infotop .icon path,
.col-us-120-120:nth-child(3) .infotop .icon path,
.col-120-120:nth-child(3) .infotop .icon path {
  fill: #ff1744; /* Bright red for Years Experience */
}

.col-xxl-120-30:nth-child(4) .infotop .icon path,
.col-xl-120-30:nth-child(4) .infotop .icon path,
.col-lg-120-30:nth-child(4) .infotop .icon path,
.col-md-120-30:nth-child(4) .infotop .icon path,
.col-sm-120-60:nth-child(4) .infotop .icon path,
.col-xs-120-60:nth-child(4) .infotop .icon path,
.col-us-120-120:nth-child(4) .infotop .icon path,
.col-120-120:nth-child(4) .infotop .icon path {
  fill: #00e676; /* Bright green for Tech Lead */
}

/* Responsive adjustments */
@media (pointer: coarse) and (max-width: 768px) {
  .card-body {
    padding: 0 5px !important;
  }
  
  .row {
    margin: 0 -5px !important;
  }
  
  .e-card {
    width: 100%;
    max-width: 100%;
    height: 200px;
    margin: 0 auto 15px auto;
  }
  
  .infotop {
    font-size: 1rem;
    top: 3.2em;
    padding: 0 15px;
  }
  
  .name {
    font-size: 1.3rem;
  }
  
  .icon {
    width: 2.5em;
  }
}

@media (pointer: coarse) and (max-width: 576px) {
  .card-body {
    padding: 0 !important;
  }
  
  .row {
    margin: 0 !important;
  }
  
  .e-card {
    width: 100%;
    max-width: 100%;
    height: 180px;
    margin: 0 auto 15px auto;
  }
  
  .infotop {
    font-size: 0.9rem;
    top: 2.8em;
    padding: 0 10px;
  }
  
  .name {
    font-size: 1.2rem;
  }
  
  .icon {
    width: 2em;
  }
}
</style>
