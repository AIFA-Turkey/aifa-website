import { getTranslations } from 'next-intl/server';
import posts from '@/data/posts.json';
import { Calendar } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Navigation' });

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center">{t('blog')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {posts.map((post) => (
                    <article key={post.id} className="cursor-pointer p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900 group">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4" />
                            <time>{post.date}</time>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                            {(post.title as any)[locale]}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {(post.content as any)[locale]}
                        </p>
                        <Link href={`/blog/${post.id}`} className="font-semibold text-blue-600 hover:underline">
                            {locale === 'tr' ? 'Devamını Oku' : 'Read More'} &rarr;
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
