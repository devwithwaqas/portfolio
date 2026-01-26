/**
 * Firebase Deployment Script with Build Number Tracking
 * Shows previous and new build numbers before deployment
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { getVersion } = require('./generate-sw-version.js')

// Colors for terminal output (no emojis)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function getCurrentBuildNumber() {
  try {
    const swPath = path.resolve(__dirname, '../public/sw.js')
    if (fs.existsSync(swPath)) {
      const swContent = fs.readFileSync(swPath, 'utf-8')
      const match = swContent.match(/const SERVICE_WORKER_VERSION = ['"](.*?)['"]/)
      if (match) {
        return match[1]
      }
    }
  } catch (error) {
    // Ignore
  }
  return null
}

function getGitCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim()
  } catch (error) {
    return null
  }
}

function getGitCommitMessage() {
  try {
    return execSync('git log -1 --pretty=%B', { encoding: 'utf-8' }).trim()
  } catch (error) {
    return null
  }
}

function getGitBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()
  } catch (error) {
    return null
  }
}

function updateBuildNumber(buildNumber) {
  try {
    // Update service worker version
    const swPath = path.resolve(__dirname, '../public/sw.js')
    if (fs.existsSync(swPath)) {
      let swContent = fs.readFileSync(swPath, 'utf-8')
      swContent = swContent.replace(/const SERVICE_WORKER_VERSION = ['"](.*?)['"]/, `const SERVICE_WORKER_VERSION = '${buildNumber}'`)
      fs.writeFileSync(swPath, swContent, 'utf-8')
    }
    
    // Update main.js expected version
    const mainJsPath = path.resolve(__dirname, '../src/main.js')
    if (fs.existsSync(mainJsPath)) {
      let mainContent = fs.readFileSync(mainJsPath, 'utf-8')
      mainContent = mainContent.replace(/const EXPECTED_SW_VERSION = ['"](.*?)['"]/, `const EXPECTED_SW_VERSION = '${buildNumber}'`)
      fs.writeFileSync(mainJsPath, mainContent, 'utf-8')
    }
    
    return true
  } catch (error) {
    console.error('Error updating build number:', error.message)
    return false
  }
}

// Color scheme for different step types
const stepColors = {
  'Firebase Deployment Script': 'cyan',
  'Deployment Information': 'blue',
  'Build Numbers': 'yellow',
  'Setting Manual Build Number': 'magenta',
  'Starting Build Process': 'cyan',
  'Build Completed': 'green',
  'Deploying to Firebase': 'blue',
  'Deployment Completed Successfully': 'green',
  'Deployment failed!': 'red'
}

function showStepHeader(title) {
  const color = stepColors[title] || 'cyan'
  log('\n' + '='.repeat(60), color)
  log(title, 'bright')
  log('='.repeat(60), color)
}

function deployFirebase(environment = 'prod', manualBuildNumber = null) {
  showStepHeader('Firebase Deployment Script')
  
  // Get previous build number
  const previousBuild = getCurrentBuildNumber()
  const currentGitHash = getGitCommitHash()
  const commitMessage = getGitCommitMessage()
  const branch = getGitBranch()
  
  showStepHeader('Deployment Information')
  log(`   Environment: ${environment === 'dev' ? 'Development' : 'Production'}`, 'blue')
  if (branch) {
    log(`   Branch: ${branch}`, 'blue')
  }
  if (currentGitHash) {
    log(`   Git Commit: ${currentGitHash}`, 'blue')
  }
  if (commitMessage) {
    log(`   Commit Message: ${commitMessage.split('\n')[0]}`, 'blue')
  }
  if (manualBuildNumber) {
    log(`   Manual Build Number: ${manualBuildNumber}`, 'yellow')
  }
  
  showStepHeader('Build Numbers')
  if (previousBuild) {
    log(`   Previous Build: ${previousBuild}`, 'yellow')
  } else {
    log(`   Previous Build: (none - first deployment)`, 'yellow')
  }
  
  // Get expected new build number
  let expectedNewBuild
  if (manualBuildNumber) {
    expectedNewBuild = manualBuildNumber
    log(`   New Build (Manual): ${expectedNewBuild}`, 'green')
  } else {
    expectedNewBuild = getVersion()
    log(`   Expected New Build (Auto): ${expectedNewBuild}`, 'green')
  }
  
  if (previousBuild && previousBuild === expectedNewBuild) {
    log(`\nWarning: Build number may not change!`, 'yellow')
    log(`   This might mean no new commits since last deployment.`, 'yellow')
    log(`   Service worker cache may not update for users.`, 'yellow')
  }
  
  // Determine which build command to run
  const buildCommand = environment === 'dev' 
    ? 'npm run build:firebase:dev'
    : 'npm run build:firebase'
  
  try {
    // If manual build number provided, update it before build
    if (manualBuildNumber) {
      showStepHeader('Setting Manual Build Number')
      log(`   Updating build number to: ${manualBuildNumber}`, 'cyan')
      const updated = updateBuildNumber(manualBuildNumber)
      if (updated) {
        log(`   Build number updated successfully`, 'green')
      } else {
        log(`   Error: Failed to update build number`, 'red')
        process.exit(1)
      }
    }
    
    showStepHeader('Starting Build Process')
    log(`   Command: ${buildCommand}`, 'cyan')
    log(`   Build number will be: ${expectedNewBuild}`, 'cyan')
    if (manualBuildNumber) {
      log(`   Note: Using manual build number`, 'yellow')
    }
    
    // Run build (but skip version generation if manual build number provided)
    if (manualBuildNumber) {
      // Build without running generate-sw-version.js since we already set it manually
      const buildSteps = environment === 'dev'
        ? [
            'node scripts/cleanup-dist.js',
            'vite build --mode firebase-dev',
            'node scripts/copy-404.js',
            'node scripts/create-nojekyll.js',
            'node scripts/create-headers.js',
            'node scripts/copy-llms-txt.js',
            'node scripts/generate-sitemap.js',
            'node scripts/write-robots-firebase.js',
            'node scripts/validate-sitemap.js',
            'node scripts/generate-sw.js'
          ]
        : [
            'node scripts/cleanup-dist.js',
            'vite build --mode firebase',
            'node scripts/copy-404.js',
            'node scripts/create-nojekyll.js',
            'node scripts/create-headers.js',
            'node scripts/copy-llms-txt.js',
            'node scripts/generate-sitemap.js',
            'node scripts/write-robots-firebase.js',
            'node scripts/validate-sitemap.js',
            'node scripts/generate-sw.js'
          ]
      
      // Run each step
      for (const step of buildSteps) {
        execSync(step, { stdio: 'inherit', cwd: path.resolve(__dirname, '..') })
      }
      
      // After build, verify the manual build number is still in public/sw.js
      // (generate-sw.js reads from it, so it should be preserved)
      const verifyBuild = getCurrentBuildNumber()
      if (verifyBuild !== manualBuildNumber) {
        log(`\nWarning: Build number may have been overwritten!`, 'yellow')
        log(`   Expected: ${manualBuildNumber}`, 'yellow')
        log(`   Found: ${verifyBuild}`, 'yellow')
        log(`   Re-applying manual build number...`, 'yellow')
        updateBuildNumber(manualBuildNumber)
      }
    } else {
      execSync(buildCommand, { stdio: 'inherit' })
    }
    
    // Get actual new build number after build
    const actualNewBuild = getCurrentBuildNumber()
    if (!actualNewBuild) {
      log(`\nWarning: Could not read build number after build!`, 'yellow')
    }
    
    // Verify manual build number was preserved
    if (manualBuildNumber && actualNewBuild !== manualBuildNumber) {
      log(`\nError: Manual build number was not preserved!`, 'red')
      log(`   Expected: ${manualBuildNumber}`, 'red')
      log(`   Actual: ${actualNewBuild}`, 'red')
      log(`   The build number may have been overwritten during build.`, 'red')
      process.exit(1)
    }
    
    showStepHeader('Build Completed')
    log(`   Build Number: ${actualNewBuild || expectedNewBuild}`, 'green')
    log(`   Status: Success`, 'green')
    if (manualBuildNumber && actualNewBuild === manualBuildNumber) {
      log(`   Verified: Manual build number preserved correctly`, 'green')
    }
    
    // Deploy to Firebase
    showStepHeader('Deploying to Firebase')
    log(`   Project: waqasahmad-portfolio`, 'cyan')
    log(`   Target: hosting only`, 'cyan')
    log(`   Environment: ${environment === 'dev' ? 'Development' : 'Production'}`, 'cyan')
    
    execSync('firebase deploy --only hosting --project waqasahmad-portfolio', { stdio: 'inherit' })
    
    showStepHeader('Deployment Completed Successfully')
    log(`\nBuild Summary:`, 'bright')
    if (previousBuild) {
      log(`   Previous: ${previousBuild}`, 'yellow')
    }
    log(`   Current:  ${actualNewBuild || expectedNewBuild}`, 'green')
    log(`\nSite URL: https://waqasahmad-portfolio.web.app/`, 'cyan')
    log(`\n`, 'reset')
    
  } catch (error) {
    log(`\nDeployment failed!`, 'red')
    log(`   Error: ${error.message}`, 'red')
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const environment = args.includes('--dev') || args.includes('-d') ? 'dev' : 'prod'

// Check for manual build number
// Note: --version is reserved by npm, so we use --build or -b or -v instead
let manualBuildNumber = null
const buildIndex = args.findIndex((arg, index) => {
  if (arg === '--build' || arg === '-b' || arg === '-v') {
    return args[index + 1] && !args[index + 1].startsWith('-')
  }
  return false
})
if (buildIndex !== -1 && args[buildIndex + 1]) {
  manualBuildNumber = args[buildIndex + 1]
  // Remove the flag and value from args to avoid confusion
  args.splice(buildIndex, 2)
}

// Show usage if help requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Firebase Deployment Script

Usage:
  node scripts/deploy-firebase.js [options]

Options:
  --dev, -d              Deploy to development environment
  --build, -b <number>   Manually specify build number
  -v <number>            Alias for --build (note: --version is reserved by npm)
  --help, -h             Show this help message

Examples:
  npm run deploy:firebase:dev
  npm run deploy:firebase:prod
  npm run deploy:firebase:dev -- --build v1.2.3
  npm run deploy:firebase:dev -- -b custom-build-123
  npm run deploy:firebase:dev -- -v test-456
  npm run deploy:firebase:prod -- --build v2.0.0
`)
  process.exit(0)
}

deployFirebase(environment, manualBuildNumber)
