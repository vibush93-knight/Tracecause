import "./SearchPanel.css";
import { useState } from "react";
import { investigate } from "../services/api";

type Props = {
  question: string;
  setQuestion: (value: string) => void;

  onComplete: (data: any) => void;
  setInvestigation: (data: any) => void;
  setAgentStage: (stage: number) => void;
  onInvestigate: () => void;
};

export default function SearchPanel({
  question,
  setQuestion,
  onComplete,
  setInvestigation,
  setAgentStage,
  onInvestigate,
}: Props) {
  const [loading, setLoading] = useState(false);

  const timers: number[] = [];

  const runAgents = () => {
    // ---------------- Stage 1 ----------------

    setAgentStage(0);

    setInvestigation({
      graph: {
        title: "Live Investigation",
        nodes: [
          {
            id: 1,
            label: question,
            type: "Outcome",
            description: "Target outcome",
          },
        ],
      },
    });

    // ---------------- Stage 2 ----------------

    timers.push(
      window.setTimeout(() => {
        setAgentStage(1);

        setInvestigation({
          graph: {
            title: "Live Investigation",
            nodes: [
              {
                id: 1,
                label: question,
                type: "Outcome",
              },
              {
                id: 2,
                label: "Competitor Pressure",
                type: "Evidence",
              },
            ],
          },
        });
      }, 10000)
    );

    // ---------------- Stage 3 ----------------

    timers.push(
      window.setTimeout(() => {
        setAgentStage(2);

        setInvestigation({
          graph: {
            title: "Live Investigation",
            nodes: [
              {
                id: 1,
                label: question,
                type: "Outcome",
              },
              {
                id: 2,
                label: "Competitor Pressure",
                type: "Evidence",
              },
              {
                id: 3,
                label: "Strategic Decisions",
                type: "Cause",
              },
            ],
          },
        });
      }, 22000)
    );

    // ---------------- Stage 4 ----------------

    timers.push(
      window.setTimeout(() => {
        setAgentStage(3);

        setInvestigation({
          graph: {
            title: "Live Investigation",
            nodes: [
              {
                id: 1,
                label: question,
                type: "Outcome",
              },
              {
                id: 2,
                label: "Competitor Pressure",
                type: "Evidence",
              },
              {
                id: 3,
                label: "Strategic Decisions",
                type: "Cause",
              },
              {
                id: 4,
                label: "Verification Complete",
                type: "Verification",
              },
            ],
          },
        });
      }, 35000)
    );
  };

  const handleInvestigate = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      onInvestigate();

      runAgents();

      const result = await investigate(question);

      // Stop fake timers
      timers.forEach(clearTimeout);

      // Replace fake graph with real backend graph
      onComplete(result);

      setAgentStage(4);
    } catch (err) {
      console.error(err);

      alert("Failed to contact backend.");

      setAgentStage(-1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-panel">
      <div className="search-title">
        INVESTIGATE AN OUTCOME
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter a company, event, or outcome to investigate..."
        />

        <button
          onClick={handleInvestigate}
          disabled={loading}
        >
          {loading ? "Investigating..." : "Investigate →"}
        </button>
      </div>

      <p>
        Trace the chain of events behind any real-world outcome.
      </p>
    </section>
  );
}