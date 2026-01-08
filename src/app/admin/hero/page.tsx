import { getHeroConfig } from '@/lib/content';
import HeroEditForm from '@/components/admin/HeroEditForm';

export default async function AdminHeroPage() {
    const heroData = await getHeroConfig();

    // Default structure if DB is empty
    const initialData = heroData || {
        title: { en: "", tr: "" },
        subtitle: { en: "", tr: "" },
        description: { en: "", tr: "" }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <HeroEditForm initialData={initialData} />
        </div>
    );
}
