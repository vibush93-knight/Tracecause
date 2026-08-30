import "./SummaryCard.css";

type Props = {
  report: string;
};

export default function SummaryCard({ report }: Props) {
  if (!report) return null;

  const lines = report
    .replace(/\*\*/g, "")
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <section className="summary-card">
      <div className="summary-header">
        <h2>🧠 AI Investigation Summary</h2>
      </div>

      <div className="summary-content">
        {lines.map((line, index) => {
          // Headings
          if (
            line.endsWith(":") ||
            line.includes("Conclusion") ||
            line.includes("Bottom line") ||
            line.includes("Key Findings")
          ) {
            return (
              <h3 key={index}>
                {line}
              </h3>
            );
          }

          // Bullet points
          if (
            line.startsWith("- ") ||
            /^\d+\./.test(line)
          ) {
            return (
              <div className="summary-point" key={index}>
                ✓ {line.replace(/^\d+\.\s*/, "").replace("- ", "")}
              </div>
            );
          }

          return (
            <p key={index}>
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
}