'use server';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { sendMail } from '@/lib/mail';

export async function updateMailSettings(data: any) {
    try {
        const TABLE = schema.mail_settings;
        const existing = await db.select().from(TABLE).limit(1);

        if (existing.length > 0) {
            await db.update(TABLE)
                .set({ data })
                .where(eq(TABLE.id, existing[0].id));
        } else {
            await db.insert(TABLE).values({ data });
        }

        revalidatePath('/admin/mail');
        return { success: true };
    } catch (e) {
        console.error('Failed to update mail settings', e);
        return { success: false, error: 'Failed to update settings' };
    }
}

export async function sendTestEmail(to: string) {
    try {
        const info = await sendMail({
            to,
            subject: 'Aifa Admin - Test Email',
            html: `
                <h1>IT WORKS!</h1>
                <p>This is a test email sent from the Aifa Admin Dashboard.</p>
                <p>If you see this, your SMTP settings are configured correctly.</p>
                <hr>
                <small>Sent at ${new Date().toLocaleString()}</small>
            `
        });
        return {
            success: true,
            message: `Email Sent! ID: ${info.messageId}`,
            details: info.response
        };
    } catch (e: any) {
        console.error('Failed to send test email', e);
        return { success: false, error: e.message || 'Failed to send test email' };
    }
}
