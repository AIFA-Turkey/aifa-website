export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
