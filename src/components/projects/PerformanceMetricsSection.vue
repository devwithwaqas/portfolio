<template>
  <div class="performance-metrics-section" data-aos="fade-up">
    
    <!-- Main Title -->
    <h3 class="metrics-main-title txt-h3-2xl">Enhanced Performance Metrics & Analytics</h3>
    <p class="performance-subtitle txt-p-md">Real-time system performance monitoring and advanced analytics dashboard</p>
    
    <!-- Stats Cards Row (4 columns) -->
    <div class="stats-cards-grid">
      <div 
        v-for="(stat, index) in stats" 
        :key="index" 
        class="stat-card"
        :class="`stat-${stat.color}`"
      >
        <div class="stat-value txt-h2-3xl">{{ stat.value }}</div>
        <div class="stat-label txt-p-sm">{{ stat.label }}</div>
      </div>
    </div>
    
    <!-- Charts Section -->
    <div class="charts-section row g-4">
      
      <!-- Dynamic Chart Rendering -->
      <div 
        v-for="(chart, index) in charts" 
        :key="index"
        :class="getChartColumnClass(chart.width)"
      >
        <div class="chart-container">
          <h4 class="chart-title txt-h4-lg chart-title-with-icon">
            <span class="chart-icon icon-xl">
              <img v-if="getChartIcon(chart.icon).type === 'local'" 
                   :src="getChartIcon(chart.icon).src" 
                   :alt="getChartIcon(chart.icon).alt" 
                   class="icon-img-xl" />
              <img v-else-if="getChartIcon(chart.icon).type === 'devicon'" 
                   :src="getDeviconSvgUrl(getChartIcon(chart.icon).src)"
                   :alt="getChartIcon(chart.icon).alt"
                   class="icon-img-xl" />
              <span v-else class="icon-xl">{{ getChartIcon(chart.icon).src }}</span>
            </span>
            <span class="chart-title-text">{{ chart.title }}</span>
          </h4>
          <div class="chart-canvas-wrapper">
            <canvas :id="chart.id"></canvas>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { 
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  DoughnutController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js'
import { resolveIcon, getDeviconSvgUrl as getDeviconSvgUrlUtil } from '../../utils/iconResolver.js'

// Register only the components we need
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  LineController,
  DoughnutController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Filler,
  Legend,
  Title,
  Tooltip
)

export default {
  name: 'PerformanceMetricsSection',
  props: {
    stats: {
      type: Array,
      required: true
    },
    charts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartInstances: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeCharts()
    })
  },
  beforeUnmount() {
    // Destroy all chart instances to prevent memory leaks
    this.chartInstances.forEach(chart => {
      if (chart) {
        chart.destroy()
      }
    })
  },
  methods: {
    getChartColumnClass(width) {
      if (width === 'full') {
        return 'col-12'
      }
      return 'col-md-6 col-12'
    },
    
    getChartIcon(iconName) {
      return resolveIcon(iconName)
    },
    
    getDeviconSvgUrl(iconName) {
      return getDeviconSvgUrlUtil(iconName)
    },
    
    initializeCharts() {
      if (!this.charts || !Array.isArray(this.charts)) {
        console.warn('PerformanceMetricsSection: charts prop is not defined or not an array')
        return
      }
      
      this.charts.forEach(chartConfig => {
        const canvas = document.getElementById(chartConfig.id)
        if (canvas) {
          const ctx = canvas.getContext('2d')
          const chartInstance = new Chart(ctx, {
            type: chartConfig.type,
            data: chartConfig.data,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              ...chartConfig.options
            }
          })
          this.chartInstances.push(chartInstance)
        }
      })
    }
  }
}
</script>

<style scoped>
.performance-metrics-section {
  background: 
    radial-gradient(ellipse at top, 
      rgba(168, 85, 247, 0.4) 0%, 
      rgba(138, 43, 226, 0.35) 25%,
      rgba(147, 51, 234, 0.3) 50%,
      rgba(124, 58, 237, 0.35) 75%,
      rgba(109, 40, 217, 0.4) 100%
    ),
    linear-gradient(135deg, 
      rgba(20, 10, 40, 0.98) 0%, 
      rgba(30, 15, 50, 0.99) 50%,
      rgba(20, 10, 40, 0.98) 100%
    );
  padding: 40px 30px;
  border-radius: 20px;
  border: 2px solid rgba(139, 92, 246, 0.5);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(139, 92, 246, 0.4),
    0 0 80px rgba(168, 85, 247, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.metrics-main-title {
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.performance-subtitle {
  color: #6b7280;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Stats Cards Grid */
.stats-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  padding: 25px 20px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.stat-value {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.stat-label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Stat Card Colors */
.stat-green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.95));
}

.stat-purple {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(124, 58, 237, 0.95));
}

.stat-pink {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(219, 39, 119, 0.95));
}

.stat-blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.95));
}

/* Charts Section */
.charts-section {
  margin-top: 30px;
}

.chart-container {
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.15);
  transition: all 0.3s ease;
  height: 100%;
}

.chart-container:hover {
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
  transform: translateY(-2px);
}

.chart-title {
  color: #7c3aed;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.chart-title-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.chart-icon {
  flex-shrink: 0;
}

.chart-title-text {
  flex: 1;
}

.chart-canvas-wrapper {
  position: relative;
  height: 350px;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .performance-metrics-section {
    padding: 30px 20px;
  }
  
  .stats-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  
  .chart-container {
    padding: 20px;
  }
  
  .chart-canvas-wrapper {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .stats-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
