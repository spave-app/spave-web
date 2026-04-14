import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Timeline from "@/app/components/Timeline";
import HowItWorks from "@/app/components/HowItWorks";
import SocialProof from "@/app/components/SocialProof";
import VisualInterlude from "@/app/components/VisualInterlude";
import FAQ from "@/app/components/FAQ";
import FinalCTA from "@/app/components/FinalCTA";
import ScrollHint from "@/app/components/ScrollHint";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FinalCTA />
        <ScrollHint />
        <Timeline />
        <HowItWorks />
        <SocialProof />
        <VisualInterlude />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
