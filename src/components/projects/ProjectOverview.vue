<template>
  <ReusableCard :title="title" class="mb-4">
    <p class="txt-p-md">{{ content }}</p>
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
      default: '📊 Project Overview'
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* No additional styles needed - uses ReusableCard */
</style>

