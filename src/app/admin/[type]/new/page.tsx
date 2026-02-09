import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getItems } from '@/actions/content';
import NewItemForm from '@/components/admin/NewItemForm';

const SUPPORTED_TYPES = ['services', 'products', 'solutions'];

export default async function NewItemPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;

    if (!SUPPORTED_TYPES.includes(type)) {
        notFound();
    }

    const items = await getItems(type);
    const existingSlugs = items.map((item: any) => item.slug);

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href={`/admin/${type}`} className="text-gray-500 hover:text-gray-800">
                    ← Back to {type}
                </Link>
                <h1 className="text-2xl font-bold">New {type.slice(0, 1).toUpperCase() + type.slice(1)} Item</h1>
            </div>

            <NewItemForm type={type} existingSlugs={existingSlugs} />
        </div>
    );
}
