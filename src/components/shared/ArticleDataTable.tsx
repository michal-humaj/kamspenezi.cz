interface TableRow {
  parameter: string;
  value: string;
  source: string;
  badge?: "VERIFIED" | "DERIVED" | "ESTIMATED";
}

interface ArticleDataTableProps {
  rows: TableRow[];
  caption?: string;
}

const badgeStyles: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: "rgba(47, 92, 69, 0.08)", color: "var(--scenario-b-dot)" },
  DERIVED:  { bg: "rgba(15, 23, 42, 0.05)", color: "var(--color-secondary)" },
  ESTIMATED:{ bg: "rgba(194, 65, 12, 0.08)", color: "var(--scenario-a-dot)" },
};

export function ArticleDataTable({ rows, caption }: ArticleDataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse font-uiSans text-sm"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        {caption && (
          <caption
            className="mb-3 text-left text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--color-bullet)" }}
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr style={{ borderBottom: `2px solid var(--color-border)` }}>
            <th
              className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-secondary)" }}
            >
              Parametr
            </th>
            <th
              className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-secondary)" }}
            >
              Hodnota
            </th>
            <th
              className="py-3 pl-4 text-left text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-secondary)" }}
            >
              Zdroj
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? "transparent" : "rgba(15, 23, 42, 0.018)",
                borderBottom: `1px solid var(--color-border)`,
              }}
            >
              <td
                className="py-3 pr-4 font-medium align-top"
                style={{ color: "var(--color-primary)" }}
              >
                <span>{row.parameter}</span>
                {row.badge && (
                  <span
                    className="ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={badgeStyles[row.badge]}
                  >
                    {row.badge}
                  </span>
                )}
              </td>
              <td
                className="py-3 px-4 align-top tabular-nums"
                style={{ color: "var(--color-primary)" }}
              >
                {row.value}
              </td>
              <td
                className="py-3 pl-4 align-top text-xs leading-relaxed"
                style={{ color: "var(--color-secondary)" }}
              >
                {row.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
