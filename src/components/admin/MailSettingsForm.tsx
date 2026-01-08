'use client';

import { useState } from 'react';
import { updateMailSettings, sendTestEmail } from '@/actions/mail';
import { useRouter } from 'next/navigation';

export default function MailSettingsForm({ initialData }: { initialData: any }) {
    const [data, setData] = useState(initialData || {
        host: '',
        port: '587',
        user: '',
        pass: '',
        from: '',
        secure: false
    });

    // Testing state
    const [testEmail, setTestEmail] = useState('yusuffgur@gmail.com');
    const [status, setStatus] = useState<any>(null); // { type: 'success' | 'error', message: string }
    const [loading, setLoading] = useState(false);
    const [testing, setTesting] = useState(false);

    const router = useRouter();

    const handleChange = (field: string, value: string | boolean) => {
        setData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        setStatus(null);
        try {
            const res = await updateMailSettings(data);
            if (res.success) {
                setStatus({ type: 'success', message: 'Settings saved successfully' });
                router.refresh();
            } else {
                setStatus({ type: 'error', message: res.error });
            }
        } catch (e: any) {
            setStatus({ type: 'error', message: e.message || 'Error saving settings' });
        } finally {
            setLoading(false);
        }
    };

    const handleTest = async () => {
        setTesting(true);
        setStatus(null);
        try {
            // First ensure settings are saved (or we could pass them, but simpler to rely on saved state for security/consistency)
            // But DX is better if we save first.
            // Let's assume user saved.
            const res = await sendTestEmail(testEmail);
            if (res.success) {
                // @ts-ignore
                setStatus({ type: 'success', message: `${res.message} (${res.details})` });
            } else {
                setStatus({ type: 'error', message: res.error });
            }
        } catch (e: any) {
            setStatus({ type: 'error', message: e.message || 'Error sending test email' });
        } finally {
            setTesting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">SMTP Configuration</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">SMTP Host</label>
                        <input
                            type="text"
                            placeholder="smtp.example.com"
                            value={data.host}
                            onChange={(e) => handleChange('host', e.target.value)}
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Port</label>
                        <input
                            type="number"
                            placeholder="587"
                            value={data.port}
                            onChange={(e) => handleChange('port', e.target.value)}
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                        <input
                            type="checkbox"
                            checked={data.secure}
                            onChange={(e) => handleChange('secure', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-600 bg-[#070a13] text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-300">Secure (SSL/TLS) - usually for port 465</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">User / Email</label>
                        <input
                            type="text"
                            value={data.user}
                            onChange={(e) => handleChange('user', e.target.value)}
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={data.pass}
                            onChange={(e) => handleChange('pass', e.target.value)}
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">From Email (Optional)</label>
                        <input
                            type="text"
                            placeholder="noreply@example.com"
                            value={data.from}
                            onChange={(e) => handleChange('from', e.target.value)}
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </div>

            {/* Status Message */}
            {status && (
                <div className={`p-4 rounded-lg border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-200' : 'bg-red-500/10 border-red-500/20 text-red-200'}`}>
                    <strong>{status.type === 'success' ? 'Success' : 'Error'}:</strong> {status.message}
                </div>
            )}

            {/* Testing Section */}
            <div className="bg-[#0b1021]/50 backdrop-blur border border-white/5 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Test Configuration</h2>
                </div>
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Recipient Email</label>
                        <input
                            type="email"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                            className="w-full p-3 bg-[#070a13] border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-200"
                        />
                    </div>
                    <button
                        onClick={handleTest}
                        disabled={testing}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg transition-colors mb-[1px] disabled:opacity-50"
                    >
                        {testing ? 'Sending...' : 'Send Test Email'}
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Note: Save your settings before testing.
                </p>
            </div>
        </div>
    );
}
