"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cpu, Globe, ExternalLink, Github, Terminal, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProjectCategory = "all" | "embedded" | "web" | "other";

interface Project {
  title: string;
  description: string;
  category: "embedded" | "web" | "other";
  tags: string[];
  status: "active" | "completed" | "paused";
  links?: { label: string; url: string; icon: "github" | "external" }[];
}

const projects: Project[] = [
  {
    title: "Luis El Portero",
    description:
      "I made an access control system for my apartment door in Madrid after I got locked out once. It used an ESP8266 microcontroller continuously monitoring an endpoint on a server I set up. \
      Whenever I sent the secret to the endpoint from my phone, the microcontroller would trigger the motor to hit the button to buzz me in.",
    category: "embedded",
    tags: ["C++", "ESP8266", "IoT"],
    status: "completed",
    links: [{ label: "Repo", url: "https://github.com/thejohnmathews/luis-el-portero-2", icon: "github" }],
  },
  {
    title: "johnmathews.dev",
    description:
      "My personal website built with Next.js and Tailwind CSS. I developed this site for fun to have a place to share my projects among other things I am interested in. \
      I knew I wanted the design to reflect both my web dev and embedded interests, hence the ui that changes based on the project category. I am also adding a personal \
      section where I will put random things like my traveling and other hobbies. ",
    category: "web",
    tags: ["Next.js", "Tailwind CSS"],

    status: "active",
    links: [{ label: "Repo", url: "https://github.com/thejohnmathews/johnmathews.dev", icon: "github" }],
  },
  {
    title: "Baby Bean PT Website",
    description:
      "Baby Bean PT is a small businees started by my mother that offers telehealth physical therapy sessions for premature and underdevloped babes in the Charlote area. \
      To kick start her businees, I built her a website so that she could have an online presense and a way for potential clients to submit requests for appointments.",
    category: "web",
    tags: ["Next.js", "Tailwind CSS", "Vercel","Resend"],

    status: "completed",
      links: [{ label: "Website", url: "https://babybeanpt.com", icon: "external" }],
  },
  {
    title: "HitSkill",
    description:
      "HitSkill is a mobile app that connects cheer atheletes with coaches (professional/student athletes) for private lesstons. This would allow student atheletes to be able to make \
      money on the side easier or event help gyms post private lessons as well. So far I have built a static website for it and a \
      skeleton of the app in Flutter/Dart. I would love to finish buliding it and start a beta test with my old cheer team.",
    category: "other",
    tags: ["Mobile", "Flutter", "Android/iOS"],
    status: "paused",
    links: [{ label: "Website", url: "https://hitskill.app", icon: "external" }],
  },
  {
    title: "Metro de Madrid CLI",
    description:
      "A C++ command-line tool that displays a live ASCII art map of the Madrid Metro system in the terminal. Shows real-time train positions and station status using the Metro de Madrid API.",
    category: "other",
    tags: ["C++", "CLI", "API Scrapimg"],
    status: "active",
    links: [{ label: "Repo", url: "https://github.com/thejohnmathews/metro-de-madrid-CLI", icon: "github" }],
  },
];

// ── Theme configs ──
const themes = {
  embedded: {
    accent: "text-[hsl(100,40%,46%)]",
    accentBg: "bg-[hsl(100,40%,46%,0.1)]",
    accentBorder: "border-[hsl(100,40%,46%,0.2)]",
    accentBorderHover: "hover:border-[hsl(100,40%,46%,0.4)]",
    tagBg: "bg-[hsl(100,40%,46%,0.1)] text-[hsl(100,40%,46%,0.8)]",
    statusActive: "bg-[hsl(100,40%,46%,0.2)] text-[hsl(100,40%,46%)] border-[hsl(100,40%,46%,0.3)]",
    statusCompleted: "bg-[hsl(100,40%,46%,0.1)] text-[hsl(100,40%,46%,0.6)] border-[hsl(100,40%,46%,0.2)]",
    statusPaused: "bg-muted text-muted-foreground border-border",
    linkHover: "hover:text-[hsl(100,40%,46%)]",
    headerComment: "/* personal projects */",
    cardBg: "bg-[hsl(0,0%,17%)]",
    pageBg: "bg-[hsl(0,0%,14%)]",
  },
  web: {
    accent: "text-[hsl(210,60%,62%)]",
    accentBg: "bg-[hsl(210,60%,62%,0.1)]",
    accentBorder: "border-[hsl(210,60%,62%,0.2)]",
    accentBorderHover: "hover:border-[hsl(210,60%,62%,0.4)]",
    tagBg: "bg-[hsl(210,60%,62%,0.1)] text-[hsl(210,60%,62%,0.8)]",
    statusActive: "bg-[hsl(210,60%,62%,0.2)] text-[hsl(210,60%,62%)] border-[hsl(210,60%,62%,0.3)]",
    statusCompleted: "bg-[hsl(210,60%,62%,0.1)] text-[hsl(210,60%,62%,0.6)] border-[hsl(210,60%,62%,0.2)]",
    statusPaused: "bg-muted text-muted-foreground border-border",
    linkHover: "hover:text-[hsl(210,60%,62%)]",
    headerComment: "// personal projects",
    cardBg: "bg-[hsl(0,0%,17%)]",
    pageBg: "bg-[hsl(0,0%,14%)]",
  },
  other: {
    accent: "text-[hsl(270,60%,65%)]",
    accentBg: "bg-[hsl(270,60%,65%,0.1)]",
    accentBorder: "border-[hsl(270,60%,65%,0.2)]",
    accentBorderHover: "hover:border-[hsl(270,60%,65%,0.4)]",
    tagBg: "bg-[hsl(270,60%,65%,0.1)] text-[hsl(270,60%,65%,0.8)]",
    statusActive: "bg-[hsl(270,60%,65%,0.2)] text-[hsl(270,60%,65%)] border-[hsl(270,60%,65%,0.3)]",
    statusCompleted: "bg-[hsl(270,60%,65%,0.1)] text-[hsl(270,60%,65%,0.6)] border-[hsl(270,60%,65%,0.2)]",
    statusPaused: "bg-muted text-muted-foreground border-border",
    linkHover: "hover:text-[hsl(270,60%,65%)]",
    headerComment: "# personal projects",
    cardBg: "bg-[hsl(0,0%,17%)]",
    pageBg: "bg-[hsl(0,0%,14%)]",
  },
  all: {
    accent: "text-primary",
    accentBg: "bg-primary/10",
    accentBorder: "border-primary/20",
    accentBorderHover: "hover:border-primary/40",
    tagBg: "bg-secondary text-muted-foreground",
    statusActive: "bg-accent/20 text-accent border-accent/30",
    statusCompleted: "bg-primary/20 text-primary border-primary/30",
    statusPaused: "bg-muted text-muted-foreground border-border",
    linkHover: "hover:text-primary",
    headerComment: "// personal projects",
    cardBg: "bg-card",
    pageBg: "bg-background",
  },
};

// ── C-style struct card for embedded projects ──
const EmbeddedCard = ({ project, theme }: { project: Project; theme: typeof themes.embedded }) => {
  const statusColor = theme[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as keyof typeof theme] as string;

  return (
    <div className={`rounded-none border ${theme.accentBorder} ${theme.cardBg} p-5 space-y-3 transition-all ${theme.accentBorderHover} font-mono`}>
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-muted-foreground text-xs">typedef struct</span>
          <span className={`text-xs ${theme.accent} ml-1`}>{"{"}</span>
          <h3 className={`text-sm font-semibold ${theme.accent} mt-1 pl-4`}>{project.title}</h3>
        </div>
        <Badge variant="outline" className={`text-[10px] font-mono shrink-0 rounded-none ${statusColor}`}>
          {project.status}
        </Badge>
      </div>
      {/* description*/}
      <div className="pl-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
      {/* tags */}
      <div className="flex flex-wrap gap-1.5 pl-4">
        {project.tags.map((tag) => (
          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-none ${theme.tagBg}`}>
            #include &lt;{tag}&gt;
          </span>
        ))}
      </div>
      {/* footer */}
      <div className="flex items-center justify-between">
        <span className={`text-xs ${theme.accent}`}>{"};"}</span>
        {project.links && (
          <div className="flex gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className={`inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors ${theme.linkHover}`}
              >
                {link.icon === "github" ? <Github className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── TypeScript/JSX-style card for web projects ──
const WebCard = ({ project, theme }: { project: Project; theme: typeof themes.web }) => {
  const statusColor = theme[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as keyof typeof theme] as string;

  return (
    <div className={`rounded-xl border ${theme.accentBorder} ${theme.cardBg} p-5 space-y-3 transition-all ${theme.accentBorderHover}`}>
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono">
          <span className="text-muted-foreground text-xs">&lt;</span>
          <span className={`text-xs ${theme.accent}`}>Project</span>
          <span className="text-muted-foreground text-xs">&gt;</span>
          <h3 className={`text-sm font-semibold mt-1 pl-2 ${theme.accent}`}>{project.title}</h3>
        </div>
        <Badge variant="outline" className={`text-[10px] font-mono shrink-0 rounded-full ${statusColor}`}>
          {project.status}
        </Badge>
      </div>
      {/* description */}
      <p className="text-sm text-muted-foreground leading-relaxed pl-2">
        {project.description}
      </p>
      {/* tags */}
      <div className="flex flex-wrap gap-1.5 pl-2">
        {project.tags.map((tag) => (
          <span key={tag} className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full ${theme.tagBg}`}>
            {tag}
          </span>
        ))}
      </div>
      {/* footer */}
      <div className="flex items-center justify-between pl-2">
        <span className="font-mono text-xs text-muted-foreground">
          &lt;/<span className={theme.accent}>Project</span>&gt;
        </span>
        {project.links && (
          <div className="flex gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className={`inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors ${theme.linkHover}`}
              >
                {link.icon === "github" ? <Github className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Python/Script-style card for other projects ──
const OtherCard = ({ project, theme }: { project: Project; theme: typeof themes.other }) => {
  const statusColor = theme[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as keyof typeof theme] as string;

  return (
    <div className={`rounded-lg border ${theme.accentBorder} ${theme.cardBg} p-5 space-y-3 transition-all ${theme.accentBorderHover}`}>
      {/* header with # comment style */}
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono">
          <span className={`text-xs ${theme.accent}`}># </span>
          <h3 className={`text-sm font-semibold inline ${theme.accent}`}>{project.title}</h3>
        </div>
        <Badge variant="outline" className={`text-[10px] font-mono shrink-0 ${statusColor}`}>
          {project.status}
        </Badge>
      </div>
      {/* description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>
      {/* tags and links on same row */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className={`font-mono text-[10px] px-2 py-0.5 rounded ${theme.tagBg}`}>
              {tag}
            </span>
          ))}
        </div>
        {project.links && (
          <div className="flex gap-3 shrink-0">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className={`inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors ${theme.linkHover}`}
              >
                {link.icon === "github" ? <Github className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Default card for "all" view ──
const DefaultCard = ({ project, theme }: { project: Project; theme: typeof themes.all }) => {
  const statusColor =
    project.status === "active"
      ? theme.statusActive
      : project.status === "completed"
      ? theme.statusCompleted
      : theme.statusPaused;

  return (
    <div className={`rounded-lg border border-border ${theme.cardBg} p-5 space-y-3 transition-colors hover:border-primary/20`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          {project.category === "embedded" ? (
            <Cpu className="h-4 w-4 text-accent shrink-0" />
          ) : project.category === "web" ? (
            <Globe className="h-4 w-4 text-[hsl(210,60%,62%)] shrink-0" />
          ) : (
            <Terminal className="h-4 w-4 text-[hsl(270,60%,65%)] shrink-0" />
          )}
          <h3 className="font-semibold text-sm">{project.title}</h3>
        </div>
        <Badge variant="outline" className={`text-[10px] font-mono shrink-0 ${statusColor}`}>
          {project.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                project.category === "embedded"
                  ? "bg-accent/10 text-accent/70"
                  : project.category === "web"
                  ? "bg-[hsl(210,60%,62%,0.1)] text-[hsl(210,60%,62%,0.7)]"
                  : "bg-[hsl(270,60%,65%,0.1)] text-[hsl(270,60%,65%,0.7)]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        {project.links && (
          <div className="flex gap-3 shrink-0">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.icon === "github" ? <Github className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const theme = themes[filter];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.pageBg}`}>
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-28 pb-20">
        <div className="space-y-2">
          <p className={`font-mono text-xs text-muted-foreground`}>
            {theme.headerComment}
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            {filter === "embedded" ? (
              <>
                <Terminal className="inline h-7 w-7 mr-2 text-accent" />
                <span className="text-accent">Embedded</span> Projects
              </>
            ) : filter === "web" ? (
              <>
                <Code2 className="inline h-7 w-7 mr-2 text-[hsl(210,60%,62%)]" />
                <span className="text-[hsl(210,60%,62%)]">Web</span> Projects
              </>
            ) : filter === "other" ? (
              <>
                <Terminal className="inline h-7 w-7 mr-2 text-[hsl(270,60%,65%)]" />
                <span className="text-[hsl(270,60%,65%)]">Other</span> Projects
              </>
            ) : (
              "All Projects"
            )}
          </h1>
          <p className="text-muted-foreground">
            {filter === "embedded"
              ? "Low-level systems. Perfect for seeing my code come alive."
              : filter === "web"
              ? "Modern web apps. Fun and easy to build."
              : filter === "other"
              ? "Other projects that aren't strictly embedded or web, but I still want to show and tell."
              : "The full overview of my projects."}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mt-8 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`font-mono text-xs px-3 py-1.5 rounded-md border transition-colors ${
              filter === "all"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            *
          </button>
          <button
            onClick={() => setFilter("embedded")}
            className={`font-mono text-xs px-3 py-1.5 rounded-none border transition-all ${
              filter === "embedded"
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              {filter === "embedded" ? "#include <embedded>" : "embedded"}
            </span>
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
              filter === "web"
                ? "border-[hsl(210,60%,62%)] bg-[hsl(210,60%,62%,0.1)] text-[hsl(210,60%,62%)]"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {filter === "web" ? "<Web />" : "web"}
            </span>
          </button>
          <button
            onClick={() => setFilter("other")}
            className={`font-mono text-xs px-3 py-1.5 border transition-all ${
              filter === "other"
                ? "rounded-md border-[hsl(270,60%,65%)] bg-[hsl(270,60%,65%,0.1)] text-[hsl(270,60%,65%)]"
                : "rounded-md border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              <Terminal className="h-3 w-3" />
              {filter === "other" ? "# other" : "other"}
            </span>
          </button>
        </div>

        {/* Project List */}
        <div className="mt-8 space-y-4">
          {filtered.map((project) => (
            <div key={project.title}>
              {filter === "embedded" ? (
                <EmbeddedCard project={project} theme={themes.embedded} />
              ) : filter === "web" ? (
                <WebCard project={project} theme={themes.web} />
              ) : filter === "other" ? (
                <OtherCard project={project} theme={themes.other} />
              ) : (
                <DefaultCard project={project} theme={themes.all} />
              )}
            </div>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Projects;
