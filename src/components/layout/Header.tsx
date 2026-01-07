import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getNavigation } from '@/lib/content';
import LanguageToggle from '../ui/LanguageToggle';

export default async function Header({ locale }: { locale: string }) {
    const t = await getTranslations({ locale });
    const navigation = await getNavigation();

    // Fallback if CMS nav is missing (should verify)
    // Hardcoded One-Pager Links (Simpler for single page transition)
    const navLinks = [
        { label: t('Navigation.services'), href: '/#services' },
        { label: t('Navigation.solutions'), href: '/#solutions' },
        { label: t('Navigation.products'), href: '/#products' },
    ];

    return (
        <header className="fixed w-full z-50 bg-[#070a13]/70 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
                    {t('Footer.companyName')}
                </Link>

                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    <LanguageToggle />
                    <Link
                        href="/#contact"
                        className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        {t('Navigation.contact')}
                    </Link>
                </div>
            </div>
        </header>
    );
}
