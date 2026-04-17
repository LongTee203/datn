export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages manage their own header/footer — no shared layout
  return <>{children}</>;
}
