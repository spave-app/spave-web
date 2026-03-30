import styles from "./styles/Timeline.module.css";

type Milestone = {
  label: string;
  description: string;
  status: "done" | "active" | "upcoming";
};

const milestones: Milestone[] = [
  {
    label: "Prototype",
    description: "Browse real courts across Montreal. Filter by size, surface, and neighborhood - no account needed.",
    status: "done",
  },
  {
    label: "Instant Booking",
    description: "Reserve your slot and pay directly on Spave. Instant confirmation, no back-and-forth with venues.",
    status: "active",
  },
  {
    label: "Every Sport",
    description: "Basketball courts, tennis courts, turf fields. One platform, any game.",
    status: "upcoming",
  },
  {
    label: "Spave Mobile App",
    description: "Full native experience on iOS and Android. Book your court from anywhere, in seconds.",
    status: "upcoming",
  },
];

export default function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>What we&apos;re building</h2>

        <div className={styles.timeline}>
          <div className={styles.track}>
            <div className={styles.trackFill} />
          </div>

          {milestones.map((m, i) => (
            <div key={m.label} className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}>
              <div className={`${styles.dot} ${styles[m.status]}`} />
              <div className={`${styles.card} ${styles[`card_${m.status}`]}`}>
                {m.status === "done" && <span className={styles.badge}>Live</span>}
                {m.status === "active" && <span className={`${styles.badge} ${styles.badgeActive}`}>In progress</span>}
                {m.status === "upcoming" && <span className={`${styles.badge} ${styles.badgeUpcoming}`}>Coming soon</span>}
                <h3 className={styles.milestoneTitle}>{m.label}</h3>
                <p className={styles.milestoneDesc}>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
