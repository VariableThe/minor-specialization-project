"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  orientationData,
  orientationNote,
  orientationFolds,
} from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, usePrefersReducedMotion } from "@/components/motion";
import { ChartTooltip } from "@/components/chart-tooltip";

const MONO = "var(--font-mono)";

export function OrientationSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section
      id="orientation"
      eyebrow="orientation"
      title="Canonical orientation across three configurations"
      description="FAR, FRR and mean EER for Control362, Canonical336 and Canonical362. Lower is better on every line."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={orientationData}
                margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeOpacity={0.7}
                  vertical={false}
                />
                <XAxis
                  dataKey="config"
                  tick={{
                    fill: "var(--text-secondary)",
                    fontSize: 11,
                    fontFamily: MONO,
                  }}
                  axisLine={{ stroke: "var(--border)" }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  tickFormatter={(v: number) => `${v}%`}
                  tick={{
                    fill: "var(--text-secondary)",
                    fontSize: 11,
                    fontFamily: MONO,
                  }}
                  axisLine={{ stroke: "var(--border)" }}
                  tickLine={false}
                  width={52}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <ChartTooltip
                        label={String(label)}
                        rows={payload.map((p) => ({
                          name: String(p.dataKey).toUpperCase(),
                          value: `${Number(p.value).toFixed(4)}%`,
                        }))}
                      />
                    );
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: 12,
                    fontFamily: MONO,
                    color: "var(--text-secondary)",
                  }}
                  iconType="circle"
                  iconSize={8}
                />
                <Line
                  type="monotone"
                  dataKey="far"
                  name="FAR"
                  stroke="var(--accent)"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "var(--accent)", strokeWidth: 0 }}
                  isAnimationActive={!reduced}
                  animationDuration={900}
                />
                <Line
                  type="monotone"
                  dataKey="frr"
                  name="FRR"
                  stroke="var(--chart-2)"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "var(--chart-2)", strokeWidth: 0 }}
                  isAnimationActive={!reduced}
                  animationDuration={900}
                />
                <Line
                  type="monotone"
                  dataKey="eer"
                  name="EER"
                  stroke="var(--chart-3)"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "var(--chart-3)", strokeWidth: 0 }}
                  isAnimationActive={!reduced}
                  animationDuration={900}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              The canonical frame gives up a little clean EER to buy rotation
              invariance. Control362 reads 0.8362% FAR, 15.1264% FRR and
              4.7960% EER; Canonical362 reads 0.5000%, 14.7874% and 5.8764%.
            </p>
            <p className="caption-mono mt-4">{orientationFolds}</p>
          </div>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {orientationNote}
        </p>
      </Reveal>
    </Section>
  );
}
