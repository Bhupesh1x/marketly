import { Footer } from "@/features/tenants/components/Footer";
import { Navbar } from "@/features/tenants/components/Navbar";

interface Props {
  children: React.ReactNode;
}

function TenantHomeLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full bg-[#f4f4f0]">
      <Navbar />
      <main className="w-full h-full">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default TenantHomeLayout;
