import HeroSection from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Services } from "@/components/sections/services";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { PortfolioSection } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <Services />
      <WhyChooseUs />
      <PortfolioSection />
      <Testimonials />
      <Process />
      <Faq />
      <Cta />
    </>
  );
}
