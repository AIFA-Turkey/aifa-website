import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getServices() {
    try {
        const results = await db.select().from(schema.services);
        return results.map(row => ({
            ...(row.data as any),
            slug: row.slug
        }));
    } catch (e) {
        console.error("Failed to fetch services from DB", e);
        return [];
    }
}

export async function getProducts() {
    try {
        const results = await db.select().from(schema.products);
        return results.map(row => ({
            ...(row.data as any),
            slug: row.slug
        }));
    } catch (e) {
        console.error("Failed to fetch products from DB", e);
        return [];
    }
}

export async function getSolutions() {
    try {
        const results = await db.select().from(schema.solutions);
        return results.map(row => ({
            ...(row.data as any),
            slug: row.slug
        }));
    } catch (e) {
        console.error("Failed to fetch solutions from DB", e);
        return [];
    }
}

export async function getNavigation() {
    try {
        const result = await db.select().from(schema.navigation).limit(1);
        return result[0]?.data || null;
    } catch (e) {
        console.error("Failed to fetch navigation from DB", e);
        return null;
    }
}

export async function getLegalContent(slug: string) {
    try {
        const result = await db.select().from(schema.legal).where(eq(schema.legal.slug, slug)).limit(1);
        return result[0]?.data || null;
    } catch (e) {
        console.error(`Failed to fetch legal content for ${slug} from DB`, e);
        return null;
    }
}

export async function getChatbotConfig() {
    try {
        const result = await db.select().from(schema.chatbot).limit(1);
        return result[0]?.data || null;
    } catch (e) {
        console.error("Failed to fetch chatbot config from DB", e);
        return null;
    }
}


export async function getHeroConfig() {
    try {
        const result = await db.select().from(schema.hero).limit(1);
        return result[0]?.data || null;
    } catch (e) {
        console.error("Failed to fetch hero config from DB", e);
        return null;
    }
}

export async function getFooterConfig() {
    try {
        const result = await db.select().from(schema.footer).limit(1);
        return result[0]?.data || null;
    } catch (e) {
        console.error("Failed to fetch footer config from DB", e);
        return null;
    }
}
