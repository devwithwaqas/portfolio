<template>
  <section id="contact" class="contact section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Contact Card -->
      <ReusableCard 
        title="Get In Touch" 
        icon="📞"
        body-padding="0"
      >
              <div class="row gy-4 justify-content-center">
                
                <!-- Location Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-item">
                    <div class="parent">
                      <div class="card location-card" :class="{ 'contact-card-animate': cardAnimations['card-0'] }">
                        <div class="logo">
                          <span class="circle circle1"></span>
                          <span class="circle circle2"></span>
                          <span class="circle circle3"></span>
                          <span class="circle circle4"></span>
                          <span class="circle circle5">
                      <i class="bi bi-geo-alt-fill"></i>
                          </span>
                        </div>
                        <div class="glass"></div>
                        <div class="content">
                          <span class="title">📍 Location</span>
                          <span class="text">{{ location }}</span>
                          <span class="subtitle">Available for remote work worldwide</span>
                        </div>
                        <div class="bottom">
                          <div class="social-buttons-container">
                            <button class="social-button social-button1">
                              <i class="bi bi-geo-alt"></i>
                            </button>
                          </div>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>

                <!-- Phone Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-item">
                    <a :href="contactLinks.phone" class="contact-link">
                      <div class="parent">
                        <div class="card phone-card" :class="{ 'contact-card-animate': cardAnimations['card-1'] }">
                          <div class="logo">
                            <span class="circle circle1"></span>
                            <span class="circle circle2"></span>
                            <span class="circle circle3"></span>
                            <span class="circle circle4"></span>
                            <span class="circle circle5">
                      <i class="bi bi-telephone-fill"></i>
                            </span>
                          </div>
                          <div class="glass"></div>
                          <div class="content">
                            <span class="title">📞 Phone</span>
                            <span class="text">{{ phone }}</span>
                            <span class="subtitle">Call me anytime</span>
                          </div>
                          <div class="bottom">
                            <div class="social-buttons-container">
                              <button class="social-button social-button1">
                                <i class="bi bi-telephone"></i>
                              </button>
                            </div>
                          </div>
                    </div>
                    </div>
                    </a>
                  </div>
                </div>

                <!-- Email Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-item">
                    <a :href="contactLinks.email" class="contact-link">
                      <div class="parent">
                        <div class="card email-card" :class="{ 'contact-card-animate': cardAnimations['card-2'] }">
                          <div class="logo">
                            <span class="circle circle1"></span>
                            <span class="circle circle2"></span>
                            <span class="circle circle3"></span>
                            <span class="circle circle4"></span>
                            <span class="circle circle5">
                      <i class="bi bi-envelope-fill"></i>
                            </span>
                          </div>
                          <div class="glass"></div>
                          <div class="content">
                            <span class="title">✉️ Email</span>
                            <span class="text">{{ email }}</span>
                            <span class="subtitle">Send me a message</span>
                          </div>
                          <div class="bottom">
                            <div class="social-buttons-container">
                              <button class="social-button social-button1">
                                <i class="bi bi-envelope"></i>
                              </button>
                            </div>
                          </div>
                    </div>
                    </div>
                    </a>
                  </div>
                </div>

                <!-- WhatsApp Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-item">
                    <a :href="contactLinks.whatsapp" class="contact-link">
                      <div class="parent">
                        <div class="card whatsapp-card" :class="{ 'contact-card-animate': cardAnimations['card-3'] }">
                          <div class="logo">
                            <span class="circle circle1"></span>
                            <span class="circle circle2"></span>
                            <span class="circle circle3"></span>
                            <span class="circle circle4"></span>
                            <span class="circle circle5">
                              <i class="bi bi-whatsapp"></i>
                            </span>
                          </div>
                          <div class="glass"></div>
                          <div class="content">
                            <span class="title">💬 WhatsApp</span>
                            <span class="text">{{ phone }}</span>
                            <span class="subtitle">Chat me on WhatsApp</span>
                          </div>
                          <div class="bottom">
                            <div class="social-buttons-container">
                              <button class="social-button social-button1">
                      <i class="bi bi-whatsapp"></i>
                              </button>
                            </div>
                          </div>
                    </div>
                    </div>
                    </a>
                  </div>
                </div>

                <!-- Contact Form -->
                <div class="col-12">
                  <div class="contact-form-wrapper">
                    <div class="clean-form-container" :class="{ 'contact-form-animate': cardAnimations['card-4'] }" data-aos="fade-up" data-aos-delay="600">
                      <form @submit.prevent="submitForm" class="clean-form" novalidate>
                        
                        <!-- Form Header -->
                    <div class="form-header">
                          <h3 class="form-title">Let's Build Something Amazing Together! 🚀</h3>
                          <p class="form-subtitle">Share your vision, I will bring it to life! 👨‍💻✨</p>
                    </div>
                    
                        <div class="row g-3">
                          <!-- Name Field -->
                          <div class="col-md-6">
                            <div class="form-field-group">
                              <label for="name" class="form-label">💼 Name <span class="required">*</span></label>
                              <input 
                                v-model="formData.name" 
                                type="text" 
                                id="name" 
                                name="name" 
                                class="form-control"
                                :class="{ 'is-invalid': validationErrors.name }"
                                placeholder="Your full name"
                                required 
                              />
                              <div v-if="validationErrors.name" class="invalid-feedback">{{ validationErrors.name }}</div>
                            </div>
                          </div>

                          <!-- Email Field -->
                          <div class="col-md-6">
                            <div class="form-field-group">
                              <label for="email" class="form-label">📧 Email <span class="required">*</span></label>
                              <input 
                                v-model="formData.email" 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="form-control"
                                :class="{ 'is-invalid': validationErrors.email }"
                                placeholder="your.email@example.com"
                                required 
                              />
                              <div v-if="validationErrors.email" class="invalid-feedback">{{ validationErrors.email }}</div>
                        </div>
                          </div>

                          <!-- Subject Field -->
                          <div class="col-12">
                            <div class="form-field-group">
                              <label for="subject" class="form-label">🏷️ Subject <span class="required">*</span></label>
                              <input 
                                v-model="formData.subject" 
                                type="text" 
                                id="subject" 
                                name="subject" 
                                class="form-control"
                                :class="{ 'is-invalid': validationErrors.subject }"
                                placeholder="What's this about?"
                                required 
                              />
                              <div v-if="validationErrors.subject" class="invalid-feedback">{{ validationErrors.subject }}</div>
                        </div>
                      </div>
                      
                          <!-- Message Field -->
                          <div class="col-12">
                            <div class="form-field-group">
                              <label for="message" class="form-label">💭 Message <span class="required">*</span></label>
                              <textarea 
                                v-model="formData.message" 
                                id="message" 
                                name="message" 
                                class="form-control"
                                :class="{ 'is-invalid': validationErrors.message }"
                                placeholder="Tell me about your project, requirements, timeline, or anything else you'd like to discuss..."
                                rows="5"
                                required
                              ></textarea>
                              <div v-if="validationErrors.message" class="invalid-feedback">{{ validationErrors.message }}</div>
                        </div>
                      </div>
                      
                          <!-- Submit Button -->
                          <div class="col-12">
                            <div class="epic-buttons">
                              <button type="submit" class="button submit-btn" :disabled="isLoading">
                                <span v-if="!isLoading" class="button_lg">
                                  <span class="button_sl"></span>
                                  <span class="button_text">Send Message</span>
                                </span>
                                <span v-else class="button_lg button-loading">
                                  <span class="button_sl"></span>
                                  <span class="button_text">Sending...</span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- Success Message -->
                        <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
                          <i class="bi bi-check-circle"></i> {{ successMessage }}
                      </div>
                      
                        <!-- Error Message -->
                        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
                          <i class="bi bi-exclamation-triangle"></i> {{ errorMessage }}
                      </div>
                    </form>
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
import { APP_CONFIG, COMPONENT_DEFAULTS, ANIMATION_CONFIG } from '../config/constants.js'

export default {
  name: 'Contact',
  components: {
    ReusableCard
  },
  data() {
    return {
      ...APP_CONFIG,
      contactLinks: APP_CONFIG.contactLinks,
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
      },
      isLoading: false,
      successMessage: '',
      errorMessage: '',
      cardAnimations: {
        'card-0': false, // location-card
        'card-1': false, // phone-card
        'card-2': false, // email-card
        'card-3': false, // whatsapp-card
        'card-4': false  // clean-form-container
      }
    }
  },
  mounted() {
    this.setupScrollAnimations()
  },
  methods: {
    setupScrollAnimations() {
      const config = ANIMATION_CONFIG.scrollAnimations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardIndex = entry.target.dataset.cardId
            if (cardIndex && cardIndex in this.cardAnimations) {
              // Use requestAnimationFrame to avoid forced reflows
              window.requestAnimationFrame(() => {
                this.cardAnimations[cardIndex] = true
              })
            }
            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      })

      this.$nextTick(() => {
        const cardTypes = ['location-card', 'phone-card', 'email-card', 'whatsapp-card', 'clean-form-container']
        cardTypes.forEach(selector => {
          this.$el.querySelectorAll(selector).forEach((card, index) => {
            card.dataset.cardId = `card-${index}`
            observer.observe(card)
          })
        })
      })
    },
    handleCardHover(event) {
      // Add any hover effects if needed
    },
    async submitForm() {
      this.clearMessages()
      if (this.validateForm()) {
        this.isLoading = true
        try {
          // Simulate form submission - replace with actual implementation
          await new Promise(resolve => setTimeout(resolve, 2000))
          this.successMessage = 'Message sent successfully! I\'ll get back to you soon 🎉'
          this.formData = { name: '', email: '', subject: '', message: '' }
        } catch (error) {
          this.errorMessage = 'Oops! Something went wrong. Please try again later.'
        } finally {
          this.isLoading = false
        }
      }
    },
    validateForm() {
      this.validationErrors = {}
      let isValid = true

      if (!this.formData.name.trim()) {
        this.validationErrors.name = 'Name is required'
        isValid = false
      }
      if (!this.formData.email.trim() || !this.isValidEmail(this.formData.email)) {
        this.validationErrors.email = 'Valid email is required'
        isValid = false
      }
      if (!this.formData.subject.trim()) {
        this.validationErrors.subject = 'Subject is required'
        isValid = false
      }
      if (!this.formData.message.trim()) {
        this.validationErrors.message = 'Message is required'
        isValid = false
      }

      return isValid
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    clearMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    }
  }
}
</script>

<style scoped>
/* Contact Card Body */
.contact-item {
  width: 100%;
  padding: 10px;
  height: 220px; /* Increased height to prevent icon cutting */
  min-height: 220px; /* Increased consistent fixed height */
  margin-bottom: 20px;
}

.contact-item .parent {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

/* Location Card Styles */
.location-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 15px;
  padding: 15px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.location-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
}

.phone-card {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  border-radius: 15px;
  padding: 15px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.phone-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.email-card {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
  border-radius: 15px;
  padding: 15px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.email-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.whatsapp-card {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
  border: none;
  border-radius: 15px;
  padding: 15px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.whatsapp-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.logo {
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  border-radius: 50%;
  opacity: 0.4;
  animation: pulse 2s infinite;
}
.circle1 { width: 12px; height: 12px; background: rgba(255,255,255,0.8); position: absolute; animation-delay: 0s; }
.circle2 { width: 20px; height: 20px; background: rgba(255,255,255,0.6); position: absolute; animation-delay: 0.5s; }
.circle3 { width: 28px; height: 28px; background: rgba(255,255,255,0.4); position: absolute; animation-delay: 1s; }
.circle4 { width: 36px; height: 36px; background: rgba(255,255,255,0.3); position: absolute; animation-delay: 1.5s; }
.circle5 { width: 40px; height: 40px; background: rgba(255,255,255,0.2); position: absolute; animation-delay: 2s; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333; }
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.7; }
}

.content {
  text-align: center;
  margin-bottom: 15px;
}
.title {
  font-size: 0.84rem; /* Following font-sizes.css standard for contact card titles */
  display: block;
  margin-bottom: 3px;
  opacity: 0.9;
}
.text {
  font-size: 0.75rem; /* Reduced for compact fit */
  font-weight: 600;
  display: block;
  margin-bottom: 3px;
  word-break: break-all; /* Break long emails/numbers to fit */
}
.subtitle {
  font-size: 0.7rem; /* Following font-sizes.css standard for contact card subtitles */
  opacity: 0.8;
  display: block;
}

.bottom {
  text-align: center;
}
.social-button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1rem; /* Following font-sizes.css standard for icon sizes */
  background: rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}
.social-button:hover {
  background: rgba(255,255,255,0.4);
  transform: scale(1.1);
}

/* Form Styles */
.clean-form-container {
  background: linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%);
  border-radius: 20px;
  padding: 15px; /* EXACT internal card padding match */
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.1);
  width: 100% !important; /* Force full width */
  height: auto; /* Let it grow naturally */
  min-height: auto; /* No minimum height constraint */
  overflow: visible; /* Prevent clipping */
}

/* Form header icon removed - cleaner design */

/* Contact form wrapper - EXACT match to contact-item */
.contact-form-wrapper {
  width: 100%;
  padding: 10px; /* EXACT contact-item padding match */
  display: block;
  height: auto; /* No height restrictions for the form */
  min-height: auto;
  margin-bottom: 20px; /* EXACT contact-item margin match */
  box-sizing: border-box;
}

.form-header {
  text-align: center;
  margin-bottom: 25px;
  color: white;
}
.form-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #ffffff 0%, #e8f4fd 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(255,255,255,0.3);
}
.form-header p {
  font-size: 14px;
  opacity: 0.95;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 0;
}
.form-field-group {
  margin-bottom: 20px;
}
.form-label {
  color: white;
  margin-bottom: 8px;
  display: block;
}
.form-control {
  padding: 12px 15px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 10px;
  background: rgba(255,255,255,0.9);
}
/* Epic Button Wrapper - EXACT MATCH FROM PORTFOLIO */
.epic-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

/* Submit Button - EXACT Portfolio Style */
.submit-btn {
  background: none;
  border: none;
  padding: 0;
}

/* EXACT PORTFOLIO BUTTON STYLING */
.button_lg {
  position: relative;
  display: block;
  padding: 10px 20px;
  color: #fff;
  background-color: #0f1923;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px transparent;
}

.button_lg::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: #0f1923;
}

.button_lg::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: #0f1923;
  transition: all .2s ease;
}

.button_sl {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  transform: skew(-15deg);
  transition: all .2s ease;
}

.button_text {
  position: relative;
}

.button:hover {
  color: #0f1923;
}

.button:hover .button_sl {
  width: calc(100% + 15px);
}

.button:hover .button_lg::after {
  background-color: #fff;
}

/* Submit Button Colors - Perfect Form Theme Match */
.submit-btn .button_lg {
  background-color: #e91e63; /* Bright pink initial color for visibility */
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.2);
}

.submit-btn .button_sl {
  background-color: #ff4081; /* Vibrant pink accent that complements dark purple form */
}

.submit-btn:hover {
  color: #ffffff;
  background-color: #9c27b0; /* Lighter purple on hover */
}

.submit-btn:hover .button_lg::after {
  background-color: #ffffff;
}

/* Form validation styling - bright red for purple background */
.invalid-feedback {
  color: #ff0000 !important;
  font-weight: 600;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 4px 8px;
  margin-top: 5px;
  display: block;
}

.alert.alert-danger {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  border: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
  border-radius: 8px;
}

/* Removed red border styling - keeping only warning labels */

/* Animation Classes - PURE CSS ONLY */
.contact-card-animate {
  animation: slideInUp 0.5s ease-out;
}

.contact-form-animate {
  animation: fadeInScale 0.7s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */

/* ========================================
   TABLET AND MOBILE FONT SIZES (Following font-sizes.css)
   ======================================== */

/* ========================================
   TABLET CONTACT HEIGHT FOR 4-CARD PER ROW LAYOUT
   ======================================== */

/* Ensure proper height for 4 cards per row on tablets (iPad Pro and large tablets) */
/* When col-lg-3 causes 4 cards per row on enhanced tablet screens */
@media (min-width: 1024px) and (max-width: 1366px) {
  .contact-item {
    height: 280px !important; /* Increased height to prevent icon cutting on 4-card layouts */
    min-height: 280px !important;
  }
}

/* Additional safety for devices where 4 cards fit tightly */
@media (min-width: 1024px) {
  /* Only apply additional height when contact cards are forced to be narrow by CSS */
  body[data-device="tablet"] .contact-item,
  body.tablet .contact-item,
  body.devicestate-tablet .contact-item {
    height: 280px !important;
    min-height: 280px !important;
  }
}

@media (pointer: coarse) {
  /* Contact card titles, content, subtitles follow standard sizing */
  .contact-item .title {
    font-size: 0.84rem; /* Tablets follow same sizing */
  }
  
  .contact-item .text {
    font-size: 0.7rem; /* Further reduced to fit better */
  }
  
  .contact-item .subtitle {
    font-size: 0.6rem; /* Even smaller for better fit */
  }
  
  .contact-item .social-button {
    font-size: 0.7rem; /* Smaller for tablet */
  }
}

@media (pointer: coarse) and (max-width: 768px) {
  .contact-item {
    padding: 5px;
  }
  
  /* Form wrapper matches contact-item padding on mobile */
  .contact-form-wrapper {
    padding: 5px;
  }
}

@media (pointer: coarse) and (max-width: 480px) {
  /* Small mobile sizes - keeping compact */
  .contact-item .title {
    font-size: 0.9rem; /* Smaller for mobile fit */
  }
  
  .contact-item .text {
    font-size: 0.8rem; /* Even smaller for mobile to fit numbers/emails */
  }
  
  .contact-item .subtitle {
    font-size: 0.7rem; /* Smaller for mobile */
  }
  
  .contact-item .social-button {
    font-size: 0.8rem; /* Smaller for mobile */
  }
  
  .contact-item {
    padding: 2px;
  }
  
  /* Form wrapper matches contact-item padding on small mobile */
  .contact-form-wrapper {
    padding: 2px;
  }
}
</style>