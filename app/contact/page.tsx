import Header from "../components/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--header-h)", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--color-text-muted)", fontSize: "15px", fontWeight: 500 }}>Contact page coming soon.</p>
      </main>
    </>
  );
}
