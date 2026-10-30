"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { activityModels, activityContext, activityExtra } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, usePrefersReducedMotion } from "@/components/motion";
import { ChartTooltip } from "@/components/chart-tooltip";

const MONO = "var(--font-mono)";

export function ActivitySection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section
      id="activity"
      eyebrow="activity"
      title="Activity classification on UCI HAR"
      description="2,947 held-out test windows. Bars show accuracy; hover for macro-F1 and parameter count."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="h-[26rem] w-full sm:h-[24rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityModels}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
              barCategoryGap="28%"
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeOpacity={0.7}
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[80, 96]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{
                  fill: "var(--text-secondary)",
                  fontSize: 11,
                  fontFamily: MONO,
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={128}
                tick={{
                  fill: "var(--text-secondary)",
                  fontSize: 11,
                  fontFamily: MONO,
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--surface-raised)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as (typeof activityModels)[number];
                  return (
                    <ChartTooltip
                      label={d.label}
                      rows={[
                        { name: "Track", value: d.track },
                        { name: "Accuracy", value: `${d.accuracy.toFixed(2)}%` },
                        { name: "Macro-F1", value: d.macroF1.toFixed(4) },
                        {
                          name: "Parameters",
                          value: d.params.toLocaleString("en-US"),
                        },
                      ]}
                    />
                  );
                }}
              />
              <Bar
                dataKey="accuracy"
                fill="var(--accent)"
                radius={[0, 4, 4, 0]}
                barSize={14}
                isAnimationActive={!reduced}
                animationDuration={900}
              />
            </BarChart>
          </ResponsiveContainer>
          </div>
          <div>
            <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              The cnn_lstm leads at 93.01% with a 0.9314 macro-F1. The
              squeeze-excitation variant sits just behind at 92.94%, and the
              ViT at 92.37% with more than twice the parameters.
            </p>
            <p className="caption-mono mt-4">{activityExtra}</p>
          </div>
        </div>
        <p className="caption-mono mt-4">{activityContext}</p>
      </Reveal>
    </Section>
  );
}
