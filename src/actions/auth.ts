'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'aifa_admin_session';

export async function login(formData: FormData) {
    const user = formData.get('username') as string;
    const password = formData.get('password') as string;

    const envUser = process.env.ADMIN_USER || 'cerebroadmin';
    const envPass = process.env.ADMIN_PASSWORD || 'Gmk1881!';

    if (user === envUser && password === envPass) {
        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        redirect('/admin');
    } else {
        return { error: 'Invalid credentials' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect('/login');
}
