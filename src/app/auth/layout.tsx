export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      {children}
    </main>
  );
}
