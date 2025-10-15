<template>
  <span :class="wrapperClass">
    <!-- Devicon -->
    <i v-if="iconData && iconData.type === 'devicon'" :class="deviconClass + ' ' + iconClass"></i>
    <!-- Local Image -->
    <img v-else-if="iconData && iconData.type === 'local'" :src="iconData.src" :alt="iconData.alt" :class="imageClass" />
    <!-- Emoji Fallback -->
    <span v-else :class="iconClass">{{ iconData && iconData.type === 'emoji' ? iconData.src : fallbackEmoji }}</span>
  </span>
</template>

<script>
import { resolveIcon, getDeviconClass } from '../../utils/iconResolver.js'

export default {
  name: 'IconComponent',
  props: {
    iconName: {
      type: String,
      required: true
    },
    fallbackEmoji: {
      type: String,
      default: '📋'
    },
    size: {
      type: String,
      default: 'md', // xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].includes(value)
    }
  },
  data() {
    return {
      iconData: null
    }
  },
  mounted() {
    this.iconData = resolveIcon(this.iconName)
  },
  computed: {
    deviconClass() {
      if (this.iconData && this.iconData.type === 'devicon') {
        return getDeviconClass(this.iconData.src)
      }
      return null
    },
    wrapperClass() {
      return `icon-wrapper-${this.size}`
    },
    iconClass() {
      return `icon-${this.size}`
    },
    imageClass() {
      return `icon-img-${this.size}`
    }
  }
}
</script>

<style scoped>
.icon-wrapper-xs, .icon-wrapper-sm, .icon-wrapper-md, 
.icon-wrapper-lg, .icon-wrapper-xl, .icon-wrapper-2xl,
.icon-wrapper-3xl, .icon-wrapper-4xl, .icon-wrapper-5xl, .icon-wrapper-6xl {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.12) 0%, 
    rgba(236, 72, 153, 0.1) 100%
  );
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Size-specific vertical alignment adjustments using transform for optical centering */
.icon-wrapper-xs {
  transform: translateY(1px);
}

.icon-wrapper-sm {
  transform: translateY(1px);
}

.icon-wrapper-md {
  transform: translateY(2px);
}

.icon-wrapper-lg {
  transform: translateY(2px);
}

.icon-wrapper-xl {
  transform: translateY(3px);
}

.icon-wrapper-2xl {
  transform: translateY(3px);
}

.icon-wrapper-3xl {
  transform: translateY(4px);
}

.icon-wrapper-4xl {
  transform: translateY(4px);
}

.icon-wrapper-5xl {
  transform: translateY(5px);
}

.icon-wrapper-6xl {
  transform: translateY(5px);
}

/* Hover effects with preserved translateY for each size */
.icon-wrapper-xs:hover, .icon-wrapper-sm:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(1px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-md:hover, .icon-wrapper-lg:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(2px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-xl:hover, .icon-wrapper-2xl:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(3px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-3xl:hover, .icon-wrapper-4xl:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(4px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.icon-wrapper-5xl:hover, .icon-wrapper-6xl:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.16) 100%);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(5px) scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
</style>
