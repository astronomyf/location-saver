"use client";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="border border-slate-300 rounded-md p-4 max-w-md flex flex-col gap-y-4">
        <Input placeholder="Email" width="full" />
        <Input placeholder="Password" width="full" />

        <Button width="full" colorScheme="blue" mt={6} variant="solid">
          Login
        </Button>
      </div>
    </div>
  );
}
