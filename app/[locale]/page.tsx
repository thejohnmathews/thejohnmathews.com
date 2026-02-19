import Navbar from "@/components/Navbar";
import TerminalHero from "@/components/TerminalHero";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function Home({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John Mathews",
    url: "https://thejohnmathews.com",
    jobTitle: locale === 'es' ? "Desarrollador de Software" : "Software Developer",
    knowsLanguage: ["en", "es"],
    sameAs: [
      "https://github.com/thejohnmathews",
      "https://linkedin.com/in/thejohnmathews",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-28 pb-20">
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">{t('comment')}</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('greeting')} <span className="text-primary">{t('name')}</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            {t('intro')}
          </p>
        </div>

        <div className="mt-10">
          <TerminalHero />
        </div>

        <div className="mt-12">
          <AboutSection />
        </div>

        <Footer />
      </main>
    </div>
  );
}
