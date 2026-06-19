"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const email = formData.get("email");
      const password = formData.get("password");

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Login failed:", error);
        return;
      }

      console.log("Login success:", data);

      router.push("/");
    } catch (err) {
      console.error("Something went wrong:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="
      relative
      flex
      min-h-screen
      w-full
      md:items-center
      justify-center
      overflow-hidden
      bg-linear-to-br
      from-page-bg
      via-brand/5
      to-brand/15
      px-2
      py-12
      "
    >
      {/* Ambient accent glows — quiet, not the focal point */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />

      <Card className="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
        <Card.Header className="items-center pt-8 pb-2">
          <Logo />
          <Card.Title className="mt-4 text-2xl font-extrabold text-brand-dark">
            Welcome back
          </Card.Title>
          <Card.Description className="text-center">
            Log in to book your next class and keep your streak going.
          </Card.Description>
        </Card.Header>

        <Card.Content className="px-8 pb-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField name="email" type="email" isRequired>
              <Label className="text-sm font-semibold text-brand-dark">
                Email
              </Label>
              <div className="relative mt-1">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 py-3 text-sm focus:border-brand focus:outline-none"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              isRequired
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-brand-dark">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-black/10 bg-white pl-10 pr-11 py-3 text-sm focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <Button
              type="submit"
              variant="primary"
              isDisabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="flex-col gap-0 px-8 pb-8 pt-2">
          <p className="text-sm text-gray-500">
            New to the platform?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand hover:underline"
            >
              Create an account
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </main>
  );
}
