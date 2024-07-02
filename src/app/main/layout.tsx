import Navigator from "@/components/Navigator";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen relative sm:pl-40 sm:pt-0 pt-10">
      <Navigator />
      <main className="h-full w-full text-xl sm:text-base">{children}</main>
    </div>
  );
}
