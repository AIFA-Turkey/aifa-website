
import { db } from '@/db';
import * as schema from '@/db/schema';
import nodemailer from 'nodemailer';

export async function getMailConfig() {
    try {
        const result = await db.select().from(schema.mail_settings).limit(1);
        return result[0]?.data || null;
    } catch (e) {
        console.error("Failed to fetch mail config from DB", e);
        return null;
    }
}

export async function sendMail({ to, subject, html }: { to: string, subject: string, html: string }) {
    const config: any = await getMailConfig();

    if (!config) {
        throw new Error('Mail settings not configured');
    }

    const transporter = nodemailer.createTransport({
        host: config.host,
        port: parseInt(config.port || '587'),
        secure: config.secure === true || config.secure === 'true', // true for 465, false for other ports
        auth: {
            user: config.user,
            pass: config.pass,
        },
    });

    const info = await transporter.sendMail({
        from: config.from || config.user,
        to,
        subject,
        html,
    });

    return info;
}
