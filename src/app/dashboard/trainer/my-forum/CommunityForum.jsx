"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Modal, Alert, useOverlayState } from "@heroui/react";
import { Trash2 } from "lucide-react";

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CommunityForum({ posts, handleDelete }) {
  const deleteOverlay = useOverlayState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoading = posts === undefined;
  const safePosts = Array.isArray(posts) ? posts : [];

  const openDeleteModal = (post) => {
    setSelectedPost(post);
    deleteOverlay.open();
  };

  const onConfirmDelete = async () => {
    if (!selectedPost || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await handleDelete(selectedPost);
      deleteOverlay.close();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-brand-dark">
              My Community Posts
            </h1>
            <p className="text-sm text-slate-400">
              Everything you&apos;ve shared with the Community Forum.
            </p>
          </div>
          <Link href="/dashboard/trainer/add-forum-post">
            <Button className="bg-brand text-white font-medium shadow-sm shadow-orange-500/20 px-6 hover:opacity-90 transition-opacity rounded-xl">
              + New Post
            </Button>
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-sm text-slate-400">Loading your posts...</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && safePosts.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl p-10 flex flex-col items-center text-center gap-3">
            <p className="text-base font-medium text-slate-700">
              You haven&apos;t posted anything yet
            </p>
            <p className="text-sm text-slate-400 max-w-sm">
              Share a tip, a win, or an announcement and it&apos;ll show up here.
            </p>
            <Link href="/dashboard/trainer/add-forum-post" className="mt-2">
              <Button className="bg-brand text-white font-medium shadow-sm shadow-orange-500/20 px-6 hover:opacity-90 transition-opacity rounded-xl">
                Create your first post
              </Button>
            </Link>
          </Card>
        )}

        {/* Posts grid */}
        {!isLoading && safePosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safePosts.map((post) => (
              <Card
                key={post._id}
                className="bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-44 bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <Card.Content className="p-5 flex flex-col gap-2 flex-1">
                  <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400">
                    {formatDate(post.createdAt)}
                  </span>
                  <h2 className="text-base font-semibold text-slate-800 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>

                  {/* Delete Button */}
                  <div className="pt-2 border-t border-slate-100 mt-auto">
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      className="w-full"
                      startContent={<Trash2 size={14} />}
                      onPress={() => openDeleteModal(post)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ════════ DELETE CONFIRMATION MODAL ════════ */}
      <Modal state={deleteOverlay}>
        <Modal.Backdrop>
          <Modal.Container size="sm" className="mx-4 sm:mx-auto">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Body className="pt-6">
                {selectedPost && (
                  <Alert color="danger" variant="faded" className="mb-1">
                    <Alert.Title className="text-base font-semibold">
                      Delete &quot;{selectedPost.title}&quot;?
                    </Alert.Title>
                    <Alert.Description className="text-sm text-default-600 mt-1">
                      This action{" "}
                      <span className="font-semibold text-danger">
                        cannot be undone
                      </span>
                      . The post will be permanently removed.
                    </Alert.Description>
                  </Alert>
                )}
              </Modal.Body>

              <Modal.Footer className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="bordered"
                  className="w-full sm:w-auto"
                  isDisabled={isSubmitting}
                  onPress={() => deleteOverlay.close()}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  className="w-full sm:w-auto"
                  startContent={<Trash2 size={15} />}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onPress={onConfirmDelete}
                >
                  Delete Permanently
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}