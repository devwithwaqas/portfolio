<template>
  <div class="privacy-page">
    <Breadcrumbs 
      currentPage="Privacy"
      parentLink=""
      parentLabel=""
    />
    <div class="container privacy-container">
      <ReusableCard 
        title="Privacy & Analytics" 
        icon-name="privacy"
        :card-padding="'30px'"
        :body-padding="'20px'"
      >
        <div class="privacy-content">
          <p class="privacy-intro txt-p-lg">
            This website uses analytics tools to understand how visitors use the site and improve the experience. This page explains what we collect and how you can control it.
          </p>

          <section class="privacy-section">
            <h2 class="privacy-heading txt-h2-lg">
              <i class="bi bi-bar-chart-fill me-2"></i>
              Analytics Tools We Use
            </h2>
            <div class="privacy-item">
              <h3 class="privacy-subheading txt-h3-md">📊 Google Analytics</h3>
              <p class="txt-p-md">
                We use Google Analytics to see which pages are popular, how long visitors stay, and what devices they use. This helps us make the site better for everyone.
              </p>
            </div>
            <div class="privacy-item">
              <h3 class="privacy-subheading txt-h3-md">🔍 Microsoft Clarity</h3>
              <p class="txt-p-md">
                We use Microsoft Clarity to see how visitors interact with the site—like where they click and how they scroll. This helps us understand what works and what doesn't. Clarity automatically protects your privacy by hiding any personal information you might type.
              </p>
            </div>
          </section>

          <section class="privacy-section">
            <h2 class="privacy-heading txt-h2-lg">
              <i class="bi bi-shield-check me-2"></i>
              What We Collect
            </h2>
            <p class="txt-p-md">
              We collect general information like:
            </p>
            <ul class="privacy-list txt-p-md">
              <li>Which pages you visit</li>
              <li>How long you spend on each page</li>
              <li>What device and browser you're using</li>
              <li>Your general location (city/country level, not your exact address)</li>
            </ul>
            <p class="txt-p-md">
              <strong>We do not collect:</strong>
            </p>
            <ul class="privacy-list txt-p-md">
              <li>Your name, email, or phone number (unless you contact us directly)</li>
              <li>Your exact location or IP address</li>
              <li>Any personal information you might type in forms</li>
            </ul>
            <p class="txt-p-md">
              <strong>We never sell your data.</strong> The information we collect is only used to improve this website.
            </p>
          </section>

          <section class="privacy-section">
            <h2 class="privacy-heading txt-h2-lg">
              <i class="bi bi-sliders me-2"></i>
              Your Privacy Choices
            </h2>
            <p class="txt-p-md">
              You have control over how your data is collected:
            </p>
            <ul class="privacy-list txt-p-md">
              <li><strong>Browser settings:</strong> You can disable cookies in your browser settings to limit tracking.</li>
              <li><strong>Privacy extensions:</strong> Tools like uBlock Origin or Privacy Badger can block analytics.</li>
              <li><strong>Opt-out tools:</strong> Google and Microsoft provide opt-out options in their privacy policies.</li>
            </ul>
            <p class="txt-p-md">
              For more details, see:
            </p>
            <ul class="privacy-list txt-p-md">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a></li>
            </ul>
          </section>

          <section class="privacy-section">
            <h2 class="privacy-heading txt-h2-lg">
              <i class="bi bi-envelope-fill me-2"></i>
              Questions?
            </h2>
            <p class="txt-p-md">
              If you have questions about privacy or how we use analytics, feel free to reach out:
            </p>
            <p class="txt-p-md">
              <a :href="contactLinks.email" class="privacy-contact-link">
                <i class="bi bi-envelope me-2"></i>
                {{ email }}
              </a>
            </p>
          </section>

          <div class="privacy-cta-buttons">
            <button @click="scrollToContact" class="btn btn-primary btn-lg me-3">
              <i class="bi bi-envelope me-2"></i>
              Contact Me
            </button>
            <button @click="scrollToHome" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-house-door me-2"></i>
              Back to Home
            </button>
          </div>
        </div>
      </ReusableCard>
    </div>
  </div>
</template>

<script>
import { APP_CONFIG } from '../config/constants.js'
import ReusableCard from '../components/common/ReusableCard.vue'
import Breadcrumbs from '../components/projects/Breadcrumbs.vue'

export default {
  name: 'Privacy',
  components: {
    ReusableCard,
    Breadcrumbs
  },
  data() {
    return {
      ...APP_CONFIG
    }
  },
  methods: {
    scrollToContact() {
      // Use centralized navigation utility for uniform behavior
      navigateToSection(this.$router, 'contact')
    },
    scrollToHome() {
      this.$router.push('/')
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (window.scrollY > 0) {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }
  }
}
</script>

<style scoped>
.privacy-page {
  background: transparent;
  padding: 0;
}

.privacy-container {
  max-width: 1200px;
  padding-top: 20px;
  padding-bottom: 0;
}

.privacy-container > :first-child :deep(.reusable-card.mb-4) {
  margin-top: 0 !important;
}

.privacy-container > :last-child :deep(.reusable-card.mb-4) {
  margin-bottom: 0 !important;
}

.privacy-content {
  max-width: 100%;
}

.privacy-intro {
  margin-bottom: 2rem;
  color: var(--pf-text-secondary, #4a4a6a);
  line-height: 1.7;
}

.privacy-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.privacy-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
}

.privacy-heading {
  color: var(--pf-text-primary, #1a1a2e);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.privacy-item {
  margin-bottom: 1.25rem;
}

.privacy-item:last-child {
  margin-bottom: 0;
}

.privacy-subheading {
  color: var(--pf-text-primary, #1a1a2e);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.privacy-list {
  margin: 1rem 0;
  padding-left: 1.5rem;
  line-height: 1.8;
}

.privacy-list li {
  margin-bottom: 0.5rem;
}

.privacy-content a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.privacy-content a:hover {
  color: #7c3aed;
  text-decoration: underline;
}

.privacy-contact-link {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 0.5rem 0;
}

.privacy-cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.privacy-cta-buttons .btn {
  transition: all 0.3s ease;
}

.privacy-cta-buttons .btn-primary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(168, 85, 247, 1));
  border: none;
  color: white;
  font-weight: 600;
}

.privacy-cta-buttons .btn-primary:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(168, 85, 247, 1));
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

.privacy-cta-buttons .btn-outline-primary {
  border: 2px solid rgba(139, 92, 246, 0.5);
  color: rgba(139, 92, 246, 0.9);
  background: transparent;
  font-weight: 600;
}

.privacy-cta-buttons .btn-outline-primary:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.8);
  color: rgba(139, 92, 246, 1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .privacy-container {
    padding-top: 15px;
    padding-bottom: 0;
  }
  
  .privacy-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
  
  .privacy-list {
    padding-left: 1.25rem;
  }

  .privacy-cta-buttons {
    flex-direction: column;
    margin-top: 1.5rem;
  }

  .privacy-cta-buttons .btn {
    width: 100%;
  }
}
</style>
