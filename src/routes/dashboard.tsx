import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, AlertTriangle, BellRing, HeartPulse, Route as RouteIcon } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import {
  healthByZone,
  predictions,
  riskStyles,
  riskTrend,
  trafficFlow,
} from "@/lib/roadmind-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Smart Dashboard — RoadMind City" },
      {
        name: "description",
        content:
          "Live smart-city road console: roads monitored, high-risk segments, traffic status, road health score and active AI alerts.",
      },
      { property: "og:title", content: "Smart Dashboard — RoadMind City" },
      {
        property: "og:description",
        content: "Road health analytics, risk trends and recent AI predictions across the city.",
      },
    ],
  }),
  component: Dashboard;
});

const cards = [
  { icon: RouteIcon, label: "Roads Monitored", value: "248", note: "+12 this month", tone: "text-primary" },
  { icon: AlertTriangle, label: "High Risk Roads", value: "27", note: "6 need action now", tone: "text-danger" },
  { icon: Activity, label: "Traffic Status", value: "Moderate", note: "Peak load 78%", tone: "text-warn" },
  { icon: HeartPulse, label: "Road Health Score", value: "76 / 100", note: "+4 vs August", tone: "text-safe" },
  { icon: BellRing, label: "Active AI Alerts", value: "9", note: "3 critical", tone: "text-accent" },
];

const axis = { stroke: "var(--muted-foreground)", fontSize: 12 };

function Dashboard() {
  return (
    <PageShell
      eyebrow="Smart Dashboard"
      title="City road intelligence console"
      description="A live picture of road condition, congestion and predicted failure across all five city corridors."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border/70 bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
              <c.icon className={`size-4 ${c.tone}`} />
            </div>
            <p className={`mt-4 font-display text-2xl font-bold ${c.tone}`}>{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Panel title="Risk distribution trend" note="Segments by risk level, last 6 months">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={riskTrend}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area dataKey="low" stackId="1" stroke="var(--safe)" fill="var(--safe)" fillOpacity={0.25} />
              <Area dataKey="medium" stackId="1" stroke="var(--warn)" fill="var(--warn)" fillOpacity={0.25} />
              <Area dataKey="high" stackId="1" stroke="var(--danger)" fill="var(--danger)" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Traffic flow today" note="Vehicles per hour across monitored corridors">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trafficFlow}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="hour" {...axis} />
              <YAxis {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                dataKey="vehicles"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Health score by zone" note="Composite surface condition index">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={healthByZone}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="zone" {...axis} />
              <YAxis {...axis} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Recent AI predictions" note="Model output ranked by urgency">
          <ul className="space-y-3">
            {predictions.map((p) => {
              const s = riskStyles[p.risk];
              return (
                <li
                  key={p.road}
                  className="rounded-lg border border-border/70 bg-surface/50 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{p.road}</p>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
                    >
                      <span className={`size-1.5 rounded-full ${s.dot}`} />
                      {p.risk} risk
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="text-primary">{p.confidence}% confidence</span> · {p.window}
                  </p>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}

const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--foreground)",
  fontSize: 12,
};

function Panel({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border/70 bg-card p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
