<template>
  <ReusableCard title="Frequently Asked Questions" icon-name="faq" class="mb-4">
    <div class="service-faq-content">
      <div v-if="faqItems && faqItems.length > 0" class="faq-accordion">
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
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import { generateFAQPageSchema, injectStructuredData } from '../../utils/structuredData.js'

export default {
  name: 'ServiceFAQ',
  components: {
    ReusableCard
  },
  props: {
    faqItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: null
    }
  },
  mounted() {
    // Generate FAQ schema for SEO when component mounts
    // injectStructuredData handles multiple schemas properly by creating separate script tags
    if (this.faqItems && this.faqItems.length > 0) {
      const faqSchema = generateFAQPageSchema(this.faqItems)
      // Inject FAQ schema - injectStructuredData will create a separate script tag
      // This works alongside existing schemas from the router
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
.service-faq-content {
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
