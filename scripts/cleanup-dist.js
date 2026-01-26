// Cleanup dist directory before build (handles Windows file locking)
// This script safely removes the dist folder with retries

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cleanupDist() {
  if (!fs.existsSync(distPath)) {
    console.log('[OK] Dist directory doesn\'t exist, nothing to clean');
    return;
  }

  console.log('Cleaning dist directory...');
  
  const maxRetries = 5;
  let retryDelay = 1000; // milliseconds
  
  for (let i = 1; i <= maxRetries; i++) {
    try {
      // Try to remove the directory
      fs.rmSync(distPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      console.log('[OK] Dist directory cleaned successfully');
      return;
    } catch (error) {
      if (i === maxRetries) {
        console.error('[ERROR] Failed to clean dist directory after', maxRetries, 'attempts');
        console.error('Error:', error.message);
        console.log('');
        console.log('Troubleshooting steps:');
        console.log('1. Close any file explorers or processes using files in dist/');
        console.log('2. Close any antivirus software temporarily');
        console.log('3. Manually delete the dist folder and try again');
        process.exit(1);
      } else {
        console.log(`Attempt ${i} failed, retrying in ${retryDelay / 1000} seconds...`);
        await sleep(retryDelay);
        retryDelay = retryDelay * 2; // Exponential backoff
      }
    }
  }
}

cleanupDist().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
