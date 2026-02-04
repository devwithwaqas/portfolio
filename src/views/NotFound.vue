<template>
  <div class="not-found-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <div class="error-content" data-aos="fade-up">
            <h1 class="error-code">404</h1>
            <h2 class="error-title txt-h2-xl">Page Not Found</h2>
            <p class="error-description txt-p-md">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <div class="error-actions">
              <router-link to="/" class="btn btn-primary btn-lg">
                <i class="bi bi-house-door me-2"></i>
                Go to Homepage
              </router-link>
              <router-link to="/#contact" class="btn btn-primary btn-lg">
                <i class="bi bi-envelope me-2"></i>
                Get in touch
              </router-link>
              <button @click="$router.go(-1)" class="btn btn-outline-primary btn-lg">
                <i class="bi bi-arrow-left me-2"></i>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    // Update page title
    document.title = '404 - Page Not Found | Waqas Ahmad Portfolio'
    try {
      sessionStorage.setItem('home:forceAll', '1')
      sessionStorage.setItem('home:returnSection', 'hero')
      sessionStorage.removeItem('scroll:/')
    } catch (error) {
      // Ignore storage errors
    }
  }
}
</script>

<style scoped>
.not-found-container {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.03) 0%, 
    rgba(236, 72, 153, 0.02) 100%
  );
}

.error-content {
  padding: 40px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.8) 0%, 
    rgba(236, 72, 153, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 20px;
}

.error-title {
  color: #7c3aed;
  font-weight: 700;
  margin-bottom: 20px;
}

.error-description {
  color: #6b7280;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.error-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.9) 0%, 
    rgba(236, 72, 153, 0.9) 100%
  );
  border: none;
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
}

.btn-outline-primary {
  border: 2px solid rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: transparent;
}

.btn-outline-primary:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.8);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn {
    width: 100%;
    margin: 0 !important;
  }
}
</style>
