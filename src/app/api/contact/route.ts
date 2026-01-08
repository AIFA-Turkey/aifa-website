import { NextResponse } from 'next/server';
import { sendMail, getMailConfig } from '@/lib/mail';

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

        // Get config to find receiver
        const config: any = await getMailConfig();
        const targetEmail = config?.contact_receiver || process.env.CONTACT_EMAIL || 'info@aifaturkey.com.tr';
        console.log('[[DEBUG FORCE UPDATE]] Attempting to send contact email:', {
            name,
            email,
            targetEmail,
            messageLength: message?.length
        });

        await sendMail({
            to: targetEmail,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Contact Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        console.log('Contact email sent successfully');
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Contact Email Error Details:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
}
