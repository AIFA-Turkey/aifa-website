const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, 'src/data/services.json');
const outDir = path.join(__dirname, 'src/content/services');

if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir, { recursive: true });
}

const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

services.forEach(service => {
    // Determine a slug. Use ID if available, otherwise title.en
    const slug = service.id || service.title.en.toLowerCase().replace(/ /g, '-');
    
    const newContent = {
        name: slug,
        ...service
    };
    
    fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(newContent, null, 2));
    console.log(`Created ${slug}.json`);
});
