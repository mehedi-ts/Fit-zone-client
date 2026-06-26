"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  Button,
  Chip,
  Modal,
  Card,
  useOverlayState,
  toast,
} from "@heroui/react";

export default function ManageTrainersTable({ trainers = [], handleDemote }) {
  const overlay = useOverlayState();

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemotePress = (trainer) => {
    setSelectedTrainer(trainer);
    overlay.open();
  };

  const onConfirmDemote = async () => {
    if (!selectedTrainer || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handleDemote(selectedTrainer);
      toast.success("Trainer demoted to user successfully.");
      overlay.close();
    } catch (error) {
      console.error(error);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!trainers.length) {
    return (
      <Card>
        <Card.Content className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-xl font-semibold">No Active Trainers</h2>

          <p className="mt-2 text-default-500">
            There are currently no active trainers on the platform.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      {/* ════════════════ MOBILE — CARD LIST (below md) ════════════════ */}
      <div className="flex flex-col gap-3 md:hidden">
        {trainers.map((trainer) => (
          <Card key={trainer._id} className="border border-default-200">
            <Card.Content className="p-4">
              <div className="flex items-center gap-3">
                {trainer.image && (
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium">{trainer.name}</span>
                    <Chip
                      size="sm"
                      color={trainer.status === "active" ? "success" : "danger"}
                      variant="flat"
                      className="capitalize"
                    >
                      {trainer.status}
                    </Chip>
                  </div>
                  <span className="truncate text-xs text-default-500">
                    {trainer.email}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-default-500">Plan</span>
                  <span className="font-medium capitalize">
                    {trainer.plan || "free"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Joined</span>
                  <span className="font-medium">
                    {new Date(trainer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 border-t border-default-100 pt-3">
                <Button
                  color="danger"
                  size="sm"
                  className="w-full"
                  onPress={() => handleDemotePress(trainer)}
                >
                  Demote to User
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* ════════════════ DESKTOP — TABLE (md and up) ════════════════ */}
      <div className="hidden md:block">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Active Trainers">
              <Table.Header>
                <Table.Column isRowHeader>NAME</Table.Column>
                <Table.Column>EMAIL</Table.Column>
                <Table.Column>PLAN</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>JOINED</Table.Column>
                <Table.Column>ACTION</Table.Column>
              </Table.Header>

              <Table.Body>
                {trainers.map((trainer) => (
                  <Table.Row key={trainer._id} id={trainer._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        {trainer.image && (
                          <Image
                            src={trainer.image}
                            alt={trainer.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        )}
                        <span>{trainer.name}</span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>{trainer.email}</Table.Cell>

                    <Table.Cell className="capitalize">
                      {trainer.plan || "free"}
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color={
                          trainer.status === "active" ? "success" : "danger"
                        }
                        variant="flat"
                        className="capitalize"
                      >
                        {trainer.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      {new Date(trainer.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        color="danger"
                        size="sm"
                        onPress={() => handleDemotePress(trainer)}
                      >
                        Demote to User
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <Modal state={overlay}>
        <Modal.Backdrop>
          <Modal.Container size="md" className="mx-4 sm:mx-auto">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Confirm Demotion</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                {selectedTrainer && (
                  <div className="space-y-3">
                    <p className="text-default-700">
                      Are you sure you want to remove the trainer role from{" "}
                      <span className="font-semibold">
                        {selectedTrainer.name}
                      </span>
                      ?
                    </p>

                    <p className="text-sm text-default-500">
                      This will strip their trainer privileges and revert them
                      to a regular user. This action can be undone by
                      re-approving a new trainer application.
                    </p>

                    <div className="rounded-lg bg-default-100 p-4 space-y-2">
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-default-500">Name</span>
                        <span className="truncate text-right font-medium">
                          {selectedTrainer.name}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-default-500">Email</span>
                        <span className="truncate text-right font-medium">
                          {selectedTrainer.email}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-default-500">Plan</span>
                        <span className="font-medium capitalize">
                          {selectedTrainer.plan || "free"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-default-500">Status</span>
                        <span className="font-medium capitalize">
                          {selectedTrainer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="flat"
                  className="w-full sm:w-auto"
                  isDisabled={isSubmitting}
                  onPress={() => overlay.close()}
                >
                  Cancel
                </Button>

                <Button
                  color="danger"
                  className="w-full sm:w-auto"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onPress={onConfirmDemote}
                >
                  Yes, Demote
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
