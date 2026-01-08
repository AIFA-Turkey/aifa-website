import { getItem } from '@/actions/content';
import EditForm from '@/components/admin/EditForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import LegalEditForm from '@/components/admin/LegalEditForm';

export default async function EditPage({ params }: { params: Promise<{ type: string, slug: string }> }) {
    const { type, slug } = await params;
    const item = await getItem(type, slug);

    if (!item) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href={`/admin/${type}`} className="text-gray-500 hover:text-gray-800">
                    ← Back to {type}
                </Link>
                <h1 className="text-2xl font-bold">Edit {item.title?.en || slug}</h1>
            </div>

            {type === 'legal' ? (
                <LegalEditForm type={type} slug={slug} initialData={item} />
            ) : (
                <EditForm type={type} slug={slug} initialData={item} />
            )}
        </div>
    );
}
