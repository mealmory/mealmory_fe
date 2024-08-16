import Header from "./Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen relative sm:pl-40 sm:pt-0 sm:pb-0 pt-[45px] pb-[55px]">
      <Header />
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
