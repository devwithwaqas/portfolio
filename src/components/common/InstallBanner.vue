<template>
  <Teleport to="body">
    <div v-if="showBanner" class="install-banner" :class="{ 'install-banner-visible': showBanner }">
      <div class="install-banner-content">
        <div class="install-banner-icon">
          <i class="bi bi-download icon-lg"></i>
        </div>
        <div class="install-banner-text">
          <div class="install-banner-title">Install App</div>
          <div class="install-banner-description">Install this app for a better experience</div>
        </div>
        <div class="install-banner-actions">
          <button @click="handleInstall" class="install-banner-button install-banner-button-primary">
            Install
          </button>
          <button @click="dismissBanner" class="install-banner-button install-banner-button-secondary">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { showInstallPrompt, isInstallPromptAvailable } from '@/utils/installPrompt.js'

export default {
  name: 'InstallBanner',
  data() {
    return {
      showBanner: false,
      dismissed: false
    }
  },
  mounted() {
    // Listen for install prompt availability
    window.addEventListener('installprompt-available', this.onInstallPromptAvailable)
    
    // Check if prompt is already available
    if (isInstallPromptAvailable()) {
      this.showBanner = true
    }
  },
  beforeUnmount() {
    window.removeEventListener('installprompt-available', this.onInstallPromptAvailable)
  },
  methods: {
    onInstallPromptAvailable() {
      // Show banner after a short delay to let page load
      setTimeout(() => {
        if (!this.dismissed && !this.isAppInstalled()) {
          this.showBanner = true
        }
      }, 2000)
    },
    async handleInstall() {
      const accepted = await showInstallPrompt()
      if (accepted) {
        this.showBanner = false
      }
    },
    dismissBanner() {
      this.showBanner = false
      this.dismissed = true
      // Remember dismissal in sessionStorage (resets on new session)
      sessionStorage.setItem('install-banner-dismissed', 'true')
    },
    isAppInstalled() {
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.navigator.standalone === true
    }
  },
  created() {
    // Check if user dismissed in this session
    if (sessionStorage.getItem('install-banner-dismissed') === 'true') {
      this.dismissed = true
    }
    
    // Don't show if already installed
    if (this.isAppInstalled()) {
      this.dismissed = true
    }
  }
}
</script>

<style scoped>
.install-banner {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  z-index: 10000;
  max-width: 600px;
  width: calc(100% - 40px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.install-banner-visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: all;
}

.install-banner-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  color: white;
}

.install-banner-icon {
  flex-shrink: 0;
  font-size: 24px;
  color: white;
}

.install-banner-text {
  flex: 1;
  min-width: 0;
}

.install-banner-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.2;
}

.install-banner-description {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.3;
}

.install-banner-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.install-banner-button {
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.install-banner-button-primary {
  background: white;
  color: #667eea;
}

.install-banner-button-primary:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.install-banner-button-primary:active {
  transform: translateY(0);
}

.install-banner-button-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.install-banner-button-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .install-banner {
    bottom: 10px;
    width: calc(100% - 20px);
  }
  
  .install-banner-content {
    padding: 12px 16px;
    gap: 12px;
  }
  
  .install-banner-title {
    font-size: 15px;
  }
  
  .install-banner-description {
    font-size: 13px;
  }
  
  .install-banner-button {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .install-banner-button-secondary {
    padding: 8px 10px;
  }
}
</style>
