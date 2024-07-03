import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen relative sm:pl-40 sm:pt-0 sm:pb-0 pt-[45px] pb-[52px]">
      <Header />
      <main className="h-full w-full text-xl sm:text-base">{children}</main>
      <Footer />
    </div>
  );
}
