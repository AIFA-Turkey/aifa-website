import Link from 'next/link';
import { Red_Hat_Display } from "next/font/google";
import '../globals.css';

const redHat = Red_Hat_Display({
    subsets: ["latin"],
    variable: "--font-red-hat",
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${redHat.variable} antialiased min-h-screen bg-[#070a13] text-gray-100`}>
                <div className="flex min-h-screen">
                    {/* Sidebar */}
                    <aside className="w-64 bg-[#0b1021] border-r border-white/5 flex flex-col fixed h-full z-10">
                        <div className="p-6 border-b border-white/5">
                            <Link href="/admin">
                                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer">
                                    Aifa Admin
                                </h2>
                            </Link>
                        </div>
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            <div className="space-y-1">
                                <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Site Content</span>
                                <Link href="/admin/hero" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Homepage Banner
                                </Link>
                                <Link href="/admin/services" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Services
                                </Link>
                                <Link href="/admin/solutions" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Solutions
                                </Link>
                                <Link href="/admin/products" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Products
                                </Link>
                                <Link href="/admin/footer" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Footer Content
                                </Link>
                            </div>

                            {/* Legal Section */}
                            <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
                                <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Legal</span>
                                <Link href="/admin/legal/privacy-policy" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/admin/legal/terms-of-service" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </div>

                            <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
                                <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">System Configuration</span>
                                <Link href="/admin/chatbot" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Chatbot Config
                                </Link>
                                <Link href="/admin/mail" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Mail Configuration
                                </Link>
                                <Link href="/admin/data" className="block px-4 py-2 rounded text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    Data Management
                                </Link>
                            </div>
                            <div className="pt-4 mt-4 border-t border-white/5">
                                <Link href="/" className="block px-4 py-2 rounded text-gray-400 hover:bg-white/5 hover:text-white transition-colors text-sm">
                                    ← Back to Site
                                </Link>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-8 ml-64 bg-[#070a13]">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
