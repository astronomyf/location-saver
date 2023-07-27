"use client";

import { CircleNotch } from "@/assets/phosphor-icons";
import Sidenav from "@/components/sidenav";
import { useAuthState } from "@/lib/hooks/firebase/useAuthState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, loading] = useAuthState();

  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!loading && user) return;

    router.push("/login");
  }, [loading, user, router]);

  if (loading || !user)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <CircleNotch className="w-10 h-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside className="w-[70px]">
        <Sidenav />
      </aside>
      <main className="flex flex-1 bg-slate-100 p-4">{children}</main>
    </div>
  );
}
