import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

export default function ImageConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
