import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import CausalNode from "./CausalNode";
import { getLayoutedElements } from "./layout";

type Props = {
  graph: any;
};

export default function Graph({ graph }: Props) {
  if (!graph?.timeline) {
    return (
      <div
        style={{
          height: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#999",
        }}
      >
        No graph available
      </div>
    );
  }

  const nodeTypes = {
    causal: CausalNode,
  };

  //---------------------------------
  // Create nodes from timeline
  //---------------------------------

  const nodes = graph.timeline.map(
    (item: any, index: number) => ({
      id: String(index),

      type: "causal",

      position: {
        x: 0,
        y: 0,
      },

      data: {
        label: item.event,
        type: `${item.company} (${item.year})`,
      },
    })
  );

  //---------------------------------
  // Connect timeline sequentially
  //---------------------------------

  const edges = graph.timeline
    .slice(0, -1)
    .map((_: any, index: number) => ({
      id: `${index}-${index + 1}`,

      source: String(index),

      target: String(index + 1),

      animated: true,

      type: "smoothstep",

      style: {
        stroke: "#7c5cff",
        strokeWidth: 2,
      },
    }));

  //---------------------------------
  // Dagre Layout
  //---------------------------------

  const layout = getLayoutedElements(nodes, edges);

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        background: "#0f172a",
        borderRadius: 12,
      }}
    >
      <ReactFlow
        nodes={layout.nodes}
        edges={layout.edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background gap={24} size={1} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}