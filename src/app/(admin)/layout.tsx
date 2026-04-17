// (admin) route group — layout is handled by app/admin/layout.tsx
// This file is intentionally a passthrough.
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
