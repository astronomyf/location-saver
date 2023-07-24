"use client";

import GoogleButton from "@/components/auth/google-button";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Logo className="w-10 h-10 mx-auto mb-4" withBackground />
      <div className="w-full h-fit border border-slate-200 rounded-lg p-4 max-w-xs flex flex-col gap-y-3 bg-background">
        <div className="flex flex-col text-center">
          <h1 className="font-semibold text-2xl">Login</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Don&apos;t have an account yet?
            <Link
              href="/signup"
              className="text-primary decoration-2 hover:underline font-medium ml-1"
            >
              Sign up here
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-y-3 mt-2">
          <GoogleButton label="Sign in with Google" />
        </div>
        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">
          Or
        </div>

        <div className="flex flex-col gap-y-3">
          <Input placeholder="Email" width="full" />
          <Input type="password" placeholder="Password" width="full" />

          <Button className="w-full mt-2">Login</Button>
        </div>
      </div>
    </div>
  );
}
