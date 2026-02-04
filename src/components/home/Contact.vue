<template>
  <section id="contact" class="contact section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <ReusableCard 
        title="Get In Touch" 
        icon-name="contact"
        body-padding="0"
      >
              <p v-if="showContact" class="contact-response-promise txt-p-md mb-3">
                I typically respond within 24 hours. Use the form below, or email/WhatsApp directly.
              </p>
              <div class="row gy-3 gx-2" v-if="showContact">
                <!-- Location Card -->
                <ContactCard 
                  iconClass="bi bi-geo-alt-fill"
                  iconColor="#ffd700"
                  emoji="📍"
                  label="Location"
                  :value="location"
                  subtitle="Available for remote work worldwide"
                  :link="contactLinks.location"
                />
                <!-- SEO: Address semantic markup -->
                <address class="visually-hidden" aria-hidden="true">
                  {{ location }} - Remote work available globally
                </address>

                <!-- Phone Card -->
                <ContactCard 
                  iconClass="bi bi-telephone-fill"
                  iconColor="#00ff88"
                  emoji="☎️"
                  label="Phone"
                  :value="phone"
                  subtitle="Call me anytime"
                  :link="contactLinks.phone"
                />

                <!-- Email Card -->
                <ContactCard 
                  iconClass="bi bi-envelope-fill"
                  iconColor="#ff1744"
                  emoji="📧"
                  label="Email"
                  :value="email"
                  subtitle="Send me a message"
                  :link="contactLinks.email"
                />

                <!-- WhatsApp Card -->
                <ContactCard 
                  iconClass="bi bi-whatsapp"
                  iconColor="#00e676"
                  emoji="💬"
                  label="WhatsApp"
                  :value="phone"
                  subtitle="Chat me on WhatsApp"
                  :link="contactLinks.whatsapp"
                />

                <!-- Contact Form -->
                <ContactForm />

              </div>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ReusableCard from '../common/ReusableCard.vue'
import { APP_CONFIG } from '../../config/constants.js'

const ContactForm = defineAsyncComponent(() => import('../common/ContactForm.vue'))
const ContactCard = defineAsyncComponent(() => import('../common/ContactCard.vue'))

export default {
  name: 'Contact',
  components: {
    ReusableCard,
    ContactForm,
    ContactCard
  },
  data() {
    return {
      location: APP_CONFIG.location,
      phone: APP_CONFIG.phone,
      email: APP_CONFIG.email,
      contactLinks: APP_CONFIG.contactLinks,
      showContact: true
    }
  }
}
</script>

<style scoped>
.contact-response-promise {
  color: #4b5563;
  font-weight: 500;
}
</style>
