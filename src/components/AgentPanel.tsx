import "./AgentPanel.css";

type Props = {
  currentStage: number;
};

const agentNames = [
  "Research Agent",
  "Evidence Agent",
  "Causality Agent",
  "Verification Agent",
];

export default function AgentPanel({
  currentStage,
}: Props) {
  return (
    <div className="agent-panel">

      <div className="agent-title">
        Agent Investigation
      </div>

      {agentNames.map((name, index) => {

        let status = "Waiting";
        let color = "gray";

        if (currentStage > index) {
          status = "Completed";
          color = "green";
        }

        if (currentStage !== -1 && index === currentStage)  {
          status = "Running";
          color = "blue";
        }

        if (currentStage >= agentNames.length) {
          status = "Completed";
          color = "green";
        }

        return (
          <div
            className="agent-card"
            key={name}
          >

            <div className={`agent-dot ${color}`}></div>

            <div className="agent-info">

              <strong>{name}</strong>

              <span>{status}</span>

            </div>

          </div>
        );

      })}

    </div>
  );
}