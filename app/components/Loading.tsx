import styles from "./styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.ring} aria-hidden="true" />
      <p className={styles.hint}>Searching nearby courts...</p>
    </div>
  );
}
