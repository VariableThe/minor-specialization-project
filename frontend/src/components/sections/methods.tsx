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
import { hillclimbData, hillclimbNote } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, usePrefersReducedMotion } from "@/components/motion";
import { ChartTooltip } from "@/components/chart-tooltip";

const MONO = "var(--font-mono)";

export function MethodsSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section
      id="methods"
      eyebrow="methods"
      title="Four methods, one falling error line"
      description="Descriptive EER across the Santos hillclimb, from the historical-acceleration baseline to the DEV-selected frozen threshold."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={hillclimbData}
                margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeOpacity={0.7}
                  vertical={false}
                />
                <XAxis
                  dataKey="step"
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
                  domain={[0, 8]}
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
                    const d = payload[0].payload as (typeof hillclimbData)[number];
                    return (
                      <ChartTooltip
                        label={d.step}
                        rows={[
                          { name: "Method", value: d.method },
                          { name: "EER", value: `${d.eer.toFixed(1)}%` },
                        ]}
                      />
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="eer"
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
            <ul className="space-y-2.5">
              {hillclimbData.map((d) => (
                <li
                  key={d.step}
                  className="font-mono text-xs leading-relaxed text-(--text-secondary)"
                >
                  <span className="text-(--accent)">{d.step} </span>
                  {d.method} — {d.eer.toFixed(1)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {hillclimbNote}
        </p>
      </Reveal>
    </Section>
  );
}
