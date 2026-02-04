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
import { resolveIcon, getDeviconSvgUrl as getDeviconSvgUrlUtil } from '../../utils/iconResolver.js'
import { handleError } from '../../utils/errorHandler.js'

// Lazy load Chart.js only when needed
let Chart = null
let chartComponents = null

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
      chartInstances: [],
      isMounted: false
    }
  },
  async mounted() {
    this.isMounted = true
    
    // Lazy load Chart.js only when component is mounted
    if (!Chart) {
      try {
        const chartModule = await import('chart.js')
        Chart = chartModule.Chart
        chartComponents = {
          ArcElement: chartModule.ArcElement,
          LineElement: chartModule.LineElement,
          BarElement: chartModule.BarElement,
          PointElement: chartModule.PointElement,
          BarController: chartModule.BarController,
          LineController: chartModule.LineController,
          DoughnutController: chartModule.DoughnutController,
          PolarAreaController: chartModule.PolarAreaController,
          CategoryScale: chartModule.CategoryScale,
          LinearScale: chartModule.LinearScale,
          RadialLinearScale: chartModule.RadialLinearScale,
          Filler: chartModule.Filler,
          Legend: chartModule.Legend,
          Title: chartModule.Title,
          Tooltip: chartModule.Tooltip
        }
        
        // Register only the components we need
        Chart.register(
          chartComponents.ArcElement,
          chartComponents.LineElement,
          chartComponents.BarElement,
          chartComponents.PointElement,
          chartComponents.BarController,
          chartComponents.LineController,
          chartComponents.DoughnutController,
          chartComponents.PolarAreaController,
          chartComponents.CategoryScale,
          chartComponents.LinearScale,
          chartComponents.RadialLinearScale,
          chartComponents.Filler,
          chartComponents.Legend,
          chartComponents.Title,
          chartComponents.Tooltip
        )
      } catch (error) {
        console.error('Failed to load Chart.js:', error)
        return
      }
    }
    
    // Wait for DOM to be fully rendered before initializing charts
    this.$nextTick(() => {
      if (!this.isMounted) return
      // Add a small delay to ensure canvas elements are rendered
      setTimeout(() => {
        if (this.isMounted) {
          this.initializeCharts()
        }
      }, 100)
    })
  },
  watch: {
    charts: {
      handler() {
        // Re-initialize charts when the prop changes
        if (!this.isMounted) return
        this.destroyCharts()
        this.$nextTick(() => {
          if (this.isMounted) {
            setTimeout(() => {
              if (this.isMounted) {
                this.initializeCharts()
              }
            }, 100)
          }
        })
      },
      deep: true
    }
  },
  beforeUnmount() {
    this.isMounted = false
    this.destroyCharts()
  },
  methods: {
    getChartColumnClass(width) {
      // Return Bootstrap column class based on chart width
      // width can be: 'full' (12 cols), 'half' (6 cols), 'third' (4 cols), 'quarter' (3 cols)
      const widthMap = {
        'full': 'col-12',
        'half': 'col-12 col-md-6',
        'third': 'col-12 col-md-6 col-lg-4',
        'quarter': 'col-12 col-md-6 col-lg-3',
        // Also support numeric values
        '12': 'col-12',
        '6': 'col-12 col-md-6',
        '4': 'col-12 col-md-6 col-lg-4',
        '3': 'col-12 col-md-6 col-lg-3'
      }
      
      // Default to full width if width not specified or unknown
      return widthMap[width] || widthMap['full']
    },
    
    getChartIcon(iconName) {
      return resolveIcon(iconName)
    },
    
    getDeviconSvgUrl(iconName) {
      return getDeviconSvgUrlUtil(iconName)
    },
    
    /**
     * Normalize chart options to ensure plugins are properly structured.
     * Prevents "Cannot read properties of undefined" errors in Chart.js.
     * The error "Cannot read properties of undefined (reading 'disabled')" occurs
     * when Chart.js tries to access plugin properties that aren't initialized.
     */
    normalizeChartOptions(options) {
      if (!options || typeof options !== 'object') {
        return {}
      }
      
      // Deep clone to avoid mutating original
      const normalized = JSON.parse(JSON.stringify(options))
      
      // Ensure plugins object exists and is properly structured
      if (!normalized.plugins) {
        normalized.plugins = {}
      }
      
      // Ensure all plugin configurations are complete objects (not null/undefined)
      Object.keys(normalized.plugins).forEach(pluginKey => {
        if (!normalized.plugins[pluginKey] || typeof normalized.plugins[pluginKey] !== 'object') {
          // If plugin config is invalid, remove it to prevent errors
          delete normalized.plugins[pluginKey]
        } else {
          // Ensure plugin config is a proper object
          normalized.plugins[pluginKey] = { ...normalized.plugins[pluginKey] }
        }
      })
      
      // Ensure legend plugin has required structure if it exists
      if (normalized.plugins.legend) {
        normalized.plugins.legend = {
          display: normalized.plugins.legend.display !== false,
          ...normalized.plugins.legend
        }
        // Ensure labels object exists and is properly structured
        if (normalized.plugins.legend.labels) {
          normalized.plugins.legend.labels = {
            ...normalized.plugins.legend.labels
          }
        }
      }
      
      // Ensure tooltip plugin has required structure if it exists
      if (normalized.plugins.tooltip) {
        normalized.plugins.tooltip = {
          enabled: normalized.plugins.tooltip.enabled !== false,
          ...normalized.plugins.tooltip
        }
      }
      
      return normalized
    },
    
    destroyCharts() {
      // Destroy all chart instances to prevent memory leaks
      this.chartInstances.forEach(chart => {
        if (chart) {
          try {
            // Mark chart as unmounted before destroying
            if (chart._componentMounted) {
              chart._componentMounted.value = false
            }
            chart.destroy()
          } catch (error) {
            // Silently fail - chart destruction is optional
            // Errors here are expected when navigating away quickly
          }
        }
      })
      this.chartInstances = []
    },
    
    initializeCharts() {
      if (!this.isMounted) {
        return
      }
      
      if (!this.charts || !Array.isArray(this.charts)) {
        return
      }
      
      if (this.charts.length === 0) {
        return
      }
      
      // Destroy existing charts first
      this.destroyCharts()
      
      if (!Chart) {
        return
      }
      
      this.charts.forEach((chartConfig, index) => {
        if (!this.isMounted) {
          return
        }
        
        if (!chartConfig || !chartConfig.id) {
          return
        }
        
        const canvas = document.getElementById(chartConfig.id)
        if (!canvas) {
          return
        }
        
        // Verify canvas is still in DOM
        if (!canvas.isConnected || !document.body.contains(canvas)) {
          return
        }
        
        try {
          // Double-check component is still mounted before accessing canvas
          if (!this.isMounted) {
            return
          }
          
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            return
          }
          
          // Check if context is still valid (not destroyed)
          try {
            ctx.save()
            ctx.restore()
          } catch (e) {
            // Canvas context is invalid, likely due to navigation
            console.log(`[Chart] Canvas context invalid for "${chartConfig.id}" - likely due to navigation. Skipping chart creation.`)
            return
          }
          
          // Normalize options to ensure plugins are properly structured
          const normalizedOptions = this.normalizeChartOptions(chartConfig.options || {})
          
          const chartInstance = new Chart(ctx, {
            type: chartConfig.type,
            data: chartConfig.data,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: false, // Disable animations to prevent issues during navigation
              ...normalizedOptions,
              // Add error handling for plugins
              onHover: (event, activeElements) => {
                try {
                  // Default hover behavior
                } catch (e) {
                  // Ignore hover errors
                }
              }
            }
          })
          
          // Store component mounted state reference on chart instance
          const componentMountedRef = { value: this.isMounted }
          chartInstance._componentMounted = componentMountedRef
          
          // Wrap chart methods to catch plugin errors
          const originalUpdate = chartInstance.update.bind(chartInstance)
          chartInstance.update = function(mode, transition) {
            try {
              // Check if component is still mounted before updating
              if (!componentMountedRef.value) {
                return this
              }
              return originalUpdate(mode, transition)
            } catch (error) {
              // Check if error is due to navigation/unmounting
              const isNavigationError = error.message?.includes('null') || 
                                       error.message?.includes('undefined') ||
                                       error.message?.includes('save') ||
                                       error.message?.includes('disabled') ||
                                       !componentMountedRef.value
              
              if (isNavigationError) {
                // Friendly message for navigation-related errors (only log once per chart)
                if (!this._navigationErrorLogged) {
                  console.log(`[Chart] Charts failed to render for "${chartConfig.id}" due to navigation. This is expected when navigating away quickly.`)
                  this._navigationErrorLogged = true
                }
              } else if (import.meta.env.DEV || import.meta.env.MODE === 'firebase-dev') {
                console.log(`[Chart] Error updating chart "${chartConfig.id}":`, error)
              }
              // Return chart instance to prevent further errors
              return this
            }
          }
          
          const originalDraw = chartInstance.draw.bind(chartInstance)
          chartInstance.draw = function() {
            try {
              // Check if component is still mounted before drawing
              if (!componentMountedRef.value) {
                return this
              }
              return originalDraw()
            } catch (error) {
              // Check if error is due to navigation/unmounting
              const isNavigationError = error.message?.includes('null') || 
                                       error.message?.includes('undefined') ||
                                       error.message?.includes('save') ||
                                       error.message?.includes('disabled') ||
                                       !componentMountedRef.value
              
              if (isNavigationError) {
                // Friendly message for navigation-related errors (only log once per chart)
                if (!this._navigationErrorLogged) {
                  console.log(`[Chart] Charts failed to render for "${chartConfig.id}" due to navigation. This is expected when navigating away quickly.`)
                  this._navigationErrorLogged = true
                }
              } else if (import.meta.env.DEV || import.meta.env.MODE === 'firebase-dev') {
                console.log(`[Chart] Error drawing chart "${chartConfig.id}":`, error)
              }
              // Return chart instance to prevent further errors
              return this
            }
          }
          
          if (this.isMounted) {
            this.chartInstances.push(chartInstance)
          } else {
            // Component unmounted during chart creation, destroy it
            try {
              chartInstance.destroy()
            } catch (e) {
              // Ignore destruction errors
            }
          }
        } catch (error) {
          // Check if error is due to navigation/unmounting
          const isNavigationError = error.message?.includes('null') || 
                                   error.message?.includes('undefined') ||
                                   error.message?.includes('save') ||
                                   error.message?.includes('disabled') ||
                                   !this.isMounted
          
          if (isNavigationError) {
            // Friendly message for navigation-related errors
            console.log(`[Chart] Charts failed to initialize for "${chartConfig.id}" due to navigation. This is expected when navigating away quickly.`)
          } else {
            // Log other chart initialization errors for debugging
            if (import.meta.env.DEV || import.meta.env.MODE === 'firebase-dev') {
              console.log(`[PerformanceMetricsSection] Error initializing chart "${chartConfig.id}":`, error)
            }
            // Report to error handler for backend logging in prod
            handleError(error, `chart.init.${chartConfig.id}`)
          }
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

.stat-orange {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.95));
}

.stat-teal {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.9), rgba(15, 118, 110, 0.95));
}

.stat-indigo {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(79, 70, 229, 0.95));
}

.stat-red {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.95));
}

.stat-yellow {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.95));
}

.stat-cyan {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(8, 145, 178, 0.95));
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
  min-height: 300px;
}

.chart-canvas-wrapper canvas {
  max-width: 100%;
  height: auto !important;
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
