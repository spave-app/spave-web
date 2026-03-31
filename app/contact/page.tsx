import { ArrowRight, ChevronsRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export default function Contact() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>

            {/* ── Left: identity ── */}
            <div className={styles.identity}>
              <span className={styles.tagline}>
                <span className={styles.taglineDot} />
                Built by athletes, for athletes
              </span>

              <h1 className={styles.title}>Let's talk.</h1>

              <p className={styles.hook}>
                For venue listings, partnership inquiries, or general
                questions about Spave. We're here and we respond promptly.
              </p>

              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>Email us</span>
                <a href="mailto:contact@spaveapp.com" className={styles.emailLink}>
                  contact@spaveapp.com
                </a>
                <span className={styles.responseTime}>
                  Typically responds within 24 hours
                </span>
              </div>

              <a href="/#faq" className={styles.faqLink}>
                Browse our FAQ
                <ArrowRight size={15} className={styles.faqLinkArrow} />
              </a>
            </div>

            {/* ── Right: form ── */}
            <div className={styles.formWrap}>
              <p className={styles.formTitle}>Send a message</p>
              <form className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Your name" className={styles.input} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="you@example.com" className={styles.input} />
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="subject">Subject</label>
                  <input id="subject" type="text" placeholder="What's this about?" className={styles.input} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Tell us what's on your mind..." className={styles.textarea} />
                </div>
                <button type="submit" className={styles.submit}>
                  Send message
                  <ChevronsRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
