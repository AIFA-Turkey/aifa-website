'use client';

import { useState } from 'react';
import { updateItem } from '@/actions/content';
import { useRouter } from 'next/navigation';
import { convertKeystaticToHtml } from '@/lib/ast-to-html';
import RichTextEditor from './RichTextEditor';

export default function LegalEditForm({ type, slug, initialData }: { type: string, slug: string, initialData: any }) {
    // Initial data content might be old JSON (array/object) or new HTML (string)
    const getInitialContent = (content: any) => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        // Legacy JSON detected -> Convert to HTML
        return convertKeystaticToHtml(content);
    };

    const [contentEn, setContentEn] = useState(getInitialContent(initialData.content?.en));
    const [contentTr, setContentTr] = useState(getInitialContent(initialData.content?.tr));
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    // Check if it was legacy to notify user of conversion
    const wasLegacy = (typeof initialData.content?.en !== 'string' && initialData.content?.en) ||
        (typeof initialData.content?.tr !== 'string' && initialData.content?.tr);

    const handleSave = async () => {
        setSaving(true);
        try {
            const reqData = {
                content: {
                    en: contentEn,
                    tr: contentTr
                }
            };

            await updateItem(type, slug, reqData);
            alert('Saved successfully!');
            router.refresh();
        } catch (e) {
            alert('Error saving');
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8 max-w-5xl">
            <div className="mb-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg text-blue-200 text-sm">
                <strong>Rich Text Editor:</strong> Content is edited and saved as HTML.
            </div>

            {wasLegacy && (
                <div className="mb-6 p-4 border border-green-500/20 bg-green-500/10 rounded-lg text-green-200 text-sm">
                    <strong>Success:</strong> Legacy content was successfully converted to HTML for editing.
                    Please review formatting before saving.
                </div>
            )}

            <div className="grid grid-cols-1 gap-12">
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-200 capitalize text-lg">Content (English)</h3>
                    <RichTextEditor
                        value={contentEn}
                        onChange={setContentEn}
                    />
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-200 capitalize text-lg">Content (Turkish)</h3>
                    <RichTextEditor
                        value={contentTr}
                        onChange={setContentTr}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
                <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-500 hover:to-emerald-500 shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
