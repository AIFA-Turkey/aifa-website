import { getItems } from '@/actions/content';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/DeleteButton';

export default async function ListPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;
    const items = await getItems(type);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">{type}</h1>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-500 hover:to-purple-500 opacity-50 cursor-not-allowed shadow transition-all" title="Use create-content script for now">
                    New Item (Use Script)
                </button>
            </div>

            <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-lg shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-300">Name (Slug)</th>
                            <th className="px-6 py-3 font-semibold text-gray-300">English Title</th>
                            <th className="px-6 py-3 font-semibold text-gray-300">Turkish Title</th>
                            <th className="px-6 py-3 font-semibold text-gray-300 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map((item: any) => (
                            <tr key={item.slug} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-gray-400">{item.slug}</td>
                                <td className="px-6 py-4 text-gray-300">{item.title.en}</td>
                                <td className="px-6 py-4 text-gray-300">{item.title.tr}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/${type}/${item.slug}`} className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors">
                                            Edit
                                        </Link>
                                        <DeleteButton type={type} slug={item.slug} />
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
