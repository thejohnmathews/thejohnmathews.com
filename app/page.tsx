import Navbar from "@/components/Navbar";
import TerminalHero from "@/components/TerminalHero";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 pt-28 pb-20">
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">// welcome</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Hello, I&apos;m <span className="text-primary">John</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            I have programming experience in embedded systems and web developement. Currently building a couple small projects here and there!
          </p>
        </div>

        <div className="mt-10">
          <TerminalHero />
        </div>

        <div className="mt-12">
          <AboutSection />
        </div>

        <Footer />
      </main>
    </div>
  );
}
