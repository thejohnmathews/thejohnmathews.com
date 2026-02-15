import { Cpu, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AboutSection() {
  return (
    <section className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* embedded */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4 transition-colors hover:border-[hsl(100,40%,46%)]/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center">
              <Cpu className="h-4 w-4 text-[hsl(100,40%,46%)]" />
            </div>
            <h3 className="text-sm font-semibold">Embedded Systems</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Experience writing firmware for dedicated microcontrllers and SoC microchips in Embedded C and C++.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              Embedded C
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Bare Metal
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              8052 & ATmega Microcontrollers
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Serial Communication
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Infrared Transmission
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Firmware Testing
            </Badge>
          </div>
        </div>

        {/* web dev */}
        <div className="rounded-lg border border-border bg-card p-6 space-y-4 transition-colors hover:border-[hsl(210,60%,62%)]/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center">
              <Globe className="h-4 w-4 text-[hsl(210,60%,62%)]" />
            </div>
            <h3 className="text-sm font-semibold">Full Stack Web</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Experience building modern web applications in all layers of the stack, primarily using NextJS and Postgres.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              NextJS
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Typescript
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Postgres
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              REST/RESTful APIs
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Agile Development
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-sm text-primary transition-transform hover:translate-x-1"
        >
          view personal projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
