<template>
  <section id="contact" class="contact section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <ReusableCard 
        title="Get In Touch" 
        icon-name="contact"
        body-padding="0"
      >
              <div class="row gy-3 gx-2">
                <!-- Location Card -->
                <ContactCard 
                  iconClass="bi bi-geo-alt-fill"
                  iconColor="#ffd700"
                  emoji="📍"
                  label="Location"
                  :value="location"
                  subtitle="Available for remote work worldwide"
                  link="#"
                />

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
import ReusableCard from '../common/ReusableCard.vue'
import ContactForm from '../common/ContactForm.vue'
import ContactCard from '../common/ContactCard.vue'
import { APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'Contact',
  components: {
    ReusableCard,
    ContactForm,
    ContactCard
  },
  data() {
    return {
      ...APP_CONFIG
    }
  }
}
</script>

<style scoped>
/* All contact card styling now handled by ContactCard.vue component */
/* All contact form styling now handled by ContactForm.vue component */
/* This file only contains Contact section-specific overrides if needed */
</style>
