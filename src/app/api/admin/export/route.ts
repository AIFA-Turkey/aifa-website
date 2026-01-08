import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';

export async function GET() {
    try {
        const posts = await db.select().from(schema.posts);
        const services = await db.select().from(schema.services);
        const products = await db.select().from(schema.products);
        const solutions = await db.select().from(schema.solutions);
        const navigation = await db.select().from(schema.navigation);
        const legal = await db.select().from(schema.legal);
        const chatbot = await db.select().from(schema.chatbot);

        const data = {
            posts,
            services,
            products,
            solutions,
            navigation,
            legal,
            chatbot,
            timestamp: new Date().toISOString()
        };

        return new NextResponse(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="content-backup-${new Date().toISOString()}.json"`
            }
        });
    } catch (error) {
        console.error('Export failed:', error);
        return NextResponse.json({ error: 'Export failed' }, { status: 500 });
    }
}
