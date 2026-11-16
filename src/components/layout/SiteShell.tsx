import { MegaMenuNavbar } from "@/components/layout/MegaMenuNavbar";
import { Footer } from "@/components/layout/Footer";
import { GsapProvider } from "@/components/motion/GsapProvider";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { PageTransition } from "@/components/motion/PageTransition";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <GsapProvider>
        <MegaMenuNavbar />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </GsapProvider>
    </LenisProvider>
  );
}
