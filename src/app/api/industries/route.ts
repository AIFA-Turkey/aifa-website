import { NextResponse } from 'next/server';
import industries from '@/data/industries.json';

export async function GET() {
    return NextResponse.json(industries);
}
