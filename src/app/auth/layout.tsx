export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-rscreen flex justify-center items-center">
      {children}
    </main>
  );
}
