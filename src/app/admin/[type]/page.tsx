import { getItems } from '@/actions/content';
import Link from 'next/link';
import SortableContentTable from '@/components/admin/SortableContentTable';

export default async function ListPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;
    const items = await getItems(type);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{type}</h1>
                <Link
                    href={`/admin/${type}/new`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-500 hover:to-purple-500 shadow transition-all"
                >
                    New Item
                </Link>
            </div>

            <SortableContentTable type={type} initialItems={items} />
        </div>
    );
}
