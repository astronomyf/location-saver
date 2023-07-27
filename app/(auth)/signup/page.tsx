"use client";

import GoogleButton from "@/components/auth/google-button";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authUserWithGoogle } from "@/lib/auth/authUserWithGoogle";
import { createUserWithEmail } from "@/lib/auth/createUserWithEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SignupFormData) => {
    try {
      await createUserWithEmail(data.email, data.password);

      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const withGoogle = async () => {
    try {
      await authUserWithGoogle();

      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
          <GoogleButton label="Sign up with Google" onClick={withGoogle} />
        </div>
        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">
          Or
        </div>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(onSubmit)}
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
