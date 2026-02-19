import type {Metadata} from "next";
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const baseUrl = "https://thejohnmathews.com";

  return {
    title: t('travelsTitle'),
    description: t('travelsDescription'),
    alternates: {
      canonical: `${baseUrl}/${locale}/travels`,
      languages: {
        en: `${baseUrl}/en/travels`,
        es: `${baseUrl}/es/travels`,
      },
    },
  };
}

export default function TravelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
