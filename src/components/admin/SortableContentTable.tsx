'use client';

import { useEffect, useState, type DragEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updateItemOrder } from '@/actions/content';
import { DeleteButton } from '@/components/admin/DeleteButton';

interface SortableItem {
    slug: string;
    title?: { en?: string; tr?: string };
    order?: number | string;
}

function reorderItems(items: SortableItem[], draggedSlug: string, targetSlug: string) {
    const fromIndex = items.findIndex((item) => item.slug === draggedSlug);
    const toIndex = items.findIndex((item) => item.slug === targetSlug);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return items;

    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
}

export default function SortableContentTable({
    type,
    initialItems
}: {
    type: string;
    initialItems: SortableItem[];
}) {
    const router = useRouter();
    const [items, setItems] = useState<SortableItem[]>(initialItems);
    const [draggingSlug, setDraggingSlug] = useState<string | null>(null);
    const [overSlug, setOverSlug] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setItems(initialItems);
        setDirty(false);
    }, [initialItems]);

    const handleDragStart = (slug: string) => (event: DragEvent<HTMLTableRowElement>) => {
        setDraggingSlug(slug);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', slug);
    };

    const handleDragOver = (slug: string) => (event: DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
        setOverSlug(slug);
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (targetSlug: string) => (event: DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
        const dragged = draggingSlug || event.dataTransfer.getData('text/plain');
        if (!dragged || dragged === targetSlug) return;

        setItems((prev) => reorderItems(prev, dragged, targetSlug));
        setDirty(true);
        setDraggingSlug(null);
        setOverSlug(null);
    };

    const handleDragEnd = () => {
        setDraggingSlug(null);
        setOverSlug(null);
    };

    const handleReset = () => {
        setItems(initialItems);
        setDirty(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const orderedSlugs = items.map((item) => item.slug);
            const result = await updateItemOrder(type, orderedSlugs);
            if (!result?.success) {
                alert(result?.error || 'Failed to save order');
                return;
            }
            setDirty(false);
            router.refresh();
        } catch (error) {
            alert('Failed to save order');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-white/5">
                <p className="text-sm text-gray-400">
                    Drag rows to set the display order. This order is used on the public site.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        disabled={!dirty || saving}
                        className="px-4 py-2 bg-white/5 border border-white/10 text-gray-200 rounded hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!dirty || saving}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-500 hover:to-purple-500 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save order'}
                    </button>
                </div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-gray-300">Order</th>
                        <th className="px-6 py-3 font-semibold text-gray-300">Name (Slug)</th>
                        <th className="px-6 py-3 font-semibold text-gray-300">English Title</th>
                        <th className="px-6 py-3 font-semibold text-gray-300">Turkish Title</th>
                        <th className="px-6 py-3 font-semibold text-gray-300 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {items.map((item, index) => {
                        const isDragging = draggingSlug === item.slug;
                        const isOver = overSlug === item.slug && draggingSlug !== item.slug;

                        return (
                            <tr
                                key={item.slug}
                                draggable
                                onDragStart={handleDragStart(item.slug)}
                                onDragOver={handleDragOver(item.slug)}
                                onDrop={handleDrop(item.slug)}
                                onDragEnd={handleDragEnd}
                                className={`transition-colors ${isDragging ? 'opacity-60' : ''} ${isOver ? 'bg-blue-500/10' : 'hover:bg-white/5'}`}
                                title="Drag to reorder"
                            >
                                <td className="px-4 py-4 text-gray-500 font-mono text-xs">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="text-gray-500">::</span>
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm text-gray-400">{item.slug}</td>
                                <td className="px-6 py-4 text-gray-300">{item.title?.en || '-'}</td>
                                <td className="px-6 py-4 text-gray-300">{item.title?.tr || '-'}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/admin/${type}/${item.slug}`}
                                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton type={type} slug={item.slug} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
