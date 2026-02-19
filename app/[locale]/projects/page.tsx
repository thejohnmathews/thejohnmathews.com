"use client";

import {useState} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Microchip, Globe, ExternalLink, Github, Terminal, Code2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useTranslations, useMessages} from 'next-intl';

type ProjectCategory = "all" | "embedded" | "web" | "other";

interface Project {
  title: string;
  description: string;
  category: "embedded" | "web" | "other";
  tags: string[];
  status: "active" | "completed" | "paused";
  links?: {label: string; url: string; icon: "github" | "external"}[];
}

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
    cardBg: "bg-card",
    pageBg: "bg-background",
  },
};

// ── C-style struct card for embedded projects ──
const EmbeddedCard = ({project, theme}: {project: Project; theme: typeof themes.embedded}) => {
  const statusColor = theme[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as keyof typeof theme] as string;

  return (
    <div className={`rounded-none border ${theme.accentBorder} ${theme.cardBg} p-5 space-y-3 transition-all ${theme.accentBorderHover} font-mono`}>
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
      <div className="pl-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 pl-4">
        {project.tags.map((tag) => (
          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-none ${theme.tagBg}`}>
            #include &lt;{tag}&gt;
          </span>
        ))}
      </div>
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
const WebCard = ({project, theme}: {project: Project; theme: typeof themes.web}) => {
  const statusColor = theme[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as keyof typeof theme] as string;

  return (
    <div className={`rounded-xl border ${theme.accentBorder} ${theme.cardBg} p-5 space-y-3 transition-all ${theme.accentBorderHover}`}>
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
      <p className="text-sm text-muted-foreground leading-relaxed pl-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 pl-2">
        {project.tags.map((tag) => (
          <span key={tag} className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full ${theme.tagBg}`}>
            {tag}
          </span>
        ))}
      </div>
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
const OtherCard = ({project, theme}: {project: Project; theme: typeof themes.other}) => {
  const statusColor = theme[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` as keyof typeof theme] as string;

  return (
    <div className={`rounded-lg border ${theme.accentBorder} ${theme.cardBg} p-5 space-y-3 transition-all ${theme.accentBorderHover}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono">
          <span className={`text-xs ${theme.accent}`}># </span>
          <h3 className={`text-sm font-semibold inline ${theme.accent}`}>{project.title}</h3>
        </div>
        <Badge variant="outline" className={`text-[10px] font-mono shrink-0 ${statusColor}`}>
          {project.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>
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
const DefaultCard = ({project, theme}: {project: Project; theme: typeof themes.all}) => {
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
            <Microchip className="h-4 w-4 text-accent shrink-0" />
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
  const t = useTranslations('Projects');
  const messages = useMessages();
  const projects = messages.ProjectsData as unknown as Project[];

  const [filter, setFilter] = useState<ProjectCategory>("all");
  const theme = themes[filter];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const headerComment = filter === "embedded" ? t('embeddedComment')
    : filter === "web" ? t('webComment')
    : filter === "other" ? t('otherComment')
    : t('allComment');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.pageBg}`}>
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-28 pb-20">
        <div className="space-y-2">
          <p className={`font-mono text-xs text-muted-foreground`}>
            {headerComment}
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            {filter === "embedded" ? (
              <>
                <Terminal className="inline h-7 w-7 mr-2 text-accent" />
                <span className="text-accent">{t('embeddedProjects')}</span> Projects
              </>
            ) : filter === "web" ? (
              <>
                <Code2 className="inline h-7 w-7 mr-2 text-[hsl(210,60%,62%)]" />
                <span className="text-[hsl(210,60%,62%)]">{t('webProjects')}</span> Projects
              </>
            ) : filter === "other" ? (
              <>
                <Terminal className="inline h-7 w-7 mr-2 text-[hsl(270,60%,65%)]" />
                <span className="text-[hsl(270,60%,65%)]">{t('otherProjects')}</span> Projects
              </>
            ) : (
              t('allProjects')
            )}
          </h1>
          <p className="text-muted-foreground">
            {filter === "embedded"
              ? t('embeddedDesc')
              : filter === "web"
              ? t('webDesc')
              : filter === "other"
              ? t('otherDesc')
              : t('allDesc')}
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
              <Microchip className="h-3 w-3" />
              {filter === "embedded" ? t('embeddedFilterActive') : t('embeddedProjects').toLowerCase()}
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
              {filter === "web" ? t('webFilterActive') : t('webProjects').toLowerCase()}
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
              {filter === "other" ? t('otherFilterActive') : t('otherProjects').toLowerCase()}
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
