"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "cn";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      {(eyebrow || title || description) && (
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="section-title">{eyebrow}</p>}
          {title && (
            <h2 className="text-[1.625rem] leading-snug">{title}</h2>
          )}
          {description && (
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-(--text-secondary)">
              {description}
            </p>
          )}
        </Reveal>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}
