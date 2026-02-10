import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getNavigation, getFooterConfig } from '@/lib/content'; // Import getFooterConfig

export default async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations({ locale });
    const navigation = await getNavigation();
    const footerConfig: any = await getFooterConfig(); // Fetch footer data

    const currentYear = new Date().getFullYear();

    // Data Fallbacks
    const companyName = footerConfig?.companyName || t('Footer.companyName') || 'Aifa';
    const description = footerConfig?.description?.[locale] || t('Footer.description') || 'Empowering enterprises with advanced AI solutions.';
    const address = footerConfig?.address || t('Footer.address') || 'Mustafa Kemal Mahallesi...';
    const email = footerConfig?.email || 'info@aifaturkey.com.tr';

    // Social Links (could iterate if needed, or static access)
    // const social = footerConfig?.social || {};

    // One-Pager Links for Footer
    const footerLinks = footerConfig?.quickLinks || [
        { label: 'Services', href: '/#services' },
        { label: 'Solutions', href: '/#solutions' },
        { label: 'Products', href: '/#products' },
    ];

    const quickLinkLabels: Record<string, string> = {
        services: t('Navigation.services') || 'Services',
        solutions: t('Navigation.solutions') || 'Solutions',
        products: t('Navigation.products') || 'Products',
    };

    const resolveQuickLinkLabel = (item: any) => {
        const label = item?.label;
        if (label && typeof label === 'object') {
            return label[locale] || label.en || label.tr || '';
        }
        if (typeof label === 'string') {
            const key = label.trim().toLowerCase();
            if (key in quickLinkLabels) {
                return quickLinkLabels[key];
            }
            return label;
        }
        const href = String(item?.href || '');
        if (href.includes('#services')) return quickLinkLabels.services;
        if (href.includes('#solutions')) return quickLinkLabels.solutions;
        if (href.includes('#products')) return quickLinkLabels.products;
        return '';
    };

    return (
        <footer className="bg-[#070a13] border-t border-white/10 py-20 relative overflow-hidden">
            {/* Footer Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 block">
                            {companyName}
                        </Link>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">{locale === 'tr' ? 'Hızlı Erişim' : 'Quick Links'}</h4>
                        <ul className="space-y-4">
                            {footerLinks.map((item: any) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                                        {resolveQuickLinkLabel(item)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 text-lg">{t('Navigation.contact')}</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">📍</span>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Mustafa+Kemal+Mahallesi+Dumlupınar+Bulvarı+No:280+G+Bilişim+ve+Telekom+Kuluçka+ve+İdari+Binası+(Bilim)+Binası+315+Numaralı+Ofis+Çankaya/Ankara"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors text-left"
                                >
                                    {address}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-500">✉️</span>
                                <a href={`mailto:${email}`} className="hover:text-blue-400 transition-colors">
                                    {email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {currentYear} {companyName}. {t('Footer.allRightsReserved')}</p>
                    <div className="flex gap-6">
                        <Link href="/legal/privacy-policy" className="hover:text-blue-400 transition-colors">
                            {t('Footer.privacyPolicy')}
                        </Link>
                        <Link href="/legal/terms-of-service" className="hover:text-blue-400 transition-colors">
                            {t('Footer.termsOfService')}
                        </Link>
                    </div>
                </div>
            </div>
            {/* Footer Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-blue-900/10 blur-[100px] -z-10" />
        </footer>
    );
}
