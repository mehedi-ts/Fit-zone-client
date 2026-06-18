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
  Avatar,
} from "@heroui/react";
import { Mail, Lock, User, Eye, EyeOff, Upload, X } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      photo: photoFile,
    };

    // TODO: replace with real registration call
    console.log("register payload", payload);
    setIsSubmitting(false);
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
      bg-gradient-to-br
      from-page-bg
      via-brand/5
      to-brand/15
      md:px-6
      md:py-12
      py-6
      
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
            Create your account
          </Card.Title>
          <Card.Description className="text-center">
            Join classes, track sessions, and connect with trainers.
          </Card.Description>
        </Card.Header>

        <Card.Content className="px-8 pb-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Profile photo upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-2 ring-brand/20">
                  {photoPreview ? (
                    <Avatar.Image src={photoPreview} alt="Profile preview" />
                  ) : (
                    <Avatar.Fallback>
                      <User size={28} className="text-gray-400" />
                    </Avatar.Fallback>
                  )}
                </Avatar>

                {photoPreview && (
                  <button
                    type="button"
                    onClick={removePhoto}
                    aria-label="Remove photo"
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-105"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <label
                htmlFor="profile-photo"
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-black/15 px-4 py-2 text-xs font-semibold text-brand-dark transition-colors hover:bg-black/5"
              >
                <Upload size={14} />
                {photoFile ? "Change photo" : "Upload profile photo"}
              </label>
              <input
                id="profile-photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              {photoFile && (
                <p className="max-w-[200px] truncate text-xs text-gray-500">
                  {photoFile.name}
                </p>
              )}
            </div>

            <TextField name="name" type="text" isRequired>
              <Label className="text-sm font-semibold text-brand-dark">
                Full name
              </Label>
              <div className="relative mt-1">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-black/10 bg-white pl-10 pr-4 py-3 text-sm focus:border-brand focus:outline-none"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

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
              minLength={8}
            >
              <Label className="text-sm font-semibold text-brand-dark">
                Password
              </Label>
              <div className="relative mt-1">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="At least 8 characters"
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
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="flex-col gap-0 px-8 pb-8 pt-2">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand hover:underline"
            >
              Log in
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </main>
  );
}
