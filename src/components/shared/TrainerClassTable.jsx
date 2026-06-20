"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Table, Button, Modal, useOverlayState, Input } from "@heroui/react";

const STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Draft: "bg-stone-100 text-stone-600 ring-stone-500/20",
  Full: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const DIFFICULTY_DOT = {
  beginner: "bg-emerald-500",
  intermediate: "bg-amber-500",
  advanced: "bg-rose-500",
};

/**
 * TrainerClassTable
 *
 * Pure, prop-driven component — load your own data and pass it in via
 * `classes`. No mock/sample data is bundled here.
 *
 * Expected shape per class:
 * {
 *   id: string,
 *   className: string,
 *   image: string,
 *   difficultyLevel: "Beginner" | "Intermediate" | "Advanced",
 *   duration: string,        // e.g. "60 mins"
 *   schedule: string,        // e.g. "Mon, Wed • 08:00 AM"
 *   price: number,
 *   status: "Active" | "Draft" | "Full" | "Cancelled",
 *   students: { name: string, email: string }[],
 * }
 *
 * Callbacks (all optional — component manages its own modal open/close
 * state regardless; these just let you hook in real API calls):
 *   onUpdateClass(updatedClass)
 *   onDeleteClass(classId)
 */
export function TrainerClassTable({ trainerClasses }) {
  const classes = trainerClasses || [];

  const [activeClass, setActiveClass] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const studentsModal = useOverlayState();
  const updateModal = useOverlayState();
  const deleteModal = useOverlayState();

  const openViewStudents = (cls) => {
    setActiveClass(cls);
    studentsModal.open();
  };
  console.log("TrainerClassTable received classes:", trainerClasses);
  const openUpdate = (cls) => {
    setActiveClass(cls);
    setEditForm({ ...cls });
    updateModal.open();
  };

  const openDelete = (cls) => {
    setActiveClass(cls);
    deleteModal.open();
  };

  const handleSaveUpdate = () => {
    onUpdateClass?.(editForm);
    updateModal.close();
  };

  const handleConfirmDelete = () => {
    onDeleteClass?.(activeClass.id);
    deleteModal.close();
  };

  return (
    <div className="w-full p-3.5 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-stone-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-2 pb-4">
        <div>
          <h2 className="text-[15px] font-semibold text-stone-900 tracking-tight">
            My Classes
          </h2>
          <p className="text-[13px] text-stone-500 mt-0.5">
            {classes.length === 0
              ? "Get started by creating your first class"
              : `${classes.length} class${classes.length !== 1 ? "es" : ""} you're currently running`}
          </p>
        </div>
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden md:block">
        <Table aria-label="Trainer classes management table">
          <Table.ScrollContainer>
            <Table.Content aria-label="Classes" className="min-w-[760px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  id="className"
                  className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50/80"
                >
                  Class
                </Table.Column>
                <Table.Column
                  id="duration"
                  className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50/80"
                >
                  Duration
                </Table.Column>
                <Table.Column
                  id="price"
                  className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50/80"
                >
                  Price
                </Table.Column>
                <Table.Column
                  id="status"
                  className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50/80"
                >
                  Status
                </Table.Column>
                <Table.Column
                  id="actions"
                  className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-50/80"
                >
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body
                items={classes}
                renderEmptyState={() => <EmptyClassesState />}
              >
                {(cls) => (
                  <Table.Row
                    id={cls._id}
                    className="group hover:bg-stone-50/60 transition-colors duration-150 border-b border-stone-100 last:border-0"
                  >
                    <Table.Cell className="py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-11 h-11 shrink-0 rounded-xl overflow-hidden ring-1 ring-stone-200/80">
                          <Image
                            src={cls.image}
                            alt={cls.className}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-stone-800 text-[14px] truncate">
                            {cls.className}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className={[
                                "w-1.5 h-1.5 rounded-full shrink-0",
                                DIFFICULTY_DOT[
                                  cls.difficultyLevel?.toLowerCase()
                                ] || "bg-stone-400",
                              ].join(" ")}
                            />
                            <span className="text-[12px] text-stone-500 truncate">
                              {cls.difficultyLevel} · {cls.schedule}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-stone-600 text-[13px] tabular-nums">
                        {cls.duration}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-semibold text-stone-900 text-[14px] tabular-nums">
                        ${cls.price}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span
                        className={[
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ring-1 ring-inset",
                          STATUS_STYLES[cls.status] || STATUS_STYLES.Draft,
                        ].join(" ")}
                      >
                        {cls.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          onPress={() => openViewStudents(cls)}
                          className="font-medium text-[13px] rounded-lg"
                        >
                          View Students
                          <span className="ml-1 opacity-70">
                            ({cls.students?.length ?? 0})
                          </span>
                        </Button>

                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          aria-label="Update class"
                          onPress={() => openUpdate(cls)}
                          className="rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                        >
                          <PencilIcon />
                        </Button>

                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          aria-label="Delete class"
                          onPress={() => openDelete(cls)}
                          className="rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Mobile / narrow-screen view — stacked cards */}
      <div className="md:hidden">
        {classes.length === 0 ? (
          <EmptyClassesState />
        ) : (
          <div className="flex flex-col gap-3">
            {classes.map((cls) => (
              <div
                key={cls._id}
                className="rounded-2xl border border-stone-200/80 p-3.5 bg-white"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden ring-1 ring-stone-200/80">
                    <Image
                      src={cls.image}
                      alt={cls.className}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-stone-800 text-[14px] leading-snug">
                        {cls.className}
                      </p>
                      <span
                        className={[
                          "shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ring-1 ring-inset",
                          STATUS_STYLES[cls.status] || STATUS_STYLES.Draft,
                        ].join(" ")}
                      >
                        {cls.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={[
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          DIFFICULTY_DOT[cls.difficultyLevel?.toLowerCase()] ||
                            "bg-stone-400",
                        ].join(" ")}
                      />
                      <span className="text-[12px] text-stone-500 truncate">
                        {cls.difficultyLevel} · {cls.schedule}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 pl-[60px]">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Duration
                    </p>
                    <p className="text-[13px] text-stone-700 tabular-nums mt-0.5">
                      {cls.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Price
                    </p>
                    <p className="text-[13px] font-semibold text-stone-900 tabular-nums mt-0.5">
                      ${cls.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() => openViewStudents(cls)}
                    className="font-medium text-[13px] rounded-lg flex-1"
                  >
                    Students
                    <span className="ml-1 opacity-70">
                      ({cls.students?.length ?? 0})
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    aria-label="Update class"
                    onPress={() => openUpdate(cls)}
                    className="rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 shrink-0"
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    aria-label="Delete class"
                    onPress={() => openDelete(cls)}
                    className="rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 shrink-0"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- View Students Modal ---------------- */}
      <Modal>
        <Modal.Backdrop
          isOpen={studentsModal.isOpen}
          onOpenChange={studentsModal.setOpen}
        >
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    <Modal.Heading className="text-stone-900">
                      Students booked
                    </Modal.Heading>
                    <p className="text-[13px] text-stone-500 mt-0.5">
                      {activeClass?.className}
                    </p>
                  </Modal.Header>
                  <Modal.Body>
                    {activeClass?.students?.length ? (
                      <ul className="divide-y divide-stone-100">
                        {activeClass.students.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 py-2.5"
                          >
                            <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 text-[12px] font-semibold flex items-center justify-center shrink-0">
                              {s.name
                                .split(" ")
                                .map((p) => p[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium text-stone-800 truncate">
                                {s.name}
                              </p>
                              <p className="text-[12px] text-stone-500 truncate">
                                {s.email}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13px] text-stone-500 py-6 text-center">
                        No students have booked this class yet.
                      </p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="flat"
                      onPress={close}
                      className="rounded-lg"
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* ---------------- Update Class Modal ---------------- */}
      <Modal>
        <Modal.Backdrop
          isOpen={updateModal.isOpen}
          onOpenChange={updateModal.setOpen}
        >
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    <Modal.Heading className="text-stone-900">
                      Update class
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    {editForm && (
                      <div className="flex flex-col gap-4">
                        <Input
                          label="Class name"
                          value={editForm.className}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              className: e.target.value,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Duration"
                            value={editForm.duration}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                duration: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Price"
                            type="number"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <Input
                          label="Schedule"
                          value={editForm.schedule}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              schedule: e.target.value,
                            })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Difficulty"
                            value={editForm.difficultyLevel}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                difficultyLevel: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Status"
                            value={editForm.status}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                status: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="flat"
                      onPress={close}
                      className="rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => {
                        handleSaveUpdate();
                        close();
                      }}
                      className="rounded-lg"
                    >
                      Save changes
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* ---------------- Delete Confirmation Modal ---------------- */}
      <Modal>
        <Modal.Backdrop
          isOpen={deleteModal.isOpen}
          onOpenChange={deleteModal.setOpen}
        >
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    <Modal.Heading className="text-stone-900">
                      Delete class
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-[14px] text-stone-600">
                      Are you sure you want to delete{" "}
                      <span className="font-medium text-stone-900">
                        {activeClass?.className}
                      </span>
                      ? This action cannot be undone.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="flat"
                      onPress={close}
                      className="rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        handleConfirmDelete();
                        close();
                      }}
                      className="rounded-lg"
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function EmptyClassesState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-stone-200 bg-stone-50/60">
      <div className="w-12 h-12 rounded-full bg-white ring-1 ring-stone-200 flex items-center justify-center text-stone-400 mb-4">
        <DumbbellIcon />
      </div>
      <h3 className="text-[15px] font-semibold text-stone-800">
        No classes yet
      </h3>
      <p className="text-[13px] text-stone-500 mt-1 max-w-[280px]">
        You haven&apos;t created any classes. Once you add one, it&apos;ll show
        up here.
      </p>
    </div>
  );
}

function DumbbellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 6.5 17.5 17.5" />
      <path d="M21 21a1.5 1.5 0 0 0-3-3 1.5 1.5 0 0 0 3 3Z" />
      <path d="M3 3a1.5 1.5 0 0 0 3 3 1.5 1.5 0 0 0-3-3Z" />
      <path d="m18 5 1 1" />
      <path d="m5 18 1 1" />
      <path d="m21.5 6.5-2-2" />
      <path d="m4.5 19.5-2-2" />
    </svg>
  );
}
