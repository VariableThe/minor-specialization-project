"use client";

import type { ReactNode } from "react";

export function ChartTooltip({
  label,
  rows,
}: {
  label: ReactNode;
  rows: { name: string; value: ReactNode }[];
}) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "0.5rem 0.75rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
      }}
    >
      <p
        style={{
          marginBottom: "0.375rem",
          fontWeight: 500,
          color: "var(--text-display)",
        }}
      >
        {label}
      </p>
      <div style={{ display: "grid", gap: "0.25rem" }}>
        {rows.map((r) => (
          <div
            key={r.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            <span style={{ color: "var(--text-secondary)" }}>{r.name}</span>
            <span
              className="num"
              style={{ fontWeight: 500, color: "var(--text-display)" }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
