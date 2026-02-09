import { deleteItem } from '@/actions/content';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, context: { params: Promise<{ type: string; slug: string }> }) {
    const { type, slug } = await context.params;
    const result = await deleteItem(type, slug);
    if (result.success) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
}
