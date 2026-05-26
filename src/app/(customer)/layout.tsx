import Header from "@/components/customer/layout/Header";
import Footer from "@/components/customer/layout/Footer";
import FloatingContact from "@/components/customer/layout/FloatingContact";

// Fetch settings from internal API (only runs server-side in layout)
async function getSettings(): Promise<Record<string, string>> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/settings`, { next: { revalidate: 60 } });
    if (res.ok) return res.json();
  } catch {
    // fallback to defaults inside Footer
  }
  return {};
}

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettings();

  return (
    <div className="bg-background-light text-[#111811] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer
        address={s.address}
        phone={s.phone}
        email={s.email}
        openFrom={s.open_from}
        openTo={s.open_to}
      />
      <FloatingContact facebook={s.facebook} zalo={s.zalo} />
    </div>
  );
}
