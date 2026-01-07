'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveChatbotConfig } from '@/actions/content';

interface ChatbotConfig {
    window_title: string;
    flow_id: string;
    host_url: string;
    api_key: string;
    enabled?: boolean;
}

export default function ChatbotConfigForm({ initialData }: { initialData: ChatbotConfig }) {
    const router = useRouter();
    const [formData, setFormData] = useState<ChatbotConfig>(initialData);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await saveChatbotConfig(formData);
            setMessage('Configuration saved successfully!');
            router.refresh();
        } catch (error) {
            setMessage('Error saving configuration.');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0b1021]/50 backdrop-blur border border-white/5 p-8 rounded-lg shadow-xl">
            {message && (
                <div className={`p-4 rounded ${message.includes('Error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Window Title</label>
                    <input
                        type="text"
                        value={formData.window_title}
                        onChange={(e) => setFormData({ ...formData, window_title: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Flow ID</label>
                    <input
                        type="text"
                        value={formData.flow_id}
                        onChange={(e) => setFormData({ ...formData, flow_id: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Host URL</label>
                    <input
                        type="url"
                        value={formData.host_url}
                        onChange={(e) => setFormData({ ...formData, host_url: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
                    <input
                        type="password"
                        value={formData.api_key}
                        onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="enabled"
                        checked={formData.enabled ?? true}
                        onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                    <label htmlFor="enabled" className="text-gray-300 font-medium">Enable Chatbot</label>
                </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Configuration'}
                </button>
            </div>
        </form>
    );
}
