const fs = require('fs');
const path = require('path');
const dir = 'c:/offbeat/Clients/Digital Agency/AIPEX WORLDWIDE/shipmyspree/FINAL WEBSITE/assets/css';

const newNav = `/* NAV */
#nav{position:fixed;top:0;left:0;right:0;z-index:1000;transition:background .3s,box-shadow .3s,padding .3s;padding:12px 0}
#nav.scrolled{background:rgba(15,23,42,.97);backdrop-filter:blur(12px);box-shadow:0 1px 0 rgba(255,255,255,.06);padding:12px 0}
.nav-inner{display:flex;align-items:center;justify-content:space-between;gap:24px}
.nav-logo{display:flex;align-items:center;position:relative}.nav-logo img{height:60px;object-fit:contain;display:block}.nav-logo .logo-color{display:none}
#nav:not(.scrolled) .nav-logo{background:transparent;padding:0;border-radius:0;box-shadow:none}#nav:not(.scrolled) .nav-logo .logo-light{display:block}#nav:not(.scrolled) .nav-logo .logo-color{display:none}#nav.scrolled .nav-logo{background:transparent;padding:0;border-radius:0;box-shadow:none}#nav.scrolled .nav-logo .logo-light{display:block}#nav.scrolled .nav-logo .logo-color{display:none}
.nav-links{display:flex;align-items:center;gap:4px}
.nav-link{padding:8px 14px;border-radius:var(--r-sm);font-size:13px;font-weight:500;color:rgba(255,255,255,.85);transition:color .2s,background .2s}
.nav-link:hover,.nav-link.active{background:rgba(255,255,255,.1);color:#fff}
.nav-actions{display:flex;align-items:center;gap:10px}
.nav-login{padding:8px 18px;border-radius:var(--r-sm);font-size:13px;font-weight:500;color:rgba(255,255,255,.85)}
.nav-cta{background:var(--red);color:#fff;padding:9px 20px;border-radius:var(--r-sm);font-size:13px;font-weight:500;transition:background .2s,transform .15s}
.nav-cta:hover{background:#C81E20;transform:translateY(-1px)}`;

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.css') && file !== 'index.css') {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    const regex = /\/\* NAV \*\/[\s\S]*?(?=\/\* PAGE HERO)/;
    if(regex.test(content)){
      content = content.replace(regex, newNav + '\n/* PAGE HERO');
      
      // Cleanup duplicate page hero markers
      content = content.replace(newNav + '\n/* PAGE HERO\n/*', newNav + '\n/*');
      
      fs.writeFileSync(path.join(dir, file), content);
      console.log('Updated ' + file);
    } else {
      console.log('NAV block not found in ' + file);
    }
  }
});
