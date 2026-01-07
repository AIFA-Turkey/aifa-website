import { getTranslations } from 'next-intl/server';
import posts from '@/data/posts.json';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

export async function generateStaticParams() {
    return posts.map((post) => ({
        id: post.id
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const { locale, id } = await params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'Common' });

    return (
        <article className="container mx-auto px-4 py-16 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                {locale === 'tr' ? 'Blog\'a Dön' : 'Back to Blog'}
            </Link>

            <header className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <time>{post.date}</time>
                </div>
                <h1 className="text-4xl font-bold mb-4">{(post.title as any)[locale]}</h1>
            </header>

            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {(post.content as any)[locale]}
                </p>
                <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic">
                        {locale === 'tr' ? 'Bu bir örnek blog yazısıdır. Tam içerik CMS entegrasyonundan sonra eklenecektir.' : 'This is a sample blog post. Full content will be added after CMS integration.'}
                    </p>
                </div>
            </div>
        </article>
    );
}
