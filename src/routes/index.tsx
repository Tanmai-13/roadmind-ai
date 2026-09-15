import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CloudRain,
  Gauge,
  MapPinned,
  MessageSquareWarning,
  Satellite,
  ShieldCheck,
  TrendingDown,
  Wrench,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RoadMind City — Roads That Think Ahead" },
      {
        name: "description",
        content:
          "RoadMind City is a predictive road intelligence platform that forecasts road damage, risk and congestion before it happens.",
      },
      { property: "og:title", content: "RoadMind City — Roads That Think Ahead" },
      {
        property: "og:description",
        content:
          "Predictive road intelligence for smart cities: risk forecasting, live road health maps and citizen reporting.",
      },
    ],
  }),
  component: Landing,
});

const problems = [
  {
    icon: AlertTriangle,
    title: "Cities repair too late",
    body: "Road maintenance is reactive. Crews arrive after the pothole forms, after the crash, after the complaint.",
  },
  {
    icon: TrendingDown,
    title: "Budgets leak",
    body: "Emergency repairs cost several times more than the preventive patch that could have avoided them.",
  },
  {
    icon: CloudRain,
    title: "Weather is ignored",
    body: "Rainfall, drainage and freight load are the biggest failure drivers, yet rarely modelled together.",
  },
];

const steps = [
  {
    icon: Satellite,
    title: "Collect",
    body: "Traffic counters, rainfall feeds, surface-age records and citizen reports stream into one road profile.",
  },
  {
    icon: BrainCircuit,
    title: "Predict",
    body: "The risk model weighs every factor and scores each road segment on failure probability.",
  },
  {
    icon: MapPinned,
    title: "Visualise",
    body: "Risk is projected onto the city map in green, yellow and red with inspection-ready detail.",
  },
  {
    icon: Wrench,
    title: "Act",
    body: "Each prediction ships with a recommended action and a repair window for the works team.",
  },
];

const features = [
  { icon: Gauge, title: "Live road health score", body: "One number per corridor, updated daily." },
  {
    icon: BrainCircuit,
    title: "AI risk prediction",
    body: "Enter traffic, rainfall, age and damage reports to score any segment.",
  },
  {
    icon: MapPinned,
    title: "Colour-coded risk map",
    body: "Safe, medium and high-risk markers with inspection cards.",
  },
  {
    icon: MessageSquareWarning,
    title: "Citizen reporting",
    body: "Residents report damage and track the repair status.",
  },
  {
    icon: ShieldCheck,
    title: "Alert routing",
    body: "High-risk segments raise alerts for the responsible zone team.",
  },
  {
    icon: CloudRain,
    title: "Weather-aware modelling",
    body: "Monsoon load factored into every forecast.",
  },
];

const impact = [
  { value: "38%", label: "fewer emergency repairs" },
  { value: "2.4x", label: "faster defect detection" },
  { value: "₹4.1cr", label: "annual maintenance saved" },
  { value: "27%", label: "drop in road incidents" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-backdrop opacity-70" />
        <div className="absolute -top-32 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Predictive road intelligence
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.05] sm:text-7xl">
            Roads That <span className="text-primary text-glow">Think Ahead</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            RoadMind City reads traffic load, rainfall, surface age and citizen reports together to
            forecast where a road will fail — weeks before the first pothole appears.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-opacity hover:opacity-90"
            >
              Explore the dashboard <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/predict"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50"
            >
              Run a risk prediction
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              { k: "248", v: "road segments monitored" },
              { k: "94%", v: "prediction confidence" },
              { k: "11 days", v: "average early warning" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-border/70 bg-card/60 px-6 py-5 backdrop-blur"
              >
                <p className="font-display text-3xl font-bold text-primary">{s.k}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="problem" eyebrow="The Problem" title="Cities fix roads after they break">
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((p) => (
            <article key={p.title} className="rounded-xl border border-border/70 bg-card p-6">
              <p.icon className="size-6 text-danger" />
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="solution"
        eyebrow="Our Solution"
        title="A predictive brain for every road segment"
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-primary/30 bg-card p-8 glow-ring">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Instead of waiting for damage, RoadMind City continuously scores every corridor. Each
              segment carries a health score, a risk level and a forecast window — so maintenance
              becomes a schedule, not an emergency.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Risk forecasting up to 60 days ahead",
                "One shared view for engineers, traffic control and citizens",
                "Recommended action attached to every prediction",
                "Repair impact tracked back into the model",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { l: "High risk roads", v: "27", c: "text-danger" },
              { l: "Medium risk", v: "51", c: "text-warn" },
              { l: "Safe segments", v: "170", c: "text-safe" },
              { l: "Health score", v: "76", c: "text-primary" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border/70 bg-surface/60 p-6">
                <p className={`font-display text-4xl font-bold ${s.c}`}>{s.v}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="how" eyebrow="How It Works" title="Four steps from raw signal to repair order">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <article
              key={s.title}
              className="relative rounded-xl border border-border/70 bg-card p-6"
            >
              <span className="font-display text-xs font-bold text-primary">
                0{i + 1}
              </span>
              <s.icon className="mt-4 size-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="features" eyebrow="Features" title="Everything a road team needs in one console">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/50"
            >
              <f.icon className="size-6 text-accent" />
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="impact" eyebrow="Impact" title="What predictive maintenance changes">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border/70 bg-surface/60 p-7 text-center"
            >
              <p className="font-display text-4xl font-bold text-primary">{m.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-primary/30 bg-card p-10 text-center glow-ring">
          <h3 className="text-2xl font-bold sm:text-3xl">See the city through RoadMind</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Open the live console to explore road health, risk predictions and citizen reports across
            all five corridors.
          </p>
          <Link
            to="/dashboard"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore dashboard <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border/40">
      <div className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
