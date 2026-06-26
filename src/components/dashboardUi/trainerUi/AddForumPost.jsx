"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TextField, Label, Input, TextArea, Button, Card } from "@heroui/react";
import { imageUploader } from "@/app/lib/imageUpload";
import { useUser } from "@/app/lib/getUserClient";
import { addForum } from "@/app/lib/actions/addForum";

export default function AddForumPost() {
  const user = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsUploadingImage(true);

    try {
      const imageUrl = await imageUploader(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl?.url || "",
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed. Please try a different image.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post in the Community Forum.");
      return;
    }

    if (!formData.image) {
      alert("Please upload an image before posting.");
      return;
    }

    setIsSubmitting(true);

    const finalPayload = {
      ...formData,
      authorId: user.id,
      authorName: user.name,
      authorRole:user.role,
      authorEmail: user.email,
      authorRole: user.role,
      createdAt: new Date().toISOString(),
    };

    try {
      await addForum(finalPayload);

      console.log("Post published successfully:", finalPayload);

      alert("Post published successfully!");

      const redirectPath =
        user.role === "admin"
          ? "/dashboard/admin/forum-post-manage"
          : "/dashboard/trainer/my-forum";

      router.push(redirectPath);
    } catch (error) {
      console.error("Failed to publish post:", error);
      alert(
        error?.message ||
          "Something went wrong while publishing your post. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center py-10 px-4">
        <p className="text-sm text-slate-400">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-4">
      <Card className="w-full max-w-2xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl p-6 sm:p-10 flex flex-col gap-8">
        {/* Header */}
        <Card.Header className="space-y-1 p-0">
          <Card.Title className="text-2xl font-semibold tracking-tight text-brand-dark">
            Create Community Post
          </Card.Title>
          <Card.Description className="text-sm text-slate-400">
            Share tips, wins, or announcements with the community.
          </Card.Description>
        </Card.Header>

        <Card.Content className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <TextField
              isRequired
              name="title"
              value={formData.title}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, title: value }))
              }
              className="w-full"
            >
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Title
              </Label>
              <Input
                placeholder="e.g., 5 Recovery Tips After a Heavy Leg Day"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm shadow-sm focus-visible:border-brand outline-none"
              />
            </TextField>

            {/* Image Upload */}
            <div className="w-full flex flex-col gap-1">
              <Label className="text-sm font-medium text-slate-700 block">
                Post Image
              </Label>
              <div className="relative border border-dashed border-slate-300 rounded-xl bg-slate-50 p-2 text-center flex items-center justify-center gap-4 h-11 overflow-hidden hover:border-brand transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
                />
                {isUploadingImage ? (
                  <span className="text-sm text-slate-400 font-medium">
                    Uploading image...
                  </span>
                ) : formData.image ? (
                  <div className="flex items-center gap-2 w-full justify-start pl-2">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={28}
                      height={28}
                      unoptimized
                      className="h-7 w-7 object-cover rounded-md"
                    />
                    <span className="text-xs text-green-600 font-medium truncate">
                      Image selected successfully!
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400 font-medium">
                    Click to choose / drag image file
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <TextField
              isRequired
              name="description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              className="w-full"
            >
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Description
              </Label>
              <TextArea
                placeholder="Share the details of your post with the community..."
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm focus-visible:border-brand outline-none"
              />
            </TextField>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onPress={() => router.back()}
                className="font-medium text-slate-500 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="bg-brand text-white font-medium shadow-sm shadow-orange-500/20 px-8 hover:opacity-90 transition-opacity rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
