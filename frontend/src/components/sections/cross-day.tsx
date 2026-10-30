"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { crossDay, rocCurve } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal, usePrefersReducedMotion } from "@/components/motion";
import { ChartTooltip } from "@/components/chart-tooltip";

const MONO = "var(--font-mono)";

export function CrossDaySection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section
      id="cross-day"
      eyebrow="cross-day"
      title="Cross-day authentication"
      description={`${crossDay.dataset} on a ${crossDay.protocol}: ${crossDay.description}.`}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {crossDay.metrics.map((m) => (
          <div key={m.label}>
            <p className="stat-label">{m.label}</p>
            <p className="stat-number mt-2 text-[1.625rem] leading-none">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <Reveal className="mt-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base">ROC curve (illustrative)</h3>
              <span className="num font-mono text-xs text-(--accent)">
                auc {crossDay.rocAuc.toFixed(4)}
              </span>
            </div>
            <div className="mt-4 h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={rocCurve}
              margin={{ top: 8, right: 12, left: -14, bottom: 0 }}
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeOpacity={0.7}
              />
              <XAxis
                dataKey="fpr"
                type="number"
                domain={[0, 1]}
                tickFormatter={(v: number) => v.toFixed(1)}
                tick={{
                  fill: "var(--text-secondary)",
                  fontSize: 11,
                  fontFamily: MONO,
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                label={{
                  value: "false positive rate",
                  position: "insideBottom",
                  offset: -2,
                  fill: "var(--text-disabled)",
                  fontSize: 11,
                  fontFamily: MONO,
                }}
              />
              <YAxis
                dataKey="tpr"
                type="number"
                domain={[0, 1]}
                tickFormatter={(v: number) => v.toFixed(1)}
                tick={{
                  fill: "var(--text-secondary)",
                  fontSize: 11,
                  fontFamily: MONO,
                }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                label={{
                  value: "true positive rate",
                  angle: -90,
                  position: "insideLeft",
                  fill: "var(--text-disabled)",
                  fontSize: 11,
                  fontFamily: MONO,
                }}
              />
              <ReferenceLine
                segment={[
                  { x: 0, y: 0 },
                  { x: 1, y: 1 },
                ]}
                stroke="var(--border-visible)"
                strokeDasharray="4 4"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload as (typeof rocCurve)[number];
                  return (
                    <ChartTooltip
                      label="roc point"
                      rows={[
                        { name: "FPR", value: d.fpr.toFixed(3) },
                        { name: "TPR", value: d.tpr.toFixed(3) },
                      ]}
                    />
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="tpr"
                stroke="var(--accent)"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={!reduced}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
          </div>
          <div>
            <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              Day-1 enrollment against day-2 probes from five untouched users.
              The curve bows hard toward the top-left corner, which is what a
              0.9888 AUC looks like.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <p className="text-[0.9375rem] leading-relaxed text-(--text-secondary)">
          {crossDay.honesty}
        </p>
      </Reveal>
    </Section>
  );
}
