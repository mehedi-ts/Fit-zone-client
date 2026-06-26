"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  Label,
  NumberField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

import { useUser } from "@/app/lib/getUserClient";
import { ApplyAsTrainer } from "@/app/lib/actions/applyAsTrainer";
import { toast } from "react-toastify";

const SPECIALTY_OPTIONS = [
  { id: "yoga", label: "Yoga" },
  { id: "weights", label: "Weights" },
  { id: "cardio", label: "Cardio" },
  { id: "crossfit", label: "CrossFit" },
  { id: "zumba", label: "Zumba" },
];

export default function ApplyAsTrainerForm() {
  const userinfo = useUser();
  const router = useRouter();

  const [experience, setExperience] = useState(null);
  const [specialty, setSpecialty] = useState(null);

  const [experienceTouched, setExperienceTouched] = useState(false);
  const [specialtyTouched, setSpecialtyTouched] = useState(false);

  const [loading, setLoading] = useState(false);

  const isExperienceInvalid =
    experienceTouched &&
    (experience === null || experience === undefined || experience < 0);

  const isSpecialtyInvalid = specialtyTouched && !specialty;

  async function handleSubmit(e) {
    e.preventDefault();

    setExperienceTouched(true);
    setSpecialtyTouched(true);

    if (
      experience === null ||
      experience === undefined ||
      experience < 0 ||
      !specialty
    ) {
      return;
    }

    try {
      setLoading(true);

      const trainerApplication = {
        userId: userinfo?.id,

        name: userinfo?.name,

        email: userinfo?.email,

        image: userinfo?.image,

        experience,

        specialty,

        feedback: "",
      };

      const result = await ApplyAsTrainer(trainerApplication);

      console.log(result)

      if (result?.success) {
        toast.success("Application submitted successfully!")
        setTimeout(() => {
          window.location.reload()
        }, 1100);
       
      }
      else {
        toast.error("Failed to submit application!")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      min-h-screen
      w-full
      bg-page-bg
      px-4
      py-10
      sm:px-6
      lg:px-8
    "
    >
      <div
        className="
        mx-auto
        w-full
        max-w-2xl
      "
      >
        {/* Header */}

        <div
          className="
          mb-8
          text-center
        "
        >
          <span
            className="
            inline-flex
            rounded-full
            bg-brand/10
            px-4
            py-1.5
            text-xs
            font-semibold
            uppercase
            text-brand
          "
          >
            Trainer Network
          </span>

          <h1
            className="
            mt-4
            text-4xl
            font-extrabold
            text-brand-dark
          "
          >
            Apply as Trainer
          </h1>

          <p
            className="
            mt-3
            text-sm
            text-brand-dark/60
          "
          >
            Share your experience and join our trainer community.
          </p>
        </div>

        <Card
          className="
          rounded-3xl
          bg-white
          p-6
          shadow-xl
        "
        >
          <Card.Header className="mb-6 p-0">
            <Card.Title
              className="
              text-2xl
              font-bold
              text-brand-dark
            "
            >
              Trainer Application
            </Card.Title>

            <Card.Description>Fill the information below.</Card.Description>
          </Card.Header>

          <Card.Content className="p-0">
            <form
              onSubmit={handleSubmit}
              className="
                flex
                flex-col
                gap-6
              "
            >
              {/* Experience */}

              <NumberField
                value={experience}
                onChange={setExperience}
                onBlur={() => setExperienceTouched(true)}
                isRequired
                isInvalid={isExperienceInvalid}
                minValue={0}
                maxValue={60}
              >
                <Label>
                  Experience (Years)
                  <span className="text-red-500">*</span>
                </Label>

                <NumberField.Group
                  className="
                    rounded-xl
                    border
                    px-3
                  "
                >
                  <NumberField.Input placeholder="e.g. 3" />

                  <NumberField.IncrementButton>+</NumberField.IncrementButton>

                  <NumberField.DecrementButton>-</NumberField.DecrementButton>
                </NumberField.Group>
              </NumberField>

              {/* Specialty */}

              <Select
                selectedKey={specialty}
                onSelectionChange={setSpecialty}
                onBlur={() => setSpecialtyTouched(true)}
                isRequired
                isInvalid={isSpecialtyInvalid}
              >
                <Label>Specialty *</Label>

                <Select.Trigger
                  className="
                    rounded-xl
                    border
                    px-4
                    py-3
                  "
                >
                  <Select.Value />

                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {SPECIALTY_OPTIONS.map((item) => (
                      <ListBox.Item key={item.id} id={item.id}>
                        {item.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Submit */}

              <Button
                type="submit"
                disabled={loading}
                className="
                  rounded-xl
                  bg-brand
                  py-3
                  text-white
                "
              >
                {loading ? (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                      "
                    />
                    Submitting...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
