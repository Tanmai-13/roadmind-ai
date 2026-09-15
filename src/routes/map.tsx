import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, MapPin, Navigation } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { riskStyles, roadPoints, type RoadPoint } from "@/lib/roadmind-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Road Risk Map — RoadMind City" },
      {
        name: "description",
        content:
          "City road map with colour-coded risk markers — green for safe, yellow for medium risk and red for high-risk segments needing inspection.",
      },
      { property: "og:title", content: "Interactive Road Risk Map — RoadMind City" },
      {
        property: "og:description",
        content: "Explore road risk markers across the city and open inspection cards per segment.",
      },
    ],
  }),
  component: RoadMap,
});

const riskColor: Record<RoadPoint["risk"], string> = {
  Low: "var(--safe)",
  Medium: "var(--warn)",
  High: "var(--danger)",
};

function RoadMap() {
  const [selected, setSelected] = useState<RoadPoint>(roadPoints[0]!);
  const [filter, setFilter] = useState<"All" | RoadPoint["risk"]>("All");

  const visible = roadPoints.filter((p) => filter === "All" || p.risk === filter);

  return (
    <PageShell
      eyebrow="Interactive Road Map"
      title="City risk map with live inspection cards"
      description="Every monitored segment is plotted on the city grid and coloured by predicted risk. Select a marker to open its inspection card."
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {(["All", "High", "Medium", "Low"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === f
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "All" ? "All segments" : `${f} risk`}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground">
          <Legend color="var(--safe)" label="Safe" />
          <Legend color="var(--warn)" label="Medium risk" />
          <Legend color="var(--danger)" label="High risk" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-surface/40">
          <svg viewBox="0 0 100 100" className="h-[520px] w-full" preserveAspectRatio="none">
            <rect width="100" height="100" fill="var(--surface)" />
            {/* city blocks */}
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 6 }).map((__, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * 16.6 + 2}
                  y={r * 16.6 + 2}
                  width={12.6}
                  height={12.6}
                  fill="var(--card)"
                  opacity={0.85}
                  rx={1}
                />
              )),
            )}
            {/* river */}
            <path
              d="M -2 78 C 20 70, 34 88, 52 80 C 70 72, 82 90, 104 82 L 104 104 L -2 104 Z"
              fill="oklch(0.35 0.09 230 / 0.55)"
            />
            {/* roads */}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 16.6}
                x2={100}
                y2={i * 16.6}
                stroke="oklch(0.45 0.02 255)"
                strokeWidth={1.6}
              />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 16.6}
                y1={0}
                x2={i * 16.6}
                y2={100}
                stroke="oklch(0.45 0.02 255)"
                strokeWidth={1.6}
              />
            ))}
            {/* expressway */}
            <path
              d="M -2 20 C 25 26, 45 8, 70 18 C 88 25, 96 40, 102 46"
              fill="none"
              stroke="var(--primary)"
              strokeOpacity={0.5}
              strokeWidth={2.4}
              strokeDasharray="4 3"
            />
          </svg>

          {visible.map((p) => {
            const active = p.id === selected.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                aria-label={p.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span
                  className="block rounded-full transition-transform"
                  style={{
                    width: active ? 20 : 14,
                    height: active ? 20 : 14,
                    background: riskColor[p.risk],
                    boxShadow: `0 0 0 ${active ? 8 : 5}px color-mix(in oklab, ${riskColor[p.risk]} 22%, transparent)`,
                  }}
                />
              </button>
            );
          })}

          <div className="absolute bottom-3 left-3 rounded-md border border-border/70 bg-background/80 px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            RoadMind City grid · {visible.length} segments shown
          </div>
        </div>

        <div className="space-y-5">
          <article className={`rounded-xl border p-6 ${riskStyles[selected.risk].bg}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Inspection card · {selected.id}
              </span>
              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold ${riskStyles[selected.risk].text}`}
              >
                <span className={`size-2 rounded-full ${riskStyles[selected.risk].dot}`} />
                {riskStyles[selected.risk].label}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{selected.name}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" /> {selected.zone}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{selected.issue}</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Health</p>
                <p className="mt-1 font-display text-2xl font-bold text-primary">
                  {selected.healthScore}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Last inspected
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <CalendarClock className="size-4 text-primary" /> {selected.lastInspected}
                </p>
              </div>
            </div>
          </article>

          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h3 className="text-sm font-semibold">Segments</h3>
            <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
              {visible.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      p.id === selected.id
                        ? "border-primary/60 bg-primary/10"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <span>
                      <span className="block font-medium">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.zone}</span>
                    </span>
                    <span className={`flex items-center gap-2 text-xs ${riskStyles[p.risk].text}`}>
                      <span className={`size-2 rounded-full ${riskStyles[p.risk].dot}`} />
                      {p.risk}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Navigation className="mt-0.5 size-3.5 shrink-0" />
            Coordinates and sensor feeds are simulated for this prototype.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
