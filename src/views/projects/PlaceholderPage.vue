<template>
  <div class="placeholder-page">
    <div class="container">
      <div class="placeholder-content">
        <div class="placeholder-icon">
          <i class="bi bi-tools"></i>
        </div>
        <h1 class="placeholder-title">Project Page Coming Soon</h1>
        <p class="placeholder-description">
          This project page is currently under development. 
          Please check back later for detailed information about this project.
        </p>
        <div class="placeholder-actions">
          <router-link to="/#portfolio" class="btn btn-primary">
            <i class="bi bi-arrow-left"></i>
            Back to Portfolio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderPage',
  mounted() {
    // Update page title
    document.title = 'Project Page - Coming Soon | Portfolio'
  }
}
</script>

<style scoped>
.placeholder-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a0b2e 0%, #16213e 100%);
  padding: 2rem 1rem;
}

.placeholder-content {
  text-align: center;
  max-width: 600px;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.placeholder-icon {
  font-size: 4rem;
  color: #8b5cf6;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.placeholder-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.placeholder-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.placeholder-actions {
  margin-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
}

.btn i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .placeholder-content {
    padding: 2rem 1.5rem;
  }
  
  .placeholder-title {
    font-size: 2rem;
  }
  
  .placeholder-description {
    font-size: 1rem;
  }
}
</style>
