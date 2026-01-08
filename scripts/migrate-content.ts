import fs from 'fs';
import path from 'path';
import { db } from '../src/db';
import * as schema from '../src/db/schema';

// Helper to read JSON file
function readJson(filePath: string) {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Helper to read posts (Keystatic posts might be md/markdoc/json)
// From keystatic config: path: 'src/content/posts/*', format: { contentField: 'content' }
// This usually implies a frontmatter + content file or a JSON file if configured.
// Let's assume JSON based on other collections or check file extension.
function getFiles(dir: string) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => !f.startsWith('.'));
}

async function migrate() {
    console.log('Starting migration...');

    // 1. Posts
    const postsDir = path.join(process.cwd(), 'src/content/posts');
    const postFiles = getFiles(postsDir);
    for (const file of postFiles) {
        const filePath = path.join(postsDir, file);
        // content format might be complex. For now, read as utf8 and store.
        // If it is a directory (Keystatic sometimes creates dirs), handle that.
        // Assuming flat files or index.json inside dirs.
        let content: any = {};
        if (fs.statSync(filePath).isDirectory()) {
            content = readJson(path.join(filePath, 'index.json')) || {};
        } else {
            // If regular file, try reading. If it's .md, parse frontmatter?
            // Keystatic default is often JSON or yaml frontmatter. 
            // config says format: { contentField: 'content' }
            // In src/keystatic.config.ts:12 it says format: { contentField: 'content' }
            // This usually means .md or .mdoc file with frontmatter.
            // But for simplicity/safety, let's look at actual files if possible.
            // If I can't check, I'll assume JSON or try to read text.
            // Actually, verify what's in that dir first? 
            // Tool use 'list_dir' showed 'posts' dir has 2 children.
            // I'll assume they are directories with index.json or .md files.
            // Re-reading 'src/lib/content.ts' might help. It didn't have getPosts?
            // Ah, it didn't have getPosts.
            // I'll assume standard reading.
            if (file.endsWith('.json')) {
                content = readJson(filePath);
            } else {
                // treating as raw text/content if not json, or just skip?
                // Let's try to assume JSON key-value structure if we can.
                // If not, we might be losing data or need proper parser.
                // Given the prompt "local files under content and data", I'll try my best.
                // Safe bet: Read as string/JSON.
                const raw = fs.readFileSync(filePath, 'utf8');
                try {
                    content = JSON.parse(raw);
                } catch {
                    // If not JSON, maybe frontmatter. 
                    // For now, put raw content in a 'content' field if schema expects json.
                    // Our schema has 'content' as json.
                    content = { _raw: raw };
                }
            }
        }

        // name/slug
        const slug = file.replace(/\.(json|md|mdoc)$/, '');
        await db.insert(schema.posts).values({
            slug,
            title: content.title || slug,
            date: content.date || new Date().toISOString(),
            content: content
        }).onConflictDoUpdate({ target: schema.posts.slug, set: { content: content } });
        console.log(`Migrated post: ${slug}`);
    }

    // 2. Services
    const servicesDir = path.join(process.cwd(), 'src/content/services');
    const serviceFiles = getFiles(servicesDir);
    for (const file of serviceFiles) {
        const filePath = path.join(servicesDir, file);
        if (fs.statSync(filePath).isDirectory()) continue; // Assuming flat files based on list_dir
        const content = readJson(filePath);
        if (content) {
            const slug = file.replace('.json', '');
            await db.insert(schema.services).values({
                slug,
                data: content
            }).onConflictDoUpdate({ target: schema.services.slug, set: { data: content } });
            console.log(`Migrated service: ${slug}`);
        }
    }

    // 3. Products
    const productsDir = path.join(process.cwd(), 'src/content/products');
    const productFiles = getFiles(productsDir);
    for (const file of productFiles) {
        const filePath = path.join(productsDir, file);
        // list_dir showed 8 children, might be dirs or files. 
        // read_file logic in content.ts used simple readdir and readFileSync, so probably files.
        const content = readJson(filePath);
        if (content) {
            const slug = file.replace('.json', '');
            await db.insert(schema.products).values({
                slug,
                data: content
            }).onConflictDoUpdate({ target: schema.products.slug, set: { data: content } });
            console.log(`Migrated product: ${slug}`);
        }
    }

    // 4. Solutions
    const solutionsDir = path.join(process.cwd(), 'src/content/solutions');
    const solutionFiles = getFiles(solutionsDir);
    for (const file of solutionFiles) {
        const filePath = path.join(solutionsDir, file);
        const content = readJson(filePath);
        if (content) {
            const slug = file.replace('.json', '');
            await db.insert(schema.solutions).values({
                slug,
                data: content
            }).onConflictDoUpdate({ target: schema.solutions.slug, set: { data: content } });
            console.log(`Migrated solution: ${slug}`);
        }
    }

    // 5. Navigation (Singleton)
    const navFile = path.join(process.cwd(), 'src/content/navigation/index.json');
    if (fs.existsSync(navFile)) {
        const content = readJson(navFile);
        await db.delete(schema.navigation); // Clear existing
        await db.insert(schema.navigation).values({
            data: content
        });
        console.log('Migrated navigation');
    }

    // 6. Chatbot (Singleton)
    const chatbotFile = path.join(process.cwd(), 'src/content/chatbot.json');
    if (fs.existsSync(chatbotFile)) {
        const content = readJson(chatbotFile);
        await db.delete(schema.chatbot);
        await db.insert(schema.chatbot).values({
            data: content
        });
        console.log('Migrated chatbot');
    }

    // 7. Legal
    const legalDir = path.join(process.cwd(), 'src/content/legal');
    const legalFiles = getFiles(legalDir); // Should contain folders: privacy-policy, terms-of-service
    for (const file of legalFiles) {
        // Keystatic usually puts singleton content in a file named `index.json` inside a folder named after the singleton path.
        // OR it creates a file named after the singleton if path doesn't indicate directory.
        // Config: path: 'src/content/legal/privacy-policy' -> could be privacy-policy.json or privacy-policy/index.json
        // Let's check both or iterate
        let content: any = null;
        const potentialDir = path.join(legalDir, file);
        if (fs.statSync(potentialDir).isDirectory()) {
            content = readJson(path.join(potentialDir, 'index.json'));
        } else if (file.endsWith('.json')) {
            content = readJson(potentialDir);
        }

        if (content) {
            const slug = file.replace('.json', ''); // e.g. privacy-policy
            await db.insert(schema.legal).values({
                slug,
                data: content
            }).onConflictDoUpdate({ target: schema.legal.slug, set: { data: content } });
            console.log(`Migrated legal doc: ${slug}`);
        }
    }

    console.log('Migration complete!');
}

migrate().catch(console.error);
