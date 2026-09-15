import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ClipboardList, Send } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/site-shell";
import { riskStyles, seedReports, type RiskLevel } from "@/lib/roadmind-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Citizen Road Report — RoadMind City" },
      {
        name: "description",
        content:
          "Report potholes, road damage and traffic issues to the city and track the repair status of your report.",
      },
      { property: "og:title", content: "Citizen Road Report — RoadMind City" },
      {
        property: "og:description",
        content: "Submit a road issue in seconds and follow it from review to repair.",
      },
    ],
  }),
  component: ReportPage,
});

type Report = {
  id: string;
  type: string;
  location: string;
  submitted: string;
  status: "Submitted" | "Under review" | "Repair scheduled" | "Resolved";
  severity: RiskLevel;
};

const statusSteps = ["Submitted", "Under review", "Repair scheduled", "Resolved"] as const;

const issueTypes = [
  "Pothole",
  "Road damage",
  "Traffic signal issue",
  "Waterlogging",
  "Blocked lane",
  "Damaged signage",
];

function ReportPage() {
  const [reports, setReports] = useState<Report[]>(seedReports as Report[]);
  const [type, setType] = useState(issueTypes[0]!);
  const [severity, setSeverity] = useState<RiskLevel>("Medium");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error("Please add a location so crews can find the issue.");
      return;
    }
    const id = `CR-${2300 + reports.length}`;
    setReports([
      {
        id,
        type,
        location: location.trim(),
        submitted: "15 Sep 2026",
        status: "Submitted",
        severity,
      },
      ...reports,
    ]);
    setLocation("");
    setDetails("");
    toast.success(`Report ${id} submitted — tracking is live below.`);
  };

  return (
    <PageShell
      eyebrow="Citizen Report"
      title="Report a road issue, then track the fix"
      description="Resident reports feed straight into the prediction model, so a pothole you flag today sharpens tomorrow's forecast."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <form onSubmit={submit} className="rounded-xl border border-border/70 bg-card p-7">
          <h2 className="text-lg font-semibold">New report</h2>

          <div className="mt-6 space-y-5">
            <div>
              <Label className="text-sm">Issue type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Severity</Label>
              <Select value={severity} onValueChange={(v) => setSeverity(v as RiskLevel)}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Low", "Medium", "High"] as RiskLevel[]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm" htmlFor="loc">
                Location
              </Label>
              <Input
                id="loc"
                className="mt-2"
                placeholder="e.g. Old Mill Junction, near bus stop 14"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm" htmlFor="details">
                What did you see?
              </Label>
              <Textarea
                id="details"
                className="mt-2 min-h-28"
                placeholder="Describe the damage, size and how long it has been there."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full gap-2">
            <Send className="size-4" /> Submit report
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Prototype demo — reports are stored in this browser session only.
          </p>
        </form>

        <section className="rounded-xl border border-border/70 bg-card p-7">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ClipboardList className="size-5 text-primary" /> Status tracking
          </h2>
          <ul className="mt-6 space-y-4">
            {reports.map((r) => {
              const stepIndex = statusSteps.indexOf(r.status);
              const s = riskStyles[r.severity];
              return (
                <li key={r.id} className="rounded-lg border border-border/60 bg-surface/50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">
                        {r.type} · <span className="text-muted-foreground">{r.id}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {r.location} · {r.submitted}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
                    >
                      <span className={`size-1.5 rounded-full ${s.dot}`} />
                      {r.severity}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {statusSteps.map((step, i) => (
                      <div key={step}>
                        <div
                          className={`h-1.5 rounded-full ${i <= stepIndex ? "bg-primary" : "bg-secondary"}`}
                        />
                        <p
                          className={`mt-2 text-[10px] leading-tight ${
                            i <= stepIndex ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {r.status === "Resolved" && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-safe">
                      <CheckCircle2 className="size-3.5" /> Repair completed and verified
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
