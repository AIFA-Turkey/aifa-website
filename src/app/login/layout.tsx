import { Red_Hat_Display } from "next/font/google";
import '../globals.css';

const redHat = Red_Hat_Display({
    subsets: ["latin"],
    variable: "--font-red-hat",
});

export const metadata = {
    title: 'Aifa Admin Login',
    description: 'Secure Login',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${redHat.variable} antialiased bg-[#070a13]`}>
                {children}
            </body>
        </html>
    );
}
