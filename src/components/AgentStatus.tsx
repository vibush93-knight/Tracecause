import "./AgentStatus.css";

type Props = {
  currentStage: number;
};

const agents = [
  "Research",
  "Evidence",
  "Causality",
  "Verification",
];

export default function AgentStatus({ currentStage }: Props) {
  return (
    <section className="agent-status">
      <div className="agent-left">
        <div className="agent-icon">✦</div>

        <div>
          <h3>
            {currentStage === -1
              ? "Waiting for Investigation"
              : currentStage >= 4
              ? "Investigation Completed"
              : "Agent Investigation Running"}
          </h3>

          <p>
            {currentStage === -1
              ? "Enter a question and click Investigate to start."
              : currentStage >= 4
              ? "All AI agents completed the causal investigation."
              : "AI agents are collecting evidence and building the causal graph."}
          </p>
        </div>
      </div>

      <div className="progress-list">
        {agents.map((agent, index) => {
          let progress = 0;
          let label = "Waiting";

          // Completed agents
          if (currentStage > index) {
            progress = 100;
            label = "Completed";
          }

          // Currently running agent
          if (currentStage !== -1 && currentStage < 4 && index === currentStage) {
            progress = 90;
            label = "Running";
          }

          // All completed
          if (currentStage >= 4) {
            progress = 100;
            label = "Completed";
          }

          return (
            <div
              key={agent}
              className={`progress-card ${
                label === "Running" ? "running-card" : ""
              }`}
            >
              <div className="progress-header">
                <span>{agent}</span>

                <span className={`status ${label.toLowerCase()}`}>
                  {label}
                </span>
              </div>

              <div className="progress-track">
                <div
                  className={`progress-fill ${
                    label === "Running" ? "running-fill" : ""
                  }`}
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}