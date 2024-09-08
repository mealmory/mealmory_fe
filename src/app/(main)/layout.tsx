import Header from "./_components/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-rscreen relative">
      <Header />
      <main className="h-full w-full sm:pl-40 sm:pt-0 sm:pb-0 pt-[55px] pb-[10px]">
        {children}
      </main>
    </div>
  );
}
