<template>
  <section id="faq" class="faq section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <ReusableCard 
        title="Frequently Asked Questions" 
        icon-name="faq"
        body-padding="0"
      >
        <div class="faq-content">
          <div class="faq-accordion">
            <div 
              v-for="(item, index) in faqItems" 
              :key="index"
              class="faq-item"
            >
              <div 
                class="faq-question"
                :class="{ active: activeIndex === index }"
                @click="toggleFaq(index)"
              >
                <span class="question-text">{{ item.question }}</span>
                <span class="question-icon">
                  <i :class="activeIndex === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                </span>
              </div>
              <transition name="faq-answer">
                <div v-if="activeIndex === index" class="faq-answer">
                  <p class="answer-text">{{ item.answer }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import { generateFAQPageSchema, injectStructuredData } from '../../utils/structuredData.js'
import { APP_CONFIG } from '../../config/constants.js'

export default {
  name: 'HomeFAQ',
  components: {
    ReusableCard
  },
  data() {
    return {
      ...APP_CONFIG,
      activeIndex: null,
      faqItems: [
        {
          question: `What services does ${APP_CONFIG.fullName} provide?`,
          answer: `${APP_CONFIG.fullName} provides software engineering consulting services including full stack development (.NET Core, Vue.js, Angular), Azure Cloud architecture design and implementation, microservices architecture consulting, RESTful API development, technical leadership, database design and optimization, and DevOps automation. Services are delivered remotely for clients in USA, Europe, and globally.`
        },
        {
          question: `What technologies does ${APP_CONFIG.fullName} work with?`,
          answer: `${APP_CONFIG.fullName} specializes in .NET development (.NET Core, ASP.NET, C#), Azure Cloud services (App Services, Service Fabric, Functions, Key Vault, App Insights), microservices architecture patterns, RESTful API design, Vue.js and Angular frontend development, SQL Server database design, and CI/CD pipeline automation. Has delivered enterprise solutions processing 2.5M+ data points daily.`
        },
        {
          question: `What type of projects does ${APP_CONFIG.fullName} handle?`,
          answer: `${APP_CONFIG.fullName} handles enterprise-scale software projects including microservices platforms, cloud-native applications, API development, system architecture design, technical team leadership, and legacy system modernization. Experience includes working with Fortune 500 companies across financial services, manufacturing, telecommunications, and technology sectors.`
        },
        {
          question: `Is ${APP_CONFIG.fullName} available for remote work?`,
          answer: `Yes, ${APP_CONFIG.fullName} is available for remote consulting, freelance, and contract projects. Works with clients in USA, Europe (UK, Germany, Netherlands, Switzerland), and globally. Provides flexible timezone support for EST, PST, GMT, and CET timezones.`
        },
        {
          question: `What is ${APP_CONFIG.fullName}'s experience with enterprise solutions?`,
          answer: `${APP_CONFIG.fullName} has delivered 32+ enterprise solutions for 20+ Fortune 500 companies across multiple industries. Experience includes microservices platforms processing 2.5M+ data points daily, systems managing billions in operational costs, and applications serving 20,000+ concurrent users. Has ${APP_CONFIG.stats.yearsExperience}+ years of experience in enterprise software development.`
        },
        {
          question: `How can I engage ${APP_CONFIG.fullName} for a project?`,
          answer: `You can contact ${APP_CONFIG.fullName} through the contact form on this website, via email, phone, or WhatsApp. ${APP_CONFIG.fullName} responds to inquiries promptly and is available for initial consultations to discuss your project requirements. Engagement models include consulting, freelance, and contract projects with flexible terms.`
        }
      ]
    }
  },
  mounted() {
    // Generate FAQ schema for SEO
    if (this.faqItems && this.faqItems.length > 0) {
      const faqSchema = generateFAQPageSchema(this.faqItems)
      injectStructuredData([faqSchema])
    }
  },
  methods: {
    toggleFaq(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    }
  }
}
</script>

<style scoped>
.faq-content {
  padding: 20px 0;
}

.faq-accordion {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
}

.faq-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.4);
}

.faq-question {
  padding: 20px 25px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  user-select: none;
}

.faq-question:hover {
  background: rgba(139, 92, 246, 0.05);
}

.faq-question.active {
  background: rgba(139, 92, 246, 0.1);
  border-bottom: 2px solid rgba(139, 92, 246, 0.3);
}

.question-text {
  color: #374151;
  font-weight: 600;
  font-size: 1.1rem;
  flex: 1;
  padding-right: 20px;
}

.question-icon {
  color: #7c3aed;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-question.active .question-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 25px 20px 25px;
  background: rgba(139, 92, 246, 0.03);
}

.answer-text {
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
  padding-top: 15px;
}

/* Transition animations */
.faq-answer-enter-active,
.faq-answer-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.faq-answer-enter-from,
.faq-answer-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0 25px;
}

.faq-answer-enter-to,
.faq-answer-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
