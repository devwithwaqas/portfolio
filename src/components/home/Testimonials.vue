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

export default {
  name: 'Testimonials',
  components: {
    CustomSlider,
    ReusableCard
  },
  data() {
    return {
      testimonials: [
        {
          text: "Waqas Ahmad was my senior and indeed an inspiration for me as a young programmer at UET Lahore. On campus he was known as the coding guru and undoubtedly the best programmer at UET in his time. He has won many national level programming competitions single handed with little or no assistance from other people and mentors.",
          name: "Bilal Javed",
          title: "Software Engineer (Machine Learning) at Yelp",
          initials: "BJ"
        },
        {
          text: "Handy asset to any team. Strong technical and debugging skills, always eager to learn something new. He has some unique elements for gaming and his ideas for game designing were awesome most of the times.",
          name: "Muhammad Farhan Khan",
          title: "Python, Django, Fast API Developer",
          initials: "MF"
        },
        {
          text: "Waqas is a very challenging and competent guy. What he decide to do he can do it. Of course I will recommend him and wish to work with him as well best of luck for your bright future.",
          name: "Saaed Sajjad",
          title: "Software Engineer",
          initials: "SS"
        },
        {
          text: "Waqas has always been dedicated and committed to work. A wonderful person with a kind heart and great sense of humor. It's been pleasure working with him.",
          name: "Furqan Ud Din",
          title: "Project Manager & Scrum Master",
          initials: "FU"
        },
        {
          text: "It is a distinct pleasure to recommend Waqas Ahmad as my sociable senior. He demonstrated excellent programming and analytical skills in national level competitions which are very essential to address the constantly evolving client's business requirements. The best thing I noticed in him is his insatiable zeal to learn latest technical skills, technology stacks and tools and offer better solutions.",
          name: "Atif Ghulam Nabi",
          title: "Cloud DevOps Engineer at Swisscom",
          initials: "AG"
        },
        {
          text: "Waqas is very good programmer and have sound knowledge. He also is competition winner.",
          name: "Rafaqat Ali",
          title: "Team Lead | .NET Core | Full Stack - Angular",
          initials: "RA"
        },
        {
          text: "Waqas is a good programmer and he learns very quickly.",
          name: "Muhammad Usman",
          title: "Software Engineer",
          initials: "MU"
        }
      ]
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