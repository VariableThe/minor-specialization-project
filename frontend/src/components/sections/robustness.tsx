"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { stressData, stressNote } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, usePrefersReducedMotion } from "@/components/motion";
import { ChartTooltip } from "@/components/chart-tooltip";

const MONO = "var(--font-mono)";

export function RobustnessSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section
      id="robustness"
      eyebrow="robustness"
      title="FRR under stress"
      description="Retained control, clean vs. stressed. Genuine claims rejected as stress increases."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stressData}
                margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeOpacity={0.7}
                  vertical={false}
                />
                <XAxis
                  dataKey="condition"
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
                  domain={[0, 100]}
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
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as (typeof stressData)[number];
                    return (
                      <ChartTooltip
                        label={d.condition}
                        rows={[{ name: "FRR", value: `${d.frr.toFixed(2)}%` }]}
                      />
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="frr"
                  stroke="var(--accent)"
                  strokeWidth={1.5}
                  dot={{ r: 3, fill: "var(--accent)", strokeWidth: 0 }}
                  activeDot={{ r: 4 }}
                  isAnimationActive={!reduced}
                  animationDuration={900}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              A monotone degradation: clean 15.13% rises to 85.19% at 30°
              rotation, 99.50% at 90°, 63.54% at 1% noise and 100% at 5%
              noise. The threshold never moves.
            </p>
          </div>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {stressNote}
        </p>
      </Reveal>
    </Section>
  );
}
