import "./NodeDetails.css";

type Source = {
  title: string;
  url: string;
};

type Props = {
  node: {
    title: string;
    subtitle: string;
    icon: string;
    description?: string;
    impact?: number;
    confidence?: string;
    sources?: Source[];
  } | null;

  onClose: () => void;
};

export default function NodeDetails({
  node,
  onClose,
}: Props) {
  if (!node) return null;

  // Convert 0–10 impact scale into percentage
  const impact =
    node.impact == null
      ? 80
      : node.impact <= 10
      ? node.impact * 10
      : node.impact;

  const confidence = node.confidence ?? "High";

  // Remove confidence/impact text if AI accidentally generated it
  const cleanDescription = (node.description || "")
    .replace(/Confidence:.*$/gim, "")
    .replace(/Impact:.*$/gim, "")
    .trim();

  return (
    <div
      className="node-details-overlay"
      onClick={onClose}
    >
      <aside
        className="node-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}

        <div className="details-header">

          <div className="details-icon">
            {node.icon}
          </div>

          <div className="details-info">
            <h2>{node.title}</h2>
            <p>{node.subtitle}</p>
          </div>

        </div>

        {/* AI Explanation */}

        <section className="detail-section">

          <h3>🧠 AI Explanation</h3>

          <p className="ai-text">
            {cleanDescription || "No explanation available."}
          </p>

          {/* Confidence */}

          <div className="node-metrics">

            <div className="metric confidence">

              <span className="metric-label">
                Confidence
              </span>

              <strong>{confidence}</strong>

            </div>

          </div>

        </section>

        {/* Impact */}

        <section className="detail-section">

          <h3>📊 Impact</h3>

          <div className="impact">

            <div className="impact-bar">

              <div
                className="impact-fill"
                style={{
                  width: `${impact}%`,
                }}
              />

            </div>

            <span>{impact}%</span>

          </div>

        </section>

        {/* Sources */}

        <section className="detail-section">

          <h3>📚 Evidence Sources</h3>

          {node.sources?.length ? (

            <div className="source-list">

              {node.sources.map((source, index) => {

                let hostname = "";

                try {
                  hostname = new URL(source.url).hostname.replace(
                    "www.",
                    ""
                  );
                } catch {
                  hostname = source.url;
                }

                return (

                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="source-link"
                  >

                    <div className="source-content">

                      <div className="source-title">
                        📄 {source.title}
                      </div>

                      <div className="source-url">
                        {hostname}
                      </div>

                    </div>

                    <div className="source-arrow">
                      ↗
                    </div>

                  </a>

                );

              })}

            </div>

          ) : (

            <div className="no-sources">
              No evidence sources available.
            </div>

          )}

        </section>

      </aside>
    </div>
  );
}