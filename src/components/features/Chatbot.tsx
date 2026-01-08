import Script from 'next/script';
import { getChatbotConfig } from '@/lib/content';
import ChatbotWrapper from './ChatbotWrapper';

export default async function Chatbot() {
    // 1. Try to get config from CMS (chatbot.json)
    const cmsConfig = await getChatbotConfig();

    // 2. Fallback to Environment Variables (or default)
    const safeCmsConfig = cmsConfig as any;
    const config = {
        enabled: safeCmsConfig?.enabled ?? true, // Default to true if missing in old config
        window_title: safeCmsConfig?.window_title || process.env.NEXT_PUBLIC_CHATBOT_TITLE || 'Assistant',
        flow_id: safeCmsConfig?.flow_id || process.env.NEXT_PUBLIC_CHATBOT_FLOW_ID || '',
        host_url: safeCmsConfig?.host_url || process.env.NEXT_PUBLIC_CHATBOT_HOST || 'https://www.cerebroaifalabs.com',
        api_key: safeCmsConfig?.api_key || process.env.NEXT_PUBLIC_CHATBOT_API_KEY || ''
    };

    if (!config.enabled || !config.flow_id || !config.api_key) {
        return null; // Don't render if disabled or critical config missing
    }

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/gh/langflow-ai/langflow-embedded-chat@v1.0.8/dist/build/static/js/bundle.min.js"
                strategy="afterInteractive"
            />
            <ChatbotWrapper config={config} />
        </>
    );
}
