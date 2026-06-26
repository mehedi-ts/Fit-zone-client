"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  Button,
  Chip,
  Modal,
  Alert,
  Card,
  useOverlayState,
  toast,
} from "@heroui/react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  ShieldCheck,
  ShieldX,
  Dumbbell,
} from "lucide-react";

const STATUS_COLOR = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

export default function ManageClassesTable({
  classes = [],
  handleApprove,
  handleReject,
  handleDelete,
}) {
  // Approve / Reject modal
  const actionOverlay = useOverlayState();
  // Delete alert modal
  const deleteOverlay = useOverlayState();

  const [selectedClass, setSelectedClass] = useState(null);
  const [actionType, setActionType] = useState(null); // "approve" | "reject"
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Open approve / reject modal ── */
  const openActionModal = (cls, type) => {
    setSelectedClass(cls);
    setActionType(type);
    actionOverlay.open();
  };

  /* ── Open delete alert modal ── */
  const openDeleteModal = (cls) => {
    setSelectedClass(cls);
    deleteOverlay.open();
  };

  /* ── Confirm approve / reject ── */
  const onConfirmAction = async () => {
    if (!selectedClass || isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (actionType === "approve") {
        await handleApprove(selectedClass);
        toast.success("Class approved successfully.");
      } else {
        await handleReject(selectedClass);
        toast.success("Class rejected successfully.");
      }
      actionOverlay.close();
    } catch (err) {
      console.error(err);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Confirm delete ── */
  const onConfirmDelete = async () => {
    if (!selectedClass || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await handleDelete(selectedClass);
      toast.success("Class deleted successfully.");
      deleteOverlay.close();
    } catch (err) {
      console.error(err);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!classes.length) {
    return (
      <Card>
        <Card.Content className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-xl font-semibold">No Classes Found</h2>
          <p className="mt-2 text-default-500">
            There are currently no classes submitted by trainers.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      {/* ════════════════ MOBILE — CARD LIST (below md) ════════════════ */}
      <div className="flex flex-col gap-3 md:hidden">
        {classes.map((cls) => (
          <Card key={cls._id} className="border border-default-200">
            <Card.Content className="p-4">
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-default-100">
                  {cls.image ? (
                    <Image
                      src={cls.image}
                      alt={cls.className}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Dumbbell size={18} className="text-default-400" />
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium">{cls.className}</span>
                    <Chip
                      size="sm"
                      color={STATUS_COLOR[cls.status] || "default"}
                      variant="flat"
                      className="capitalize"
                    >
                      {cls.status}
                    </Chip>
                  </div>
                  <span className="text-xs text-default-500">
                    {cls.trainerName}
                  </span>
                  <span className="text-xs text-default-400">
                    {cls.trainerEmail}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-default-500">Category</span>
                  <span className="font-medium capitalize">{cls.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Difficulty</span>
                  <span className="font-medium capitalize">
                    {cls.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Duration</span>
                  <span className="font-medium">{cls.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Price</span>
                  <span className="font-medium">${cls.price}</span>
                </div>
              </div>

              <p className="mt-2 text-xs text-default-400">
                Submitted {new Date(cls.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-default-100 pt-3">
                {cls.status !== "approved" && (
                  <Button
                    size="sm"
                    color="success"
                    className="flex-1"
                    startContent={<CheckCircle size={14} />}
                    onPress={() => openActionModal(cls, "approve")}
                  >
                    Approve
                  </Button>
                )}

                {cls.status !== "rejected" && (
                  <Button
                    size="sm"
                    color="warning"
                    className="flex-1"
                    startContent={<XCircle size={14} />}
                    onPress={() => openActionModal(cls, "reject")}
                  >
                    Reject
                  </Button>
                )}

                <Button
                  size="sm"
                  color="danger"
                  className="flex-1"
                  startContent={<Trash2 size={14} />}
                  onPress={() => openDeleteModal(cls)}
                >
                  Delete
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
            <Table.Content aria-label="Manage Classes">
              <Table.Header>
                <Table.Column isRowHeader>CLASS</Table.Column>
                <Table.Column>TRAINER</Table.Column>
                <Table.Column>CATEGORY</Table.Column>
                <Table.Column>DIFFICULTY</Table.Column>
                <Table.Column>DURATION</Table.Column>
                <Table.Column>PRICE</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>SUBMITTED</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body>
                {classes.map((cls) => (
                  <Table.Row key={cls._id} id={cls._id}>
                    {/* Class name + image */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        {cls.image && (
                          <Image
                            src={cls.image}
                            alt={cls.className}
                            width={36}
                            height={36}
                            className="rounded-md object-cover"
                          />
                        )}
                        <span className="font-medium">{cls.className}</span>
                      </div>
                    </Table.Cell>

                    {/* Trainer */}
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {cls.trainerName}
                        </span>
                        <span className="text-xs text-default-400">
                          {cls.trainerEmail}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="capitalize">
                      {cls.category}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                      {cls.difficulty}
                    </Table.Cell>
                    <Table.Cell>{cls.duration}</Table.Cell>
                    <Table.Cell>${cls.price}</Table.Cell>

                    {/* Status chip */}
                    <Table.Cell>
                      <Chip
                        color={STATUS_COLOR[cls.status] || "default"}
                        variant="flat"
                        className="capitalize"
                      >
                        {cls.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      {new Date(cls.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    {/* Action buttons */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        {/* Approve — hidden when already approved */}
                        {cls.status !== "approved" && (
                          <Button
                            size="sm"
                            color="success"
                            startContent={<CheckCircle size={14} />}
                            onPress={() => openActionModal(cls, "approve")}
                          >
                            Approve
                          </Button>
                        )}

                        {/* Reject — hidden when already rejected */}
                        {cls.status !== "rejected" && (
                          <Button
                            size="sm"
                            color="warning"
                            startContent={<XCircle size={14} />}
                            onPress={() => openActionModal(cls, "reject")}
                          >
                            Reject
                          </Button>
                        )}

                        {/* Delete — always visible */}
                        <Button
                          size="sm"
                          color="danger"
                          startContent={<Trash2 size={14} />}
                          onPress={() => openDeleteModal(cls)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* ════════════════ APPROVE / REJECT MODAL ════════════════ */}
      <Modal state={actionOverlay}>
        <Modal.Backdrop>
          <Modal.Container size="md" className="mx-4 sm:mx-auto">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Header
                className={
                  actionType === "approve"
                    ? "border-b-2 border-success/30 bg-success/5"
                    : "border-b-2 border-warning/30 bg-warning/5"
                }
              >
                <div className="flex items-center gap-2">
                  {actionType === "approve" ? (
                    <ShieldCheck size={20} className="text-success" />
                  ) : (
                    <ShieldX size={20} className="text-warning" />
                  )}
                  <Modal.Heading
                    className={
                      actionType === "approve" ? "text-success" : "text-warning"
                    }
                  >
                    {actionType === "approve"
                      ? "Confirm Approval"
                      : "Confirm Rejection"}
                  </Modal.Heading>
                </div>
              </Modal.Header>

              <Modal.Body>
                {selectedClass && (
                  <div className="space-y-3">
                    <p className="text-default-700">
                      Are you sure you want to{" "}
                      <span className="font-semibold">
                        {actionType === "approve" ? "approve" : "reject"}
                      </span>{" "}
                      the class{" "}
                      <span className="font-semibold">
                        &quot;{selectedClass.className}&quot;
                      </span>
                      ?
                    </p>

                    <p className="text-sm text-default-500">
                      {actionType === "approve"
                        ? "This will make the class visible and available for bookings on the platform."
                        : "This will mark the class as rejected. The trainer will need to resubmit."}
                    </p>

                    <div className="rounded-lg bg-default-100 p-4 space-y-2">
                      {[
                        ["Class", selectedClass.className],
                        ["Trainer", selectedClass.trainerName],
                        ["Category", selectedClass.category],
                        ["Difficulty", selectedClass.difficulty],
                        ["Price", `$${selectedClass.price}`],
                        ["Status", selectedClass.status],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between gap-3 text-sm"
                        >
                          <span className="text-default-500">{label}</span>
                          <span className="truncate text-right font-medium capitalize">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="bordered"
                  className="w-full sm:w-auto"
                  isDisabled={isSubmitting}
                  onPress={() => actionOverlay.close()}
                >
                  Cancel
                </Button>

                <Button
                  color={actionType === "approve" ? "success" : "warning"}
                  className="w-full sm:w-auto"
                  startContent={
                    actionType === "approve" ? (
                      <ShieldCheck size={15} />
                    ) : (
                      <ShieldX size={15} />
                    )
                  }
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onPress={onConfirmAction}
                >
                  {actionType === "approve" ? "Yes, Approve" : "Yes, Reject"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* ════════════════ DELETE — ALERT MODAL ════════════════ */}
      <Modal state={deleteOverlay}>
        <Modal.Backdrop>
          <Modal.Container size="sm" className="mx-4 sm:mx-auto">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Body className="pt-6">
                {selectedClass && (
                  <Alert color="danger" variant="faded" className="mb-1">
                    <Alert.Title className="text-base font-semibold">
                      Delete &quot;{selectedClass.className}&quot;?
                    </Alert.Title>
                    <Alert.Description className="text-sm text-default-600 mt-1">
                      This action{" "}
                      <span className="font-semibold text-danger">
                        cannot be undone
                      </span>
                      . The class and all its data will be permanently removed
                      from the platform.
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
