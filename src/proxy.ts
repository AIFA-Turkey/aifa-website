import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1. Protect Admin Routes
    if (pathname.startsWith('/admin')) {
        const session = req.cookies.get('aifa_admin_session');
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        return NextResponse.next();
    }

    // 2. Redirect logged-in users away from login page
    if (pathname === ('/login')) {
        const session = req.cookies.get('aifa_admin_session');
        if (session) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
        // Allow access to login page if no session
        return NextResponse.next();
    }

    // 3. Handle i18n
    return intlMiddleware(req);
}

export const config = {
    matcher: [
        // Admin & Login
        '/admin/:path*',
        '/login',
        // Internationalized pathnames
        '/',
        '/(tr|en)/:path*'
    ]
};
