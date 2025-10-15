<template>
  <ReusableCard :title="title" class="sidebar-sticky mb-4">
    <ul class="project-info-list">
      <li v-for="(info, index) in items" :key="index">
        <strong class="txt-label-md">{{ info.label }}</strong>
        <span class="txt-p-sm">{{ info.value }}</span>
      </li>
    </ul>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'ProjectInfo',
  components: {
    ReusableCard
  },
  props: {
    title: {
      type: String,
      default: '📌 Project Information'
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* Project Info Sidebar Styling */
.sidebar-sticky {
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

.project-info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-info-list li {
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.project-info-list li:last-child {
  border-bottom: none;
}

.project-info-list strong {
  color: #666;
  /* Font size managed by font-sizes.css */
  font-weight: 600;
}

.project-info-list span {
  color: #7c3aed;
  font-weight: 500;
}
</style>

