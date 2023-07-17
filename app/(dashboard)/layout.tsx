import Sidenav from "@/components/sidenav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside className="max-w-[100px]">
        <Sidenav />
      </aside>
      <main className="flex flex-1">{children}</main>
    </div>
  );
}
