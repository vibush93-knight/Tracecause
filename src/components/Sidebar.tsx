import "./Sidebar.css";

const investigations = [
  "Why did Nokia lose the smartphone market?",
  "Why did WeWork collapse?",
  "How did Google become successful?",
  "Why did BlackBerry fail?",
  "How did Netflix beat Blockbuster?",
];

type Props = {
  onNewInvestigation: () => void;
};

export default function Sidebar({
  onNewInvestigation,
}: Props) {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div className="logo-icon">
          <span>TC</span>
        </div>

        <div>
          <h2>TraceCause</h2>
          <small>Outcome-first Investigation</small>
        </div>

      </div>

      <button
        className="new-btn"
        onClick={onNewInvestigation}
      >
        + New Investigation
      </button>

      <div className="sidebar-title">
        RECENT INVESTIGATIONS
      </div>

      <div className="history">
        {investigations.map((item) => (
          <div className="history-item" key={item}>
            {item}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">

        <div className="status-card">
          <span className="green-dot"></span>
          Agents Ready
        </div>

        <div className="status-card">
          ⚙ Settings
        </div>

      </div>

    </aside>
  );
}