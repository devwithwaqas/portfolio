<template>
  <ReusableCard title="Get Started" icon-name="contact" class="mb-4">
    <div class="service-cta-content">
      <div class="row g-4">
        <!-- CTA Image (if provided) -->
        <div v-if="ctaImage" class="col-lg-4">
          <div class="cta-image-container">
            <ResponsiveImage
              :src="ctaImage"
              :alt="`Get Started - Remote Consultant Services - Available USA, Europe, Global`"
              sizes="(max-width: 991px) 100vw, 33vw"
              :lazy="true"
              priority="auto"
              container-class="cta-image-wrapper"
              image-class="cta-image"
            />
          </div>
        </div>
        
        <!-- CTA Content -->
        <div :class="ctaImage ? 'col-lg-8' : 'col-12'">
          <div v-if="ctaText" class="cta-text mb-4">
            <p class="txt-p-xl">{{ ctaText }}</p>
          </div>
          
          <!-- Contact Form (if enabled) -->
          <div v-if="showContactForm" class="cta-form">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="row g-3">
                <div class="col-md-6">
                  <input 
                    type="text" 
                    name="name"
                    autocomplete="name"
                    class="form-control" 
                    placeholder="Your Name" 
                    v-model="formData.name"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <input 
                    type="email" 
                    name="email"
                    autocomplete="email"
                    class="form-control" 
                    placeholder="Your Email" 
                    v-model="formData.email"
                    required
                  />
                </div>
                <div class="col-12">
                  <input 
                    type="text" 
                    name="subject"
                    autocomplete="off"
                    class="form-control" 
                    placeholder="Subject" 
                    v-model="formData.subject"
                    required
                  />
                </div>
                <div class="col-12">
                  <textarea 
                    name="message"
                    autocomplete="off"
                    class="form-control" 
                    rows="5" 
                    placeholder="Your Message"
                    v-model="formData.message"
                    required
                  ></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-lg w-100">
                    <i class="bi bi-send"></i>
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          <!-- Alternative CTA Buttons -->
          <div v-else class="cta-buttons">
            <button @click="scrollToContact" class="btn btn-primary btn-lg me-3">
              <i class="bi bi-envelope"></i>
              Contact Me
            </button>
            <button @click="scrollToPortfolio" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-briefcase"></i>
              View Portfolio
            </button>
            <p class="cta-direct-links txt-p-md mt-3 mb-0">
              Or contact directly:
              <a :href="contactLinks.email" class="cta-direct-link">Email</a>
              <span class="cta-direct-sep">|</span>
              <a :href="contactLinks.whatsapp" target="_blank" rel="noopener" class="cta-direct-link">WhatsApp</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import ResponsiveImage from '../common/ResponsiveImage.vue'
import { navigateToSection } from '../../utils/scrollToSection.js'
import { APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'ServiceCTA',
  components: {
    ReusableCard,
    ResponsiveImage
  },
  data() {
    return {
      contactLinks: APP_CONFIG.contactLinks,
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  props: {
    ctaText: {
      type: String,
      default: "Ready to get started? Let's discuss how I can help you achieve your goals."
    },
    showContactForm: {
      type: Boolean,
      default: false
    },
    ctaImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      // Log only in development
      if (import.meta.env.DEV) {
        console.log('Form submitted:', this.formData)
      }
      // You can add actual form submission logic here
      alert('Thank you for your message! I will get back to you soon.')
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    },
    scrollToContact() {
      // Use centralized navigation utility for uniform behavior
      navigateToSection(this.$router, 'contact')
    },
    scrollToPortfolio() {
      // Use centralized navigation utility for uniform behavior
      navigateToSection(this.$router, 'portfolio')
    }
  }
}
</script>

<style scoped>
.service-cta-content {
  padding: 20px 0;
}

.cta-image-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  height: 100%;
}
.cta-image-wrapper {
  width: 100%;
  height: 100%;
}
.cta-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
}

.cta-text {
  text-align: center;
}

.cta-text p {
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
}

.contact-form {
  margin-top: 20px;
}

.form-control {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 92, 246, 0.2);
  color: #374151;
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control:focus {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(139, 92, 246, 0.5);
  color: #111827;
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-control::placeholder {
  color: #9ca3af;
}

.btn-primary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(168, 85, 247, 1));
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(168, 85, 247, 1));
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

.btn-outline-primary {
  border: 2px solid rgba(139, 92, 246, 0.5);
  color: rgba(139, 92, 246, 0.9);
  background: transparent;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.8);
  color: rgba(139, 92, 246, 1);
  transform: translateY(-2px);
}

.cta-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.cta-direct-links {
  width: 100%;
  text-align: center;
}

.cta-direct-links {
  color: #6b7280;
}

.cta-direct-link {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: none;
}

.cta-direct-link:hover {
  text-decoration: underline;
}

.cta-direct-sep {
  margin: 0 8px;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
}
</style>
