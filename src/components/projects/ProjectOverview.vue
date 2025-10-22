<template>
  <ReusableCard :title="title" class="mb-4">
    <div class="project-overview-content">
      <div v-for="(section, index) in formattedContent" :key="index" class="overview-section">
        <h4 v-if="section.isHeader" class="section-header txt-h4-xl">
          <div class="section-icon-wrapper icon-wrapper-xl">
            <img src="/assets/img/Icons/diamond.png" alt="Diamond" class="diamond-icon icon-img-xl" />
          </div>
          {{ section.text }}
        </h4>
        <div v-else-if="section.isList" class="section-list">
          <div v-for="(item, itemIndex) in section.items" :key="itemIndex" class="list-item">
            <span class="bullet">•</span>
            <span class="item-text">{{ item }}</span>
          </div>
        </div>
        <p v-else class="section-text">{{ section.text }}</p>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'ProjectOverview',
  components: {
    ReusableCard
  },
  props: {
    title: {
      type: String,
      default: 'Project Overview'
    },
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedContent() {
      const sections = []
      const paragraphs = this.content.split('\n\n\n')
      
      paragraphs.forEach(paragraph => {
        const lines = paragraph.trim().split('\n')
        const firstLine = lines[0]
        
        // Check if it's a header (ends with colon)
        if (firstLine.endsWith(':')) {
          sections.push({
            isHeader: true,
            text: firstLine.replace(':', ''),
            isList: false
          })
          
          // Check if the next lines are a list
          const remainingLines = lines.slice(1).filter(line => line.trim())
          if (remainingLines.length > 0 && remainingLines[0].startsWith('•')) {
            sections.push({
              isHeader: false,
              isList: true,
              items: remainingLines.map(line => line.replace('•', '').trim())
            })
          } else {
            // Regular text content
            const textContent = remainingLines.join(' ').trim()
            if (textContent) {
              sections.push({
                isHeader: false,
                isList: false,
                text: textContent
              })
            }
          }
        } else {
          // Regular paragraph
          const textContent = lines.join(' ').trim()
          if (textContent) {
            sections.push({
              isHeader: false,
              isList: false,
              text: textContent
            })
          }
        }
      })
      
      return sections
    }
  }
}
</script>

<style scoped>
.project-overview-content {
  line-height: 1.6;
}

.overview-section {
  margin-bottom: 1.5rem;
}

.section-header {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-text {
  margin: 0;
  color: #374151;
  line-height: 1.6;
}

.section-list {
  margin-left: 0;
}

.list-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.bullet {
  color: #7c3aed;
  font-weight: bold;
  flex-shrink: 0;
  font-size: 1.1rem;
  margin-top: 0.1rem;
  min-width: 1.2rem;
}

.item-text {
  color: #374151;
  line-height: 1.5;
  flex: 1;
}
</style>

