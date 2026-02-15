import styles from "./flow-steps.module.css";

export function FlowSteps({ steps, layers }) {
  return (
    <section className={styles.panel}>
      <div className={styles.headingRow}>
        <h2>Message Flow</h2>
        <p>Starter timeline for architecture walkthroughs and future diagrams.</p>
      </div>

      <ol className={styles.timeline}>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div className={styles.layerBlock}>
        <h3>Capability Layers</h3>
        <div className={styles.layerGrid}>
          {layers.map((layer) => (
            <article key={layer.name} className={styles.layerCard}>
              <h4>{layer.name}</h4>
              <ul>
                {layer.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
