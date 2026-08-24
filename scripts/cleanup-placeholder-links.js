const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const replacements = {
  'pages/tests.html': 'contact.html',
  'pages/packages.html': 'contact.html',
  'pages/doctors.html': 'doctor-details.html'
};

for (const [file, target] of Object.entries(replacements)) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, 'utf8');
  html = html.replaceAll('href="#"', `href="${target}"`);
  html = html.replaceAll('₹', '$');
  html = html.replaceAll(' · ', ' - ');
  fs.writeFileSync(fullPath, html, 'utf8');
}

for (const file of [
  'pages/blog-ai-pathology.html',
  'pages/blog-fasting-blood-sugar.html',
  'pages/blog-lipid-profile.html',
  'pages/blog-preventive-screening.html',
  'pages/blog-vitamin-d.html'
]) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, 'utf8');
  html = html.replaceAll(' · ', ' - ');
  fs.writeFileSync(fullPath, html, 'utf8');
}
