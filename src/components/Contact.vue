<template>
  <section id="contact" class="contact section">
    <div class="container" data-aos="fade" data-aos-delay="100">
      
      <!-- Contact Card -->
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1); padding: 40px;">
            
            <!-- Card Header -->
            <div class="card-header fancy-3d-header" style="margin: -40px -40px 30px -40px; padding: 25px 40px; border-radius: 20px 20px 0 0; border: none;">
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
                </div>

                <!-- Email Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-info-card email-card" data-aos="fade-up" data-aos-delay="400" @mouseover="handleCardHover" @mouseout="handleCardLeave">
                    <div class="info-card-icon">
                      <i class="bi bi-envelope-fill"></i>
                    </div>
                    <div class="info-card-content">
                      <h4>✉️ Email Me</h4>
                      <p>devwithwaqas@gmail.com</p>
                      <span class="info-card-subtitle">I'll respond within 24 hours</span>
                    </div>
                    <div class="info-card-glow"></div>
                  </div>
                </div>

                <!-- WhatsApp Card -->
                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="contact-info-card whatsapp-card" data-aos="fade-up" data-aos-delay="500" @mouseover="handleCardHover" @mouseout="handleCardLeave">
                    <div class="info-card-icon">
                      <i class="bi bi-whatsapp"></i>
                    </div>
                    <div class="info-card-content">
                      <h4>💬 WhatsApp</h4>
                      <a href="https://wa.me/60146806067" target="_blank" class="whatsapp-link">+60146806067</a>
                      <span class="info-card-subtitle">Quick chat for urgent matters</span>
                    </div>
                    <div class="info-card-glow"></div>
                  </div>
                </div>

                <!-- Contact Form -->
                <div class="col-12">
                  <div class="contact-form-section" data-aos="fade-up" data-aos-delay="200">
                    <div class="form-header">
                      <h3>Send Me a Message</h3>
                      <p>Tell me about your project and let's make it happen!</p>
                    </div>
                    
                    <form class="contact-form" @submit="handleFormSubmit">
                      <div class="form-row">
                        <div class="form-group">
                          <div class="input-container">
                            <i class="bi bi-person-fill input-icon"></i>
                            <input type="text" name="name" class="form-input" placeholder="Your Full Name" required>
                            <div class="input-border"></div>
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="input-container">
                            <i class="bi bi-envelope-fill input-icon"></i>
                            <input type="email" name="email" class="form-input" placeholder="Your Email Address" required>
                            <div class="input-border"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <div class="input-container">
                          <i class="bi bi-chat-dots-fill input-icon"></i>
                          <input type="text" name="subject" class="form-input" placeholder="Project Subject" required>
                          <div class="input-border"></div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <div class="rich-text-container">
                          <label class="rich-text-label">
                            <i class="bi bi-pencil-square"></i>
                            Project Details & Requirements
                          </label>
                          <div class="quill-editor-wrapper">
                            <QuillEditor
                              v-model:content="messageContent"
                              :options="editorOptions"
                              class="custom-quill-editor"
                              content-type="html"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div class="form-actions">
                        <button type="submit" class="submit-btn">
                          <span class="btn-text">Send Message</span>
                          <i class="bi bi-send-fill btn-icon"></i>
                          <div class="btn-glow"></div>
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

    </div>
  </section>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: 'Contact',
  components: {
    QuillEditor
  },
  data() {
    return {
      messageContent: '',
      editorOptions: {
        theme: 'snow',
        placeholder: 'Tell me about your project, timeline, and any specific requirements...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
        }
      }
    }
  },
  methods: {
    handleCardHover(event) {
      const card = event.currentTarget
      card.style.transform = 'translateY(-10px) scale(1.02)'
      const glow = card.querySelector('.card-glow')
      if (glow) {
        glow.style.opacity = '1'
      }
    },
    handleCardLeave(event) {
      const card = event.currentTarget
      card.style.transform = 'translateY(0) scale(1)'
      const glow = card.querySelector('.card-glow')
      if (glow) {
        glow.style.opacity = '0'
      }
    },
    handleFormSubmit(event) {
      event.preventDefault()
      // Add form submission logic here
      console.log('Form submitted!', this.messageContent)
    }
  }
}
</script>

<style scoped>
/* Amazing Card-Based Contact Section */


/* Card Header Section */
.card-header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.card-header-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
}


.card-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 25px;
  line-height: 1.6;
}

.title-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  margin: 0 auto;
  border-radius: 2px;
}

/* Card Body Section */
.card-body-section {
  padding: 40px;
  position: relative;
  z-index: 2;
}


/* Contact Info Cards */
.contact-info-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  padding: 25px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.contact-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-info-card:hover::before {
  opacity: 1;
}

.info-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.info-card-icon {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  position: relative;
  z-index: 2;
}

.location-card .info-card-icon {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}

.phone-card .info-card-icon {
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
}

.email-card .info-card-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.whatsapp-card .info-card-icon {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
}

.info-card-icon i {
  font-size: 1.6rem;
  color: white;
}

.info-card-content {
  position: relative;
  z-index: 2;
}

.info-card-content h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 6px;
}

.info-card-content p {
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 6px;
  font-weight: 600;
}

.info-card-subtitle {
  font-size: 0.85rem;
  color: #6c757d;
  font-style: italic;
}

.whatsapp-link {
  color: #25D366;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.whatsapp-link:hover {
  color: #128C7E;
  text-decoration: underline;
}

/* Contact Form Section */
.contact-form-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 35px;
  position: relative;
  overflow: hidden;
}

.contact-form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
  pointer-events: none;
}

.form-header {
  text-align: center;
  margin-bottom: 35px;
  position: relative;
  z-index: 2;
}

.form-header h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.form-header p {
  color: #6c757d;
  font-size: 1rem;
}

/* Form Styling */
.contact-form {
  position: relative;
  z-index: 2;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 18px;
}

.form-group {
  margin-bottom: 22px;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.1rem;
  z-index: 3;
  transition: all 0.3s ease;
}

.textarea-container .input-icon {
  top: 22px;
  transform: none;
}

.form-input {
  width: 100%;
  padding: 16px 18px 16px 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

.form-input:focus + .input-border {
  opacity: 1;
  transform: scaleX(1);
}

.form-input::placeholder {
  color: #6c757d;
  font-weight: 400;
}

.form-textarea {
  min-height: 110px;
  resize: vertical;
  padding-top: 18px;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 1px;
}

/* Submit Button */
.form-actions {
  text-align: center;
  margin-top: 25px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 45px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.submit-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
}

.submit-btn:active {
  transform: translateY(-1px) scale(1.02);
}

.btn-text {
  margin-right: 8px;
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover .btn-glow {
  left: 100%;
}

/* Rich Text Editor Styling */
.rich-text-container {
  margin-bottom: 25px;
}

.rich-text-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 12px;
  padding-left: 5px;
}

.rich-text-label i {
  font-size: 1.1rem;
}

.quill-editor-wrapper {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: 300px;
}

.quill-editor-wrapper:hover {
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
}

.custom-quill-editor {
  background: transparent;
  min-height: 300px !important;
}


.custom-quill-editor .ql-toolbar {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
}

.custom-quill-editor .ql-toolbar .ql-stroke {
  stroke: #667eea;
}

.custom-quill-editor .ql-toolbar .ql-fill {
  fill: #667eea;
}

.custom-quill-editor .ql-toolbar button:hover .ql-stroke {
  stroke: #764ba2;
}

.custom-quill-editor .ql-toolbar button:hover .ql-fill {
  fill: #764ba2;
}

.custom-quill-editor .ql-toolbar button.ql-active .ql-stroke {
  stroke: #764ba2;
}

.custom-quill-editor .ql-toolbar button.ql-active .ql-fill {
  fill: #764ba2;
}

.custom-quill-editor .ql-container {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  font-size: 16px;
  min-height: 250px !important;
  height: 250px !important;
}

.custom-quill-editor .ql-editor {
  color: #2c3e50;
  padding: 20px;
  line-height: 1.6;
  min-height: 250px !important;
}

.custom-quill-editor .ql-editor.ql-blank::before {
  color: rgba(44, 62, 80, 0.6);
  font-style: italic;
  font-size: 16px;
}

.custom-quill-editor .ql-editor h1,
.custom-quill-editor .ql-editor h2,
.custom-quill-editor .ql-editor h3 {
  color: #667eea;
  margin: 16px 0 8px 0;
}

.custom-quill-editor .ql-editor ul,
.custom-quill-editor .ql-editor ol {
  padding-left: 20px;
}

.custom-quill-editor .ql-editor li {
  margin: 4px 0;
}

.custom-quill-editor .ql-editor a {
  color: #667eea;
  text-decoration: none;
}

.custom-quill-editor .ql-editor a:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  
  .card-subtitle {
    font-size: 1rem;
  }
  
  .custom-quill-editor .ql-toolbar {
    padding: 8px 12px;
  }
  
  .custom-quill-editor .ql-container {
    min-height: 200px;
  }
  
  .custom-quill-editor .ql-editor {
    padding: 15px;
    font-size: 15px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .card-body-section {
    padding: 30px 20px;
  }
  
  .card-header-section {
    padding: 30px 20px;
  }
  
  .contact-form-section {
    padding: 25px 20px;
  }
  
  .contact-info-card {
    padding: 20px;
  }
  
  .info-card-icon {
    width: 45px;
    height: 45px;
  }
  
  .info-card-icon i {
    font-size: 1.4rem;
  }
}

/* Animation Keyframes */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.contact-info-card:hover {
  animation: float 2s ease-in-out infinite;
}
</style>
