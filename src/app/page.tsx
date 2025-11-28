import { Navigation } from "@/components/common/Navigation";
import { Footer } from "@/components/common/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MenuHighlights } from "@/components/sections/MenuHighlights";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactLocation } from "@/components/sections/ContactLocation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <MenuHighlights />
        <Gallery />
        <Testimonials />
        {/* <ContactLocation /> */}
      </main>
      <Footer />
    </>
  );
}
