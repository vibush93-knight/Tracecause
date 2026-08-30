import "./App.css";
import { useState, useRef } from "react";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import SearchPanel from "./components/SearchPanel";
import Timeline from "./components/Timeline";
import AgentStatus from "./components/AgentStatus";
import AgentPanel from "./components/AgentPanel";
import SummaryCard from "./components/SummaryCard";
import CausalFactors from "./components/CausalFactors";

export default function App() {
  const [investigation, setInvestigation] = useState<any>(null);

  const [question, setQuestion] = useState("");

  // -1 = Waiting
  // 0 = Research
  // 1 = Evidence
  // 2 = Causality
  // 3 = Verification
  // 4 = Completed
  const [agentStage, setAgentStage] = useState(-1);

  const agentSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAgents = () => {
    agentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNewInvestigation = () => {
    setQuestion("");
    setInvestigation(null);
    setAgentStage(-1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <Sidebar onNewInvestigation={handleNewInvestigation} />

      <main className="main">

        <TopBar />

        <SearchPanel
          question={question}
          setQuestion={setQuestion}
          onComplete={setInvestigation}
          setInvestigation={setInvestigation}
          setAgentStage={setAgentStage}
          onInvestigate={scrollToAgents}
        />

        <div
          ref={agentSectionRef}
          className="investigation-grid"
        >
          <AgentPanel currentStage={agentStage} />

          <AgentStatus currentStage={agentStage} />
        </div>

        <Timeline
          graph={investigation?.graph}
          currentStage={agentStage}
        />

        <SummaryCard
          report={investigation?.report}
        />

        <CausalFactors
          nodes={investigation?.graph?.nodes}
        />

      </main>
    </div>
  );
}