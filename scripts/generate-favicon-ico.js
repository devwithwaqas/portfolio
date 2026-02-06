/**
 * Generate favicon.ico from PNG for Google Search visibility
 * Google requires favicon.ico at root level, minimum 48x48 pixels
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prefer favicon-sample.png so one source drives all icons; fallback to existing 512.
const SOURCE_PNG = fs.existsSync(path.join(__dirname, '../public/favicon-sample.png'))
  ? path.join(__dirname, '../public/favicon-sample.png')
  : path.join(__dirname, '../public/assets/img/favicon-512.png');
const OUTPUT_ICO = path.join(__dirname, '../public/favicon.ico');
const OUTPUT_PNG_48 = path.join(__dirname, '../public/favicon-48x48.png');
const OUTPUT_PNG_32 = path.join(__dirname, '../public/favicon-32x32.png');
const OUTPUT_PNG_16 = path.join(__dirname, '../public/favicon-16x16.png');

async function generateFavicons() {
  console.log('Generating favicons for Google Search visibility...');
  
  try {
    // Check if source exists
    if (!fs.existsSync(SOURCE_PNG)) {
      console.error('Source favicon-512.png not found at:', SOURCE_PNG);
      process.exit(1);
    }
    
    // Generate 48x48 PNG (Google's minimum requirement)
    await sharp(SOURCE_PNG)
      .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(OUTPUT_PNG_48);
    console.log('✓ Created favicon-48x48.png');
    
    // Generate 32x32 PNG
    await sharp(SOURCE_PNG)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(OUTPUT_PNG_32);
    console.log('✓ Created favicon-32x32.png');
    
    // Generate 16x16 PNG
    await sharp(SOURCE_PNG)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(OUTPUT_PNG_16);
    console.log('✓ Created favicon-16x16.png');
    
    // Create ICO file (multi-resolution)
    // ICO format: simple concatenation of PNG data with ICO header
    const png16 = await sharp(SOURCE_PNG).resize(16, 16).png().toBuffer();
    const png32 = await sharp(SOURCE_PNG).resize(32, 32).png().toBuffer();
    const png48 = await sharp(SOURCE_PNG).resize(48, 48).png().toBuffer();
    
    // Create ICO file with PNG images embedded
    const icoBuffer = createIcoFromPngs([png16, png32, png48]);
    fs.writeFileSync(OUTPUT_ICO, icoBuffer);
    console.log('✓ Created favicon.ico (16x16, 32x32, 48x48)');
    
    console.log('\n✅ Favicons generated successfully!');
    console.log('   Place favicon.ico at root level for Google Search visibility');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

/**
 * Create ICO file from PNG buffers
 */
function createIcoFromPngs(pngBuffers) {
  const numImages = pngBuffers.length;
  
  // ICO header: 6 bytes
  // ICONDIR entry: 16 bytes per image
  const headerSize = 6 + (numImages * 16);
  
  // Calculate total size
  let totalDataSize = 0;
  const imageSizes = pngBuffers.map(buf => {
    totalDataSize += buf.length;
    return buf.length;
  });
  
  const icoBuffer = Buffer.alloc(headerSize + totalDataSize);
  
  // Write ICO header
  icoBuffer.writeUInt16LE(0, 0);       // Reserved (0)
  icoBuffer.writeUInt16LE(1, 2);       // Type (1 = ICO)
  icoBuffer.writeUInt16LE(numImages, 4); // Number of images
  
  // Write ICONDIR entries and image data
  let dataOffset = headerSize;
  const sizes = [16, 32, 48];
  
  for (let i = 0; i < numImages; i++) {
    const entryOffset = 6 + (i * 16);
    const size = sizes[i];
    
    icoBuffer.writeUInt8(size === 256 ? 0 : size, entryOffset);     // Width
    icoBuffer.writeUInt8(size === 256 ? 0 : size, entryOffset + 1); // Height
    icoBuffer.writeUInt8(0, entryOffset + 2);                        // Color palette
    icoBuffer.writeUInt8(0, entryOffset + 3);                        // Reserved
    icoBuffer.writeUInt16LE(1, entryOffset + 4);                     // Color planes
    icoBuffer.writeUInt16LE(32, entryOffset + 6);                    // Bits per pixel
    icoBuffer.writeUInt32LE(imageSizes[i], entryOffset + 8);         // Image size
    icoBuffer.writeUInt32LE(dataOffset, entryOffset + 12);           // Image offset
    
    // Copy PNG data
    pngBuffers[i].copy(icoBuffer, dataOffset);
    dataOffset += imageSizes[i];
  }
  
  return icoBuffer;
}

generateFavicons();
