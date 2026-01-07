export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['services', 'products', 'solutions'].map((type) => (
                    <a key={type} href={`/admin/${type}`} className="block p-8 bg-[#0b1021] border border-white/10 rounded-2xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold capitalize text-white group-hover:text-blue-400 transition-colors">{type}</h2>
                            <span className="p-2 bg-white/5 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                →
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">Manage and update your {type}.</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
