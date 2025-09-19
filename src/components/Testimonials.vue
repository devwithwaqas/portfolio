<template>
  <section id="testimonials" class="testimonials section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Testimonials Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); padding: 10px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -10px -10px 30px -10px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
              <h3 style="color: white; margin: 0; font-weight: 700; /* Font size handled by font-sizes.css */ text-align: center;">💬 Testimonials</h3>
            </div>

            <!-- Card Body -->
            <div class="card-body testimonial-card-body" style="padding: 0;">
              
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
                <template #default="{ slide, index }">
                  <div class="testimonial-item">
                      <div class="row gy-4 justify-content-center">
                        <div class="col-lg-8">
                          <div class="testimonial-content" style="text-align: center;">
                            <p style="line-height: 1.8; margin-bottom: 25px;">
                              <i class="bi bi-quote quote-icon-left" style="color: rgba(60, 20, 120, 0.8); /* Font size handled by font-sizes.css */ margin-right: 10px;"></i>
                            <span>{{ slide.text }}</span>
                              <i class="bi bi-quote quote-icon-right" style="color: rgba(60, 20, 120, 0.8); /* Font size handled by font-sizes.css */ margin-left: 10px;"></i>
                            </p>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
                              <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%); display: flex; align-items: center; justify-content: center; color: white; /* Font size handled by font-sizes.css */ font-weight: bold; box-shadow: 0 5px 15px rgba(60, 20, 120, 0.4);">
                              {{ slide.initials }}
                              </div>
                              <div style="text-align: left;">
                              <h3 style="color: #2c3e50; margin: 0; font-weight: 700; /* Font size handled by font-sizes.css */">{{ slide.name }}</h3>
                              <h4 style="color: rgba(60, 20, 120, 0.8); margin: 5px 0 0 0; font-weight: 600; /* Font size handled by font-sizes.css */">{{ slide.title }}</h4>
                              </div>
                            </div>
                            <div class="stars" style="margin-top: 10px;">
                            <i v-for="star in 5" :key="star" class="bi bi-star-fill" style="color: #ffc107; /* Font size handled by font-sizes.css */"></i>
                          </div>
                            </div>
                          </div>
                    </div>
                  </div>
                </template>
              </CustomSlider>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CustomSlider from './CustomSlider.vue'

export default {
  name: 'Testimonials',
  components: {
    CustomSlider
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
      // console.log(`🎯 Testimonial slide changed to: ${index}`)
    }
  }
}
</script>

<style scoped>
/* Testimonial Card Body */
.testimonial-card-body {
  background: transparent;
  border: none;
  padding: 0;
}

/* Testimonial Item */
.testimonial-item {
  width: 100%;
  padding: 20px;
  height: auto;
  min-height: auto;
}

.testimonial-content {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  height: auto;
  min-height: auto;
  overflow: visible;
}

/* Ensure Bootstrap grid doesn't constrain height */
.row {
  height: auto;
  min-height: auto;
}

.col-lg-8 {
  height: auto;
  min-height: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonial-item {
    padding: 15px;
  }
  
  /* Removed conflicting font size rules - now handled globally */
}

@media (max-width: 480px) {
  .testimonial-item {
    padding: 10px;
  }
  
  /* Removed conflicting font size rules - now handled globally */
}
</style>