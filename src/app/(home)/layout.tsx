import { Navbar } from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default layout;
