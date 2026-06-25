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
        <Card.Content className="flex flex-col items-center justify-center py-16">
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
                      color={trainer.status === "active" ? "success" : "danger"}
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

      {/* Confirmation Modal */}
      <Modal state={overlay}>
        <Modal.Backdrop>
          <Modal.Container size="md">
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
                      <div className="flex justify-between text-sm">
                        <span className="text-default-500">Name</span>
                        <span className="font-medium">
                          {selectedTrainer.name}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-default-500">Email</span>
                        <span className="font-medium">
                          {selectedTrainer.email}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-default-500">Plan</span>
                        <span className="font-medium capitalize">
                          {selectedTrainer.plan || "free"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-default-500">Status</span>
                        <span className="font-medium capitalize">
                          {selectedTrainer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="flat"
                  isDisabled={isSubmitting}
                  onPress={() => overlay.close()}
                >
                  Cancel
                </Button>

                <Button
                  color="danger"
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
