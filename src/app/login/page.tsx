'use client';

import { login } from '@/actions/auth';
import { useState } from 'react';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        const result = await login(formData);
        if (result && result.error) {
            setError(result.error);
            setLoading(false);
        }
        // If success, the action redirects, so no need to setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#070a13] relative overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Admin Portal
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">Sign in to manage content</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-gray-500 transition-all"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
