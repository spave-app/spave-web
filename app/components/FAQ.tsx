"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/FAQ.module.css";

type FAQItem = { q: string; a: string };

function FAQRow({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`${styles.row} ${open ? styles.rowOpen : ""}`}>
      <button className={styles.question} onClick={onToggle}>
        <span>{item.q}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <div className={`${styles.answerWrap} ${open ? styles.answerOpen : ""}`}>
        <p className={styles.answer}>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useT();
  const { eyebrow, heading, items } = t.faq;

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.faqGrid}>
          <div className={styles.col}>
            {items.slice(0, 3).map((f, i) => (
              <FAQRow key={f.q} item={f} open={openIndex === i} onToggle={() => toggle(i)} />
            ))}
          </div>
          <div className={styles.col}>
            {items.slice(3).map((f, i) => (
              <FAQRow key={f.q} item={f} open={openIndex === i + 3} onToggle={() => toggle(i + 3)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
