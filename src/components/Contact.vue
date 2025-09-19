<template>
  <section id="contact" class="contact section">
    <div class="container" data-aos="fade" data-aos-delay="100">
      
      <!-- Contact Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); padding: 10px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -10px -10px 30px -10px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
              <h3 style="color: white; margin: 0; font-weight: 700; text-align: center;">📞 Get In Touch</h3>
            </div>

            <!-- Card Body -->
            <div class="card-body" style="padding: 0;">
              <div class="row gy-4">
                
                <!-- Contact Info Cards -->
                
                <!-- Location Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-info-card location-card" data-aos="fade-up" data-aos-delay="200" @mouseover="handleCardHover" @mouseout="handleCardLeave">
                    <div class="info-card-icon">
                      <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    <div class="info-card-content">
                      <h4>📍 Location</h4>
                      <p>Selangor, Malaysia</p>
                      <span class="info-card-subtitle">Available for remote work worldwide</span>
                    </div>
                    <div class="info-card-glow"></div>
                  </div>
                </div>

                <!-- Phone Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <a href="tel:+60146806067" class="contact-link">
                  <div class="contact-info-card phone-card" data-aos="fade-up" data-aos-delay="300" @mouseover="handleCardHover" @mouseout="handleCardLeave">
                    <div class="info-card-icon">
                      <i class="bi bi-telephone-fill"></i>
                    </div>
                    <div class="info-card-content">
                      <h4>📞 Call Me</h4>
                      <p>+60146806067</p>
                      <span class="info-card-subtitle">Available 9 AM - 6 PM (MYT)</span>
                    </div>
                    <div class="info-card-glow"></div>
                  </div>
                  </a>
                </div>

                <!-- Email Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <a href="mailto:devwithwaqas@gmail.com" class="contact-link">
                  <div class="contact-info-card email-card" data-aos="fade-up" data-aos-delay="400" @mouseover="handleCardHover" @mouseout="handleCardLeave">
                    <div class="info-card-icon">
                      <i class="bi bi-envelope-fill"></i>
                    </div>
                    <div class="info-card-content">
                        <h4>📧 Email Me</h4>
                      <p>devwithwaqas@gmail.com</p>
                      <span class="info-card-subtitle">I'll respond within 24 hours</span>
                    </div>
                    <div class="info-card-glow"></div>
                  </div>
                  </a>
                </div>

                <!-- WhatsApp Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <a href="https://wa.me/60146806067" target="_blank" class="contact-link">
                  <div class="contact-info-card whatsapp-card" data-aos="fade-up" data-aos-delay="500" @mouseover="handleCardHover" @mouseout="handleCardLeave">
                    <div class="info-card-icon">
                      <i class="bi bi-whatsapp"></i>
                    </div>
                    <div class="info-card-content">
                      <h4>💬 WhatsApp</h4>
                        <p>+60146806067</p>
                        <span class="info-card-subtitle">Quick chat and voice calls</span>
                    </div>
                    <div class="info-card-glow"></div>
                  </div>
                  </a>
                </div>

              </div>
                    
              <!-- Clean Contact Form -->
              <div class="row mt-4">
                <div class="col-lg-12">
                  <div class="clean-form-container" data-aos="fade-up" data-aos-delay="600">
                    <form @submit.prevent="submitForm" class="clean-form" novalidate>
                      
                      <!-- Form Header -->
                    <div class="form-header">
                        <div class="header-icon-wrapper">
                          <svg class="header-envelope-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                        <h3 class="form-title">Send Me a Message</h3>
                        <p class="form-subtitle">💬 Let's discuss your project and bring your ideas to life! 🚀</p>
                    </div>
                    
                      <!-- Form Fields -->
                      <div class="form-row">
                        <div class="form-group">
                          <div class="input-wrapper">
                            <i class="fas fa-user input-icon"></i>
                            <input 
                              type="text" 
                              name="name" 
                              class="form-input" 
                              id="name" 
                              placeholder="Your Name" 
                              v-model="formData.name"
                              @input="clearValidationError('name')"
                              required
                              novalidate
                            >
                          </div>
                          <div v-if="validationErrors.name" class="validation-message">{{ validationErrors.name }}</div>
                        </div>
                        <div class="form-group">
                          <div class="input-wrapper">
                            <i class="fas fa-envelope input-icon"></i>
                            <input 
                              type="email" 
                              class="form-input" 
                              name="email" 
                              id="email" 
                              placeholder="Your Email" 
                              v-model="formData.email"
                              @input="clearValidationError('email')"
                              required
                              novalidate
                            >
                          </div>
                          <div v-if="validationErrors.email" class="validation-message">{{ validationErrors.email }}</div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <div class="input-wrapper">
                          <i class="fas fa-tag input-icon"></i>
                          <input 
                            type="text" 
                            class="form-input" 
                            name="subject" 
                            id="subject" 
                            placeholder="Subject" 
                            v-model="formData.subject"
                            @input="clearValidationError('subject')"
                            required
                            novalidate
                          >
                        </div>
                        <div v-if="validationErrors.subject" class="validation-message">{{ validationErrors.subject }}</div>
                      </div>
                      
                      <div class="form-group">
                        <div class="input-wrapper">
                          <i class="fas fa-comment-dots input-icon"></i>
                          <textarea 
                            class="form-textarea"
                            name="message"
                            id="message"
                            placeholder="Tell me about your project..."
                            v-model="formData.message"
                            @input="clearValidationError('message')"
                            required
                            novalidate
                          ></textarea>
                          </div>
                        <div v-if="validationErrors.message" class="validation-message">{{ validationErrors.message }}</div>
                      </div>
                      
                      <div class="form-submit">
                        <button type="submit" class="submit-btn">
                          <i class="fas fa-paper-plane"></i>
                          Send Message
                        </button>
                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      validationErrors: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  mounted() {
    this.setupScrollAnimations()
  },
  methods: {
    setupScrollAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log('Element intersecting:', entry.target.className)
            if (entry.target.classList.contains('location-card')) {
              entry.target.classList.add('contact-card-animate')
              console.log('Added animation to location card')
            } else if (entry.target.classList.contains('phone-card')) {
              entry.target.classList.add('contact-card-animate')
              console.log('Added animation to phone card')
            } else if (entry.target.classList.contains('email-card')) {
              entry.target.classList.add('contact-card-animate')
              console.log('Added animation to email card')
            } else if (entry.target.classList.contains('whatsapp-card')) {
              entry.target.classList.add('contact-card-animate')
              console.log('Added animation to whatsapp card')
            } else if (entry.target.classList.contains('clean-form-container')) {
              entry.target.classList.add('contact-form-animate')
              console.log('Added animation to clean form container')
            }
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      // Wait for DOM to be ready
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.location-card, .phone-card, .email-card, .whatsapp-card, .clean-form-container')
        console.log('Found cards:', cards.length)
        cards.forEach(card => {
          console.log('Observing card:', card.className)
          observer.observe(card)
        })
      })
    },
    handleCardHover(event) {
      const card = event.currentTarget
      card.style.transform = 'translateY(-5px) scale(1.02)'
    },
    handleCardLeave(event) {
      const card = event.currentTarget
      card.style.transform = 'translateY(0) scale(1)'
    },
    clearValidationError(field) {
      if (this.validationErrors[field]) {
        this.validationErrors[field] = ''
      }
    },
    validateForm() {
      this.validationErrors = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      
      let isValid = true
      
      // Validate name
      if (!this.formData.name.trim()) {
        this.validationErrors.name = 'Name is required'
        isValid = false
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.formData.email.trim()) {
        this.validationErrors.email = 'Email is required'
        isValid = false
      } else if (!emailRegex.test(this.formData.email)) {
        this.validationErrors.email = 'Please enter a valid email'
        isValid = false
      }
      
      // Validate subject
      if (!this.formData.subject.trim()) {
        this.validationErrors.subject = 'Subject is required'
        isValid = false
      }
      
      // Validate message
      if (!this.formData.message.trim()) {
        this.validationErrors.message = 'Message is required'
        isValid = false
      }
      
      return isValid
    },
    
    submitForm() {
      if (!this.validateForm()) {
        // Show custom validation messages
        return
      }
      
      // Handle form submission
      console.log('Form submitted:', this.formData)
      
      // Here you would typically send the data to your backend
      // For now, just show a success message
      alert('Message sent successfully! I\'ll get back to you soon.')
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      
      this.validationErrors = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
/* Contact Info Cards */
.contact-info-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 25px 20px;
  text-align: center;
  height: 200px; /* Fixed height for equal card heights */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-info-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.info-card-icon {
  /* Font size handled by font-sizes.css */
  margin-bottom: 15px;
  color: #fff;
}

.info-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
}

.info-card-content h4 {
  color: #fff;
  /* Font size handled by font-sizes.css */
  font-weight: 600;
  margin-bottom: 8px;
}

.info-card-content p {
  color: rgba(255, 255, 255, 0.9);
  /* Font size handled by font-sizes.css */
  margin-bottom: 5px;
  font-weight: 500;
}

.info-card-subtitle {
  color: rgba(255, 255, 255, 0.7);
  /* Font size handled by font-sizes.css */
  font-style: italic;
}

.info-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-info-card:hover .info-card-glow {
  opacity: 1;
}

/* Contact Links */
.contact-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.contact-link:hover {
  text-decoration: none;
  color: inherit;
}

/* Location Card - Dark Indigo to Medium Purple Gradient */
.location-card {
  background: linear-gradient(135deg, rgba(25, 42, 86, 0.9) 0%, rgba(63, 81, 181, 0.8) 50%, rgba(103, 58, 183, 0.7) 100%);
  border: 2px solid rgba(63, 81, 181, 0.6);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.location-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.location-card:hover::before {
  left: 100%;
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(25, 42, 86, 0.4);
}

.location-card .info-card-icon {
  color: #A5D6A7 !important;
  /* Font size handled by font-sizes.css */
  text-shadow: 0 0 10px rgba(165, 214, 167, 0.5) !important;
  position: relative;
  z-index: 1;
}

/* Phone Card - Very Dark Blue to Medium Blue Gradient */
.phone-card {
  background: linear-gradient(135deg, rgba(5, 30, 70, 0.9) 0%, rgba(13, 71, 161, 0.8) 50%, rgba(33, 150, 243, 0.7) 100%);
  border: 2px solid rgba(33, 150, 243, 0.6);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.phone-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.phone-card:hover::before {
  left: 100%;
}

.phone-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(5, 30, 70, 0.4);
}

.phone-card .info-card-icon {
  color: #90CAF9 !important;
  /* Font size handled by font-sizes.css */
  text-shadow: 0 0 10px rgba(144, 202, 249, 0.5) !important;
  position: relative;
  z-index: 1;
}

/* Email Card - Very Dark Orange to Medium Orange Gradient */
.email-card {
  background: linear-gradient(135deg, rgba(120, 40, 0, 0.9) 0%, rgba(230, 81, 0, 0.8) 50%, rgba(255, 152, 0, 0.7) 100%);
  border: 2px solid rgba(255, 152, 0, 0.6);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.email-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.email-card:hover::before {
  left: 100%;
}

.email-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(120, 40, 0, 0.4);
}

.email-card .info-card-icon {
  color: #FFCC02 !important;
  /* Font size handled by font-sizes.css */
  text-shadow: 0 0 10px rgba(255, 204, 2, 0.5) !important;
  position: relative;
  z-index: 1;
}

/* WhatsApp Card - Very Dark Green to Medium Green Gradient */
.whatsapp-card {
  background: linear-gradient(135deg, rgba(8, 50, 20, 0.9) 0%, rgba(19, 115, 51, 0.8) 50%, rgba(37, 211, 102, 0.7) 100%);
  border: 2px solid rgba(37, 211, 102, 0.6);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.whatsapp-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.whatsapp-card:hover::before {
  left: 100%;
}

.whatsapp-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(8, 50, 20, 0.4);
}

.whatsapp-card .info-card-icon {
  color: #81C784 !important;
  /* Font size handled by font-sizes.css */
  text-shadow: 0 0 10px rgba(129, 199, 132, 0.5) !important;
  position: relative;
  z-index: 1;
}


/* ===== CLEAN CONTACT FORM ===== */

/* Form Container */
.clean-form-container {
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.clean-form-container.contact-form-animate {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Main Form */
.clean-form {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
  border: 2px solid rgba(102, 126, 234, 0.25);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(102, 126, 234, 0.15),
    0 3px 8px rgba(118, 75, 162, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.clean-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.02) 50%, rgba(102, 126, 234, 0.01) 100%);
  border-radius: 20px;
  z-index: 0;
}

.clean-form::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 22px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.clean-form:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 12px 25px rgba(102, 126, 234, 0.2),
    0 5px 12px rgba(118, 75, 162, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border-color: rgba(102, 126, 234, 0.4);
}

.clean-form:hover::after {
  opacity: 1;
}

/* Form Header */
.form-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  padding: 35px 20px;
  overflow: hidden;
}

/* Header Icon Wrapper */
.header-icon-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-envelope-icon {
  width: 3.5rem;
  height: 3.5rem;
  color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  animation: envelopeIconFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.2));
  position: relative;
}

.header-envelope-icon::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 50%;
  z-index: -1;
  animation: envelopeIconGlow 2s ease-in-out infinite alternate;
}

@keyframes envelopeIconFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(1deg);
  }
}

@keyframes envelopeIconGlow {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.form-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* Font size handled by font-sizes.css */
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(102, 126, 234, 0.2);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.form-subtitle {
  color: #555;
  /* Font size handled by font-sizes.css */
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Form Layout */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

/* Input Wrapper */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  color: #667eea;
  /* Font size handled by font-sizes.css */
  z-index: 3;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  padding: 8px;
  border-radius: 8px;
  box-shadow: 
    0 3px 12px rgba(102, 126, 234, 0.15),
    0 1px 4px rgba(118, 75, 162, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.input-wrapper:focus-within .input-icon {
  color: #5a6fd8;
  transform: scale(1.1) rotate(5deg);
  box-shadow: 
    0 4px 16px rgba(102, 126, 234, 0.25),
    0 2px 8px rgba(118, 75, 162, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border-color: rgba(102, 126, 234, 0.3);
}

/* Form Inputs */
.form-input,
.form-textarea {
  width: 100%;
  background: #fff;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 15px 20px 15px 60px;
  color: #333;
  /* Font size handled by font-sizes.css */
  transition: all 0.3s ease;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 
    0 0 0 3px rgba(102, 126, 234, 0.2),
    0 0 20px rgba(102, 126, 234, 0.3),
    0 4px 12px rgba(102, 126, 234, 0.1);
  background: rgba(255, 255, 255, 1);
  animation: inputGlow 2s ease-in-out infinite alternate;
}

@keyframes inputGlow {
  0% {
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.2),
      0 0 20px rgba(102, 126, 234, 0.3),
      0 4px 12px rgba(102, 126, 234, 0.1);
  }
  100% {
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.3),
      0 0 30px rgba(102, 126, 234, 0.5),
      0 4px 12px rgba(102, 126, 234, 0.1);
  }
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #999;
  font-weight: 400;
}

.form-textarea {
  min-height: 120px;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
  overflow-y: auto;
}

/* Submit Button */
.form-submit {
  text-align: center;
  margin-top: 30px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 15px 35px;
  color: white;
  /* Font size handled by font-sizes.css */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 
    0 8px 25px rgba(102, 126, 234, 0.3),
    0 4px 12px rgba(118, 75, 162, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 12px 35px rgba(102, 126, 234, 0.4),
    0 6px 20px rgba(118, 75, 162, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.submit-btn:active {
  transform: translateY(-1px) scale(0.98);
  box-shadow: 
    0 6px 20px rgba(102, 126, 234, 0.3),
    0 3px 10px rgba(118, 75, 162, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.submit-btn i {
  /* Font size handled by font-sizes.css */
}

/* Autofill Styling */
.form-input:-webkit-autofill,
.form-input:-webkit-autofill:hover,
.form-input:-webkit-autofill:focus,
.form-input:-webkit-autofill:active,
.form-textarea:-webkit-autofill,
.form-textarea:-webkit-autofill:hover,
.form-textarea:-webkit-autofill:focus,
.form-textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
  box-shadow: 0 0 0 1000px #fff inset !important;
  -webkit-text-fill-color: #333 !important;
  background: #fff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

/* Custom Required Field Validation Styling */
.form-input:invalid:not(:placeholder-shown),
.form-textarea:invalid:not(:placeholder-shown) {
  border-color: #667eea !important;
  box-shadow: 
    0 0 0 3px rgba(102, 126, 234, 0.1),
    0 4px 12px rgba(102, 126, 234, 0.1) !important;
}

.form-input:invalid:not(:placeholder-shown)::after,
.form-textarea:invalid:not(:placeholder-shown)::after {
  content: '\f071';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  /* Font size handled by font-sizes.css */
  z-index: 4;
  text-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%, 100% { 
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  50% { 
    opacity: 0.7;
    transform: translateY(-50%) scale(1.1);
  }
}

/* Custom validation message styling */
.validation-message {
  display: block;
  color: #dc3545;
  /* Font size handled by font-sizes.css */
  margin-top: 8px;
  padding: 10px 14px;
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(255, 107, 107, 0.08) 100%);
  border: 2px solid rgba(220, 53, 69, 0.4);
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 
    0 0 0 2px rgba(220, 53, 69, 0.2),
    0 0 15px rgba(220, 53, 69, 0.3),
    0 4px 12px rgba(220, 53, 69, 0.1);
  position: relative;
  animation: errorSlideIn 0.4s ease, errorGlow 2s ease-in-out infinite alternate;
}

.validation-message::before {
  content: '\f071';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  margin-right: 8px;
  color: #dc3545;
  /* Font size handled by font-sizes.css */
  text-shadow: 0 0 8px rgba(220, 53, 69, 0.5);
  animation: errorIconPulse 1.5s ease-in-out infinite;
}

@keyframes errorSlideIn {
  from {
    opacity: 0;
    transform: translateY(-15px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes errorGlow {
  0% {
    box-shadow: 
      0 0 0 2px rgba(220, 53, 69, 0.2),
      0 0 15px rgba(220, 53, 69, 0.3),
      0 4px 12px rgba(220, 53, 69, 0.1);
    border-color: rgba(220, 53, 69, 0.4);
  }
  100% {
    box-shadow: 
      0 0 0 3px rgba(220, 53, 69, 0.3),
      0 0 25px rgba(220, 53, 69, 0.5),
      0 4px 12px rgba(220, 53, 69, 0.1);
    border-color: rgba(220, 53, 69, 0.6);
  }
}

@keyframes errorIconPulse {
  0%, 100% {
    transform: scale(1);
    text-shadow: 0 0 8px rgba(220, 53, 69, 0.5);
  }
  50% {
    transform: scale(1.1);
    text-shadow: 0 0 12px rgba(220, 53, 69, 0.7);
  }
}

/* Scroll-triggered animations */
.contact-card-animate {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.contact-form-animate {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* Staggered animation delays */
.location-card.contact-card-animate {
  transition-delay: 0.1s;
}

.phone-card.contact-card-animate {
  transition-delay: 0.2s;
}

.email-card.contact-card-animate {
  transition-delay: 0.3s;
}

.whatsapp-card.contact-card-animate {
  transition-delay: 0.4s;
}

.innovative-form-container.contact-form-animate {
  transition-delay: 0.5s;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-info-card {
    height: 180px; /* Fixed height for equal card heights */
    padding: 20px 15px;
  }
  
  .info-card-icon {
    /* Font size handled by font-sizes.css */
  }
  
  .info-card-content h4 {
    /* Font size handled by font-sizes.css */
  }
  
  /* Removed conflicting font size rules - now handled globally */
  
  .clean-form {
    padding: 25px;
  }
  
  .header-envelope-icon {
    width: 2.8rem;
    height: 2.8rem;
  }
  
  .form-title {
    /* Font size handled by font-sizes.css */
    flex-direction: column;
    gap: 5px;
  }
  
  .form-subtitle {
    /* Font size now handled globally - reduced by 30% */
    flex-direction: column;
    gap: 5px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .form-input,
  .form-textarea {
    padding: 12px 15px 12px 55px;
    /* Removed conflicting font size rules - now handled globally */
  }
  
  .input-icon {
    left: 12px;
    padding: 6px;
    /* Font size handled by font-sizes.css */
  }
  
  .submit-btn {
    padding: 12px 25px;
    /* Removed conflicting font size rules - now handled globally */
  }
}

@media (max-width: 480px) {
  .contact-info-card {
    height: 160px; /* Fixed height for equal card heights */
    padding: 15px 10px;
  }
  
  .info-card-icon {
    /* Font size handled by font-sizes.css */
  }
  
  .info-card-content h4 {
    /* Font size handled by font-sizes.css */
  }
  
  /* Removed conflicting font size rules - now handled globally */
  
  .clean-form {
    padding: 20px;
    border-radius: 15px;
  }
  
  .header-envelope-icon {
    width: 2.2rem;
    height: 2.2rem;
  }
  
  .form-title {
    /* Font size handled by font-sizes.css */
    flex-direction: column;
    gap: 3px;
  }
  
  .form-subtitle {
    /* Removed conflicting font size rules - now handled globally */
    flex-direction: column;
    gap: 3px;
  }
  
  .form-input,
  .form-textarea {
    padding: 10px 12px 10px 50px;
    /* Removed conflicting font size rules - now handled globally */
  }
  
  .input-icon {
    left: 10px;
    padding: 5px;
    /* Font size handled by font-sizes.css */
  }
  
  .submit-btn {
    padding: 10px 20px;
    /* Removed conflicting font size rules - now handled globally */
  }
}
</style>