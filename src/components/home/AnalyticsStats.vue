<template>
  <div class="analytics-stats-container" v-if="showStats || loading">
    <!-- Total Views Card -->
    <div class="analytics-total-card">
      <div class="analytics-icon-wrapper">
        <i class="bi bi-eye-fill analytics-icon"></i>
      </div>
      <div class="analytics-content">
        <div class="analytics-label">Total Views</div>
        <div class="analytics-value" v-if="!loading">{{ formattedTotalViews }}</div>
        <div class="analytics-value" v-else style="opacity: 0.5;">Loading...</div>
      </div>
    </div>

    <!-- Top 3 Most Viewed Items -->
    <div class="analytics-top-items" v-if="topItems.length > 0">
      <div class="analytics-top-label">
        <i class="bi bi-fire analytics-fire-icon"></i>
        <span>Most Viewed</span>
      </div>
      <div class="analytics-items-list">
        <router-link
          v-for="(item, index) in topItems.slice(0, 3)"
          :key="index"
          :to="item.url"
          class="analytics-item"
        >
          <div class="analytics-item-rank">{{ index + 1 }}</div>
          <div class="analytics-item-content">
            <div class="analytics-item-name">{{ item.name }}</div>
            <div class="analytics-item-views">{{ formatViews(item.views) }} views</div>
          </div>
          <i class="bi bi-chevron-right analytics-item-arrow"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { fetchAnalyticsData, formatViews } from '../../utils/analyticsData.js'

export default {
  name: 'AnalyticsStats',
  setup() {
    const totalViews = ref(0)
    const topItems = ref([])
    const loading = ref(true)

    const formattedTotalViews = computed(() => {
      return formatViews(totalViews.value)
    })

    const showStats = computed(() => {
      // Show if we have data OR if we're still loading (to show loading state)
      return totalViews.value > 0 || topItems.value.length > 0 || loading.value
    })

    const loadAnalyticsData = async () => {
      try {
        loading.value = true
        console.log('[AnalyticsStats] Fetching analytics data...')
        const data = await fetchAnalyticsData()
        console.log('[AnalyticsStats] Received data:', data)
        totalViews.value = data.totalViews || 0
        topItems.value = data.topItems || []
        console.log('[AnalyticsStats] Total views:', totalViews.value, 'Top items:', topItems.value.length)
      } catch (error) {
        console.error('[AnalyticsStats] Failed to load analytics:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadAnalyticsData()
      // Refresh every 5 minutes
      const refreshInterval = setInterval(loadAnalyticsData, 5 * 60 * 1000)
      
      // Cleanup on unmount
      return () => clearInterval(refreshInterval)
    })

    return {
      totalViews,
      topItems,
      formattedTotalViews,
      showStats,
      formatViews,
      loading
    }
  }
}
</script>

<style scoped>
/* Analytics Stats Container */
.analytics-stats-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(30, 10, 60, 0.4) 0%, rgba(20, 5, 40, 0.5) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(167, 139, 250, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(124, 58, 237, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
  width: 100%;
  /* Prevent layout shifts - reserve space */
  min-height: 120px; /* Reserve space for content */
  contain: layout style paint; /* CSS containment */
  /* Don't start with opacity: 0 - it causes layout shift when it appears */
  /* Animation will handle the fade-in without layout shift */
}

.analytics-stats-container:hover {
  border-color: rgba(167, 139, 250, 0.4);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 8px 24px rgba(124, 58, 237, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(0); /* Don't translate - just fade to prevent layout shift */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Total Views Card */
.analytics-total-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%);
  border-radius: 10px;
  border: 1px solid rgba(167, 139, 250, 0.2);
  flex-shrink: 0;
  min-width: 200px;
}

.analytics-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(124, 58, 237, 0.2) 100%);
  border-radius: 10px;
  border: 1px solid rgba(167, 139, 250, 0.3);
  flex-shrink: 0;
}

.analytics-icon {
  font-size: 20px;
  color: #a78bfa;
  filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.6));
}

.analytics-content {
  flex: 1;
}

.analytics-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin-bottom: 4px;
}

.analytics-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
  line-height: 1.2;
}

/* Top Items Section */
.analytics-top-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.analytics-top-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(167, 139, 250, 0.2);
}

.analytics-fire-icon {
  color: #ff6b6b;
  filter: drop-shadow(0 0 6px rgba(255, 107, 107, 0.5));
  font-size: 16px;
}

.analytics-items-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.analytics-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(167, 139, 250, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 0;
}

.analytics-item:hover {
  background: rgba(167, 139, 250, 0.1);
  border-color: rgba(167, 139, 250, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(167, 139, 250, 0.2);
}

.analytics-item-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(124, 58, 237, 0.2) 100%);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  color: #a78bfa;
  flex-shrink: 0;
  align-self: flex-start;
}

.analytics-item-content {
  flex: 1;
  min-width: 0;
  width: 100%;
}

.analytics-item-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  min-height: 2.8em;
}

.analytics-item-views {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.analytics-item-arrow {
  display: none;
  font-size: 16px;
  color: rgba(167, 139, 250, 0.6);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.analytics-item:hover .analytics-item-arrow {
  color: #a78bfa;
  transform: translateX(4px);
}

/* Responsive Design - Using existing patterns */
@media (max-width: 992px) {
  .analytics-stats-container {
    flex-direction: column;
    padding: 14px;
    gap: 12px;
    margin-bottom: 20px;
  }

  .analytics-total-card {
    padding: 12px;
    gap: 10px;
    width: 100%;
    min-width: unset;
  }

  .analytics-top-items {
    width: 100%;
  }

  .analytics-items-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .analytics-icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .analytics-icon {
    font-size: 18px;
  }

  .analytics-value {
    font-size: 1.375rem;
  }
}

@media (max-width: 768px) {
  .analytics-stats-container {
    margin-top: 16px;
    margin-bottom: 18px;
    padding: 12px;
    gap: 10px;
    flex-direction: column;
  }

  .analytics-total-card {
    gap: 10px;
    padding: 10px;
    width: 100%;
  }

  .analytics-top-items {
    width: 100%;
  }

  .analytics-items-list {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .analytics-item {
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 10px;
  }

  .analytics-item-arrow {
    display: block;
    font-size: 16px;
    color: rgba(167, 139, 250, 0.6);
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .analytics-item:hover .analytics-item-arrow {
    color: #a78bfa;
    transform: translateX(4px);
  }

  .analytics-item-name {
    -webkit-line-clamp: 1;
    min-height: unset;
    white-space: nowrap;
  }

  .analytics-icon-wrapper {
    width: 32px;
    height: 32px;
  }

  .analytics-icon {
    font-size: 16px;
  }

  .analytics-value {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .analytics-stats-container {
    margin-top: 16px;
    padding: 12px;
    gap: 10px;
    border-radius: 12px;
  }

  .analytics-total-card {
    flex-direction: column;
    text-align: center;
    gap: 10px;
    padding: 12px;
  }

  .analytics-content {
    text-align: center;
  }

  .analytics-value {
    font-size: 1.25rem;
  }

  .analytics-top-label {
    font-size: 0.8125rem;
  }

  .analytics-item {
    padding: 10px;
  }

  .analytics-item-rank {
  width: 30px;
  height: 30px;
    font-size: 0.8125rem;
  }

  .analytics-item-name {
    font-size: 0.8125rem;
  }

  .analytics-item-views {
    font-size: 0.6875rem;
  }
}
</style>