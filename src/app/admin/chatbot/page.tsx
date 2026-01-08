import { getChatbotConfig } from '@/lib/content';
import ChatbotConfigForm from '@/components/admin/ChatbotConfigForm';

export default async function ChatbotPage() {
    const rawConfig = await getChatbotConfig();

    const defaults = {
        window_title: 'AI Assistant',
        flow_id: '',
        host_url: '',
        api_key: '',
        enabled: true
    };

    const config = {
        ...defaults,
        ...(rawConfig as any) // Cast to allow merging if type is unknown/incompatible
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Chatbot Configuration
                </h1>
                <p className="text-gray-400 mt-2">Manage your AI chatbot settings and integration here.</p>
            </div>

            <ChatbotConfigForm initialData={config} />
        </div>
    );
}
