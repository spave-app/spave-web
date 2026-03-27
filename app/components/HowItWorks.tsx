import styles from "./styles/HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Browse",
    description: "Search by neighborhood, size, and surface. See real availability at a glance.",
  },
  {
    number: "02",
    title: "Book",
    description: "Pick your slot, confirm with the venue, and get everything you need in one place.",
  },
  {
    number: "03",
    title: "Show Up",
    description: "Get directions, show up, and play. That's the whole thing.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>How it works</h2>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.connector} />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
