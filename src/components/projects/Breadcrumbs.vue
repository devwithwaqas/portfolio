<template>
  <div class="page-title" data-aos="fade">
    <div class="container">
      <nav class="breadcrumbs">
        <ol>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="parentLink">
            <router-link :to="parentLink">{{ parentLabel }}</router-link>
          </li>
          <li class="current">{{ currentPage }}</li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    currentPage: {
      type: String,
      required: true
    },
    parentLink: {
      type: String,
      default: '/#portfolio'
    },
    parentLabel: {
      type: String,
      default: 'Portfolio'
    }
  }
}
</script>

<style scoped>
/* Breadcrumbs styling - Compact and centered */
.page-title {
  padding: 20px 0;
  background: linear-gradient(135deg, rgba(30, 15, 50, 0.95) 0%, rgba(20, 10, 35, 0.98) 100%);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  min-height: 60px;
}

.breadcrumbs {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs li + li::before {
  content: '/';
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1;
}

.breadcrumbs a {
  color: #7c3aed;
  text-decoration: none;
  transition: color 0.3s ease;
  line-height: 1;
}

.breadcrumbs a:hover {
  color: rgba(139, 92, 246, 1);
  text-decoration: underline;
}

.breadcrumbs .current {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  line-height: 1;
}

/* Desktop */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .page-title {
    padding: 18px 0;
    min-height: 56px;
  }
}

/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .page-title {
    padding: 16px 0;
    min-height: 52px;
  }
}

/* Mobile */
@media (pointer: coarse) and (max-width: 767px) {
  .page-title {
    padding: 14px 0;
    min-height: 48px;
  }
}
</style>


