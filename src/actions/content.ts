'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getContentTypes() {
    return ['services', 'products', 'solutions'];
}

function getTable(type: string) {
    switch (type) {
        case 'services': return schema.services;
        case 'products': return schema.products;
        case 'solutions': return schema.solutions;
        case 'legal': return schema.legal;
        default: return null;
    }
}

export async function getItems(type: string) {
    const table = getTable(type);
    if (!table) return [];

    try {
        const results = await db.select().from(table);
        return results.map(row => ({
            slug: row.slug,
            ...(row.data as any)
        }));
    } catch (e) {
        console.error(`Failed to get items for ${type}`, e);
        return [];
    }
}

export async function getItem(type: string, slug: string) {
    const table = getTable(type);
    if (!table) return null;

    try {
        const result = await db.select().from(table).where(eq(table.slug, slug)).limit(1);
        if (!result.length) return null;
        return {
            slug: result[0].slug,
            ...(result[0].data as any)
        };
    } catch (e) {
        console.error(`Failed to get item ${type}/${slug}`, e);
        return null;
    }
}

export async function updateItem(type: string, slug: string, data: any) {
    const table = getTable(type);
    if (!table) return { success: false, error: 'Invalid type' };

    try {
        await db.insert(table).values({
            slug,
            data
        }).onConflictDoUpdate({
            target: table.slug,
            set: { data }
        });

        revalidatePath(`/admin/${type}/${slug}`);
        revalidatePath('/[locale]', 'layout');
        return { success: true };
    } catch (e) {
        console.error(`Failed to update item ${type}/${slug}`, e);
        return { success: false, error: 'Update failed' };
    }
}

export async function saveChatbotConfig(data: any) {
    try {
        // Chatbot is a singleton with auto-inc ID, but we likely just want one row.
        // Schema: id (dashed), data.
        // Let's assume ID 1 or just check if any exists. 
        // Best implementation for singleton in this schema: delete all and insert one, or update ID 1.

        // Let's check if it exists
        const existing = await db.select().from(schema.chatbot).limit(1);
        if (existing.length) {
            await db.update(schema.chatbot).set({ data }).where(eq(schema.chatbot.id, existing[0].id));
        } else {
            await db.insert(schema.chatbot).values({ data });
        }

        revalidatePath('/admin/chatbot');
        revalidatePath('/[locale]', 'layout');
        return { success: true };
    } catch (e) {
        console.error('Failed to save chatbot config', e);
        return { success: false, error: 'Save failed' };
    }
}
export async function updateHero(data: any) {
    try {
        const TABLE = schema.hero;
        // Upsert logic for singleton
        const existing = await db.select().from(TABLE).limit(1);

        if (existing.length > 0) {
            await db.update(TABLE)
                .set({ data })
                .where(eq(TABLE.id, existing[0].id));
        } else {
            await db.insert(TABLE).values({ data });
        }

        revalidatePath('/[locale]');
        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error(`Failed to update hero`, e);
        throw new Error('Failed to update hero');
    }
}

export async function updateFooter(data: any) {
    try {
        const TABLE = schema.footer;
        // Upsert logic for singleton
        const existing = await db.select().from(TABLE).limit(1);

        if (existing.length > 0) {
            await db.update(TABLE)
                .set({ data })
                .where(eq(TABLE.id, existing[0].id));
        } else {
            await db.insert(TABLE).values({ data });
        }

        revalidatePath('/[locale]');
        revalidatePath('/');
        return { success: true };
    } catch (e) {
        console.error(`Failed to update footer`, e);
        throw new Error('Failed to update footer');
    }
}
