'use client';

import { useState } from 'react';
import { updateHero } from '@/actions/content';
import { useRouter } from 'next/navigation';

export default function HeroEditForm({ initialData }: { initialData: any }) {
    const [data, setData] = useState(initialData);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleChange = (path: string, value: string) => {
        const keys = path.split('.');
        setData((prev: any) => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateHero(data);
            alert('Settings saved successfully!');
            router.refresh();
        } catch (e) {
            alert('Error saving settings');
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Homepage Banner Settings</h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Titles */}
                <div className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                    <h3 className="font-bold text-gray-200 capitalize text-lg">Main Title</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                            <input
                                type="text"
                                value={data.title?.en || ''}
                                onChange={(e) => handleChange('title.en', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Turkish</label>
                            <input
                                type="text"
                                value={data.title?.tr || ''}
                                onChange={(e) => handleChange('title.tr', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Subtitles */}
                <div className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                    <h3 className="font-bold text-gray-200 capitalize text-lg">Subtitle (Badge)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                            <input
                                type="text"
                                value={data.subtitle?.en || ''}
                                onChange={(e) => handleChange('subtitle.en', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Turkish</label>
                            <input
                                type="text"
                                value={data.subtitle?.tr || ''}
                                onChange={(e) => handleChange('subtitle.tr', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                    <h3 className="font-bold text-gray-200 capitalize text-lg">Description</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                            <textarea
                                value={data.description?.en || ''}
                                onChange={(e) => handleChange('description.en', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 h-32 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Turkish</label>
                            <textarea
                                value={data.description?.tr || ''}
                                onChange={(e) => handleChange('description.tr', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 h-32 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Configuration */}
                <div className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                    <h3 className="font-bold text-gray-200 capitalize text-lg">Call to Action (Button)</h3>

                    {/* CTA Text */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Button Text (English)</label>
                            <input
                                type="text"
                                placeholder="Explore Solutions"
                                value={data.cta?.text?.en || ''}
                                onChange={(e) => handleChange('cta.text.en', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Button Text (Turkish)</label>
                            <input
                                type="text"
                                placeholder="Çözümleri Keşfet"
                                value={data.cta?.text?.tr || ''}
                                onChange={(e) => handleChange('cta.text.tr', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                    </div>

                    {/* CTA Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Button Link (English)</label>
                            <input
                                type="text"
                                placeholder="/#solutions"
                                value={data.cta?.link?.en || ''}
                                onChange={(e) => handleChange('cta.link.en', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Button Link (Turkish)</label>
                            <input
                                type="text"
                                placeholder="/#solutions"
                                value={data.cta?.link?.tr || ''}
                                onChange={(e) => handleChange('cta.link.tr', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-500 hover:to-emerald-500 shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
