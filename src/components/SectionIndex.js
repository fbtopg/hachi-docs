import styles from "./section-index.module.css";

export function SectionIndex({ sections }) {
  const previewSections = sections.slice(0, 12);

  return (
    <section className={styles.panel}>
      <div className={styles.headingRow}>
        <h2>Section Index</h2>
        <p>{sections.length} top-level sections detected from ARCHITECTURE.md.</p>
      </div>
      <ul className={styles.list}>
        {previewSections.map((section) => (
          <li key={section.slug} className={styles.item}>
            <span className={styles.number}>{section.number}</span>
            <span className={styles.title}>{section.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
