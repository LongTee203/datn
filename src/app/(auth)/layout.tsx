import FloatingContact from "@/components/customer/layout/FloatingContact";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages manage their own header/footer — no shared layout
  return (
    <>
      {children}
      <FloatingContact />
    </>
  );
}
