import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate basic structure
        if (!data.posts || !data.services || !data.products) {
            return NextResponse.json({ error: 'Invalid backup format' }, { status: 400 });
        }

        // Transaction to ensure atomicity
        // Transaction to ensure atomicity
        db.transaction((tx) => {
            // Clear all tables
            tx.delete(schema.posts).run();
            tx.delete(schema.services).run();
            tx.delete(schema.products).run();
            tx.delete(schema.solutions).run();
            tx.delete(schema.navigation).run();
            tx.delete(schema.legal).run();
            tx.delete(schema.chatbot).run();

            // Insert new data
            if (data.posts.length) tx.insert(schema.posts).values(data.posts).run();
            if (data.services.length) tx.insert(schema.services).values(data.services).run();
            if (data.products.length) tx.insert(schema.products).values(data.products).run();
            if (data.solutions.length) tx.insert(schema.solutions).values(data.solutions).run();
            if (data.navigation.length) tx.insert(schema.navigation).values(data.navigation).run();
            if (data.legal.length) tx.insert(schema.legal).values(data.legal).run();
            if (data.chatbot.length) tx.insert(schema.chatbot).values(data.chatbot).run();
        });

        return NextResponse.json({ success: true, message: 'Import successful' });
    } catch (error) {
        console.error('Import failed:', error);
        return NextResponse.json({ error: 'Import failed' }, { status: 500 });
    }
}
