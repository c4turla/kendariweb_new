import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { MouseGlow } from "@/components/shared/mouse-glow";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MouseGlow />
      <Navbar />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
