import Link from "next/link";
import { getArchitectureSnapshot } from "../lib/architecture-data";
import styles from "./page.module.css";

export default function HomePage() {
  const snapshot = getArchitectureSnapshot();
  const previewSections = snapshot.sections.slice(0, 6);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Next.js Scaffold</p>
        <h1>Architecture docs foundation for Hachi</h1>
        <p>
          The docs site now starts from `ARCHITECTURE.md` and exposes a structured baseline
          for visual maps, flow timelines, and deeper section-level pages.
        </p>
        <div className={styles.actions}>
          <Link href="/architecture" className={styles.primaryAction}>
            Open Architecture View
          </Link>
          <a href="../ARCHITECTURE.md" className={styles.secondaryAction}>
            Open Source Markdown
          </a>
        </div>
      </section>

      <section className={styles.metricGrid}>
        <article>
          <h2>{snapshot.sectionCount}</h2>
          <p>Top-level sections parsed</p>
        </article>
        <article>
          <h2>{snapshot.systemNodes.length}</h2>
          <p>System nodes scaffolded</p>
        </article>
        <article>
          <h2>{snapshot.messageFlowSteps.length}</h2>
          <p>Message-flow steps modelled</p>
        </article>
        <article>
          <h2>{snapshot.sourceLoaded ? "Ready" : "Missing"}</h2>
          <p>Architecture source status</p>
        </article>
      </section>

      <section className={styles.preview}>
        <div className={styles.previewHeader}>
          <h2>Section Preview</h2>
          <p>First six sections detected from the architecture reference.</p>
        </div>
        <ul>
          {previewSections.map((section) => (
            <li key={section.slug}>
              <span>{section.number}</span>
              <span>{section.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
