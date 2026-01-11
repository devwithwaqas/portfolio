<template>
  <div class="col-12">
    <div class="contact-form-wrapper">
      <div class="clean-form-container">
        <form @submit.prevent="handleSubmit" class="clean-form" novalidate>
          
          <!-- Form Header -->
          <div class="form-header">
            <h3 class="form-title">Let's Build Something Amazing Together! <span class="emoji">🚀</span></h3>
            <p class="form-subtitle">Share your vision, I will bring it to life! <span class="emoji">👨‍💻</span><span class="emoji">✨</span></p>
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
            <i class="bi bi-check-circle icon-md"></i> {{ successMessage }}
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            <i class="bi bi-exclamation-triangle icon-md"></i> {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser'
import { APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'ContactForm',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      validationErrors: {},
      isLoading: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  computed: {
    emailjsConfig() {
      return APP_CONFIG.emailjs
    },
    isEmailjsConfigured() {
      const config = this.emailjsConfig
      return config.publicKey && config.serviceId && config.templateId
    }
  },
  methods: {
    validateForm() {
      this.validationErrors = {}
      let isValid = true

      if (!this.formData.name.trim()) {
        this.validationErrors.name = 'Name is required'
        isValid = false
      }

      if (!this.formData.email.trim()) {
        this.validationErrors.email = 'Email is required'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.validationErrors.email = 'Please enter a valid email'
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

    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      // Check if EmailJS is configured
      if (!this.isEmailjsConfigured) {
        this.errorMessage = 'Email service is not configured. Please email me directly at ' + APP_CONFIG.email
        return
      }

      this.isLoading = true
      this.successMessage = ''
      this.errorMessage = ''

      try {
        // Initialize EmailJS with public key
        emailjs.init(this.emailjsConfig.publicKey)

        // Prepare template parameters
        const templateParams = {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
          to_email: APP_CONFIG.email // Recipient email
        }

        // Send email using EmailJS
        await emailjs.send(
          this.emailjsConfig.serviceId,
          this.emailjsConfig.templateId,
          templateParams
        )
        
        this.successMessage = 'Thank you! Your message has been sent successfully. I will get back to you soon!'
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      } catch (error) {
        console.error('EmailJS Error:', error)
        this.errorMessage = 'Oops! Something went wrong. Please try again or email me directly at ' + APP_CONFIG.email
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* Contact Form Styling - Extracted from Contact.vue */

.contact-form-wrapper {
  width: 100%;
  padding: 10px;
  display: block;
  height: auto;
  min-height: auto;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.clean-form-container {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.15),
    0 15px 40px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.9),
    inset 0 -1px 2px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(124, 58, 237, 0.1);
  width: 100% !important;
  height: auto;
  min-height: auto;
  overflow: visible;
  position: relative;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.clean-form-container:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 35px 100px rgba(0, 0, 0, 0.2),
    0 20px 50px rgba(0, 0, 0, 0.15),
    0 12px 30px rgba(0, 0, 0, 0.1),
    inset 0 3px 6px rgba(255, 255, 255, 0.95),
    inset 0 -2px 4px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    0 0 30px rgba(124, 58, 237, 0.15);
}

.clean-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.02) 0%, transparent 50%),
    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  border-radius: 24px;
  pointer-events: none;
  z-index: 0;
}

.form-header {
  text-align: center;
  margin-bottom: 35px;
  color: #1f2937;
  position: relative;
  z-index: 1;
  padding: 20px 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(248, 250, 252, 0.08) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-header h3 {
  font-weight: 800;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #7c3aed 50%, #a855f7 75%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  text-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
}

.form-header h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #7c3aed, #a855f7);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.form-header .emoji {
  background: none !important;
  background-clip: initial !important;
  -webkit-background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  color: initial !important;
  text-shadow: none !important;
  filter: none !important;
  display: inline-block;
  margin: 0 2px;
  animation: emojiFloat 2s ease-in-out infinite;
}

@keyframes emojiFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.form-header p {
  opacity: 0.8;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 0;
  color: #4b5563;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.form-field-group {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.form-label {
  color: #374151;
  margin-bottom: 10px;
  display: block;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.required {
  color: #ef4444;
}

.form-control {
  padding: 14px 18px;
  border: 2px solid rgba(209, 213, 219, 0.5);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #1f2937;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  font-weight: 500;
}

.form-control:focus {
  outline: none;
  border-color: #7c3aed;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 0 0 3px rgba(124, 58, 237, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.form-control::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.epic-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

.submit-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.button_lg {
  position: relative;
  display: block;
  padding: 16px 32px;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #6366f1 100%);
  overflow: hidden;
  border: none;
  box-shadow: 
    0 10px 30px rgba(124, 58, 237, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255,255,255,0.2);
  border-radius: 16px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  /* Font size managed by font-sizes.css */
  letter-spacing: 0.5px;
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
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #7c3aed 100%);
  transform: skew(-15deg);
  transition: all .2s ease;
}

.button_text {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.button_text::before {
  content: '📧';
  /* Font size managed by font-sizes.css */
  transition: all 0.3s ease;
}

.submit-btn:hover .button_text::before {
  transform: scale(1.1) rotate(5deg);
}

.submit-btn:hover .button_lg {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(124, 58, 237, 0.4),
    0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255,255,255,0.3);
}

.submit-btn:active .button_lg {
  transform: translateY(-1px) scale(1.01);
  transition: all 0.1s ease;
}

.submit-btn:hover .button_sl {
  width: calc(100% + 15px);
}

.submit-btn:hover .button_lg::after {
  background-color: #ffffff;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.invalid-feedback {
  color: #ff0000 !important;
  font-weight: 600;
  /* Font size managed by font-sizes.css */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  background: none !important;
  border-radius: 4px;
  padding: 4px 8px;
  margin-top: 5px;
  display: block;
}

.alert {
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 500;
}

.alert-success {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.alert-danger {
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
  color: #ff0000;
  border: 1px solid rgba(255, 0, 0, 0.3);
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}
</style>
