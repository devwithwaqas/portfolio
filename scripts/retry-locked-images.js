const { optimizeGalleryImage } = require('./optimize-gallery-images.js');
const fs = require('fs');
const path = require('path');
const IMG_DIR = path.resolve(__dirname, '../public/assets/img');
const RETRY_IMAGES = [
  { basename: 'aa1', dir: '' },
  { basename: 'bat1', dir: '' },
  { basename: 'bat2', dir: '' },
  { basename: 'bat3', dir: '' },
  { basename: 'bat4', dir: '' },
  { basename: 'gd2', dir: '' },
  { basename: 'gd4', dir: '' },
  { basename: 'in1', dir: '' },
  { basename: 'in2', dir: '' },
  { basename: 'in3', dir: '' },
  { basename: 'microservices-banner-1', dir: 'services' }
];
async function main() {
  console.log('ðŸ”„ Retrying optimization for locked files...\n');
  console.log(`ðŸ“ ${IMG_DIR}\n`);
  if (!fs.existsSync(IMG_DIR)) {
    console.error(`âŒ Directory not found: ${IMG_DIR}`);
    process.exit(1);
  }
  const done = [];
  const skipped = [];
  const errors = [];
  for (const { basename, dir } of RETRY_IMAGES) {
    const candidates = [`${basename}.jpg`, `${basename}.jpeg`, `${basename}.png`];
    let inputPath = null;
    for (const c of candidates) {
      const p = dir ? path.join(IMG_DIR, dir, c) : path.join(IMG_DIR, c);
      if (fs.existsSync(p)) {
        inputPath = p;
        break;
      }
    }
    if (!inputPath) {
      skipped.push(dir ? `${dir}/${basename}` : basename);
      console.log(`â­ï¸  Skip ${basename}: file not found`);
      continue;
    }
    console.log(`\nðŸ”„ Retrying: ${basename}${dir ? ` (${dir})` : ''}`);
    const res = await optimizeGalleryImage(inputPath, basename, dir);
    if (res.error) {
      errors.push(res);
    } else if (res.optimized) {
      done.push(res);
    } else {
      skipped.push(dir ? `${dir}/${basename}` : basename);
    }
  }
  console.log('\n' + '='.repeat(60));
  console.log('ðŸ“Š Retry Summary');
  console.log('='.repeat(60));
  console.log(`âœ… Optimized: ${done.length} images`);
  if (skipped.length) console.log(`â­ï¸  Skipped: ${skipped.join(', ')}`);
  if (errors.length) {
    console.log(`âŒ Errors: ${errors.length}`);
    errors.forEach(err => console.log(`   - ${err.basename}: ${err.message}`));
  }
  console.log('\nâœ… Done.');
  if (errors.length > 0) {
    process.exit(1);
  }
}
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
module.exports = { main, RETRY_IMAGES };