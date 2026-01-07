import { getTranslations } from 'next-intl/server';
import industries from '@/data/industries.json';
import { Banknote, ShoppingBag, HeartPulse, Cpu, Bot, Database } from 'lucide-react';

const iconMap: Record<string, any> = {
    Banknote,
    ShoppingBag,
    HeartPulse,
    Cpu,
    Bot,
    Database
};

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Navigation' });

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-12 text-center">{t('industries')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {industries.map((industry) => {
                    const Icon = iconMap[industry.icon] || Banknote;
                    return (
                        <div key={industry.id} id={industry.id} className="group p-8 rounded-2xl border border-white/20 dark:border-white/10 hover:border-green-500/50 transition-all duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                                <Icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">{(industry.title as any)[locale]}</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{(industry.description as any)[locale]}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
