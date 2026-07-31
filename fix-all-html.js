const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Extract all CDN scripts from the body
  const scriptsRegex = /<script[^>]*src="https:\/\/cdnjs\.cloudflare\.com[^>]*><\/script>/g;
  
  let match;
  let cdnScripts = [];
  while ((match = scriptsRegex.exec(content)) !== null) {
    cdnScripts.push(match[0]);
  }
  
  if (cdnScripts.length > 0) {
    // Remove them from the document
    content = content.replace(scriptsRegex, '');
    
    // Some files might have comments like <!-- ====== SCRIPTS ====== --> which we should also remove if they're now empty
    content = content.replace(/<!-- ====== SCRIPTS ====== -->\s*<!-- GSAP & ScrollTrigger -->\s*<!-- Three\.js Library -->\s*/g, '');
    content = content.replace(/<!-- GSAP & ScrollTrigger -->\s*/g, '');
    content = content.replace(/<!-- Three\.js Library -->\s*/g, '');
    
    // Add them right before </head>
    const scriptsBlock = "\n    <!-- GSAP & Three.js Libraries -->\n    " + cdnScripts.join('\n    ') + "\n";
    content = content.replace('</head>', `${scriptsBlock}  </head>`);
    
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
}
