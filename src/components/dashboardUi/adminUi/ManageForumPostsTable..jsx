"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  Button,
  Modal,
  Alert,
  Card,
  useOverlayState,
  toast,
} from "@heroui/react";
import { Trash2, User } from "lucide-react";

export default function ManageForumPostsTable({ posts = [], handleDelete }) {
  const deleteOverlay = useOverlayState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openDeleteModal = (post) => {
    setSelectedPost(post);
    deleteOverlay.open();
  };

  const onConfirmDelete = async () => {
    if (!selectedPost || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await handleDelete(selectedPost);
      toast.success("Post deleted successfully.");
      deleteOverlay.close();
    } catch (err) {
      console.error(err);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!posts.length) {
    return (
      <Card>
        <Card.Content className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-xl font-semibold">No Posts Found</h2>
          <p className="mt-2 text-default-500">
            There are currently no forum posts on the platform.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      {/* ════════════════ MOBILE — CARD LIST ════════════════ */}
      <div className="flex flex-col gap-3 md:hidden">
        {posts.map((post) => (
          <Card key={post._id} className="border border-default-200">
            <Card.Content className="p-4">
              {/* Image + Title */}
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-default-100">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User size={16} className="text-default-400" />
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-medium line-clamp-1">{post.title}</span>
                  <span className="text-xs text-default-500">
                    {post.authorName}
                  </span>
                  <span className="text-xs text-default-400">
                    {post.authorEmail}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-2 text-sm text-default-500 line-clamp-2">
                {post.description}
              </p>

              <p className="mt-1 text-xs text-default-400">
                Posted {new Date(post.createdAt).toLocaleDateString()}
              </p>

              {/* Delete Button */}
              <div className="mt-3 border-t border-default-100 pt-3">
                <Button
                  size="sm"
                  color="danger"
                  className="w-full"
                  startContent={<Trash2 size={14} />}
                  onPress={() => openDeleteModal(post)}
                >
                  Delete Post
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* ════════════════ DESKTOP — TABLE ════════════════ */}
      <div className="hidden md:block">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage Forum Posts">
              <Table.Header>
                <Table.Column isRowHeader>POST</Table.Column>
                <Table.Column>AUTHOR</Table.Column>
                <Table.Column>DESCRIPTION</Table.Column>
                <Table.Column>POSTED</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body>
                {posts.map((post) => (
                  <Table.Row key={post._id} id={post._id}>
                    {/* Post image + title */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-default-100">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <User size={14} className="text-default-400" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium line-clamp-1 max-w-[160px]">
                          {post.title}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Author */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {post.authorName}
                        </span>
                        <span className="text-xs text-default-400">
                          {post.authorEmail}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Description preview */}
                    <Table.Cell>
                      <p className="text-sm text-default-500 line-clamp-2 max-w-[260px]">
                        {post.description}
                      </p>
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    {/* Delete */}
                    <Table.Cell>
                      <Button
                        size="sm"
                        color="danger"
                        startContent={<Trash2 size={14} />}
                        onPress={() => openDeleteModal(post)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* ════════════════ DELETE MODAL ════════════════ */}
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
                      . The post will be permanently removed from the platform.
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
    </>
  );
}
