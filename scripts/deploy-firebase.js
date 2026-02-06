/**
 * Firebase Deployment Script with Build Number Tracking
 * Shows previous and new build numbers before deployment.
 * Supports multiple projects: waqas (default), ragnorx.
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const { getVersion } = require('./generate-sw-version.js')

/** Primary site is waqas.ragnorx.com (ragnorx). waqasahmad-portfolio 301s to it. */
const FIREBASE_PROJECTS = {
  waqas: {
    projectId: 'waqasahmad-portfolio',
    siteUrl: 'https://waqasahmad-portfolio.web.app',
    canonicalUrl: null,
    redirectOnly: true // 301 all traffic to waqas.ragnorx.com (main site)
  },
  ragnorx: {
    projectId: 'ragnorx-waqas',
    siteUrl: 'https://ragnorx-waqas.web.app',
    canonicalUrl: 'https://waqas.ragnorx.com', // main site
    redirectOnly: false
  }
}

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

function getDistBuildNumber() {
  try {
    const distSwPath = path.resolve(__dirname, '../dist/sw.js')
    if (fs.existsSync(distSwPath)) {
      const swContent = fs.readFileSync(distSwPath, 'utf-8')
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

function updateDistBuildNumber(buildNumber) {
  try {
    const distSwPath = path.resolve(__dirname, '../dist/sw.js')
    if (fs.existsSync(distSwPath)) {
      let swContent = fs.readFileSync(distSwPath, 'utf-8')
      swContent = swContent.replace(/const SERVICE_WORKER_VERSION = ['"](.*?)['"]/, `const SERVICE_WORKER_VERSION = '${buildNumber}'`)
      fs.writeFileSync(distSwPath, swContent, 'utf-8')
      return true
    }
  } catch (error) {
    console.error('Error updating dist/sw.js build number:', error.message)
    return false
  }
  return false
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
  'Install Dependencies': 'cyan',
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

function deployFirebase(environment = 'prod', manualBuildNumber = null, projectTarget = 'ragnorx') {
  const isBoth = projectTarget === 'both'
  const deployTargets = isBoth ? ['waqas', 'ragnorx'] : [projectTarget]
  const projectConfig = FIREBASE_PROJECTS[projectTarget] || (isBoth ? null : FIREBASE_PROJECTS.waqas)
  const firstConfig = isBoth ? FIREBASE_PROJECTS.waqas : projectConfig
  const firstProjectId = firstConfig.projectId
  const firstSiteUrl = (firstConfig.canonicalUrl || firstConfig.siteUrl).replace(/\/$/, '')

  showStepHeader('Firebase Deployment Script')
  
  // Get previous build number
  const previousBuild = getCurrentBuildNumber()
  const currentGitHash = getGitCommitHash()
  const commitMessage = getGitCommitMessage()
  const branch = getGitBranch()
  
  showStepHeader('Deployment Information')
  log(`   Project(s): ${isBoth ? 'waqas + ragnorx (both)' : `${projectTarget} (${firstProjectId})`}`, 'blue')
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
  
  // When deploying only waqas (redirect-only), skip build entirely.
  const redirectOnlyDeploy = deployTargets.length === 1 && FIREBASE_PROJECTS[deployTargets[0]].redirectOnly
  const buildCommand = environment === 'dev'
    ? 'npm run build:firebase:dev'
    : 'npm run build:firebase'

  // Use the full-site (canonical) base URL for build so sitemap/validate output and built assets use correct URLs.
  const fullSiteTarget = deployTargets.find((t) => !FIREBASE_PROJECTS[t].redirectOnly)
  const buildBaseUrl = fullSiteTarget
    ? (FIREBASE_PROJECTS[fullSiteTarget].canonicalUrl || FIREBASE_PROJECTS[fullSiteTarget].siteUrl).replace(/\/$/, '')
    : null
  const buildEnv = buildBaseUrl
    ? { ...process.env, FIREBASE_SITE_URL: buildBaseUrl, VITE_FIREBASE_SITE_URL: buildBaseUrl + '/' }
    : process.env

  let actualNewBuild = null
  try {
    if (redirectOnlyDeploy) {
      showStepHeader('Skipping Build')
      log('   Deploying redirect-only (waqasahmad-portfolio); no build needed.', 'cyan')
    }

    // If manual build number provided, update it before build
    if (!redirectOnlyDeploy && manualBuildNumber) {
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
    
    if (!redirectOnlyDeploy) {
      if (!skipInstall) {
        showStepHeader('Install Dependencies')
        const lockPath = path.resolve(__dirname, '../package-lock.json')
        const useCi = fs.existsSync(lockPath)
        const installCmd = useCi ? 'npm ci' : 'npm install'
        log(`   Running: ${installCmd} (same for dev and prod; full deps)`, 'cyan')
        try {
          execSync(installCmd, {
            stdio: 'inherit',
            cwd: path.resolve(__dirname, '..'),
            env: { ...process.env, NODE_ENV: 'development' }
          })
        } catch (e) {
          log(`   Install failed. Run "${installCmd}" manually and retry, or use --skip-install if deps are already installed.`, 'red')
          process.exit(1)
        }
      } else {
        showStepHeader('Install Dependencies')
        log(`   Skipped (--skip-install). Using existing node_modules.`, 'yellow')
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
      
      // Run each step with build env so sitemap/robots/validate use canonical URL
      for (const step of buildSteps) {
        execSync(step, { stdio: 'inherit', cwd: path.resolve(__dirname, '..'), env: buildEnv })
      }
      
      // After build, verify the manual build number is in dist/sw.js (the deployed file)
      const distBuildNumber = getDistBuildNumber()
      if (distBuildNumber !== manualBuildNumber) {
        log(`\nWarning: Build number in dist/sw.js doesn't match manual build number!`, 'yellow')
        log(`   Expected: ${manualBuildNumber}`, 'yellow')
        log(`   Found in dist/sw.js: ${distBuildNumber}`, 'yellow')
        log(`   Updating dist/sw.js with manual build number...`, 'yellow')
        const updated = updateDistBuildNumber(manualBuildNumber)
        if (updated) {
          log(`   Successfully updated dist/sw.js`, 'green')
        } else {
          log(`   Error: Failed to update dist/sw.js`, 'red')
        }
      }
    } else {
      execSync(buildCommand, { stdio: 'inherit', env: buildEnv })
    }
    }

    if (!redirectOnlyDeploy) {
      // Get actual new build number after build from dist/sw.js (the deployed file)
      actualNewBuild = getDistBuildNumber() || getCurrentBuildNumber()
      if (!actualNewBuild) {
        log(`\nWarning: Could not read build number after build!`, 'yellow')
      }

      // Verify manual build number was preserved in dist/sw.js
      if (manualBuildNumber) {
        const distBuild = getDistBuildNumber()
        if (distBuild !== manualBuildNumber) {
          log(`\nError: Manual build number was not preserved in dist/sw.js!`, 'red')
          log(`   Expected: ${manualBuildNumber}`, 'red')
          log(`   Found in dist/sw.js: ${distBuild}`, 'red')
          log(`   Attempting to fix...`, 'yellow')
          const fixed = updateDistBuildNumber(manualBuildNumber)
          if (fixed) {
            log(`   Fixed! Updated dist/sw.js with manual build number`, 'green')
            const verifyFix = getDistBuildNumber()
            if (verifyFix === manualBuildNumber) {
              log(`   Verified: dist/sw.js now has correct build number`, 'green')
            } else {
              log(`   Error: Still incorrect after fix attempt!`, 'red')
              process.exit(1)
            }
          } else {
            log(`   Error: Failed to fix dist/sw.js`, 'red')
            process.exit(1)
          }
        }
      }

      showStepHeader('Build Completed')
      log(`   Build Number: ${getDistBuildNumber() || getCurrentBuildNumber() || expectedNewBuild}`, 'green')
      log(`   Status: Success`, 'green')
      if (manualBuildNumber && getDistBuildNumber() === manualBuildNumber) {
        log(`   Verified: Manual build number preserved correctly`, 'green')
      }
    }

    // Deploy to Firebase (one project or both).
    // Run "firebase use" and "firebase deploy" in one shell so project selection persists
    // (avoids paths[1] bug on Windows when using --project; firebase-tools#8724).
    const defaultProject = 'waqasahmad-portfolio'
    const isWin = process.platform === 'win32'
    const join = isWin ? ' & ' : ' && '
    const firebaseDir = path.resolve(__dirname, '..', '.firebase')

    for (const target of deployTargets) {
      // Clear hosting hash cache before each project so the API's uploadRequiredHashes
      // match our local hashMap (avoids "paths[1] must be string" when backend returns stale hashes).
      if (fs.existsSync(firebaseDir)) {
        const files = fs.readdirSync(firebaseDir)
        for (const f of files) {
          if (f.startsWith('hosting.') && f.endsWith('.cache')) {
            const cachePath = path.join(firebaseDir, f)
            try {
              fs.unlinkSync(cachePath)
              log(`   Cleared hosting cache: .firebase/${f}`, 'cyan')
            } catch (e) {
              log(`   Warning: could not delete ${cachePath}: ${e.message}`, 'yellow')
            }
          }
        }
      }

      const config = FIREBASE_PROJECTS[target]
      const { projectId, siteUrl, canonicalUrl, redirectOnly } = config
      const baseUrl = (canonicalUrl || siteUrl).replace(/\/$/, '')
      showStepHeader('Deploying to Firebase')
      log(`   Project: ${target} (${projectId})`, 'cyan')
      if (redirectOnly) {
        log(`   Mode: 301 redirect only → https://waqas.ragnorx.com (main site)`, 'cyan')
      } else {
        log(`   Base URL for sitemap/robots: ${baseUrl}`, 'cyan')
      }
      log(`   Target: hosting only`, 'cyan')
      log(`   Environment: ${environment === 'dev' ? 'Development' : 'Production'}`, 'cyan')

      if (redirectOnly) {
        // Waqas project: deploy redirect-only so waqasahmad-portfolio.web.app 301s to waqas.ragnorx.com.
        execSync('node scripts/ensure-dist-redirect.js', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') })
        const deployCmd = `firebase use ${projectId}${join}firebase deploy --only hosting --config firebase.waqas-redirect.json`
        execSync(deployCmd, { stdio: 'inherit', shell: true })
        log(`   All requests 301 → https://waqas.ragnorx.com/`, 'green')
      } else {
        // Ragnorx: full site (main site at waqas.ragnorx.com) with sitemap/robots and URL rewrite.
        const deployEnv = { ...process.env, FIREBASE_SITE_URL: baseUrl, DEPLOY_SITEMAP_DIST_ONLY: '1' }
        try {
          execSync('node scripts/generate-sitemap.js', { stdio: 'inherit', cwd: path.resolve(__dirname, '..'), env: deployEnv })
          execSync('node scripts/write-robots-firebase.js', { stdio: 'inherit', cwd: path.resolve(__dirname, '..'), env: deployEnv })
        } catch (e) {
          log(`   Sitemap/robots step failed: ${e.message}`, 'red')
          process.exit(1)
        }
        const defaultOrigin = 'https://waqasahmad-portfolio.web.app'
        const distDir = path.resolve(__dirname, '..', 'dist')
        const indexPath = path.join(distDir, 'index.html')
        const llmsPath = path.join(distDir, 'llms.txt')
        if (baseUrl !== defaultOrigin) {
          const replaceOrigin = (content) => content.split(defaultOrigin).join(baseUrl)
          if (fs.existsSync(indexPath)) {
            fs.writeFileSync(indexPath, replaceOrigin(fs.readFileSync(indexPath, 'utf-8')), 'utf-8')
            log(`   Rewrote dist/index.html URLs to ${baseUrl}`, 'cyan')
          }
          if (fs.existsSync(llmsPath)) {
            fs.writeFileSync(llmsPath, replaceOrigin(fs.readFileSync(llmsPath, 'utf-8')), 'utf-8')
            log(`   Rewrote dist/llms.txt URLs to ${baseUrl}`, 'cyan')
          }
        }
        const deployCmd = `firebase use ${projectId}${join}firebase deploy --only hosting`
        execSync(deployCmd, { stdio: 'inherit', shell: true })
        log(`   Deployed: ${baseUrl}/`, 'green')
      }
    }
    execSync(`firebase use ${defaultProject}`, { stdio: 'inherit', shell: true })
    
    showStepHeader('Deployment Completed Successfully')
    log(`\nBuild Summary:`, 'bright')
    if (previousBuild) {
      log(`   Previous: ${previousBuild}`, 'yellow')
    }
    log(`   Current:  ${actualNewBuild || expectedNewBuild}`, 'green')
    if (isBoth) {
      log(`\nSite URLs:`, 'cyan')
      deployTargets.forEach((t) => {
        const u = (FIREBASE_PROJECTS[t].canonicalUrl || FIREBASE_PROJECTS[t].siteUrl).replace(/\/$/, '')
        log(`   ${t}: ${u}/`, 'cyan')
      })
    } else {
      log(`\nSite URL: ${firstSiteUrl}/`, 'cyan')
    }
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
const skipInstall = args.includes('--skip-install')

// Project target: --project ragnorx | --project waqas | -p ragnorx (default: ragnorx)
let projectTarget = 'ragnorx'
const projectIdx = args.findIndex((a) => a === '--project' || a === '-p')
if (projectIdx !== -1 && args[projectIdx + 1]) {
  const v = args[projectIdx + 1].toLowerCase()
  if (v === 'ragnorx' || v === 'waqas') projectTarget = v
  args.splice(projectIdx, 2)
}

// Check for manual build number
// Note: --version is reserved by npm, so we use --build or -b or -v instead
// Also handle case where npm strips --build and only passes the number
let manualBuildNumber = null

// First, try to find --build, -b, or -v flag
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
} else {
  // If --build was stripped by npm, look for standalone arguments that look like build numbers
  // Known flags that don't take values
  const flagsWithoutValues = ['--dev', '-d', '--help', '-h', '--skip-install']
  
  // Find standalone arguments (not flags and not flag values)
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    // Skip if it's a flag
    if (arg.startsWith('--') || arg.startsWith('-')) {
      // Check if it's a flag that takes a value
      if (!flagsWithoutValues.includes(arg)) {
        // This might be a flag with a value, skip the next arg too
        if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
          i++ // Skip the value
        }
      }
      continue
    }
    
    // This is a standalone argument - check if it looks like a build number
    // Build numbers can be: numbers, alphanumeric, with dots/dashes/underscores
    if (/^[a-zA-Z0-9._-]+$/.test(arg) && arg.length > 0) {
      // Make sure previous arg wasn't a flag that takes this as a value
      const prevArg = i > 0 ? args[i - 1] : null
      if (!prevArg || flagsWithoutValues.includes(prevArg) || prevArg.startsWith('-')) {
        manualBuildNumber = arg
        args.splice(i, 1)
        break
      }
    }
  }
}

// Show usage if help requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Firebase Deployment Script

Usage:
  node scripts/deploy-firebase.js [options]

Options:
  --project, -p <target> Deploy target: waqas | ragnorx (default: both)
  --dev, -d              Deploy to development environment
  --build, -b <number>   Manually specify build number
  -v <number>            Alias for --build (note: --version is reserved by npm)
  --skip-install         Skip npm ci/install (use existing node_modules)
  --help, -h             Show this help message

Projects:
  (default) → deploy to BOTH waqas and ragnorx (one build, two deploys)
  waqas     → 301 redirect only (waqasahmad-portfolio.web.app → waqas.ragnorx.com)
  ragnorx   → full site = main site at waqas.ragnorx.com (canonical)

Examples:
  npm run deploy:firebase:prod              # deploy to both
  npm run deploy:firebase:prod -- 1234      # deploy to both with build 1234
  npm run deploy:firebase:prod:waqas        # deploy to waqas only
  npm run deploy:firebase:prod:ragnorx       # deploy to ragnorx only
  npm run deploy:firebase:dev
  npm run deploy:firebase:dev:ragnorx
  npm run deploy:firebase:prod -- --project ragnorx
  npm run deploy:firebase:prod -- --build v2.0.0 --project ragnorx
`)
  process.exit(0)
}

deployFirebase(environment, manualBuildNumber, projectTarget)
