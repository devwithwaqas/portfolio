<template>
  <ReusableCard :title="title" class="sidebar-sticky mb-4">
    <ul class="project-info-list">
      <li>
        <strong class="txt-label-md">Category:</strong>
        <div class="info-value">
          <span class="info-icon">
            <LazyImage 
              :src="getIconData('enterprise').src" 
              :alt="getIconData('enterprise').alt" 
              image-class="icon-img-md"
              container-class="info-icon-container"
            />
          </span>
          <span class="txt-p-sm">{{ category }}</span>
        </div>
      </li>
      <li>
        <strong class="txt-label-md">Client:</strong>
        <div class="info-value">
          <span class="info-icon">
            <img :src="getIconData('client').src" 
                 :alt="getIconData('client').alt" 
                 class="icon-img-md" />
          </span>
          <span class="txt-p-sm">{{ client }}</span>
        </div>
      </li>
      <li>
        <strong class="txt-label-md">Project Date:</strong>
        <div class="info-value">
          <span class="info-icon">
            <LazyImage 
              :src="getIconData('calendar').src" 
              :alt="getIconData('calendar').alt" 
              image-class="icon-img-md"
              container-class="info-icon-container"
            />
          </span>
          <span class="txt-p-sm">{{ projectDate }}</span>
        </div>
      </li>
      <li>
        <strong class="txt-label-md">Project URL:</strong>
        <div class="info-value">
          <span class="info-icon">
            <img :src="getIconData('website').src" 
                 :alt="getIconData('website').alt" 
                 class="icon-img-md" />
          </span>
          <span class="txt-p-sm">{{ projectUrl }}</span>
        </div>
      </li>
      <li>
        <strong class="txt-label-md">Company Size:</strong>
        <div class="info-value">
          <span class="info-icon">
            <LazyImage 
              :src="getIconData('award').src" 
              :alt="getIconData('award').alt" 
              image-class="icon-img-md"
              container-class="info-icon-container"
            />
          </span>
          <span class="txt-p-sm">{{ companySize }}</span>
        </div>
      </li>
    </ul>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import LazyImage from '../common/LazyImage.vue'
import { resolveIcon, getDeviconSvgUrl as getDeviconSvgUrlUtil } from '../../utils/iconResolver.js'

export default {
  name: 'ProjectInfo',
  components: {
    ReusableCard,
    LazyImage
  },
  props: {
    title: {
      type: String,
      default: 'Project Information'
    },
    category: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    },
    projectDate: {
      type: String,
      required: true
    },
    projectUrl: {
      type: String,
      required: true
    },
    companySize: {
      type: String,
      required: true
    }
  },
  methods: {
    getIconData(iconName) {
      return resolveIcon(iconName)
    },
    
    getDeviconSvgUrl(iconName) {
      return getDeviconSvgUrlUtil(iconName)
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

.info-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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

