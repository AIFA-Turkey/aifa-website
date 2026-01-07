import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        // Configure transporter
        // NOTE: In production, use environment variables for credentials
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.example.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER || 'user',
                pass: process.env.SMTP_PASS || 'pass',
            },
        });

        // If credentials are not set, just log it (Mock mode for demo)
        if (!process.env.SMTP_HOST) {
            console.log('--- EMAIL MOCK ---');
            console.log(`From: ${name} <${email}>`);
            console.log(`Message: ${message}`);
            console.log('------------------');
            return NextResponse.json({ success: true, message: 'Email logged (Mock Mode)' });
        }

        // Send email
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Aifa Website" <noreply@aifaturkey.com.tr>',
            to: process.env.CONTACT_EMAIL || 'info@aifaturkey.com.tr',
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
