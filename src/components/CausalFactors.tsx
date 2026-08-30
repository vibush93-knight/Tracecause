import "./CausalFactors.css";
import { useState } from "react";
import NodeDetails from "./NodeDetails";

type Props = {
  nodes?: any[];
};

export default function CausalFactors({ nodes }: Props) {

  const [selected, setSelected] = useState<any>(null);

  if (!nodes || nodes.length === 0) return null;

  return (
    <section className="factors">

      <h2>🎯 Main Causal Factors</h2>

      <div className="factor-grid">

        {nodes.map((node, index) => (

          <div
            key={index}
            className={`factor-card ${
              selected?.id === node.id ? "active" : ""
            }`}
            onClick={() => setSelected(node)}
          >

            <div className="factor-top">

              <div className="factor-number">
                {index + 1}
              </div>

              <div className="factor-type">
                {node.type || "Event"}
              </div>

            </div>

            <h3>
              {node.label}
            </h3>

            <p className="factor-description">
              {node.description ||
                "No description available."}
            </p>

            <div className="factor-footer">

              <span className="factor-link">
                View Investigation
              </span>

              <span className="factor-arrow">
                →
              </span>

            </div>

          </div>

        ))}

      </div>

      {selected && (

        <NodeDetails
          node={{
            title: selected.label,
            subtitle: selected.type,
            icon: selected.icon || "📌",
            description: selected.description,
            impact: selected.impact,
            sources: selected.sources,
          }}
          onClose={() => setSelected(null)}
        />

      )}

    </section>
  );
}