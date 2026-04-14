const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../..');

const regex = /<section class="banner-placeholder-section"[^>]*>[\s\S]*?<\/section>\s*/g;
const regex2 = /<section class="banner-placeholder-section\s+is-soft"[^>]*>[\s\S]*?<\/section>\s*/g;
const regex3 = /<section class="banner-placeholder-section[\s\S]*?<\/section>\s*/g; // Just a generic fallback just in case

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.html')) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    const newContent = content.replace(regex3, '');
    if (newContent !== content) {
      fs.writeFileSync(path.join(dir, file), newContent);
      console.log('Removed placeholder banner from ' + file);
    }
  }
});
