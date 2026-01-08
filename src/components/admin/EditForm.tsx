'use client';

import { useState } from 'react';
import { updateItem } from '@/actions/content';
import { useRouter } from 'next/navigation';
import IconPicker from './IconPicker';

export default function EditForm({ type, slug, initialData }: { type: string, slug: string, initialData: any }) {
    const [data, setData] = useState(initialData);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleChange = (path: string, value: string) => {
        const keys = path.split('.');
        setData((prev: any) => {
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateItem(type, slug, data);
            alert('Saved successfully!');
            router.refresh();
        } catch (e) {
            alert('Error saving');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8 max-w-4xl">
            <div className="grid grid-cols-1 gap-8">
                {/* Helper for text inputs */}
                {['title', 'description'].map((field) => (
                    <div key={field} className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                        <h3 className="font-bold text-gray-200 capitalize text-lg">{field}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                                {field === 'description' ? (
                                    <textarea
                                        value={data[field]?.en || ''}
                                        onChange={(e) => handleChange(`${field}.en`, e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 h-32 transition-all"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={data[field]?.en || ''}
                                        onChange={(e) => handleChange(`${field}.en`, e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Turkish</label>
                                {field === 'description' ? (
                                    <textarea
                                        value={data[field]?.tr || ''}
                                        onChange={(e) => handleChange(`${field}.tr`, e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 h-32 transition-all"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={data[field]?.tr || ''}
                                        onChange={(e) => handleChange(`${field}.tr`, e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="p-6 border border-white/5 rounded-xl bg-white/5">
                    <h3 className="font-bold text-gray-200 mb-6 text-lg">Media</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={data.image || ''}
                                onChange={(e) => handleChange('image', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Icon Name (Lucide)</label>
                            <IconPicker
                                value={data.icon || 'HelpCircle'}
                                onChange={(val) => handleChange('icon', val)}
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
