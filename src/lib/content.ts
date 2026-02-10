import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getServices() {
    try {
        const results = await db.select().from(schema.services);
        const items = results.map(row => ({
            ...(row.data as any),
            slug: row.slug
        }));
        return sortContentItems(items);
    } catch (e) {
        console.error("Failed to fetch services from DB", e);
        return [];
    }
}

export async function getProducts() {
    try {
        const results = await db.select().from(schema.products);
        const items = results.map(row => ({
            ...(row.data as any),
            slug: row.slug
        }));
        return sortContentItems(items);
    } catch (e) {
        console.error("Failed to fetch products from DB", e);
        return [];
    }
}

export async function getSolutions() {
    try {
        const results = await db.select().from(schema.solutions);
        const items = results.map(row => ({
            ...(row.data as any),
            slug: row.slug
        }));
        return sortContentItems(items);
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

function sortContentItems<T extends { order?: number | string; title?: { en?: string; tr?: string }; slug?: string }>(items: T[]) {
    return [...items].sort((a, b) => {
        const orderA = normalizeOrder(a?.order);
        const orderB = normalizeOrder(b?.order);
        if (orderA !== null && orderB !== null) return orderA - orderB;
        if (orderA !== null) return -1;
        if (orderB !== null) return 1;
        const titleA = (a?.title?.en || a?.title?.tr || a?.slug || '').toLowerCase();
        const titleB = (b?.title?.en || b?.title?.tr || b?.slug || '').toLowerCase();
        return titleA.localeCompare(titleB);
    });
}

function normalizeOrder(value: unknown) {
    const numberValue = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
}
