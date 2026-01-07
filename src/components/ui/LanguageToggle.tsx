"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="relative">
            <select
                defaultValue={locale}
                className="bg-transparent py-2 pl-3 pr-8 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="tr">TR</option>
                <option value="en">EN</option>
            </select>
        </div>
    );
}
