'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export async function getContentTypes() {
    return ['services', 'products', 'solutions'];
}

export async function getItems(type: string) {
    const dir = path.join(CONTENT_DIR, type);
    try {
        const files = await fs.readdir(dir);
        const items = await Promise.all(
            files.filter(f => f.endsWith('.json')).map(async file => {
                const content = await fs.readFile(path.join(dir, file), 'utf-8');
                return { slug: file.replace('.json', ''), ...JSON.parse(content) };
            })
        );
        return items;
    } catch (e) {
        return [];
    }
}

export async function getItem(type: string, slug: string) {
    const filepath = path.join(CONTENT_DIR, type, `${slug}.json`);
    try {
        const content = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
}

export async function updateItem(type: string, slug: string, data: any) {
    const filepath = path.join(CONTENT_DIR, type, `${slug}.json`);
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    revalidatePath(`/admin/${type}/${slug}`);
    revalidatePath('/[locale]', 'layout');
    return { success: true };
}

export async function saveChatbotConfig(data: any) {
    const filepath = path.join(CONTENT_DIR, 'chatbot.json');
    await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    revalidatePath('/admin/chatbot');
    revalidatePath('/[locale]', 'layout');
    return { success: true };
}
