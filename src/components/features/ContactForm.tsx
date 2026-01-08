"use client";

import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function ContactForm() {
    const locale = useLocale();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <section id="contact" className="min-h-[50vh] flex items-center py-20 relative overflow-hidden">
            {/* Background Spotlights */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">
                    <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        {locale === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                                {locale === 'tr' ? 'Adınız Soyadınız' : 'Full Name'}
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                suppressHydrationWarning
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/10 transition-all placeholder-gray-500"
                                placeholder={locale === 'tr' ? 'Ad Soyad' : 'John Doe'}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                                {locale === 'tr' ? 'E-posta Adresi' : 'Email Address'}
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/10 transition-all placeholder-gray-500"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                                {locale === 'tr' ? 'Mesajınız' : 'Message'}
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/10 transition-all placeholder-gray-500"
                                placeholder={locale === 'tr' ? 'Mesajınızı buraya yazın...' : 'Type your message here...'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            suppressHydrationWarning
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-blue-500/25"
                        >
                            {status === 'loading' ? (locale === 'tr' ? 'Gönderiliyor...' : 'Sending...') : (locale === 'tr' ? 'Gönder' : 'Send Message')}
                        </button>

                        {status === 'success' && (
                            <p className="text-green-400 text-center text-sm bg-green-900/20 py-2 rounded-lg border border-green-500/20">
                                {locale === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Message sent successfully!'}
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="text-red-400 text-center text-sm bg-red-900/20 py-2 rounded-lg border border-red-500/20">
                                {locale === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'Something went wrong. Please try again.'}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
