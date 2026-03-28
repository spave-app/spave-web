import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import styles from "./styles/VisualInterlude.module.css";

export default function VisualInterlude() {
  return (
    <section className={styles.section}>
      <Image
        src="/top_view_field.jpg"
        alt="Aerial view of a soccer court"
        fill
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.heading}>Your game is waiting.</h2>
        <a href="/browse" className={styles.cta}>
          Find your court <ChevronsRight size={18} />
        </a>
      </div>
    </section>
  );
}
