"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import styles from "./styles/FAQ.module.css";

type FAQItem = { q: string; a: string };

const faqs: FAQItem[] = [
  {
    q: "Is Spave free to use?",
    a: "Browsing and discovering courts is completely free. We take a small platform fee when a booking is completed through Spave - that's it.",
  },
  {
    q: "How do I know a court is actually available?",
    a: "Courts show real availability pulled from the venue. If it shows open, it's open. No more calling to confirm what's on the website.",
  },
  {
    q: "Can I list my court on Spave?",
    a: "Not yet via self-serve, but we're actively onboarding venues. If you manage a space in Montreal, get in touch and we'll set you up.",
  },
  {
    q: "Do I pay on Spave or at the venue?",
    a: "Right now, Spave connects you directly with the venue's booking system. Full integrated payment is coming in Phase 2.",
  },
  {
    q: "Why only soccer courts in Montreal?",
    a: "We're starting focused. Montreal has one of the most active recreational soccer scenes in Canada and we want to get this right before expanding.",
  },
  {
    q: "When will more sports be available?",
    a: "Basketball and tennis are next. Sign up for the waitlist and we'll reach out before anyone else when they go live.",
  },
];

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

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Questions?</p>
        <h2 className={styles.heading}>We&apos;ve got answers.</h2>
        <div className={styles.faqGrid}>
          <div className={styles.col}>
            {faqs.slice(0, 3).map((f, i) => (
              <FAQRow key={f.q} item={f} open={openIndex === i} onToggle={() => toggle(i)} />
            ))}
          </div>
          <div className={styles.col}>
            {faqs.slice(3).map((f, i) => (
              <FAQRow key={f.q} item={f} open={openIndex === i + 3} onToggle={() => toggle(i + 3)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
