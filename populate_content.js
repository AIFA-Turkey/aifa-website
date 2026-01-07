const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src/content/services');
const productsDir = path.join(__dirname, 'src/content/products');
const solutionsDir = path.join(__dirname, 'src/content/solutions');
const navDir = path.join(__dirname, 'src/content/navigation');

[servicesDir, productsDir, solutionsDir, navDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const services = [
    {
        name: "intelligent-automation",
        title: { en: "Intelligent Automation", tr: "Akıllı Otomasyon" },
        description: { en: "Simplifies business processes, optimizes resources, and improves operational efficiencies.", tr: "İş süreçlerini basitleştirir, kaynakları optimize eder ve operasyonel verimliliği artırır." },
        icon: "Cpu",
        image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/65a9173c18e8cbe0276c0fd8_intelligent%20automation.svg"
    },
    {
        name: "sap-ai-automation",
        title: { en: "SAP AI SDLC Automation", tr: "SAP YZ SDLC Otomasyonu" },
        description: { en: "Combines process methodology and industry best practices with flexible SAP solutions.", tr: "Süreç metodolojisini ve endüstri en iyi uygulamalarını esnek SAP çözümleriyle birleştirir." },
        icon: "Database",
        image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/65a9173c18e8cbe0276c0fd8_intelligent%20automation.svg" 
    },
    {
        name: "digital-transformation",
        title: { en: "Digital Transformation", tr: "Dijital Dönüşüm" },
        description: { en: "Using technology to upgrade or create new business procedures.", tr: "Yeni iş prosedürleri oluşturmak veya güncellemek için teknolojiyi kullanma." },
        icon: "Bot",
        image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/65a9177cff0649e8d605addc_digital%20transformation.svg"
    },
    {
        name: "iot",
        title: { en: "IoT (Internet of Things)", tr: "Nesnelerin İnterneti" },
        description: { en: "Enabling devices to talk to each other without needing human interaction.", tr: "Cihazların insan etkileşimi olmadan birbirleriyle konuşmasını sağlama." },
        icon: "Cpu",
        image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/65a9179cf9f858bde53d5678_iot.svg"
    },
    {
        name: "cloud",
        title: { en: "Cloud & DevOps", tr: "Bulut ve DevOps" },
        description: { en: "DevOps and cloud computing solutions that help businesses achieve digital transformation goals.", tr: "İşletmelerin dijital dönüşüm hedeflerine ulaşmasına yardımcı olan DevOps ve bulut bilişim çözümleri." },
        icon: "Database",
        image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/65a917b7cfbf6a2fb74caef8_cloud.svg"
    },
    {
        name: "edge-ai",
        title: { en: "EDGE AI Computer Vision", tr: "EDGE YZ Bilgisayarlı Görü" },
        description: { en: "An interdisciplinary field dealing with how computers can acquire high-level understanding from digital images or videos.", tr: "Bilgisayarların dijital görüntülerden veya videolardan üst düzey anlayış kazanmasıyla ilgilenen disiplinlerarası bir alan." },
        icon: "Bot",
        image: "https://cdn.prod.website-files.com/659ab33ddfa99d9cee1363da/661fa42b699430ae6c0b6322_edge.webp"
    },
    {
        name: "blockchain",
        title: { en: "Blockchain Integration", tr: "Blokzincir Entegrasyonu" },
        description: { en: "Integration of existing AIFA Labs offerings (AI, Big Data, IoT) with blockchain platforms.", tr: "Mevcut AIFA Labs tekliflerinin (YZ, Büyük Veri, IoT) blokzincir platformlarıyla entegrasyonu." },
        icon: "Cpu",
        image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/65a9173c18e8cbe0276c0fd8_intelligent%20automation.svg"
    }
];

const products = [
    {
        name: "cerebro-core",
        title: { en: "Cerebro Core", tr: "Cerebro Core" },
        description: { en: "A multimodal Generative AI platform for the responsible creation, management, and deployment of AI applications.", tr: "YZ uygulamalarının sorumlu bir şekilde oluşturulması, yönetilmesi ve dağıtılması için çok modlu bir Üretken YZ platformu." },
        icon: "Brain",
        image: "https://cdn.prod.website-files.com/659ab33ddfa99d9cee1363da/6617cb075a1d16de1d085fc1_core.webp"
    },
    {
        name: "sasa",
        title: { en: "SAP AI SDLC Assist (SASA)", tr: "SAP YZ SDLC Asistanı (SASA)" },
        description: { en: "AI-powered SDLC automation and migration platform specifically designed for SAP environments.", tr: "SAP ortamları için özel olarak tasarlanmış YZ destekli SDLC otomasyon ve taşıma platformu." },
        icon: "Database",
        image: "https://cdn.prod.website-files.com/659ab33ddfa99d9cee1363da/661e90aeee3ab20c914b91c0_erp.webp"
    },
    {
        name: "converse-ai",
        title: { en: "Converse AI", tr: "Converse AI" },
        description: { en: "An enterprise-grade universal ChatGPT platform for secure and customized conversational AI.", tr: "Güvenli ve özelleştirilmiş konuşma tabanlı YZ için kurumsal sınıf evrensel ChatGPT platformu." },
        icon: "MessageSquare",
        image: "https://cdn.prod.website-files.com/659ab33ddfa99d9cee1363da/68975721452b28e4e29a112f_Agentic%20AI%20Cover.webp"
    },
     {
        name: "flow-ai",
        title: { en: "Flow AI", tr: "Flow AI" },
        description: { en: "A low-code/no-code environment for building and automating complex AI workflows.", tr: "Karmaşık YZ iş akışlarını oluşturmak ve otomatikleştirmek için düşük kodlu/kodsuz bir ortam." },
        icon: "Workflow",
        image: "https://cdn.prod.website-files.com/659ab33ddfa99d9cee1363da/68975721452b28e4e29a112f_Agentic%20AI%20Cover.webp"
    },
];

const solutions = [
    { name: "retail", title: { en: "Retail", tr: "Perakende" }, description: { en: "AI solutions for retail analytics and customer experience.", tr: "Perakende analitiği ve müşteri deneyimi için YZ çözümleri." }, image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/67697c2cf2abd948e4dff29a_image-1.webp" },
    { name: "finance", title: { en: "Finance", tr: "Finans" }, description: { en: "AI for fraud detection and financial forecasting.", tr: "Dolandırıcılık tespiti ve finansal tahmin için YZ." }, image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/677322b598f10e5f6b8e551c_image-1.webp" },
    { name: "healthcare", title: { en: "Healthcare", tr: "Sağlık" }, description: { en: "Improving patient care with predictive AI.", tr: "Öngörücü YZ ile hasta bakımını iyileştirme." }, image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/677323638f121eb024752c73_image.webp" },
    { name: "telecom", title: { en: "Telecommunications", tr: "Telekomünikasyon" }, description: { en: "Network optimization and customer support automation.", tr: "Ağ optimizasyonu ve müşteri desteği otomasyonu." }, image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/677321c5c38a2dc6106d7f61_image.webp" },
    { name: "education", title: { en: "Education", tr: "Eğitim" }, description: { en: "Personalized learning paths and administrative automation.", tr: "Kişiselleştirilmiş öğrenme yolları ve idari otomasyon." }, image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/6773241517259701cba77eb1_image.webp" },
    { name: "manufacturing", title: { en: "Manufacturing", tr: "Üretim" }, description: { en: "Predictive maintenance and quality control.", tr: "Kestirimci bakım ve kalite kontrol." }, image: "https://cdn.prod.website-files.com/65a65d597624a0885ef7e135/677324f08ae08dc2cb2dc01d_image.webp" }
];

const navigation = {
    mainMenu: [
        { label: { en: "Home", tr: "Ana Sayfa" }, href: "/" },
        { label: { en: "Products", tr: "Ürünler" }, href: "/products" },
        { label: { en: "Services", tr: "Hizmetler" }, href: "/services" },
        { label: { en: "Solutions", tr: "Çözümler" }, href: "/solutions" },
        { label: { en: "Blog", tr: "Blog" }, href: "/blog" },
        { label: { en: "Contact", tr: "İletişim" }, href: "/contact" }
    ],
    footerProducts: products.map(p => ({ label: p.title.en, href: `/products#${p.name}` })),
    footerServices: services.map(s => ({ label: s.title.en, href: `/services#${s.name}` }))
};

services.forEach(s => fs.writeFileSync(path.join(servicesDir, `${s.name}.json`), JSON.stringify(s, null, 2)));
products.forEach(p => fs.writeFileSync(path.join(productsDir, `${p.name}.json`), JSON.stringify(p, null, 2)));
solutions.forEach(s => fs.writeFileSync(path.join(solutionsDir, `${s.name}.json`), JSON.stringify(s, null, 2)));
fs.writeFileSync(path.join(navDir, 'index.json'), JSON.stringify(navigation, null, 2));

console.log('Content populated.');
