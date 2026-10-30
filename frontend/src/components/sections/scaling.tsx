"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scalingData, scalingNote } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, usePrefersReducedMotion } from "@/components/motion";
import { ChartTooltip } from "@/components/chart-tooltip";

const MONO = "var(--font-mono)";

export function ScalingSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section
      id="scaling"
      eyebrow="scaling"
      title="Dev mean fold EER by method"
      description="Three verification methods, two sources. Lower EER is better."
    >
      <Reveal>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={scalingData}
              margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
              barCategoryGap="24%"
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeOpacity={0.7}
                vertical={false}
              />
              <XAxis
                dataKey="method"
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
                cursor={{ fill: "var(--surface-raised)" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <ChartTooltip
                      label={String(label)}
                      rows={payload.map((p) => ({
                        name: String(p.dataKey),
                        value: `${Number(p.value).toFixed(3)}%`,
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
              <Bar
                dataKey="HAR"
                fill="var(--accent)"
                radius={[4, 4, 0, 0]}
                barSize={22}
                isAnimationActive={!reduced}
                animationDuration={900}
              />
              <Bar
                dataKey="WISDM"
                fill="var(--chart-2)"
                radius={[4, 4, 0, 0]}
                barSize={22}
                isAnimationActive={!reduced}
                animationDuration={900}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="caption-mono mt-4">{scalingNote}</p>
      </Reveal>
    </Section>
  );
}
