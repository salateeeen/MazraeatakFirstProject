import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import MainInfo from "../forms/MainInfo";
import SlotsAndPrice from "../forms/SlotsAndPrice";
import LocationAndMap from "../forms/LocationAndMap";
import Images from "../forms/AddImages";

import styles from "./AddFarm.module.css";
import Container from "@/ui/container/Container";
import Button from "@/ui/button/Button";
import { useAddFarm } from "../hooks/useAddFarm";
import { convertClockTimeToMinutes } from "@/utils/handleDate";
import Stepper from "@/ui/stepper/Stepper";
import Title from "@/ui/title/Title";
import Spinner from "@/ui/spinner/Spinner";

export default function AddFarmForm() {
  const { mutate: addFarm, isPending: isAdding } = useAddFarm();

  const methods = useForm({
    defaultValues: {
      farmName: "maram",
      description: "sultan omar is the best...",
      city: "",
      category: "69967958eadbdc3171dfdf14",
      maximumGuests: 10,
      numberOfRooms: 3,
      facilities: ["69965a41eadbdc3171dfdef4", "69965a41eadbdc3171dfdef7", "69965a41eadbdc3171dfdef5"],
      pricing: {
        weekday: { morning: 120, evening: 150, fullDay: 200 },
        weekend: { morning: 130, evening: 160, fullDay: 210 },
      },
      timeSlots: {
        morning: { from: "09:00", to: "21:00" },
        evening: { from: "21:00", to: "09:00" },
        fullDay: { from: "09:00", to: "09:00" },
      },
      area: 240,
      coverImage: "",
      images: [],
      coordinates: { lat: 31.9522, lng: 35.9106 }, // Amman center
    },
  });

  const [step, setStep] = useState(1);

  const nextStep = async () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data) => {
    const payload = {
      ...data,
      timeSlots: {
        morning: {
          from: convertClockTimeToMinutes(data.timeSlots.morning.from),
          to: convertClockTimeToMinutes(data.timeSlots.morning.to),
        },
        evening: {
          from: convertClockTimeToMinutes(data.timeSlots.evening.from),
          to: convertClockTimeToMinutes(data.timeSlots.evening.to),
        },
        fullDay: {
          from: convertClockTimeToMinutes(data.timeSlots.fullDay.from),
          to: convertClockTimeToMinutes(data.timeSlots.fullDay.to),
        },
      },
    };
    addFarm(payload);
  };

  return (
    <div className={styles.container}>
      <Title subtitle="Complete the steps below to make your farm available for booking.">
        List Your Farm
      </Title>
      <div className={styles.stepperAndForm}>
        <Stepper currentStep={step} totalSteps={4} setCurrentStep={setStep} />

        <FormProvider {...methods}>
          <form
            className={styles.form}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className={styles.stepContent}>
              {step === 1 && <MainInfo />}
              {step === 2 && <SlotsAndPrice />}
              {step === 3 && <LocationAndMap />}
              {step === 4 && <Images />}
            </div>

            <div className={styles.footer}>
              <div className={styles.buttons}>
                {step > 1 && (
                  <Button
                    secondary
                    type="button"
                    className={styles.button}
                    onClick={prevStep}
                    disabled={isAdding}
                  >
                    Previous Step
                  </Button>
                )}

                <div className={styles.spacer}></div>

                {step < 4 ? (
                  <Button
                    type="button"
                    className={styles.button}
                    onClick={nextStep}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={styles.button}
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <Spinner size="xs" color="#fff" />
                    ) : (
                      "Complete & Publish"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
