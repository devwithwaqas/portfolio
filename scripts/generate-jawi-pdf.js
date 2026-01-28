const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match A4 landscape
    await page.setViewport({
      width: 1123,
      height: 794,
      deviceScaleFactor: 2
    });
    
    // Get the absolute path to the HTML file
    const htmlPath = path.join(__dirname, '..', 'public', 'jawi-kad-dalil.html');
    const htmlFile = `file:///${htmlPath.replace(/\\/g, '/')}`;
    
    console.log('Loading HTML file:', htmlFile);
    await page.goto(htmlFile, { 
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    // Wait for fonts to load
    try {
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      });
    } catch (e) {
      console.log('Font loading check skipped');
    }
    
    // Wait for CSS and rendering
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'public', 'jawi-kad-dalil.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      margin: {
        top: '0.2cm',
        right: '0.2cm',
        bottom: '0.2cm',
        left: '0.2cm'
      },
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 1.0
    });
    
    await browser.close();
    
    console.log(`\n✅ PDF generated successfully at: ${pdfPath}`);
    console.log(`📄 File size: ${(fs.statSync(pdfPath).size / 1024).toFixed(2)} KB\n`);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
})();
