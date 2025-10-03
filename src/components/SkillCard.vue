<template>
  <div class="col-xxl-120-15 col-xl-120-17 col-lg-120-20 col-md-120-24 col-sm-120-30 col-xs-120-40 col-us-120-60 col-120-120 mb-4">
    <div class="cyber-container noselect">
      <div class="cyber-canvas">
        <div class="cyber-tracker tr-1"></div>
        <div class="cyber-tracker tr-2"></div>
        <div class="cyber-tracker tr-3"></div>
        <div class="cyber-tracker tr-4"></div>
        <div class="cyber-tracker tr-5"></div>
        <div class="cyber-tracker tr-6"></div>
        <div class="cyber-tracker tr-7"></div>
        <div class="cyber-tracker tr-8"></div>
        <div class="cyber-tracker tr-9"></div>
        <div class="cyber-tracker tr-10"></div>
        <div class="cyber-tracker tr-11"></div>
        <div class="cyber-tracker tr-12"></div>
        <div class="cyber-tracker tr-13"></div>
        <div class="cyber-tracker tr-14"></div>
        <div class="cyber-tracker tr-15"></div>
        <div class="cyber-tracker tr-16"></div>
        <div class="cyber-tracker tr-17"></div>
        <div class="cyber-tracker tr-18"></div>
        <div class="cyber-tracker tr-19"></div>
        <div class="cyber-tracker tr-20"></div>
        <div class="cyber-tracker tr-21"></div>
        <div class="cyber-tracker tr-22"></div>
        <div class="cyber-tracker tr-23"></div>
        <div class="cyber-tracker tr-24"></div>
        <div class="cyber-tracker tr-25"></div>
        <div id="cyber-card">
          <div class="cyber-card-content">
            <div class="cyber-card-glare"></div>
            <div class="cyber-lines">
              <span></span><span></span><span></span><span></span>
            </div>

            <!-- Technology Icon -->
            <div class="cyber-skill-icon">
              <img :src="icon" :alt="name" />
            </div>

            <!-- Technology Name -->
            <div class="cyber-skill-name">{{ name }}</div>
            
            <!-- Progress Bar -->
            <div class="cyber-progress-container">
              <div class="cyber-progress-bar-bg">
                <div class="cyber-progress-bar-fill" :style="{ width: percentage + '%' }"></div>
              </div>
              <span class="cyber-skill-percentage">{{ percentage }}%</span>
            </div>

            <div class="cyber-glowing-elements">
              <div class="cyber-glow-1"></div>
              <div class="cyber-glow-2"></div>
              <div class="cyber-glow-3"></div>
            </div>
            <div class="cyber-subtitle">
              <span>{{ category }}</span>
              <span class="cyber-highlight">{{ level }}</span>
            </div>
            <div class="cyber-card-particles">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div class="cyber-corner-elements">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="cyber-scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillCard',
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
/* ===== CYBER CARD DESIGN ===== */
.cyber-container {
  position: relative;
  width: 100%; /* Make it responsive to parent container */
  max-width: 190px; /* Keep max width for desktop */
  height: 230px; /* Reduced from 254px for compact design */
  transition: 200ms;
  margin: 0 auto;
  /* GPU acceleration for better performance */
  will-change: transform;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}

.cyber-container:active {
  max-width: 180px;
  height: 225px; /* Slightly smaller on active */
}

#cyber-card {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
  background: linear-gradient(45deg, #1a0d3a, #2d1b4e);
  border: 2px solid rgba(75, 0, 130, 0.4);
  overflow: hidden;
  box-shadow:
    0 0 20px rgba(75, 0, 130, 0.3),
    inset 0 0 20px rgba(25, 0, 51, 0.4);
}

.cyber-card-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.cyber-prompt {
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  transition: 300ms ease-in-out;
  position: absolute;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.cyber-title {
  opacity: 0;
  transition: 300ms ease-in-out;
  position: absolute;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 4px;
  text-align: center;
  width: 100%;
  padding-top: 20px;
  background: linear-gradient(45deg, #00ffaa, #00a2ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(0, 255, 170, 0.3));
  text-shadow:
    0 0 10px rgba(92, 103, 255, 0.5),
    0 0 20px rgba(92, 103, 255, 0.3);
}

.cyber-subtitle {
  display: none !important; /* Hidden on all devices */
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  /* Font size handled by font-sizes.css - using skill-percentage sizes */
  letter-spacing: 1px;
  transform: translateY(0px); /* Removed translateY for proper centering */
  color: rgba(255, 255, 255, 0.6);
  padding: 0 20px; /* Add padding to prevent text from touching edges */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.cyber-highlight {
  color: #00ffaa;
  margin-left: 5px;
  background: linear-gradient(90deg, #5c67ff, #ad51ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.cyber-glowing-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cyber-glow-1,
.cyber-glow-2,
.cyber-glow-3 {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(0, 255, 170, 0.3) 0%,
    rgba(0, 255, 170, 0) 70%
  );
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-glow-1 {
  top: -20px;
  left: -20px;
  will-change: opacity, transform;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}
.cyber-glow-2 {
  top: 50%;
  right: -30px;
  transform: translateY(-50%) translateZ(0);
  will-change: opacity, transform;
  contain: layout style paint;
  backface-visibility: hidden;
}
.cyber-glow-3 {
  bottom: -20px;
  left: 30%;
  will-change: opacity, transform;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}

.cyber-card-particles span {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #00ffaa;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  /* GPU acceleration for particle animations */
  will-change: opacity, transform;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}

/* Hover effects */
.cyber-tracker:hover ~ #cyber-card .cyber-title {
  opacity: 1;
  transform: translateY(-10px);
}

.cyber-tracker:hover ~ #cyber-card .cyber-glowing-elements div {
  opacity: 1;
}

.cyber-tracker:hover ~ #cyber-card .cyber-card-particles span {
  animation: cyber-particleFloat 3s infinite;
}

@keyframes cyber-particleFloat {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate3d(calc(var(--x, 0) * 30px), calc(var(--y, 0) * 30px), 0);
    opacity: 0;
  }
}

/* Particle positions */
.cyber-card-particles span:nth-child(1) {
  --x: 1;
  --y: -1;
  top: 40%;
  left: 20%;
}
.cyber-card-particles span:nth-child(2) {
  --x: -1;
  --y: -1;
  top: 60%;
  right: 20%;
}
.cyber-card-particles span:nth-child(3) {
  --x: 0.5;
  --y: 1;
  top: 20%;
  left: 40%;
}
.cyber-card-particles span:nth-child(4) {
  --x: -0.5;
  --y: 1;
  top: 80%;
  right: 40%;
}
.cyber-card-particles span:nth-child(5) {
  --x: 1;
  --y: 0.5;
  top: 30%;
  left: 60%;
}
.cyber-card-particles span:nth-child(6) {
  --x: -1;
  --y: 0.5;
  top: 70%;
  right: 60%;
}

#cyber-card::before {
  content: "";
  background: radial-gradient(
    circle at center,
    rgba(0, 255, 170, 0.1) 0%,
    rgba(0, 162, 255, 0.05) 50%,
    transparent 100%
  );
  filter: blur(10px);
  opacity: 0;
  width: 150%;
  height: 150%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
}

.cyber-tracker:hover ~ #cyber-card::before {
  opacity: 1;
}

.cyber-tracker {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
  /* GPU acceleration for better performance */
  will-change: transform;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}

.cyber-tracker:hover {
  cursor: pointer;
}

.cyber-tracker:hover ~ #cyber-card .cyber-prompt {
  opacity: 0;
}

.cyber-tracker:hover ~ #cyber-card {
  transition: 300ms;
  filter: brightness(1.1);
}

.cyber-container:hover #cyber-card::before {
  transition: 200ms;
  content: "";
  opacity: 80%;
}

.cyber-canvas {
  inset: 0;
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "tr-1 tr-2 tr-3 tr-4 tr-5"
    "tr-6 tr-7 tr-8 tr-9 tr-10"
    "tr-11 tr-12 tr-13 tr-14 tr-15"
    "tr-16 tr-17 tr-18 tr-19 tr-20"
    "tr-21 tr-22 tr-23 tr-24 tr-25";
}

.tr-1 { grid-area: tr-1; }
.tr-2 { grid-area: tr-2; }
.tr-3 { grid-area: tr-3; }
.tr-4 { grid-area: tr-4; }
.tr-5 { grid-area: tr-5; }
.tr-6 { grid-area: tr-6; }
.tr-7 { grid-area: tr-7; }
.tr-8 { grid-area: tr-8; }
.tr-9 { grid-area: tr-9; }
.tr-10 { grid-area: tr-10; }
.tr-11 { grid-area: tr-11; }
.tr-12 { grid-area: tr-12; }
.tr-13 { grid-area: tr-13; }
.tr-14 { grid-area: tr-14; }
.tr-15 { grid-area: tr-15; }
.tr-16 { grid-area: tr-16; }
.tr-17 { grid-area: tr-17; }
.tr-18 { grid-area: tr-18; }
.tr-19 { grid-area: tr-19; }
.tr-20 { grid-area: tr-20; }
.tr-21 { grid-area: tr-21; }
.tr-22 { grid-area: tr-22; }
.tr-23 { grid-area: tr-23; }
.tr-24 { grid-area: tr-24; }
.tr-25 { grid-area: tr-25; }

/* Tracker hover effects - 3D rotation removed for better performance */

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.cyber-card-glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 45%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 55%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0;
  transition: opacity 300ms;
}

.cyber-lines span {
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(92, 103, 255, 0.2),
    transparent
  );
  /* GPU acceleration for cyber lines */
  will-change: transform;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}

.cyber-lines span:nth-child(1) {
  top: 20%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left;
  animation: cyber-lineGrow 4s linear infinite;
}

.cyber-lines span:nth-child(2) {
  top: 40%;
  right: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: right;
  animation: cyber-lineGrow 4s linear infinite 1s;
}

.cyber-lines span:nth-child(3) {
  top: 60%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left;
  animation: cyber-lineGrow 4s linear infinite 2s;
}

.cyber-lines span:nth-child(4) {
  top: 80%;
  right: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: right;
  animation: cyber-lineGrow 4s linear infinite 1.5s;
}

.cyber-corner-elements span {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(92, 103, 255, 0.3);
}

.cyber-corner-elements span:nth-child(1) {
  top: 10px;
  left: 10px;
  border-right: 0;
  border-bottom: 0;
}

.cyber-corner-elements span:nth-child(2) {
  top: 10px;
  right: 10px;
  border-left: 0;
  border-bottom: 0;
}

.cyber-corner-elements span:nth-child(3) {
  bottom: 10px;
  left: 10px;
  border-right: 0;
  border-top: 0;
}

.cyber-corner-elements span:nth-child(4) {
  bottom: 10px;
  right: 10px;
  border-left: 0;
  border-top: 0;
}

.cyber-scan-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(92, 103, 255, 0.1),
    transparent
  );
  transform: translateY(-100%) translateZ(0);
  animation: cyber-scanMove 3s linear infinite;
  /* GPU acceleration for scan animation */
  will-change: transform;
  contain: layout style paint;
  backface-visibility: hidden;
}

@keyframes cyber-lineGrow {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  50% {
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    transform: scaleX(0);
    opacity: 0;
  }
}

@keyframes cyber-scanMove {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

#cyber-card:hover .cyber-card-glare {
  opacity: 1;
}

.cyber-corner-elements span {
  transition: all 0.3s ease;
}

#cyber-card:hover .cyber-corner-elements span {
  border-color: rgba(92, 103, 255, 0.8);
  box-shadow: 0 0 10px rgba(92, 103, 255, 0.5);
}

/* ===== CYBER SKILL ELEMENTS ===== */
.cyber-skill-icon {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  width: 105px;
  height: 105px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border: 2px solid rgba(0, 255, 170, 0.3);
  transition: all 0.3s ease;
  /* GPU acceleration for icons */
  will-change: transform, filter;
  contain: layout style paint;
  backface-visibility: hidden;
}

.cyber-skill-icon img {
  width: 65px;
  height: 65px;
  filter: brightness(1.2) contrast(1.1);
  /* GPU acceleration for icons */
  will-change: transform, filter;
  transform: translateZ(0);
  contain: layout style paint;
  backface-visibility: hidden;
}

.cyber-skill-name {
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  /* Font size handled by font-sizes.css */
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  z-index: 10;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
  padding: 0 10px;
  max-width: 170px;
  line-height: 1.1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  hyphens: auto;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: keep-all;
}


.cyber-subtitle {
  /* Font size handled by font-sizes.css */
}

.cyber-progress-container {
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: calc(100% - 40px);
}

.cyber-progress-bar-bg {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 170, 0.2);
  max-width: 120px;
}

.cyber-progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffaa 0%, #00a2ff 100%);
  border-radius: 10px;
  transition: width 0.8s ease;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
}

.cyber-progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: cyber-shimmer 3s infinite;
}

@keyframes cyber-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.cyber-skill-percentage {
  color: #00ffaa;
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 30px;
  text-shadow: 0 0 5px rgba(0, 255, 170, 0.5);
  text-align: center;
}

/* Hover effects for skill elements */
.cyber-tracker:hover ~ #cyber-card .cyber-skill-icon {
  transform: translateX(-50%) scale(1.1);
  border-color: rgba(0, 255, 170, 0.8);
  box-shadow: 0 0 20px rgba(0, 255, 170, 0.5);
}

/*--------------------------------------------------------------
# RESPONSIVE ICON CIRCLE SIZING
# Prevents circle overflow at breakpoint limits
--------------------------------------------------------------*/

/* Extra extra large devices (1400px and up) - 8 cards, narrowest */
@media (min-width: 1400px) {
  .cyber-skill-icon {
    width: 95px;
    height: 95px;
  }
  
  .cyber-skill-icon img {
    width: 60px;
    height: 60px;
  }
}

/* Extra large devices (1200px and up) - 7 cards */
@media (min-width: 1200px) and (max-width: 1399px) {
  .cyber-skill-icon {
    width: 100px;
    height: 100px;
  }
  
  .cyber-skill-icon img {
    width: 62px;
    height: 62px;
  }
}

/* Large devices (992px and up) - 6 cards, narrowest */
@media (min-width: 992px) and (max-width: 1199px) {
  .cyber-skill-icon {
    width: 98px;
    height: 98px;
  }
  
  .cyber-skill-icon img {
    width: 61px;
    height: 61px;
  }
}

/* Medium devices (768px and up) - 5 cards */
@media (min-width: 768px) and (max-width: 991px) {
  .cyber-skill-icon {
    width: 102px;
    height: 102px;
  }
  
  .cyber-skill-icon img {
    width: 63px;
    height: 63px;
  }
}

/* Small devices (576px and up) - 4 cards, narrowest */
@media (min-width: 576px) and (max-width: 767px) {
  .cyber-skill-icon {
    width: 100px;
    height: 100px;
  }
  
  .cyber-skill-icon img {
    width: 62px;
    height: 62px;
  }
}

/* Extra small devices (480px and up) - 3 cards */
@media (min-width: 480px) and (max-width: 575px) {
  .cyber-skill-icon {
    width: 103px;
    height: 103px;
  }
  
  .cyber-skill-icon img {
    width: 64px;
    height: 64px;
  }
}

/* Ultra small devices (320px and up) - 2 cards, narrowest */
@media (min-width: 320px) and (max-width: 479px) {
  .cyber-skill-icon {
    width: 105px;
    height: 105px;
  }
  
  .cyber-skill-icon img {
    width: 65px;
    height: 65px;
  }
}

.cyber-tracker:hover ~ #cyber-card .cyber-skill-name {
  color: #00ffaa;
  text-shadow: 0 0 15px rgba(0, 255, 170, 0.8);
}

.cyber-tracker:hover ~ #cyber-card .cyber-progress-bar-fill {
  box-shadow: 0 0 15px rgba(0, 255, 170, 0.8);
}

/* Responsive adjustments - Subtitle hidden on all devices now */
</style>
