"use client";

import GoogleButton from "@/components/auth/google-button";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInUserWithEmail } from "@/lib/auth/signInUserWithEmail";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInUserWithEmail(data.email, data.password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <Input
            placeholder="Email"
            width="full"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
          <Input
            type="password"
            placeholder="Password"
            width="full"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />

          <Button type="submit" className="w-full mt-2" loading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
