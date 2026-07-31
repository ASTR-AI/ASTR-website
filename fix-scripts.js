const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Extract scripts
  const scriptsRegex = /<!-- ====== SCRIPTS ====== -->[\s\S]*?<!-- Three\.js Library -->[\s\S]*?<\/script>/;
  const match = content.match(scriptsRegex);
  
  if (match) {
    const scriptsBlock = match[0];
    
    // Remove from original position
    content = content.replace(scriptsRegex, '');
    
    // Insert before </head>
    content = content.replace('</head>', `\n    ${scriptsBlock}\n  </head>`);
    
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
}
