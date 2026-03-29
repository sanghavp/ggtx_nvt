import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import FloatingButtons from "@/components/public/FloatingButtons";
import { getSiteSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer 
        address={settings['footer_address']} 
        phone={settings['footer_phone']} 
        email={settings['footer_email']} 
      />
      <FloatingButtons />
    </>
  );
}
