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
          question: `Who is ${APP_CONFIG.fullName}?`,
          answer: `${APP_CONFIG.fullName} is a Senior Software Engineer and Technical Lead with ${APP_CONFIG.stats.yearsExperience}+ years of professional experience in enterprise software development. ${APP_CONFIG.fullName} holds a Bachelor's degree in Computer System Engineering from the University of Engineering and Technology, Lahore, and has worked with Fortune 500 companies across USA, Europe, and globally. As a software engineering consultant and specialist, ${APP_CONFIG.fullName} provides technical expertise in .NET development, Azure Cloud architecture, and microservices design.`
        },
        {
          question: `What does ${APP_CONFIG.fullName} specialize in?`,
          answer: `${APP_CONFIG.fullName} specializes in .NET development (.NET Core, ASP.NET, C#), Azure Cloud architecture (App Services, Service Fabric, Functions), microservices architecture design and implementation, RESTful API development, and DevOps automation. ${APP_CONFIG.fullName} has delivered enterprise solutions processing 2.5M+ data points daily and led teams managing billions in operational costs.`
        },
        {
          question: `Is ${APP_CONFIG.fullName} available for remote work?`,
          answer: `Yes, ${APP_CONFIG.fullName} is available for remote consulting, freelance, and contract projects. Works with clients in USA, Europe (UK, Germany, Netherlands, Switzerland), and globally. Provides flexible timezone support for EST, PST, GMT, and CET timezones.`
        },
        {
          question: `What type of consulting services does ${APP_CONFIG.fullName} offer?`,
          answer: `${APP_CONFIG.fullName} offers software engineering consulting services including full stack development, Azure Cloud architecture design, microservices architecture implementation, technical leadership, API development, database design and optimization, and agile project management. Services are available for remote work globally with flexible engagement models.`
        },
        {
          question: `What is ${APP_CONFIG.fullName}'s experience with Fortune 500 companies?`,
          answer: `${APP_CONFIG.fullName} has worked with 20+ Fortune 500 companies across multiple industries including financial services, manufacturing, telecommunications, and technology sectors. Experience includes delivering 32+ enterprise solutions, including microservices platforms processing 2.5M+ data points daily and systems managing billions in operational costs.`
        },
        {
          question: `How can I contact ${APP_CONFIG.fullName} for consulting services?`,
          answer: `You can contact ${APP_CONFIG.fullName} through the contact form on this website, via email, phone, or WhatsApp. ${APP_CONFIG.fullName} responds to inquiries promptly and is available for initial consultations to discuss your project requirements.`
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
