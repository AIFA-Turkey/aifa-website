const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const CONTENT_DIR = path.join(__dirname, '../src/content');

const TEMPLATES = {
  services: {
    name: '',
    title: { en: '', tr: '' },
    description: { en: '', tr: '' },
    image: '/images/placeholder.jpg',
    icon: 'Brain'
  },
  products: {
    name: '',
    title: { en: '', tr: '' },
    description: { en: '', tr: '' },
    image: '/images/placeholder.jpg',
    icon: 'Cpu'
  },
  solutions: {
    name: '',
    title: { en: '', tr: '' },
    description: { en: '', tr: '' },
    image: '/images/placeholder.jpg'
  }
};

const TYPES = Object.keys(TEMPLATES);

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('--- Aifa Content Creator ---');
  console.log('Available types:', TYPES.join(', '));
  
  const type = await ask('What do you want to create? ');
  if (!TYPES.includes(type)) {
    console.error('Invalid type!');
    process.exit(1);
  }

  const name = await ask('Enter internal name (slug, e.g. "cloud-ai"): ');
  if (!name) {
    console.error('Name is required!');
    process.exit(1);
  }

  const filename = `${name.toLowerCase().replace(/[^a-z0-9-]/g, '-')}.json`;
  const filepath = path.join(CONTENT_DIR, type, filename);

  if (fs.existsSync(filepath)) {
    console.error('File already exists:', filepath);
    process.exit(1);
  }

  const template = { ...TEMPLATES[type] };
  template.name = name;
  template.title.en = await ask('Title (English): ');
  template.title.tr = await ask('Title (Turkish): ');
  template.description.en = await ask('Description (English): ');
  template.description.tr = await ask('Description (Turkish): ');

  fs.writeFileSync(filepath, JSON.stringify(template, null, 2));
  console.log(`\nSuccess! Created ${type} at:\n${filepath}`);
  console.log('You can now edit the file to add images or refine text.');
  
  rl.close();
}

main();
