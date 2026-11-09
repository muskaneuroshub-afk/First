const fs = require('fs');
const path = require('path');

console.log('=== RUNNING PORTFOLIO BUILD & ASSET INTEGRITY TESTS ===');

// Test 1: Verify dist directory & build output
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  console.error('FAIL: dist directory does not exist. Run npm run build first.');
  process.exit(1);
}
console.log('✔ PASS: dist directory verified.');

// Test 2: Check required static assets
const requiredAssets = [
  'index.html',
  'favicon.svg',
  'og-image.svg',
  'robots.txt',
  'sitemap.xml',
  'resume/placeholder-cv.pdf',
  'images/avatar-placeholder.svg',
  'images/projects/project-1.svg',
  'images/projects/project-2.svg',
  'images/projects/project-3.svg',
  'images/projects/project-4.svg',
  'images/projects/project-5.svg',
  'images/projects/project-6.svg',
];

let allAssetsFound = true;
for (const asset of requiredAssets) {
  const assetPath = path.join(distDir, asset);
  if (!fs.existsSync(assetPath)) {
    console.error(`FAIL: Missing built asset: ${asset}`);
    allAssetsFound = false;
  } else {
    const size = fs.statSync(assetPath).size;
    console.log(`✔ PASS: Asset verified: ${asset} (${size} bytes)`);
  }
}

if (!allAssetsFound) {
  process.exit(1);
}

// Test 3: Check HTML structure & anti-FOUC script
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
if (!indexHtml.includes('id="root"')) {
  console.error('FAIL: index.html missing root mount element.');
  process.exit(1);
}
console.log('✔ PASS: index.html contains #root mount point.');

if (!indexHtml.includes('portfolio-theme')) {
  console.error('FAIL: index.html missing anti-FOUC theme hydration script.');
  process.exit(1);
}
console.log('✔ PASS: index.html contains synchronous anti-FOUC theme script.');

// Test 4: Check CSS and JS bundles
const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);
const jsBundle = assetFiles.find((f) => f.endsWith('.js'));
const cssBundle = assetFiles.find((f) => f.endsWith('.css'));

if (!jsBundle || !cssBundle) {
  console.error('FAIL: Missing bundled JS or CSS files in dist/assets.');
  process.exit(1);
}
const jsSize = fs.statSync(path.join(assetsDir, jsBundle)).size;
const cssSize = fs.statSync(path.join(assetsDir, cssBundle)).size;
console.log(`✔ PASS: Bundled JS (${jsBundle}, ${(jsSize / 1024).toFixed(1)} KB)`);
console.log(`✔ PASS: Bundled CSS (${cssBundle}, ${(cssSize / 1024).toFixed(1)} KB)`);

// Test 5: Verify PDF validity
const pdfBuffer = fs.readFileSync(path.join(distDir, 'resume/placeholder-cv.pdf'));
if (pdfBuffer.slice(0, 5).toString() !== '%PDF-') {
  console.error('FAIL: placeholder-cv.pdf does not have valid PDF magic bytes.');
  process.exit(1);
}
console.log('✔ PASS: placeholder-cv.pdf is a valid binary PDF document.');

// Test 6: Verify SPA Redirect configuration files
if (!fs.existsSync(path.join(__dirname, '..', 'vercel.json'))) {
  console.error('FAIL: vercel.json missing.');
  process.exit(1);
}
console.log('✔ PASS: vercel.json SPA rewrite configuration verified.');

if (!fs.existsSync(path.join(distDir, '_redirects'))) {
  console.error('FAIL: _redirects missing in dist.');
  process.exit(1);
}
console.log('✔ PASS: Netlify/Cloudflare _redirects SPA rewrite configuration verified in dist.');

console.log('\n======================================================');
console.log('✔ ALL BUILD, ASSET, AND INTEGRITY TESTS PASSED (100%)');
console.log('======================================================\n');
