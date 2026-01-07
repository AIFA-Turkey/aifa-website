import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getLegalContent } from '@/lib/content'; // Need to update content.ts
import { DocumentRenderer } from '@keystatic/core/renderer';

export default async function LegalPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;

    // Validate slug
    if (!['privacy-policy', 'terms-of-service'].includes(slug)) {
        notFound();
    }

    const t = await getTranslations({ locale });
    const content = await getLegalContent(slug);

    if (!content) {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
                <p>The requested legal document is currently unavailable.</p>
            </div>
        );
    }

    // Determine content based on locale
    const localizedContent = locale === 'tr' ? content.content.tr : content.content.en;

    return (
        <main className="min-h-screen pt-32 pb-20 relative">
            {/* Background Spotlights */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent -z-10" />

            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    {slug === 'privacy-policy' ? t('Footer.privacyPolicy') : t('Footer.termsOfService')}
                </h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <DocumentRenderer document={localizedContent} />
                </div>
            </div>
        </main>
    );
}
