const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function getVersion() {
  try {
    const gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim()
    const timestamp = Date.now().toString(36)
    return gitHash || `t${timestamp}`
  } catch (error) {
    const timestamp = Date.now().toString(36)
    return `t${timestamp}`
  }
}

function updateServiceWorkerVersion() {
  const swPath = path.resolve(__dirname, '../public/sw.js')
  const version = getVersion()
  if (!fs.existsSync(swPath)) {
    console.warn('[WARN] sw.js not found, skipping version update')
    return version
  }
  let swContent = fs.readFileSync(swPath, 'utf-8')
  swContent = swContent.replace(/const SERVICE_WORKER_VERSION = ['"](.*?)['"]/, `const SERVICE_WORKER_VERSION = '${version}'`)
  fs.writeFileSync(swPath, swContent, 'utf-8')
  console.log(`[OK] Updated service worker version to: ${version}`)
  return version
}

function updateMainJsVersion(version) {
  const mainJsPath = path.resolve(__dirname, '../src/main.js')
  if (!fs.existsSync(mainJsPath)) {
    console.warn('[WARN] main.js not found, skipping version update')
    return
  }
  let mainContent = fs.readFileSync(mainJsPath, 'utf-8')
  mainContent = mainContent.replace(/const EXPECTED_SW_VERSION = ['"](.*?)['"]/, `const EXPECTED_SW_VERSION = '${version}'`)
  fs.writeFileSync(mainJsPath, mainContent, 'utf-8')
  console.log(`[OK] Updated main.js expected version to: ${version}`)
}

if (require.main === module) {
  const version = updateServiceWorkerVersion()
  updateMainJsVersion(version)
  console.log(`\n[OK] Service Worker versioning complete: ${version}`)
}

module.exports = { getVersion, updateServiceWorkerVersion, updateMainJsVersion }
