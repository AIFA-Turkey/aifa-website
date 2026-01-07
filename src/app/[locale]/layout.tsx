import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google"; // Updated Font
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/features/Chatbot';

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat",
});

export const metadata: Metadata = {
  title: "AIFA TURKEY - Advanced AI Solutions",
  description: "Leveraging cutting-edge AI (LLMs, RAG, Agents) for Turkish enterprises.",
  openGraph: {
    title: "AIFA TURKEY",
    description: "Advanced AI Solutions for Turkey",
    url: "https://aifaturkey.com.tr",
    siteName: "AIFA TURKEY",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIFA TURKEY",
    description: "Advanced AI Solutions for Turkey",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${redHat.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <div className="flex-grow">
            {children}
          </div>
          <Footer locale={locale} />
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
