"use client";

import { CircleNotch } from "@/assets/phosphor-icons";
import Navbar from "@/components/navbar/navbar";
import Subnavbar from "@/components/navbar/subnavbar";
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
    <div className="min-h-screen bg-background flex flex-col w-full">
      <nav className="w-full flex flex-col relative z-10">
        <Navbar />
        <Subnavbar />
      </nav>
      <main className="flex flex-1 bg-slate-100">{children}</main>
    </div>
  );
}
