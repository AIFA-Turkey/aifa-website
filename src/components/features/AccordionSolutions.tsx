'use client';

import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface AccordionItem {
    slug: string;
    title: string;
    description: string;
    image?: string;
    icon?: string;
}

interface AccordionSolutionsProps {
    items: AccordionItem[];
    categoryTitle: string;
    id?: string;
}

export default function AccordionSolutions({ items, categoryTitle, id }: AccordionSolutionsProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const iconMap = useMemo(
        () => (LucideIcons as unknown as Record<string, LucideIcon>),
        []
    );

    const renderMedia = (item: AccordionItem) => {
        if (item.image) {
            return (
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />
            );
        }

        const Icon = item.icon ? iconMap[item.icon] : null;
        if (Icon) {
            return <Icon className="w-20 h-20 text-blue-300" />;
        }

        if (item.icon) {
            return <span className="text-3xl text-blue-200 font-semibold">{item.icon}</span>;
        }

        return <span className="text-4xl">🚀</span>;
    };

    return (
        <section id={id} className="min-h-screen flex items-center py-24 relative overflow-hidden">
            {/* Background Radial Spotlights */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {categoryTitle}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* List / Accordion */}
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => (
                            <div
                                key={item.slug}
                                onClick={() => setActiveIndex(index)}
                                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm relative group overflow-hidden
                  ${activeIndex === index
                                        ? 'bg-white/5 border-blue-500/50 shadow-[0_0_30px_rgba(64,147,255,0.15)]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                    }`}
                            >
                                {/* Spotlight Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="flex items-center justify-between">
                                    <h3 className={`text-xl font-semibold transition-colors ${activeIndex === index ? 'text-blue-300' : 'text-gray-200'}`}>
                                        {item.title}
                                    </h3>
                                    <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-90 text-blue-400' : 'text-gray-500'}`}>
                                        →
                                    </span>
                                </div>

                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-4 text-gray-400 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Visual / Image Side */}
                    <div className="hidden lg:flex items-center justify-center p-8 relative min-h-[500px]">
                        {/* Decorative Ring */}
                        <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" style={{ borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}></div>
                        <div className="absolute inset-4 border border-blue-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ borderRadius: '62% 38% 37% 63% / 56% 59% 41% 44%' }}></div>

                        <AnimatePresence mode="wait">
                            {activeIndex !== null && items[activeIndex] && (
                                <motion.div
                                    key={items[activeIndex].slug}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative z-10 text-center"
                                >
                                    {/* Placeholder for Dynamic Icon/Image from CMS */}
                                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl p-6">
                                        {renderMedia(items[activeIndex])}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
