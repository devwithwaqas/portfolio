<template>
  <!-- Compact Diagram Toolbar - View Controls Only (No Narration) -->
  <div class="diagram-toolbar-compact">
    <div class="toolbar-main-row">
      <!-- View Controls (Centered) -->
      <div class="toolbar-group view-group view-group-centered">
        <button class="toolbar-btn primary" title="Zoom into diagram" @click="$emit('zoomIn')">
          <img :src="$assetPath('/assets/img/Icons/zoom in.png')" alt="Zoom In" class="icon-md icon-wrapper-md">
        </button>
        <button class="toolbar-btn primary" title="Zoom out of diagram" @click="$emit('zoomOut')">
          <img :src="$assetPath('/assets/img/Icons/zoom out.png')" alt="Zoom Out" class="icon-md icon-wrapper-md">
        </button>
        <button class="toolbar-btn primary" title="Fit diagram to initial size" @click="$emit('fitToInitialSize')">
          <img :src="$assetPath('/assets/img/Icons/fit to view.png')" alt="Fit to Initial Size" class="icon-md icon-wrapper-md">
        </button>
        <button class="toolbar-btn primary" title="Reset view to default" @click="$emit('resetView')">
          <img :src="$assetPath('/assets/img/Icons/reset view.png')" alt="Reset View" class="icon-md icon-wrapper-md">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiagramToolbarViewOnly',
  emits: ['zoomIn', 'zoomOut', 'fitToInitialSize', 'resetView']
}
</script>

<style scoped>
/* Compact Diagram Toolbar */
.diagram-toolbar-compact {
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.9), rgba(40, 35, 65, 0.95));
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.4);
  backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.diagram-toolbar-compact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 25%, #2ed573 75%, #667eea 100%);
  opacity: 0.8;
}

.toolbar-main-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
}

.toolbar-group {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
}

.toolbar-group::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.toolbar-group.view-group.view-group-centered {
  justify-content: center;
  border-left: 3px solid #667eea;
}

.toolbar-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.toolbar-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.toolbar-btn:hover::before {
  left: 100%;
}

.toolbar-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(139, 92, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.toolbar-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.2);
}

.toolbar-btn.primary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-color: rgba(102, 126, 234, 0.4);
}

.toolbar-btn.primary:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  border-color: rgba(102, 126, 234, 0.6);
}

.icon-md {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.icon-wrapper-md {
  filter: brightness(0) invert(1);
  opacity: 0.9;
}

.toolbar-btn:hover .icon-wrapper-md {
  opacity: 1;
  filter: brightness(0) invert(1) drop-shadow(0 0 4px rgba(102, 126, 234, 0.8));
}
</style>
