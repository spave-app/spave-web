import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import HowItWorks from "./components/HowItWorks";
import SocialProof from "./components/SocialProof";
import VisualInterlude from "./components/VisualInterlude";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";

export default function Home() {
  return (
    <LanguageProvider lang="en">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <HowItWorks />
        <SocialProof />
        <VisualInterlude />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
      <CookieBanner />
    </LanguageProvider>
  );
}
