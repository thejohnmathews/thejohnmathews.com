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
    title: t('experienceTitle'),
    description: t('experienceDescription'),
    alternates: {
      canonical: `${baseUrl}/${locale}/experience`,
      languages: {
        en: `${baseUrl}/en/experience`,
        es: `${baseUrl}/es/experience`,
      },
    },
  };
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
