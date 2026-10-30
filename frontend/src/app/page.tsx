import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { OverviewSection } from "@/components/sections/overview";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ActivitySection } from "@/components/sections/activity";
import { EerSection } from "@/components/sections/eer-improvement";
import { CrossDaySection } from "@/components/sections/cross-day";
import { MethodsSection } from "@/components/sections/methods";
import { OrientationSection } from "@/components/sections/orientation";
import { ScalingSection } from "@/components/sections/scaling";
import { RobustnessSection } from "@/components/sections/robustness";
import { ExperimentsSection } from "@/components/sections/experiments";
import { SpeedupsSection } from "@/components/sections/speedups";
import { PaperTracksSection } from "@/components/sections/paper-tracks";
import { WorkflowSection } from "@/components/sections/workflow";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />

      <main className="page grid gap-[var(--space-3xl)]">
        <Hero />
        <OverviewSection />
        <StatsStrip />
        <ActivitySection />
        <EerSection />
        <CrossDaySection />
        <MethodsSection />
        <OrientationSection />
        <ScalingSection />
        <RobustnessSection />
        <ExperimentsSection />
        <SpeedupsSection />
        <PaperTracksSection />
        <WorkflowSection />
      </main>

      <Footer />
    </div>
  );
}
