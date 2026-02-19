"use client";

import Navbar from "@/components/Navbar";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import {useTranslations, useMessages} from 'next-intl';

interface Experience {
  company: string;
  location: string;
  roles: {
    title: string;
    startDate: string;
    endDate: string | null;
    description: string;
    highlights?: string[];
    technologies?: string[];
  }[];
  industry: "tech" | "education" | "other";
  type?: "web" | "embedded";
}

export default function Experience() {
  const t = useTranslations('Experience');
  const messages = useMessages();
  const experienceData = messages.ExperienceData as any;
  const techExperiences = experienceData.tech as Experience[];
  const otherExperiences = experienceData.other as Experience[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-28 pb-20">
        {/* header */}
        <div className="space-y-2 mb-12">
          <p className="font-mono text-xs text-muted-foreground">{t('comment')}</p>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* tech experience */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold mb-6 font-mono text-muted-foreground">
            <span className="text-primary">{t('techHeader')}</span>{t('techHeaderSuffix')}
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {techExperiences.map((exp, idx) => (
                <ExperienceCard
                  key={exp.company}
                  experience={exp}
                  isFirst={idx === 0}
                />
              ))}
            </div>
          </div>
        </div>

        {/* other experience */}
        <div>
          <h2 className="text-lg font-semibold mb-6 font-mono text-muted-foreground">
            <span className="text-[hsl(28,80%,58%)]">{t('otherHeader')}</span><span className="text-[hsl(0,0%,50%)]">{t('otherHeaderSuffix')}</span>
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {otherExperiences.map((exp) => (
                <ExperienceCard
                  key={exp.company}
                  experience={exp}
                  isFirst={false}
                />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
