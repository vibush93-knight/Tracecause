import "./Timeline.css";
import { useState } from "react";
import NodeDetails from "./NodeDetails";

type Props = {
  graph: any;
  currentStage: number;
};

export default function Timeline({
  graph,
  currentStage,
}: Props) {
  const [selected, setSelected] = useState<any>(null);

  if (!graph) {
    return (
      <div className="timeline-empty">
        No investigation yet.
      </div>
    );
  }

  //-----------------------------------
  // Build timeline
  //-----------------------------------

  let timeline = graph.timeline;

  if (!timeline && graph.nodes) {
   timeline = graph.nodes.map((node: any, index: number) => ({
  id: node.id || index,

  year: node.date || "",

  event:
    node.label ||
    node.title ||
    node.name ||
    node.event ||
    "Untitled",

  company:
    node.type ||
    node.category ||
    node.group ||
    "Cause",

  strategy: node.description || "",

  description: node.description || "",

  confidence: node.confidence || "High",

  impact: node.impact || 90,

  icon: node.icon || "📌",

  sources: node.sources || [],
}));
  }

  timeline = timeline || [];

  //-----------------------------------
  // Show only discovered nodes
  //-----------------------------------

  let visibleTimeline = timeline;

  if (currentStage >= 0 && currentStage < 4) {
    visibleTimeline = timeline.slice(0, currentStage + 1);
  }

  console.log(graph.nodes);

  
  return (
    <section className="timeline-wrapper">
      <div className="timeline-section">
        <div className="timeline">
          <h2>{graph.title || "Live Investigation"}</h2>

          {visibleTimeline.map((item: any, index: number) => {
            const cleanDescription = (item.strategy || "")
              .replace(/Confidence:[\s\S]*/i, "")
              .replace(/Impact:[\s\S]*/i, "")
              .trim();

            return (
              <div
                key={item.id || index}
                className={`timeline-item ${
                  selected === item ? "active" : ""
                }`}
                onClick={() => setSelected(item)}
              >
                <div className="timeline-number">
                  {index + 1}
                </div>

                <div className="timeline-card">
                  {item.year && (
                    <div className="year">
                      {item.year}
                    </div>
                  )}

                  <h3>{item.event}</h3>

                  <h4>{item.company}</h4>

                  {cleanDescription && (
                    <p>{cleanDescription}</p>
                  )}
                </div>
              </div>
            );
          })}

          {currentStage < 4 && (
            <div
              style={{
                textAlign: "center",
                marginTop: 30,
                color: "#9aa3b2",
                fontSize: "15px",
              }}
            >
              🔍 Agents are discovering new causal events...
            </div>
          )}
        </div>
      </div>

      {selected && (
        <NodeDetails
          node={{
            title: selected.event,
            subtitle: selected.company,
            icon: selected.icon || "📌",
            description: selected.description,
            confidence: selected.confidence,
            impact: selected.impact,
            sources: selected.sources,
          }}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}