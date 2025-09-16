<template>
  <section id="hero" class="hero section light-background">
    <img src="/assets/img/melaka-straits-mosque-banner.jpg" alt="Melaka Straits Mosque Banner" style="opacity: 0.9;">
    
    <div class="container" data-aos="zoom-out">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <h2>Waqas Ahmad</h2>
          <p>I'm <span class="typed" data-typed-items="Senior Software Engineer, Technical Lead, Full Stack Developer, Azure Cloud Expert, Microservices Architect, API Development Specialist, DevOps Engineer, Enterprise Solution Architect">Senior Software Engineer</span><span class="typed-cursor typed-cursor--blink" aria-hidden="true"></span></p>
          <p class="hero-subtitle">🚀 Crafting Scalable Microservices | 🔌 Building Robust APIs | ☁️ Azure Cloud Solutions | ⚡ DevOps Excellence</p>
          <div class="social-links">
            <a href="#"><i class="bi bi-twitter-x"></i></a>
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  mounted() {
    // Wait for DOM to be ready and Typed.js to be loaded
    this.$nextTick(() => {
      setTimeout(() => {
        if (typeof Typed !== 'undefined') {
          const typedElement = document.querySelector('.typed')
          if (typedElement && !typedElement.typed) {
            new Typed('.typed', {
              strings: [
                'Senior Software Engineer',
                'Technical Lead',
                'Full Stack Developer',
                'Azure Cloud Expert',
                'Microservices Architect',
                'API Development Specialist',
                'DevOps Engineer',
                'Enterprise Solution Architect'
              ],
              typeSpeed: 100,
              backSpeed: 50,
              backDelay: 2000,
              loop: true
            })
          }
        }
      }, 100)
    })
  }
}
</script>
