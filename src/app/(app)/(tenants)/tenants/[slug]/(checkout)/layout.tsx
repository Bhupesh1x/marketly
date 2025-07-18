import { Footer } from "@/features/tenants/components/Footer";
import { Navbar } from "@/features/checkout/components/Navbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

async function TenantCheckoutLayout({ children, params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen w-full bg-[#f4f4f0] flex flex-col">
      <Navbar slug={slug} />
      <main className="w-full h-full flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default TenantCheckoutLayout;
