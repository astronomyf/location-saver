"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-full h-fit border border-slate-200 rounded-md p-4 max-w-xs flex flex-col gap-y-3 bg-background">
        <Logo className="w-10 h-10 mx-auto" />
        <Input placeholder="Email" width="full" />
        <Input placeholder="Password" width="full" />

        <Button className="w-full mt-2">Login</Button>
      </div>
    </div>
  );
}
