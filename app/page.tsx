import StickyHeader from "@/components/sections/StickyHeader";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Magazine from "@/components/sections/Magazine";
import Tests from "@/components/sections/Tests";
import StaticGS from "@/components/sections/StaticGS";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main>
        <Hero />
        <Gallery />
        <Magazine />
        <Tests />
        <StaticGS />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
