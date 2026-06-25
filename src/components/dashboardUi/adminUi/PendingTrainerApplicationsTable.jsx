"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Chip,
  Modal,
  Label,
  TextArea,
  TextField,
  FieldError,
  Card,
  useOverlayState,
  toast,
} from "@heroui/react";

// const applications = [
//   {
//     _id: "6a3b566619a4b047a6743077",
//     userId: "6a3b3d4c7541b118b2953d05",
//     name: "user2",
//     email: "user2@user2.com",
//     image: "https://i.ibb.co/Jfw190q/71a26c20-dffa-4dcb-8b30-9f1d02d5d698.png",
//     experience: 2,
//     specialty: "weights",
//     feedback: "",
//     status: "Pending",
//     createdAt: "2026-06-24T04:00:38.954Z",
//   },
// ];

export default function PendingTrainerApplicationsTable({
  applications = [],
  handleApprove,
  handleReject,
}) {
  const overlay = useOverlayState();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackTouched, setFeedbackTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFeedbackEmpty = feedback.trim().length === 0;

  const handleDetails = (application) => {
    setSelectedApplication(application);
    setFeedback(application.feedback || "");
    setFeedbackTouched(false);
    overlay.open();
  };

  const onApprovePress = async () => {
    if (!selectedApplication || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handleApprove(selectedApplication);
      toast.success("Application approved successfully.");
      overlay.close();
    } catch (error) {
      console.error(error);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRejectPress = async () => {
    if (isFeedbackEmpty) {
      setFeedbackTouched(true);
      return;
    }

    if (!selectedApplication || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handleReject(selectedApplication, feedback.trim());
      toast.success("Application rejected successfully.");
      overlay.close();
    } catch (error) {
      console.error(error);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!applications.length) {
    return (
      <Card>
        <Card.Content className="flex flex-col items-center justify-center py-16">
          <h2 className="text-xl font-semibold">No Pending Applications</h2>

          <p className="mt-2 text-default-500">
            There are currently no trainer applications awaiting review.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Pending Trainer Applications">
            <Table.Header>
              <Table.Column isRowHeader>NAME</Table.Column>
              <Table.Column>EMAIL</Table.Column>
              <Table.Column>EXPERIENCE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>APPLIED DATE</Table.Column>
              <Table.Column>ACTION</Table.Column>
            </Table.Header>

            <Table.Body>
              {applications.map((application) => (
                <Table.Row key={application._id} id={application._id}>
                  <Table.Cell>{application.name}</Table.Cell>

                  <Table.Cell>{application.email}</Table.Cell>

                  <Table.Cell>{application.experience} Years</Table.Cell>

                  <Table.Cell>
                    <Chip color="warning" variant="flat">
                      {application.status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      color="primary"
                      size="sm"
                      onPress={() => handleDetails(application)}
                    >
                      Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <Modal state={overlay}>
        <Modal.Backdrop>
          <Modal.Container size="lg">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Trainer Application Details</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                {selectedApplication && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-default-500">Applicant Name</p>
                      <p className="font-medium">{selectedApplication.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-default-500">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-default-500">Experience</p>
                      <p className="font-medium">
                        {selectedApplication.experience} Years
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-default-500">Specialty</p>
                      <p className="font-medium capitalize">
                        {selectedApplication.specialty}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-default-500">Available Time</p>
                      <p className="font-medium">08:00 AM - 06:00 PM</p>
                    </div>

                    <TextField
                      isRequired
                      isDisabled={isSubmitting}
                      isInvalid={feedbackTouched && isFeedbackEmpty}
                      className="flex flex-col gap-2"
                    >
                      <Label htmlFor="admin-feedback">Admin Feedback</Label>
                      <TextArea
                        id="admin-feedback"
                        fullWidth
                        placeholder="Write feedback here..."
                        value={feedback}
                        onChange={(e) => {
                          setFeedback(e.target.value);
                          if (feedbackTouched) setFeedbackTouched(false);
                        }}
                      />
                      <FieldError>
                        Feedback is required before rejecting an application.
                      </FieldError>
                    </TextField>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="flat"
                  isDisabled={isSubmitting}
                  onPress={() => overlay.close()}
                >
                  Close
                </Button>

                <Button
                  color="danger"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onPress={onRejectPress}
                >
                  Reject
                </Button>

                <Button
                  color="success"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  onPress={onApprovePress}
                >
                  Approve
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
