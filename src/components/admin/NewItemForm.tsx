'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateItem } from '@/actions/content';
import IconPicker from './IconPicker';

type LocalizedText = { en: string; tr: string };

type NewItemData = {
    title: LocalizedText;
    description: LocalizedText;
    image?: string;
    icon?: string;
    slug?: string;
    name?: string;
    id?: string;
    order?: number;
};

const EMPTY_ITEM: NewItemData = {
    title: { en: '', tr: '' },
    description: { en: '', tr: '' },
    image: '',
    icon: 'HelpCircle'
};

const slugify = (value: string) => {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export default function NewItemForm({
    type,
    existingSlugs,
    nextOrder
}: {
    type: string;
    existingSlugs: string[];
    nextOrder?: number;
}) {
    const router = useRouter();
    const [data, setData] = useState<NewItemData>(EMPTY_ITEM);
    const [slug, setSlug] = useState('');
    const [slugTouched, setSlugTouched] = useState(false);
    const [saving, setSaving] = useState(false);

    const normalizedSlugs = useMemo(() => new Set(existingSlugs.map((s) => s.toLowerCase())), [existingSlugs]);

    const handleChange = (path: string, value: string) => {
        const keys = path.split('.');
        setData((prev) => {
            const newData: any = { ...prev };
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleEnglishTitleChange = (value: string) => {
        handleChange('title.en', value);
        if (!slugTouched) {
            setSlug(slugify(value));
        }
    };

    const handleSave = async () => {
        const cleanedSlug = slugify(slug);
        if (!cleanedSlug) {
            alert('Slug is required.');
            return;
        }
        if (normalizedSlugs.has(cleanedSlug)) {
            alert(`Slug "${cleanedSlug}" already exists.`);
            return;
        }

        setSaving(true);
        try {
            const payload: NewItemData = {
                ...data,
                slug: cleanedSlug,
                name: cleanedSlug,
                id: cleanedSlug
            };
            if (typeof nextOrder === 'number') {
                payload.order = nextOrder;
            }
            await updateItem(type, cleanedSlug, payload);
            router.push(`/admin/${type}`);
            router.refresh();
        } catch (e) {
            alert('Error creating item');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8 max-w-4xl">
            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                    <h3 className="font-bold text-gray-200 text-lg">Slug</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">URL Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => {
                                setSlugTouched(true);
                                setSlug(e.target.value);
                            }}
                            placeholder="e.g., cloud-devops"
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-2">Used for anchors and admin URL. Lowercase letters, numbers, and hyphens only.</p>
                    </div>
                </div>

                {['title', 'description'].map((field) => (
                    <div key={field} className="space-y-4 p-6 border border-white/5 rounded-xl bg-white/5">
                        <h3 className="font-bold text-gray-200 capitalize text-lg">{field}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                                {field === 'description' ? (
                                    <textarea
                                        value={(data as any)[field]?.en || ''}
                                        onChange={(e) => handleChange(`${field}.en`, e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 h-32 transition-all"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={(data as any)[field]?.en || ''}
                                        onChange={(e) => handleEnglishTitleChange(e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 transition-all"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Turkish</label>
                                {field === 'description' ? (
                                    <textarea
                                        value={(data as any)[field]?.tr || ''}
                                        onChange={(e) => handleChange(`${field}.tr`, e.target.value)}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-600 h-32 transition-all"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={(data as any)[field]?.tr || ''}
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
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-500 hover:to-emerald-500 shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Creating...' : 'Create Item'}
                    </button>
                </div>
            </div>
        </div>
    );
}
