<template>
  <section id="contact" class="contact section">
    <div class="container" data-aos="fade" data-aos-delay="100">
      
      <!-- Contact Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); padding: 10px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -10px -10px 30px -10px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
              <h3 style="color: white; margin: 0; font-weight: 700; font-size: 1.5rem; text-align: center;">📞 Get In Touch</h3>
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
                    
              <!-- Encouraging Header -->
              <div class="row mt-5">
                <div class="col-lg-12">
                  <div class="contact-encouragement" data-aos="fade-up" data-aos-delay="550">
                    <h4 class="encouragement-title">
                      <i class="bi bi-chat-dots"></i>
                      Let's Start a Conversation!
                    </h4>
                    <p class="encouragement-text">
                      I'm excited to hear about your project! Whether you need a full-stack application, 
                      cloud migration, or technical consultation, I'm here to help bring your ideas to life. 
                      Tell me about your vision and let's discuss how we can work together to achieve your goals.
                    </p>
                          </div>
                        </div>
                      </div>
                      
              <!-- Contact Form -->
              <div class="row mt-4">
                <div class="col-lg-12">
                  <form @submit.prevent="submitForm" class="contact-form" data-aos="fade-up" data-aos-delay="600">
                    
                    <!-- Form Row 1: Name and Email -->
                    <div class="row">
                      <div class="col-md-6 form-group">
                        <input 
                          type="text" 
                          name="name" 
                          class="form-control" 
                          id="name" 
                          placeholder="Your Name" 
                          v-model="formData.name"
                          required
                        >
                        </div>
                      <div class="col-md-6 form-group mt-3 mt-md-0">
                        <input 
                          type="email" 
                          class="form-control" 
                          name="email" 
                          id="email" 
                          placeholder="Your Email" 
                          v-model="formData.email"
                          required
                        >
                      </div>
                    </div>

                    <!-- Form Row 2: Subject -->
                    <div class="form-group mt-3">
                      <input 
                        type="text" 
                        class="form-control" 
                        name="subject" 
                        id="subject" 
                        placeholder="Subject" 
                        v-model="formData.subject"
                        required
                      >
                      </div>
                      
                    <!-- Form Row 3: Message Textarea -->
                    <div class="form-group mt-3">
                      <div class="message-container">
                        <label class="message-label">
                            <i class="bi bi-pencil-square"></i>
                            Project Details & Requirements
                          </label>
                        <div class="message-wrapper">
                          <textarea 
                            class="form-control message-textarea"
                            name="message"
                            id="message"
                            rows="8"
                            placeholder="Tell me about your project, timeline, and any specific requirements..."
                            v-model="formData.message"
                            required
                          ></textarea>
                          </div>
                        </div>
                      </div>
                      
                    <!-- Form Row 4: Submit Button -->
                    <div class="text-center mt-4">
                      <button type="submit" class="btn btn-primary btn-lg">
                        <i class="bi bi-send"></i>
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
            } else if (entry.target.classList.contains('contact-form')) {
              entry.target.classList.add('contact-form-animate')
              console.log('Added animation to contact form')
            }
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      // Wait for DOM to be ready
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.location-card, .phone-card, .email-card, .whatsapp-card, .contact-form')
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
    submitForm() {
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
  height: 200px;
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
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #fff;
}

.info-card-content h4 {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.info-card-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-bottom: 5px;
  font-weight: 500;
}

.info-card-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
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
  font-size: 2.5rem !important;
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
  font-size: 2.5rem !important;
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
  font-size: 2.5rem !important;
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
  font-size: 2.5rem !important;
  text-shadow: 0 0 10px rgba(129, 199, 132, 0.5) !important;
  position: relative;
  z-index: 1;
}

/* Encouraging Header - LIGHTER GRADIENT */
.contact-encouragement {
  text-align: center;
  margin-bottom: 30px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.85) 0%, rgba(88, 55, 120, 0.85) 50%, rgba(191, 144, 4, 0.7) 100%);
  border-radius: 20px;
  border: 3px solid rgba(76, 95, 175, 0.8);
  box-shadow: 0 15px 35px rgba(76, 95, 175, 0.6), 0 0 20px rgba(191, 144, 4, 0.4);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.contact-encouragement::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.encouragement-title {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.encouragement-title i {
  color: #FFD700;
  font-size: 2.5rem;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.encouragement-text {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  line-height: 1.7;
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 500;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

/* Contact Form - LESS DARK GRADIENT with Transitions */
.contact-form {
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.8) 0%, rgba(88, 55, 120, 0.8) 50%, rgba(191, 144, 4, 0.6) 100%);
  padding: 40px;
  border-radius: 20px;
  border: 3px solid rgba(76, 95, 175, 0.7);
  box-shadow: 0 20px 40px rgba(76, 95, 175, 0.5), 0 0 30px rgba(191, 144, 4, 0.3);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.contact-form:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 50px rgba(76, 95, 175, 0.6), 0 0 40px rgba(191, 144, 4, 0.4);
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
  animation: formShimmer 4s infinite;
}

@keyframes formShimmer {
  0%, 100% { transform: translateX(-100%) rotate(45deg); }
  50% { transform: translateX(100%) rotate(45deg); }
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

.contact-form.contact-form-animate {
  transition-delay: 0.5s;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 10px !important;
  color: #fff !important;
  padding: 12px 15px !important;
  font-size: 1rem !important;
  transition: all 0.3s ease !important;
  display: block !important;
  width: 100% !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25) !important;
  color: #fff !important;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Override any conflicting CSS - LESS DARK INPUTS with Better UX */
.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form textarea {
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.7) 0%, rgba(88, 55, 120, 0.7) 100%) !important;
  border: 3px solid rgba(76, 95, 175, 0.5) !important;
  border-radius: 15px !important;
  color: #ffffff !important;
  padding: 15px 20px !important;
  font-size: 1rem !important;
  display: block !important;
  width: 100% !important;
  visibility: visible !important;
  opacity: 1 !important;
  box-shadow: 0 10px 30px rgba(76, 95, 175, 0.2), 0 0 15px rgba(191, 144, 4, 0.1) !important;
  min-height: 50px !important;
  margin: 8px 0 !important;
  font-weight: 500 !important;
  transition: all 0.4s ease !important;
  backdrop-filter: blur(10px) !important;
  position: relative;
  z-index: 1;
}

.contact-form input[type="text"]:focus,
.contact-form input[type="email"]:focus,
.contact-form textarea:focus {
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.8) 0%, rgba(88, 55, 120, 0.8) 100%) !important;
  border-color: rgba(191, 144, 4, 0.7) !important;
  box-shadow: 0 0 0 5px rgba(191, 144, 4, 0.3), 0 15px 40px rgba(76, 95, 175, 0.3), 0 0 25px rgba(191, 144, 4, 0.3) !important;
  outline: none !important;
  transform: translateY(-3px) scale(1.02) !important;
  color: #ffffff !important;
}

/* Force autofill to use lighter theme - strongest override */
.contact-form input:-webkit-autofill,
.contact-form input:-webkit-autofill:hover,
.contact-form input:-webkit-autofill:focus,
.contact-form input:-webkit-autofill:active,
.contact-form textarea:-webkit-autofill,
.contact-form textarea:-webkit-autofill:hover,
.contact-form textarea:-webkit-autofill:focus,
.contact-form textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px rgba(76, 95, 175, 0.7) inset !important;
  -webkit-text-fill-color: #ffffff !important;
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.7) 0%, rgba(88, 55, 120, 0.7) 100%) !important;
  background-color: rgba(76, 95, 175, 0.7) !important;
  color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

/* Alternative approach - disable autofill styling completely */
.contact-form input[autocomplete],
.contact-form textarea[autocomplete] {
  -webkit-box-shadow: 0 0 0 1000px rgba(76, 95, 175, 0.7) inset !important;
  -webkit-text-fill-color: #ffffff !important;
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.7) 0%, rgba(88, 55, 120, 0.7) 100%) !important;
}

.contact-form input[type="text"]::placeholder,
.contact-form input[type="email"]::placeholder,
.contact-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
  font-weight: 500 !important;
}

/* Message Textarea */
.message-container {
  margin-top: 20px;
}

.message-label {
  color: #fff;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
  font-size: 1.1rem;
}

.message-label i {
  margin-right: 8px;
  color: #007BFF;
}

.message-wrapper {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.message-textarea {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  resize: vertical;
  min-height: 200px;
  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.message-textarea:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  color: #fff;
}

.message-textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* Submit Button - Less Dark Theme */
.btn-primary {
  background: linear-gradient(135deg, rgba(76, 95, 175, 0.8) 0%, rgba(88, 55, 120, 0.8) 50%, rgba(191, 144, 4, 0.6) 100%);
  border: 2px solid rgba(76, 95, 175, 0.7);
  border-radius: 25px;
  padding: 15px 35px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(76, 95, 175, 0.3), 0 0 15px rgba(191, 144, 4, 0.2);
  color: #ffffff;
}

.btn-primary:hover {
  background: linear-gradient(135deg, rgba(66, 85, 155, 0.9) 0%, rgba(78, 45, 110, 0.9) 50%, rgba(171, 124, 4, 0.7) 100%);
  border-color: rgba(191, 144, 4, 0.8);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(76, 95, 175, 0.5), 0 0 25px rgba(191, 144, 4, 0.3);
  color: #ffffff;
}

.btn-primary i {
  margin-right: 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-info-card {
    height: 180px;
    padding: 20px 15px;
  }
  
  .info-card-icon {
    font-size: 2rem;
  }
  
  .info-card-content h4 {
    font-size: 1.1rem;
  }
  
  .info-card-content p {
    font-size: 0.9rem;
  }
  
  .contact-form {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .contact-info-card {
    height: 160px;
    padding: 15px 10px;
  }
  
  .info-card-icon {
    font-size: 1.8rem;
  }
  
  .info-card-content h4 {
    font-size: 1rem;
  }
  
  .info-card-content p {
    font-size: 0.85rem;
  }
  
  .contact-form {
    padding: 15px;
  }
}
</style>
