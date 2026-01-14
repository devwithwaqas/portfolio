<template>
  <section id="testimonials" class="testimonials section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Testimonials Card -->
      <ReusableCard 
        title="Testimonials" 
        icon-name="testimonials"
        body-padding="0"
      >
        <!-- Custom Testimonial Slider -->
        <CustomSlider
          :slides="testimonials"
          :autoplay="true"
          :autoplay-interval="5000"
          :show-arrows="true"
          :show-pagination="true"
          :loop="true"
          @slide-change="onSlideChange"
        >
          <template #default="{ slide }">
            <div class="testimonial-item">
              <div class="row gy-4 justify-content-center">
                <div class="col-lg-8">
                  <div class="testimonial-content">
                    <p class="testimonial-text txt-p-lg">
                      <i class="bi bi-quote quote-icon-left testimonial-quote-icon icon-lg"></i>
                      <span>{{ slide.text }}</span>
                      <i class="bi bi-quote quote-icon-right testimonial-quote-icon icon-lg"></i>
                    </p>
                    <div class="testimonial-author">
                      <div class="author-avatar icon-wrapper-4xl">
                        {{ slide.initials }}
                      </div>
                      <div class="author-info">
                        <h3 class="testimonial-name txt-h3-xl">{{ slide.name }}</h3>
                        <h4 class="testimonial-title txt-h4-lg">{{ slide.title }}</h4>
                      </div>
                    </div>
                    <div class="stars">
                      <i v-for="star in 5" :key="star" class="bi bi-star-fill testimonial-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </CustomSlider>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import CustomSlider from '../common/CustomSlider.vue'
import ReusableCard from '../common/ReusableCard.vue'
import { testimonialsData } from '../../config/testimonials.js'

export default {
  name: 'Testimonials',
  components: {
    CustomSlider,
    ReusableCard
  },
  data() {
    return {
      testimonials: testimonialsData
    }
  },
  methods: {
    onSlideChange(index) {
      // Testimonial slide change handler
    }
  }
}
</script>

<style scoped>
/* Testimonial Item Container */
.testimonial-item {
  width: 100%;
  padding: 20px;
}

/* Testimonial Content */
.testimonial-content {
  text-align: center;
  width: 100%;
  border-left: 8px solid transparent;
  border-image: linear-gradient(180deg, rgba(60, 20, 120, 0.9), rgba(50, 15, 100, 0.95), rgba(40, 10, 80, 1)) 1;
  border-radius: 4px;
  padding-left: 30px;
  position: relative;
}

.testimonial-content::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(180deg, rgba(60, 20, 120, 0.9) 0%, rgba(50, 15, 100, 0.95) 50%, rgba(40, 10, 80, 1) 100%);
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(60, 20, 120, 0.5);
}

/* Testimonial Text */
.testimonial-text {
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 25px;
}

/* Quote Icons */
.quote-icon-left {
  color: rgba(60, 20, 120, 0.8);
  margin-right: 10px;
}

.quote-icon-right {
  color: rgba(60, 20, 120, 0.8);
  margin-left: 10px;
  transform: scale(-1, -1);
}

/* Author Container */
.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

/* Author Avatar */
.author-avatar {
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(60, 20, 120, 0.4);
  flex-shrink: 0;
}

/* Author Info */
.author-info {
  text-align: left;
}

.testimonial-name {
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
}

.testimonial-title {
  color: rgba(60, 20, 120, 0.8);
  margin: 5px 0 0 0;
  font-weight: 600;
}

/* Star Rating */
.stars {
  margin-top: 10px;
}

.testimonial-star {
  color: #ffc107;
  margin: 0 2px;
}

/* Responsive Design */
@media (pointer: coarse) and (max-width: 768px) {
  .testimonial-item {
    padding: 15px;
  }
  
  .testimonial-author {
    gap: 15px;
  }
  
  /* Avatar size managed by icon-wrapper class */
}

@media (pointer: coarse) and (max-width: 480px) {
  .testimonial-item {
    padding: 10px;
  }
  
  .testimonial-author {
    gap: 12px;
  }
  
  /* Avatar size managed by icon-wrapper class */
}
</style>