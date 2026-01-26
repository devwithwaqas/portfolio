/**
 * Firebase Deployment Script with Build Number Tracking
 * Shows previous and new build numbers before deployment
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { getVersion } = require('./generate-sw-version.js')

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
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

function deployFirebase(environment = 'prod') {
  log('\n' + '='.repeat(60), 'cyan')
  log('🚀 Firebase Deployment Script', 'bright')
  log('='.repeat(60), 'cyan')
  
  // Get previous build number
  const previousBuild = getCurrentBuildNumber()
  const currentGitHash = getGitCommitHash()
  const commitMessage = getGitCommitMessage()
  const branch = getGitBranch()
  
  log(`\n📋 Deployment Information:`, 'bright')
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
  
  log(`\n📦 Build Numbers:`, 'bright')
  if (previousBuild) {
    log(`   Previous Build: ${previousBuild}`, 'yellow')
  } else {
    log(`   Previous Build: (none - first deployment)`, 'yellow')
  }
  
  // Get expected new build number (will be generated during build)
  const expectedNewBuild = getVersion()
  log(`   Expected New Build: ${expectedNewBuild}`, 'green')
  
  if (previousBuild && previousBuild === expectedNewBuild) {
    log(`\n⚠️  Warning: Build number may not change!`, 'yellow')
    log(`   This might mean no new commits since last deployment.`, 'yellow')
    log(`   Service worker cache may not update for users.`, 'yellow')
  }
  
  log(`\n🔨 Starting build process...`, 'bright')
  log(`   This will generate build number during build`, 'cyan')
  
  // Determine which build command to run
  const buildCommand = environment === 'dev' 
    ? 'npm run build:firebase:dev'
    : 'npm run build:firebase'
  
  try {
    // Run build
    log(`\n📝 Running: ${buildCommand}`, 'cyan')
    execSync(buildCommand, { stdio: 'inherit' })
    
    // Get actual new build number after build
    const actualNewBuild = getCurrentBuildNumber()
    if (!actualNewBuild) {
      log(`\n⚠️  Warning: Could not read build number after build!`, 'yellow')
    }
    
    log(`\n✅ Build completed successfully!`, 'green')
    log(`   Build Number: ${actualNewBuild || expectedNewBuild}`, 'green')
    
    // Deploy to Firebase
    log(`\n🚀 Deploying to Firebase...`, 'bright')
    log(`   Project: waqasahmad-portfolio`, 'cyan')
    log(`   Target: hosting only`, 'cyan')
    
    execSync('firebase deploy --only hosting --project waqasahmad-portfolio', { stdio: 'inherit' })
    
    log(`\n${'='.repeat(60)}`, 'cyan')
    log(`✅ Deployment completed successfully!`, 'green')
    log(`\n📊 Build Summary:`, 'bright')
    if (previousBuild) {
      log(`   Previous: ${previousBuild}`, 'yellow')
    }
    log(`   Current:  ${actualNewBuild || expectedNewBuild}`, 'green')
    log(`\n🌐 Site URL: https://waqasahmad-portfolio.web.app/`, 'cyan')
    log(`${'='.repeat(60)}\n`, 'cyan')
    
  } catch (error) {
    log(`\n❌ Deployment failed!`, 'red')
    log(`   Error: ${error.message}`, 'red')
    process.exit(1)
  }
}

// Get environment from command line args
const args = process.argv.slice(2)
const environment = args.includes('--dev') || args.includes('-d') ? 'dev' : 'prod'

deployFirebase(environment)
