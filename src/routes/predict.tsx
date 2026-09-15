import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BrainCircuit, Wrench } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { predictRisk, riskStyles } from "@/lib/roadmind-data";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/predict")({
  head: () => ({
    meta: [
      { title: "AI Risk Prediction — RoadMind City" },
      {
        name: "description",
        content:
          "Enter traffic density, rainfall, road age and damage reports to get a road risk level, explanation and recommended action.",
      },
      { property: "og:title", content: "AI Risk Prediction — RoadMind City" },
      {
        property: "og:description",
        content: "Score any road segment for failure risk and get a recommended maintenance action.",
      },
    ],
  }),
  component: Predict,
});

function Predict() {
  const [trafficDensity, setTrafficDensity] = useState(62);
  const [rainfall, setRainfall] = useState(85);
  const [roadAge, setRoadAge] = useState(11);
  const [damageReports, setDamageReports] = useState(6);
  const [result, setResult] = useState<ReturnType<typeof predictRisk> | null>(null);

  const run = () => setResult(predictRisk({ trafficDensity, rainfall, roadAge, damageReports }));

  return (
    <PageShell
      eyebrow="AI Risk Prediction"
      title="Score a road segment before it fails"
      description="Feed the model the four strongest failure drivers. It returns a risk level, the reasoning behind it, and the action your works team should take."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border/70 bg-card p-7">
          <h2 className="text-lg font-semibold">Segment inputs</h2>
          <div className="mt-7 space-y-8">
            <Field
              label="Traffic Density"
              value={`${trafficDensity}%`}
              hint="Share of peak-hour capacity used"
            >
              <Slider
                value={[trafficDensity]}
                onValueChange={(v) => setTrafficDensity(v[0] ?? 0)}
                max={100}
                step={1}
              />
            </Field>
            <Field
              label="Rainfall Level"
              value={`${rainfall} mm`}
              hint="Monthly rainfall on the segment"
            >
              <Slider
                value={[rainfall]}
                onValueChange={(v) => setRainfall(v[0] ?? 0)}
                max={300}
                step={5}
              />
            </Field>
            <Field label="Road Age" value={`${roadAge} yrs`} hint="Years since last resurfacing">
              <Slider
                value={[roadAge]}
                onValueChange={(v) => setRoadAge(v[0] ?? 0)}
                max={30}
                step={1}
              />
            </Field>
            <Field
              label="Previous Damage Reports"
              value={`${damageReports}`}
              hint="Citizen and inspection reports in the last 90 days"
            >
              <Slider
                value={[damageReports]}
                onValueChange={(v) => setDamageReports(v[0] ?? 0)}
                max={25}
                step={1}
              />
            </Field>
          </div>
          <Button onClick={run} className="mt-9 w-full gap-2" size="lg">
            <BrainCircuit className="size-4" /> Predict risk level
          </Button>
        </section>

        <section className="rounded-xl border border-border/70 bg-card p-7">
          <h2 className="text-lg font-semibold">Model output</h2>
          {!result ? (
            <div className="mt-10 flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border text-center">
              <BrainCircuit className="size-8 text-muted-foreground" />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Set the four inputs and run the prediction to see risk level, explanation and
                recommended action.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div
                className={`rounded-xl border p-6 ${riskStyles[result.risk].bg}`}
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Risk Level
                </p>
                <p
                  className={`mt-2 font-display text-4xl font-bold ${riskStyles[result.risk].text}`}
                >
                  {result.risk}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Risk score {result.score}/100 · expected window {result.window}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary">Prediction Explanation</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.explanation}
                </p>
                <ul className="mt-4 space-y-2">
                  {result.drivers.map((d) => (
                    <li key={d.name} className="text-xs">
                      <div className="flex justify-between text-muted-foreground">
                        <span className="capitalize">{d.name}</span>
                        <span>{Math.round(d.value)} pts</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-secondary">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${Math.min(d.value * 3.3, 100)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-primary/30 bg-surface/60 p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Wrench className="size-4" /> Recommended Action
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{result.action}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

function Field({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className="font-display text-sm font-semibold text-primary">{value}</span>
      </div>
      <div className="mt-4">{children}</div>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
