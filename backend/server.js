import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const TRUEFORGE_URL = "http://localhost:8790";
const AGENT_NAME = "causal-orchestrator";

// ------------------------------------
// Create Session
// ------------------------------------

async function createSession() {
  const response = await fetch(`${TRUEFORGE_URL}/api/v1/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent: {
        name: AGENT_NAME,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

// ------------------------------------
// Execute Turn
// ------------------------------------

async function executeTurn(sessionId, question) {
  const response = await fetch(
    `${TRUEFORGE_URL}/api/v1/sessions/${sessionId}/turns`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: [
          {
            type: "user.message",
            content: question,
          },
        ],
        previous_turn_id: "auto",
        stream: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

// ------------------------------------
// Wait Until Complete
// ------------------------------------

async function waitForTurn(sessionId, turnId) {
  while (true) {
    const response = await fetch(
      `${TRUEFORGE_URL}/api/v1/sessions/${sessionId}/turns/${turnId}`
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const result = await response.json();

    const status = result.data.state.status;

    console.log("Current Status:", status);

    if (status !== "running") {
      return result;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

// ------------------------------------
// Normalize Graph
// ------------------------------------

function normalizeGraph(graph) {
  if (!graph) {
    return {
      title: "",
      nodes: [],
      edges: [],
    };
  }

  if (graph.nodes) {
    return {
      title: graph.title || graph.topic || "",

      nodes: graph.nodes.map((node, index) => ({
        id: node.id || String(index),
        label: node.label || "",
        type: node.type || "Event",
        date: node.date || "",
        description: node.description || node.details || "",
        impact: node.impact ?? null,
        icon: node.icon || "📌",
        sources: node.sources || [],
      })),

      edges: (graph.edges || []).map((edge) => ({
        source: String(edge.source),
        target: String(edge.target),
        relationship: edge.relationship || edge.relation || "",
      })),
    };
  }

  if (graph.timeline) {
    const nodes = graph.timeline.map((item, index) => ({
      id: String(index),
      label: item.event,
      type: item.company || "Event",
      date: item.year,
      description: item.strategy || "",
      impact: item.impact ?? null,
      icon: item.icon || "📌",
      sources: item.sources || [],
    }));

    const edges = graph.timeline.slice(0, -1).map((_, index) => ({
      source: String(index),
      target: String(index + 1),
      relationship: "Next",
    }));

    return {
      title: graph.title || "",
      nodes,
      edges,
    };
  }

  return {
    title: "",
    nodes: [],
    edges: [],
  };
}

// ------------------------------------
// Home
// ------------------------------------

app.get("/", (req, res) => {
  res.json({
    status: "TraceCause Backend Running 🚀",
  });
});

// ------------------------------------
// Investigation Endpoint
// ------------------------------------

app.post("/api/investigate", async (req, res) => {
  try {
    const { question } = req.body;

    console.log("==================================");
    console.log("Question:", question);

    const session = await createSession();
    const sessionId = session.data.id;

    console.log("Session:", sessionId);

    const turn = await executeTurn(sessionId, question);
    const turnId = turn.data.id;

    console.log("Turn:", turnId);

    const finalResult = await waitForTurn(sessionId, turnId);

    console.log("==================================");
    console.log("FINAL RESULT");

    console.dir(finalResult, { depth: null });



    

    const state = finalResult.data.state;

console.log("========== TRUEFORGE STATE ==========");
console.dir(state, { depth: null });

if (state.status === "error") {
  console.log("========== AGENT ERROR ==========");
  console.dir(state.error || state, { depth: null });

  return res.status(500).json({
    success: false,
    error: state.error || "TrueForge agent failed.",
  });
}

if (!state.output) {
  return res.status(500).json({
    success: false,
    error: "No output returned from agent.",
  });
}








    

    const content = state.output.content;

    let result;

    try {
      result =
        typeof content === "string"
          ? JSON.parse(content)
          : content;
    } catch (e) {
      console.log("Raw content:");
      console.dir(content, { depth: null });

      return res.status(500).json({
        success: false,
        error: "Agent returned invalid JSON.",
      });
    }

    console.log("========== RAW RESULT ==========");
    console.dir(result, { depth: null });

    const graph = normalizeGraph(result.graph);

    console.log("========== NORMALIZED GRAPH ==========");
    console.dir(graph, { depth: null });

    res.json({
      success: true,
      report: result.report || "",
      graph,
    });

  } catch (err) {
    console.error("Backend Error:");
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  }
});

// ------------------------------------

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});