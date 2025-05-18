import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-[#f4f4f0]">{children}</main>
      <Footer />
    </div>
  );
}

export default layout;
