import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import FloatingButtons from "@/components/public/FloatingButtons";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
