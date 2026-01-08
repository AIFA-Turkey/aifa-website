
import MailSettingsForm from '@/components/admin/MailSettingsForm';
import { getMailConfig } from '@/lib/mail';

export default async function AdminMailPage() {
    const initialData = await getMailConfig();

    return (
        <div className="container mx-auto px-6 py-12">
            <MailSettingsForm initialData={initialData} />
        </div>
    );
}
