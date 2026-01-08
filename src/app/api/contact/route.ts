import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await sendMail({
            to: process.env.CONTACT_EMAIL || 'info@aifaturkey.com.tr',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Contact Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Email Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
