import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface Role {
  title: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

interface ExperienceCardProps {
  experience: {
    company: string;
    location: string;
    roles: Role[];
    industry: "tech" | "education" | "other";
    type?: "web" | "embedded";
  };
  isFirst: boolean;
}

// function to format date ranges
function formatDateRange(start: string, end: string | null): string {
  const formatDate = (date: string) => {
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : "Present";

  return `${startFormatted} - ${endFormatted}`;
}

export default function ExperienceCard({ experience, isFirst }: ExperienceCardProps) {
  const isCurrent = experience.roles[0].endDate === null;

  // determine colors based on work type
  const getColors = () => {
    // web is blue
    if (experience.type === "web") {
      return {
        company: "text-[hsl(210,60%,62%)]", 
        dot: isCurrent
          ? "bg-primary border-primary animate-pulse"
          : "bg-[hsl(210,60%,62%)]/20 border-[hsl(210,60%,62%)]"
      };
    // embedded is green  
    } else if (experience.type === "embedded") {
      return {
        company: "text-[hsl(100,40%,46%)]", 
        dot: isCurrent
          ? "bg-primary border-primary animate-pulse"
          : "bg-[hsl(100,40%,46%)]/20 border-[hsl(100,40%,46%)]"
      };
    }
    // other experience is grey 
    else {
      return {
        company: "text-[hsl(0,0%,50%)]", 
        dot: isCurrent
          ? "bg-primary border-primary animate-pulse"
          : "bg-[hsl(0,0%,50%)]/20 border-[hsl(0,0%,50%)]"
      };
    }
  };

  const colors = getColors();

  return (
    <div className="relative pl-8">
      {/* timeline dot */}
      <div className={`absolute -left-[5px] top-2 w-3 h-3 rounded-full border-2 ${colors.dot}`} />

      <div className="rounded-lg border border-border bg-card p-5 space-y-4 transition-colors hover:border-primary/20">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-lg font-semibold ${colors.company}`}>{experience.company}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {experience.location}
            </p>
          </div>
          {isCurrent && (
            <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-[10px]">
              CURRENT
            </Badge>
          )}
        </div>

        {/* role */}
        {experience.roles.map((role, idx) => (
          <div key={idx} className={idx > 0 ? "pl-4 border-l-2 border-border" : ""}>
            <div className="flex items-start justify-between gap-4">
              <h4 className="font-semibold text-sm">{role.title}</h4>
              <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                {formatDateRange(role.startDate, role.endDate)}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {role.description}
            </p>

            {/* highlight */}
            {role.highlights && role.highlights.length > 0 && (
              <ul className="mt-2 space-y-1">
                {role.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-accent">→</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* tech */}
            {role.technologies && role.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {role.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
