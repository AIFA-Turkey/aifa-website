import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getProducts, getServices, getSolutions, getHeroConfig } from '@/lib/content';
import { ArrowRight } from 'lucide-react';
import AccordionSolutions from '@/components/features/AccordionSolutions';
import ContactForm from '@/components/features/ContactForm';

// Helper to localize items
const localizeItems = (items: any[], locale: string) => {
  return items.map(item => ({
    slug: item.slug || item.name || item.id || item.title?.en || Math.random().toString(), // fallback slug
    title: item.title[locale] || item.title['en'],
    description: item.description[locale] || item.description['en'],
    image: item.image,
    icon: item.icon // Pass icon if available
  }));
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // Fetch ALL content for One-Pager
  const rawProducts = await getProducts();
  const rawServices = await getServices();
  const rawSolutions = await getSolutions();
  const heroData: any = await getHeroConfig();

  const services = localizeItems(rawServices, locale);
  const products = localizeItems(rawProducts, locale);
  const solutions = localizeItems(rawSolutions, locale);

  const heroSubtitle = heroData?.subtitle?.[locale] || t('Home.heroSubtitle') || 'Next Gen AI';
  const heroTitle = heroData?.title?.[locale] || t('Home.heroTitle') || 'Empowering Enterprise Transformation';
  const heroDesc = heroData?.description?.[locale] || t('Home.heroDesc');

  const heroCtaText = heroData?.cta?.text?.[locale] || t('Navigation.solutions') || 'Explore Solutions';
  const heroCtaLink = heroData?.cta?.link?.[locale] || '/#solutions';

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section - Sasa Style (Dark/Glow) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradients/Image */}
        <div className="absolute inset-0 z-0 bg-[#070a13]">
          {/* Deep Navy Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070a13]/50 to-[#070a13]" />
          <img
            src="/images/hero-bg.webp"
            alt="AI Future"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          {/* Spotlights */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 z-10 text-center relative">
          {/* Floating Badge */}
          <div className="inline-block mb-8 px-4 py-2 border border-blue-500/30 rounded-full bg-blue-900/10 backdrop-blur-md">
            <span className="text-blue-300 text-sm font-medium tracking-wider uppercase">
              {heroSubtitle}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-white">
              {heroTitle.split(' ')[0]}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {' ' + (heroTitle.split(' ').slice(1).join(' '))}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            {heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={heroCtaLink}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_40px_rgba(64,147,255,0.3)] flex items-center justify-center gap-3"
            >
              {heroCtaText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <AccordionSolutions
        id="services"
        items={services}
        categoryTitle={t('Home.servicesTitle') || 'Our Services'}
      />

      {/* Solutions Section */}
      <AccordionSolutions
        id="solutions"
        items={solutions}
        categoryTitle={t('Navigation.solutions') || 'Enterprise Solutions'}
      />

      {/* Products Section */}
      <AccordionSolutions
        id="products"
        items={products}
        categoryTitle={t('Navigation.products') || 'Products'}
      />

      {/* Contact Section */}
      <ContactForm />

    </main>
  );
}
