import type {Metadata} from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const baseUrl = "https://thejohnmathews.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteTitle')}`,
    },
    description: t('siteDescription'),
    keywords: [
      "John Mathews", "software developer", "embedded systems",
      "web development", "portfolio",
    ],
    authors: [{name: "John Mathews"}],
    creator: "John Mathews",
    openGraph: {
      type: "website",
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: t('siteTitle'),
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    twitter: {
      card: "summary",
      title: t('siteTitle'),
      description: t('siteDescription'),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    robots: {index: true, follow: true},
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="dark">
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
