
const Database = require('better-sqlite3');
const db = new Database('sqlite.db');

const initialData = {
    title: {
        en: "Empowering Enterprise Transformation",
        tr: "Kurumsal Dönüşümü Güçlendirme"
    },
    subtitle: {
        en: "Next Gen AI",
        tr: "Yeni Nesil YZ"
    },
    description: {
        en: "Bringing the combined power of Generative AI & Edge AI to unlock unlimited possibilities.",
        tr: "Sınırsız olasılıkların kilidini açmak için Üretken YZ ve Uç YZ'nin birleşik gücünü getiriyoruz."
    }
};

try {
    const stmt = db.prepare('INSERT INTO hero (data) VALUES (?)');
    stmt.run(JSON.stringify(initialData));
    console.log('Hero data seeded successfully.');
} catch (e) {
    console.error('Error seeding hero data:', e);
}
