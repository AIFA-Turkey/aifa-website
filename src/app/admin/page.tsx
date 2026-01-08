export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { id: 'services', label: 'Services', desc: 'Manage services.' },
                    { id: 'products', label: 'Products', desc: 'Manage products.' },
                    { id: 'solutions', label: 'Solutions', desc: 'Manage solutions.' },
                    { id: 'hero', label: 'Homepage Banner', desc: 'Edit homepage hero section.' },
                    { id: 'chatbot', label: 'Chatbot Config', desc: 'Configure AI assistant.' },
                    { id: 'legal/privacy-policy', label: 'Privacy Policy', desc: 'Edit privacy policy.' },
                    { id: 'legal/terms-of-service', label: 'Terms of Service', desc: 'Edit terms of service.' },
                    { id: 'data', label: 'Data Management', desc: 'Backup and restore data.' },
                    { id: 'mail', label: 'Mail Configuration', desc: 'Configure SMTP settings.' },
                    { id: 'footer', label: 'Footer Content', desc: 'Edit footer info & links.' },
                ].map((item) => (
                    <a key={item.id} href={`/admin/${item.id}`} className="block p-8 bg-[#0b1021] border border-white/10 rounded-2xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold capitalize text-white group-hover:text-blue-400 transition-colors">{item.label}</h2>
                            <span className="p-2 bg-white/5 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                →
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
