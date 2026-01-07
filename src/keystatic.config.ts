import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Blog Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title' }),
                date: fields.date({ label: 'Date' }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
        services: collection({
            label: 'Services',
            slugField: 'name',
            path: 'src/content/services/*',
            format: 'json',
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                title: fields.object({
                    en: fields.text({ label: 'Title (English)' }),
                    tr: fields.text({ label: 'Title (Turkish)' }),
                }),
                description: fields.object({
                    en: fields.text({ label: 'Description (English)' }),
                    tr: fields.text({ label: 'Description (Turkish)' }),
                }),
                image: fields.text({ label: 'Image URL' }),
                icon: fields.text({ label: 'Icon Name (Lucide)' }),
            }
        }),
        products: collection({
            label: 'Products (Cerebro)',
            slugField: 'name',
            path: 'src/content/products/*',
            format: 'json',
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                title: fields.object({
                    en: fields.text({ label: 'Title (English)' }),
                    tr: fields.text({ label: 'Title (Turkish)' }),
                }),
                description: fields.object({
                    en: fields.text({ label: 'Description (English)' }),
                    tr: fields.text({ label: 'Description (Turkish)' }),
                }),
                image: fields.text({ label: 'Image URL' }),
                icon: fields.text({ label: 'Icon Name (Lucide)' }),
            }
        }),
        solutions: collection({
            label: 'Solutions (Use Cases)',
            slugField: 'name',
            path: 'src/content/solutions/*',
            format: 'json',
            schema: {
                name: fields.slug({ name: { label: 'Name' } }),
                title: fields.object({
                    en: fields.text({ label: 'Title (English)' }),
                    tr: fields.text({ label: 'Title (Turkish)' }),
                }),
                description: fields.object({
                    en: fields.text({ label: 'Description (English)' }),
                    tr: fields.text({ label: 'Description (Turkish)' }),
                }),
                image: fields.text({ label: 'Image URL' }),
            }
        })
    },
    singletons: {
        navigation: singleton({
            label: 'Navigation',
            path: 'src/content/navigation',
            format: 'json',
            schema: {
                mainMenu: fields.array(
                    fields.object({
                        label: fields.object({
                            en: fields.text({ label: 'Label (English)' }),
                            tr: fields.text({ label: 'Label (Turkish)' }),
                        }),
                        href: fields.text({ label: 'URL' }),
                    }),
                    { label: 'Main Menu Items', itemLabel: props => props.fields.href.value || 'Link' }
                ),
                footerProducts: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Label' }),
                        href: fields.text({ label: 'URL' }),
                    }),
                    { label: 'Footer Products Links' }
                ),
                footerServices: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Label' }),
                        href: fields.text({ label: 'URL' }),
                    }),
                    { label: 'Footer Services Links' }
                )
            }
        }),
        privacyPolicy: singleton({
            label: 'Privacy Policy',
            path: 'src/content/legal/privacy-policy',
            format: 'json',
            schema: {
                content: fields.object({
                    en: fields.document({
                        label: 'Content (English)',
                        formatting: true,
                        dividers: true,
                        links: true,
                    }),
                    tr: fields.document({
                        label: 'Content (Turkish)',
                        formatting: true,
                        dividers: true,
                        links: true,
                    }),
                })
            }
        }),
        termsOfService: singleton({
            label: 'Terms of Service',
            path: 'src/content/legal/terms-of-service',
            format: 'json',
            schema: {
                content: fields.object({
                    en: fields.document({
                        label: 'Content (English)',
                        formatting: true,
                        dividers: true,
                        links: true,
                    }),
                    tr: fields.document({
                        label: 'Content (Turkish)',
                        formatting: true,
                        dividers: true,
                        links: true,
                    }),
                })
            }
        }),
        chatbot: singleton({
            label: 'Chatbot Configuration',
            path: 'src/content/chatbot',
            format: 'json',
            schema: {
                enabled: fields.checkbox({ label: 'Enable Chatbot', defaultValue: true }),
                window_title: fields.text({ label: 'Window Title' }),
                flow_id: fields.text({ label: 'Flow ID' }),
                api_key: fields.text({ label: 'API Key' }),
                host_url: fields.text({ label: 'Host URL' }),
            }
        })
    }
});
