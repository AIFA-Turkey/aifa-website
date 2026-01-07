import fs from 'fs';
import path from 'path';

export async function getServices() {
    const dir = path.join(process.cwd(), 'src/content/services');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    const services = files.map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        return JSON.parse(content);
    });

    return services;
}

export async function getProducts() {
    const dir = path.join(process.cwd(), 'src/content/products');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    const products = files.map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        return JSON.parse(content);
    });

    return products;
}

export async function getSolutions() {
    const dir = path.join(process.cwd(), 'src/content/solutions');
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);
    const solutions = files.map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        return JSON.parse(content);
    });

    return solutions;
}

export async function getNavigation() {
    const filePath = path.join(process.cwd(), 'src/content/navigation/index.json');
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export async function getLegalContent(slug: string) {
    // Keystatic might save singletons as slug.json or slug/index.json depending on config path
    // Config: path: 'src/content/legal/privacy-policy' -> usually src/content/legal/privacy-policy.json

    let filePath = path.join(process.cwd(), `src/content/legal/${slug}.json`);

    if (!fs.existsSync(filePath)) {
        filePath = path.join(process.cwd(), `src/content/legal/${slug}/index.json`);
    }

    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export async function getChatbotConfig() {
    const filePath = path.join(process.cwd(), 'src/content/chatbot.json');
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
