import {Link} from '@/i18n/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Compass} from "lucide-react";
import {getTranslations, setRequestLocale} from 'next-intl/server';

export default async function Personal({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Personal');

  return (
    <div className="min-h-screen bg-[hsl(0,0%,16%)] transition-colors duration-500">
      <Navbar />

      {/* header */}
      <section className="px-6 pt-24 pb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('subtitle')}
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 space-y-12 pb-16">
        {/* travels */}
        <section className="border-l-4 border-primary pl-6 py-2">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{t('travelsTitle')}</h2>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {t('travelsDesc')}
          </p>
          <Link
            href="/travels"
            className="inline-flex items-center gap-2 px-6 py-1 bg-primary text-[hsl(0,0%,16%)] rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {t('viewTravelMap')}
            <span className="text-lg">→</span>
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}
