"use client";

import Navbar from "@/components/Navbar";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";

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

const techExperiences: Experience[] = [
  {
    company: "Fastbreak AI",
    location: "Charlotte, NC",
    type: "web",
    roles: [
      {
        title: "Junior Software Engineer",
        startDate: "2025-10",
        endDate: null,
        description: "Developing a full-stack web application for event ticketing and management. Working on the entire stack from database design to frontend development, utilizing Next.js and Postgres.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Jira"],
      }
    ],
    industry: "tech",
  },
  {
    company: "FastFetch",
    location: "Seneca, SC",
    type: "embedded",
    roles: [
      {
        title: "Junior Embedded Software Engineer",
        startDate: "2023-08",
        endDate: "2024-09",
        description: "Promoted to contract role developing embedded systems while in school. Worked on porting all 8052 ASM firmware to Embedded C to improve maintainability and add new features.",
        technologies: ["Embedded C", "ASM", "8052 Microcontroller", "Bare Metal", "Oscilloscope", "Serial/Infared Communication"],
      },
      {
        title: "Embedded Software Engineering Intern",
        startDate: "2023-05",
        endDate: "2023-08",
        description: "Internship focused on embedded systems development. Ported a proprietary embedded system in ASM to a protype system in Embedded C.",
        technologies: ["Embedded C", "ASM", "ATmega Microcontrollers", "RS-232 & RS-485", "Bootloaders"],
      }
    ],
    industry: "tech",
  },
];

const otherExperiences: Experience[] = [
  {
    company: "Ministerio de Educación de España",
    location: "CEIP Eugenio Maria de Hostos, Madrid, Spain",
    roles: [
      {
        title: "Auxiliar de Conversación",
        startDate: "2024-09",
        endDate: "2025-07",
        description: "Assisted in teaching English at a public primary school in Madrid. Taught conversational English to students aged 3-10, helping to enhance their language skills and cultural understanding.",
        highlights: [
          "Learned A2 Castilian Spanish in 1 year",
          "Enhanced cross-cultural communication",
        ],
      }
    ],
    industry: "education",
  },
  {
    company: "Carowinds",
    location: "Charlotte, NC / Fort Mill, SC",
    roles: [
      {
        title: "Aquatics Supervisor",
        startDate: "2020-01",
        endDate: "2022-08",
        description: "Supervised aquatics operations and lifeguard staff at a major amusement park. Managed team schedules, conducted safety training, and ensured guest safety across multiple water attractions.",
        highlights: [
          "3 years of leadership experience",
          "Managed a team of 20+ lifeguards every day",
          "Ensured the safety and customer satisfaction of thousands of guests each season",
        ],
      },
      {
        title: "Lifeguard and Certified Trainer",
        startDate: "2018-05",
        endDate: "2020-01",
        description: "",
      }
    ],
    industry: "other",
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-28 pb-20">
        {/* header */}
        <div className="space-y-2 mb-12">
          <p className="font-mono text-xs text-muted-foreground">// working life so far</p>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">
            Building software, from embedded systems to web applications.
          </p>
        </div>

        {/* tech experience */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold mb-6 font-mono text-muted-foreground">
            <span className="text-primary">char* techExperience = </span>(char*)malloc(NUM_EXP * sizeof(char*));
          </h2>
          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            {/* render tech experience */}
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
            <span className="text-[hsl(28,80%,58%)]">const </span><span className="text-[hsl(0,0%,50%)]">OTHER_EXPERIENCE = 2;</span>
          </h2>
          <div className="relative">
            {/* timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            {/* render other experience */}
            <div className="space-y-8">
              {otherExperiences.map((exp, idx) => (
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
