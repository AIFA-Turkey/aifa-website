import { NextResponse } from 'next/server';
import posts from '@/data/posts.json';

export async function GET() {
    return NextResponse.json(posts);
}
