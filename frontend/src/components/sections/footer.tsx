import { team, footer } from "@/lib/data";

const repoUrl = "https://github.com/VariableThe/minor-specialization-project";

const names = team.members.map((m) => m.name);
const builtBy =
  names.length <= 1
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

export function Footer() {
  return (
    <footer
      className="mt-[var(--space-3xl)]"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="page">
        <p className="font-mono text-xs leading-relaxed text-(--text-secondary)">
          Built by {builtBy}, mentored by {team.mentor.name}.
        </p>
        <p className="mt-2 font-mono text-xs leading-relaxed text-(--text-disabled)">
          {footer.project}, {footer.institution}, {footer.year}{" · "}
          <a
            href={repoUrl}
            className="underline decoration-(--border) underline-offset-4 transition-colors hover:text-(--text-secondary)"
          >
            GitHub repository
          </a>
        </p>
      </div>
    </footer>
  );
}
