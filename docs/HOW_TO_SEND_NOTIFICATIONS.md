# 📱 How to Send Notifications

Guide for sending browser notifications after users have granted permission.

## ✅ Prerequisites

- User has granted notification permission
- Service worker is registered and active
- Site is served over HTTPS (or localhost)

## 🚀 Methods to Send Notifications

### Method 1: Programmatic (From Your Code)

Send notifications directly from your Vue components or JavaScript:

```javascript
import { showSimpleNotification, showNotification } from '@/utils/notifications'

// Simple notification
await showSimpleNotification(
  'New Update Available!',
  'Check out the latest features and improvements.',
  '/' // URL to open when clicked
)

// Advanced notification with options
await showNotification('Custom Title', {
  body: 'Custom message with more details',
  icon: '/assets/img/favicon-192.png',
  badge: '/assets/img/favicon.png',
  tag: 'update-notification',
  requireInteraction: false,
  data: { url: '/projects' },
  vibrate: [200, 100, 200]
})
```

**Where to use:**
- After form submission
- When new content is available
- For important announcements
- User engagement triggers

### Method 2: Push Notifications (From Server)

Send notifications from your backend/server:

**Step 1: Set up Push Service**

You'll need a push service like:
- Firebase Cloud Messaging (FCM)
- Web Push Protocol
- OneSignal
- Pusher

**Step 2: Subscribe User**

```javascript
// Get push subscription
const registration = await navigator.serviceWorker.ready
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
})

// Send subscription to your server
await fetch('/api/push/subscribe', {
  method: 'POST',
  body: JSON.stringify(subscription)
})
```

**Step 3: Send from Server**

Your server sends push message → Service worker receives `push` event → Notification shown automatically

**Example (Node.js with web-push):**
```javascript
const webpush = require('web-push')
webpush.sendNotification(subscription, JSON.stringify({
  title: 'New Update!',
  body: 'Check out the latest features',
  icon: '/assets/img/favicon-192.png',
  url: '/'
}))
```

### Method 3: Scheduled/Time-Based

Trigger notifications at specific times:

```javascript
// Example: Send notification after 24 hours
setTimeout(() => {
  showSimpleNotification(
    'Welcome Back!',
    'Check out what\'s new since your last visit.',
    '/'
  )
}, 24 * 60 * 60 * 1000) // 24 hours
```

## 📝 Example Use Cases

### 1. New Project Added
```javascript
// In your admin panel or after deployment
showSimpleNotification(
  'New Project Added! 🎉',
  'Check out the latest project in my portfolio.',
  '/projects/new-project-name'
)
```

### 2. Blog Post Published
```javascript
showSimpleNotification(
  'New Article Published',
  'Read about the latest trends in software engineering.',
  '/blog/latest-article'
)
```

### 3. Service Update
```javascript
showNotification('Service Update', {
  body: 'New service offerings now available. Check them out!',
  data: { url: '/services' },
  tag: 'service-update'
})
```

## 🔧 Testing Notifications

**In Browser Console:**
```javascript
// Import the function (if using modules)
import { showSimpleNotification } from './src/utils/notifications.js'

// Or if exposed globally:
window.showTestNotification = async () => {
  const { showSimpleNotification } = await import('./src/utils/notifications.js')
  await showSimpleNotification('Test', 'This is a test notification!')
}

// Then call:
showTestNotification()
```

## ⚠️ Important Notes

1. **Permission Required**: User must grant permission first
2. **HTTPS Required**: Notifications only work over HTTPS (or localhost)
3. **Service Worker**: Must be registered and active
4. **User Engagement**: Browsers may limit notifications if user doesn't interact
5. **Rate Limiting**: Don't spam - browsers may block excessive notifications

## 🎯 Best Practices

- **Be Relevant**: Only send notifications users care about
- **Be Timely**: Send at appropriate times
- **Be Clear**: Use clear, concise messages
- **Respect User**: Allow users to disable notifications
- **Test First**: Always test notifications before sending to all users

## 📚 Related Files

- `src/utils/notifications.js` - Notification utility functions
- `public/sw.js` - Service worker (handles push events)
- `src/main.js` - Initializes notifications
