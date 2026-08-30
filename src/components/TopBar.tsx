import "./TopBar.css";

export default function TopBar() {
  return (
    <header className="topbar">

      <div>

        <div className="eyebrow">
          CAUSAL INVESTIGATION
        </div>

        <h1>TraceCause</h1>

        <p>
          Discover the chain of events behind any major outcome using
          AI-powered causal reasoning.
        </p>

      </div>

      <div className="agent-pill">

        <span className="pulse"></span>

        Agents Online

      </div>

    </header>
  );
}