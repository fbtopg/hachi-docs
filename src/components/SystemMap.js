import styles from "./system-map.module.css";

export function SystemMap({ nodes, edges, runtimeFlow }) {
  return (
    <section className={styles.panel}>
      <div className={styles.headingRow}>
        <h2>System Map</h2>
        <p>Initial topology generated from the architecture reference.</p>
      </div>

      {runtimeFlow ? <p className={styles.runtimeFlow}>{runtimeFlow}</p> : null}

      <div className={styles.grid}>
        {nodes.map((node) => (
          <article key={node.id} className={styles.node}>
            <h3>{node.name}</h3>
            <p className={styles.focus}>{node.focus}</p>
            <ul>
              {node.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.edgeBlock}>
        <h3>Primary Data Paths</h3>
        <ul>
          {edges.map((edge) => (
            <li key={`${edge.from}:${edge.to}:${edge.label}`}>
              <span>{edge.from}</span>
              <span className={styles.arrow}>-&gt;</span>
              <span>{edge.to}</span>
              <code>{edge.label}</code>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
