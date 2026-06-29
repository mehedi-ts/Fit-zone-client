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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.log("Google sign in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

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

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-black/10" />
            <span className="text-xs font-medium text-gray-400">OR</span>
            <span className="h-px flex-1 bg-black/10" />
          </div>

          {/* Google sign in */}
          <Button
            type="button"
            onPress={handleGoogleSignIn}
            isDisabled={isGoogleLoading}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-black/10 bg-white py-3.5 text-sm font-semibold text-brand-dark transition-all duration-200 hover:bg-black/5 active:scale-[0.98] disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.14c-.22-.69-.35-1.43-.35-2.14s.13-1.45.35-2.14V7.02H2.18A10.97 10.97 0 0 0 1 12c0 1.79.43 3.48 1.18 4.98l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </Button>
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