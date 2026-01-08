'use client';

import { useState } from 'react';
import { updateFooter } from '@/actions/content';
import { useRouter } from 'next/navigation';

export default function FooterEditForm({ initialData }: { initialData: any }) {
    const [data, setData] = useState(initialData || {
        description: { en: '', tr: '' },
        companyName: 'Aifa',
        address: '',
        email: 'info@aifaturkey.com.tr',
        social: {
            linkedin: '',
            twitter: '',
            instagram: ''
        }
    });
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
            await updateFooter(data);
            alert('Footer updated successfully!');
            router.refresh();
        } catch (e) {
            alert('Error updating footer');
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-white mb-6">Footer Configuration</h2>

            <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8 space-y-8">

                {/* General Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-200">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                            <input
                                type="text"
                                value={data.companyName || ''}
                                onChange={(e) => handleChange('companyName', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="text"
                                value={data.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                            <input
                                type="text"
                                placeholder="Mustafa Kemal Mahallesi..."
                                value={data.address || ''}
                                onChange={(e) => handleChange('address', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-200">Footer Description</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">English</label>
                            <textarea
                                value={data.description?.en || ''}
                                onChange={(e) => handleChange('description.en', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Turkish</label>
                            <textarea
                                value={data.description?.tr || ''}
                                onChange={(e) => handleChange('description.tr', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>



                {/* Quick Links */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-200">Quick Links</h3>
                        <button
                            onClick={() => {
                                const newLinks = [...(data.quickLinks || [])];
                                newLinks.push({ label: '', href: '' });
                                setData({ ...data, quickLinks: newLinks });
                            }}
                            className="text-sm px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors"
                        >
                            + Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {(data.quickLinks || []).map((link: any, index: number) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Label (e.g., Services)"
                                        value={link.label}
                                        onChange={(e) => {
                                            const newLinks = [...data.quickLinks];
                                            newLinks[index].label = e.target.value;
                                            setData({ ...data, quickLinks: newLinks });
                                        }}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="URL (e.g., /#services)"
                                        value={link.href}
                                        onChange={(e) => {
                                            const newLinks = [...data.quickLinks];
                                            newLinks[index].href = e.target.value;
                                            setData({ ...data, quickLinks: newLinks });
                                        }}
                                        className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        const newLinks = data.quickLinks.filter((_: any, i: number) => i !== index);
                                        setData({ ...data, quickLinks: newLinks });
                                    }}
                                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Remove Link"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-200">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                            <input
                                type="text"
                                value={data.social?.linkedin || ''}
                                onChange={(e) => handleChange('social.linkedin', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Twitter / X URL</label>
                            <input
                                type="text"
                                value={data.social?.twitter || ''}
                                onChange={(e) => handleChange('social.twitter', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                            <input
                                type="text"
                                value={data.social?.instagram || ''}
                                onChange={(e) => handleChange('social.instagram', e.target.value)}
                                className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 shadow-lg transition-all disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </div >
        </div >
    );
}
