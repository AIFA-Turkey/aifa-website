import { getChatbotConfig } from '@/lib/content';
import ChatbotConfigForm from '@/components/admin/ChatbotConfigForm';

export default async function ChatbotPage() {
    const config = await getChatbotConfig();

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
