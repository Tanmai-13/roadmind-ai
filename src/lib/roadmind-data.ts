export type RiskLevel = "Low" | "Medium" | "High";

export type RoadPoint = {
  id: string;
  name: string;
  zone: string;
  risk: RiskLevel;
  healthScore: number;
  lastInspected: string;
  issue: string;
  x: number; // percent on map
  y: number;
};

export const roadPoints: RoadPoint[] = [
  {
    id: "RM-104",
    name: "Ring Road – Sector 12 Flyover",
    zone: "North Corridor",
    risk: "High",
    healthScore: 41,
    lastInspected: "12 Sep 2026",
    issue: "Deep surface cracking with water pooling after rainfall",
    x: 26,
    y: 30,
  },
  {
    id: "RM-118",
    name: "Marina Expressway Link",
    zone: "East Corridor",
    risk: "Medium",
    healthScore: 67,
    lastInspected: "09 Sep 2026",
    issue: "Edge erosion near drainage inlets",
    x: 71,
    y: 24,
  },
  {
    id: "RM-131",
    name: "Civic Center Avenue",
    zone: "Central Grid",
    risk: "Low",
    healthScore: 88,
    lastInspected: "14 Sep 2026",
    issue: "Minor wear on lane markings",
    x: 49,
    y: 48,
  },
  {
    id: "RM-142",
    name: "Old Mill Junction",
    zone: "West Corridor",
    risk: "High",
    healthScore: 36,
    lastInspected: "05 Sep 2026",
    issue: "Recurring potholes, 14 citizen reports in 30 days",
    x: 18,
    y: 68,
  },
  {
    id: "RM-155",
    name: "Airport Access Road",
    zone: "South Corridor",
    risk: "Medium",
    healthScore: 71,
    lastInspected: "11 Sep 2026",
    issue: "Rutting in heavy-vehicle lane",
    x: 63,
    y: 74,
  },
  {
    id: "RM-167",
    name: "Riverside Boulevard",
    zone: "East Corridor",
    risk: "Low",
    healthScore: 92,
    lastInspected: "13 Sep 2026",
    issue: "No defects detected in latest scan",
    x: 83,
    y: 58,
  },
  {
    id: "RM-172",
    name: "Tech Park Loop",
    zone: "South Corridor",
    risk: "Low",
    healthScore: 85,
    lastInspected: "10 Sep 2026",
    issue: "Slight settlement near bus bay",
    x: 38,
    y: 84,
  },
  {
    id: "RM-188",
    name: "Northgate Underpass",
    zone: "North Corridor",
    risk: "Medium",
    healthScore: 62,
    lastInspected: "08 Sep 2026",
    issue: "Joint deterioration under monsoon load",
    x: 57,
    y: 12,
  },
];

export const riskTrend = [
  { month: "Apr", high: 22, medium: 48, low: 130 },
  { month: "May", high: 26, medium: 52, low: 122 },
  { month: "Jun", high: 34, medium: 61, low: 105 },
  { month: "Jul", high: 41, medium: 66, low: 93 },
  { month: "Aug", high: 33, medium: 58, low: 109 },
  { month: "Sep", high: 27, medium: 51, low: 122 },
];

export const trafficFlow = [
  { hour: "00", vehicles: 820 },
  { hour: "04", vehicles: 540 },
  { hour: "08", vehicles: 4120 },
  { hour: "12", vehicles: 2860 },
  { hour: "16", vehicles: 3540 },
  { hour: "20", vehicles: 2210 },
];

export const healthByZone = [
  { zone: "North", score: 64 },
  { zone: "East", score: 81 },
  { zone: "Central", score: 87 },
  { zone: "West", score: 52 },
  { zone: "South", score: 76 },
];

export const predictions = [
  {
    road: "Ring Road – Sector 12 Flyover",
    risk: "High" as RiskLevel,
    confidence: 94,
    window: "Next 9 days",
    note: "Rainfall 82mm + heavy freight load accelerating crack growth",
  },
  {
    road: "Old Mill Junction",
    risk: "High" as RiskLevel,
    confidence: 91,
    window: "Next 12 days",
    note: "Pothole cluster expanding, surface age 14 years",
  },
  {
    road: "Northgate Underpass",
    risk: "Medium" as RiskLevel,
    confidence: 78,
    window: "Next 21 days",
    note: "Joint fatigue rising with peak-hour congestion",
  },
  {
    road: "Airport Access Road",
    risk: "Medium" as RiskLevel,
    confidence: 74,
    window: "Next 30 days",
    note: "Rutting depth trending up 0.9mm/month",
  },
  {
    road: "Riverside Boulevard",
    risk: "Low" as RiskLevel,
    confidence: 96,
    window: "Next 60 days",
    note: "Stable condition, resurfacing completed in March",
  },
];

export const seedReports = [
  {
    id: "CR-2291",
    type: "Pothole",
    location: "Old Mill Junction, West Corridor",
    submitted: "13 Sep 2026",
    status: "Repair scheduled" as const,
    severity: "High" as RiskLevel,
  },
  {
    id: "CR-2287",
    type: "Traffic signal issue",
    location: "Civic Center Avenue",
    submitted: "12 Sep 2026",
    status: "Under review" as const,
    severity: "Medium" as RiskLevel,
  },
  {
    id: "CR-2280",
    type: "Road damage",
    location: "Ring Road – Sector 12",
    submitted: "10 Sep 2026",
    status: "Resolved" as const,
    severity: "High" as RiskLevel,
  },
  {
    id: "CR-2274",
    type: "Waterlogging",
    location: "Northgate Underpass",
    submitted: "08 Sep 2026",
    status: "Resolved" as const,
    severity: "Low" as RiskLevel,
  },
];

export const riskStyles: Record<RiskLevel, { text: string; bg: string; dot: string; label: string }> =
  {
    Low: {
      text: "text-safe",
      bg: "bg-safe/10 border-safe/40",
      dot: "bg-safe",
      label: "Safe",
    },
    Medium: {
      text: "text-warn",
      bg: "bg-warn/10 border-warn/40",
      dot: "bg-warn",
      label: "Medium risk",
    },
    High: {
      text: "text-danger",
      bg: "bg-danger/10 border-danger/40",
      dot: "bg-danger",
      label: "High risk",
    },
  };

export function predictRisk(input: {
  trafficDensity: number;
  rainfall: number;
  roadAge: number;
  damageReports: number;
}) {
  const trafficScore = (input.trafficDensity / 100) * 30;
  const rainScore = Math.min(input.rainfall / 200, 1) * 25;
  const ageScore = Math.min(input.roadAge / 25, 1) * 25;
  const reportScore = Math.min(input.damageReports / 20, 1) * 20;
  const score = Math.round(trafficScore + rainScore + ageScore + reportScore);

  const risk: RiskLevel = score >= 65 ? "High" : score >= 38 ? "Medium" : "Low";

  const drivers = [
    { name: "traffic density", value: trafficScore },
    { name: "rainfall load", value: rainScore },
    { name: "surface age", value: ageScore },
    { name: "reported damage", value: reportScore },
  ].sort((a, b) => b.value - a.value);
  const top = drivers[0]?.name ?? "traffic density";
  const second = drivers[1]?.name ?? "rainfall load";

  const explanation =
    risk === "High"
      ? `Failure probability is elevated mainly by ${top} and ${second}. Combined stress on the surface exceeds the safe threshold, so cracking is likely to widen quickly.`
      : risk === "Medium"
        ? `Conditions are stable but degrading, driven mostly by ${top}. Small defects are expected to grow if ${second} keeps rising.`
        : `All monitored factors sit within safe limits, with ${top} contributing most of the small residual stress. No near-term failure signal detected.`;

  const action =
    risk === "High"
      ? "Dispatch an inspection crew within 72 hours and pre-book resurfacing. Add temporary speed restriction for heavy vehicles."
      : risk === "Medium"
        ? "Schedule a preventive patch and drainage clean-up within 3 weeks, and re-scan after the next rainfall event."
        : "Keep the road on the routine 90-day monitoring cycle. No intervention required now.";

  const window =
    risk === "High" ? "Next 7–14 days" : risk === "Medium" ? "Next 30–45 days" : "Next 90+ days";

  return { score, risk, explanation, action, window, drivers };
}
