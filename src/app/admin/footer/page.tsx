
import FooterEditForm from '@/components/admin/FooterEditForm';
import { getFooterConfig } from '@/lib/content';
import { getTranslations } from 'next-intl/server';

export default async function AdminFooterPage() {
    const dbData = await getFooterConfig();
    const t = await getTranslations({ locale: 'en' }); // Default to English for initial population if needed

    // default defaults
    const defaults = {
        companyName: t('Footer.companyName') || 'Aifa Turkey',
        email: 'info@aifaturkey.com.tr',
        address: t('Footer.address') || 'Mustafa Kemal Mahallesi Dumlupınar Bulvarı No:280 G Bilişim ve Telekom Kuluçka ve İdari Binası (Bilim) Binası 315 Numaralı Ofis Çankaya/Ankara',
        description: {
            en: 'Advanced AI Solutions for the Future.',
            tr: 'Gelecek için Gelişmiş Yapay Zeka Çözümleri.'
        },
        social: {
            linkedin: '',
            twitter: '',
            instagram: ''
        },
        quickLinks: [
            { label: 'Services', href: '/#services' },
            { label: 'Solutions', href: '/#solutions' },
            { label: 'Products', href: '/#products' }
        ]
    };

    // Deep merge or simple spread? Simple spread for top level, specific for nested if needed.
    // For simplicity, we use the DB data if it exists, otherwise defaults.
    // But better to merge so if DB has partial data, we keep defaults for others? 
    // Actually, if DB has data, it overrides. If fields are missing in DB data (e.g. new schema fields), we might want defaults.
    // Let's do a basic merge:

    const initialData = {
        ...defaults,
        ...(dbData as any), // DB overrides
        // Ensure nested objects are merged correctly if they exist in DB
        description: { ...defaults.description, ...((dbData as any)?.description || {}) },
        social: { ...defaults.social, ...((dbData as any)?.social || {}) },
        quickLinks: (dbData as any)?.quickLinks || defaults.quickLinks
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <FooterEditForm initialData={initialData} />
        </div>
    );
}
