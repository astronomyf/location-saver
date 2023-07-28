"use client";

import GoogleButton from "@/components/auth/google-button";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/hooks/auth/useLogin";
import { useSignUp } from "@/lib/hooks/auth/useSignUp";
import Link from "next/link";
import { useForm } from "react-hook-form";

type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const { signUpWithEmail, loading } = useSignUp();
  const { signInWithGoogle, googleLoading } = useLogin();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Logo className="w-10 h-10 mx-auto mb-4" withBackground />
      <div className="w-full h-fit border border-slate-200 rounded-lg p-4 max-w-xs flex flex-col gap-y-3 bg-background">
        <div className="flex flex-col text-center">
          <h1 className="font-semibold text-2xl">Sign up</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Already have an account?
            <Link
              href="/login"
              className="text-primary decoration-2 hover:underline font-medium ml-1"
            >
              Login here
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-y-3 mt-2">
          <GoogleButton
            label="Sign up with Google"
            onClick={signInWithGoogle}
            loading={googleLoading}
          />
        </div>
        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">
          Or
        </div>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit((data) =>
            signUpWithEmail(data.email, data.password, data.confirmPassword)
          )}
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
          <Input
            type="password"
            placeholder="Confirm password"
            width="full"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value, formValues) =>
                value === formValues["password"] || "The passwords must match",
            })}
          />

          <Button loading={loading} type="submit" className="w-full mt-2">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
