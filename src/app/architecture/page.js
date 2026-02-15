import { FlowSteps } from "../../components/FlowSteps";
import { SectionIndex } from "../../components/SectionIndex";
import { SystemMap } from "../../components/SystemMap";
import { getArchitectureSnapshot } from "../../lib/architecture-data";
import styles from "./page.module.css";

export const metadata = {
  title: "Architecture Visualization",
  description: "Initial architecture visualization scaffold for the Hachi system reference.",
};

export default function ArchitecturePage() {
  const snapshot = getArchitectureSnapshot();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Architecture Viewer</p>
          <h1>Hachi System Reference</h1>
          <p className={styles.summary}>
            This scaffold reads {" "}
            <code>{snapshot.sourcePath}</code>
            {" "}
            and exposes initial structures for system-map, timeline, and section-index
            visualizations.
          </p>
        </div>
        <dl className={styles.metadata}>
          <div>
            <dt>Generated</dt>
            <dd>{snapshot.metadata.generatedAt}</dd>
          </div>
          <div>
            <dt>Source Root</dt>
            <dd>{snapshot.metadata.sourceRoot}</dd>
          </div>
          <div>
            <dt>Sections Parsed</dt>
            <dd>{snapshot.sectionCount}</dd>
          </div>
          <div>
            <dt>Source Loaded</dt>
            <dd>{snapshot.sourceLoaded ? "yes" : "no"}</dd>
          </div>
        </dl>
      </section>

      <SectionIndex sections={snapshot.sections} />

      <SystemMap
        nodes={snapshot.systemNodes}
        edges={snapshot.systemEdges}
        runtimeFlow={snapshot.runtimeFlow}
      />

      <FlowSteps steps={snapshot.messageFlowSteps} layers={snapshot.capabilityLayers} />

      <section className={styles.asciiPanel}>
        <div className={styles.blockHeader}>
          <h2>Wiring Diagram Source</h2>
          <p>Raw section extracted from heading 17 for future parser iterations.</p>
        </div>
        <pre>{snapshot.wiringDiagram.body || "No wiring diagram section found."}</pre>
      </section>

      <section className={styles.asciiPanel}>
        <div className={styles.blockHeader}>
          <h2>Message Flow Source</h2>
          <p>Raw section extracted from heading 18 for visual refinement.</p>
        </div>
        <pre>{snapshot.messageFlowSection.body || "No message flow section found."}</pre>
      </section>
    </main>
  );
}
