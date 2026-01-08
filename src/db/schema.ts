import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Helper to store JSON blobs
const jsonColumn = (name: string) => text(name, { mode: 'json' });

export const posts = sqliteTable('posts', {
    slug: text('slug').primaryKey(),
    title: text('title').notNull(),
    date: text('date'),
    content: jsonColumn('content'), // Document field
});

export const services = sqliteTable('services', {
    slug: text('slug').primaryKey(),
    data: jsonColumn('data').notNull(),
});

export const products = sqliteTable('products', {
    slug: text('slug').primaryKey(),
    data: jsonColumn('data').notNull(),
});

export const solutions = sqliteTable('solutions', {
    slug: text('slug').primaryKey(),
    data: jsonColumn('data').notNull(),
});

export const navigation = sqliteTable('navigation', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    data: jsonColumn('data').notNull(),
});

export const legal = sqliteTable('legal', {
    slug: text('slug').primaryKey(), // 'privacy-policy', 'terms-of-service'
    data: jsonColumn('data').notNull(),
});

export const chatbot = sqliteTable('chatbot', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    data: jsonColumn('data').notNull(),
});

export const hero = sqliteTable('hero', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    data: jsonColumn('data').notNull(),
});

export const mail_settings = sqliteTable('mail_settings', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    data: jsonColumn('data').notNull(),
});

export const footer = sqliteTable('footer', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    data: jsonColumn('data').notNull(),
});
