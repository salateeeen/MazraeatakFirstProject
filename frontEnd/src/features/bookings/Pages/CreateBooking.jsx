import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./CreateBooking.module.css";
import { useFarm } from "@/features/farms/hooks/useFarm";
import { useParams, useSearchParams } from "react-router-dom";
import { isWeekendDay } from "@/utils/handleDate";
import SummaryBooking from "../components/SummaryBooking";
import CreateBookingForm from "../forms/CreateBookingForm";
import Modal from "@/ui/modal/Modal";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { useFarmAvailability } from "../hooks/useFarmAvailability";
import BookingPreview from "../components/BookingPreview";
import Calendar from "@/ui/forms/calendar/Calendar";

export default function CreateBooking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const getDate = searchParams.get("date");
  const getSlot = searchParams.get("slot");

  const { data, isPending: fetchingFarm } = useFarm(id);
  const farm = data?.data?.farm;
  const previewRef = useRef(null);
  const dateRef = useRef(null);

  const [totalPrice, setTotalPrice] = useState(0);

  const [previewOpen, setPreviewOpen] = useCloseComponents(previewRef);
  const [dateModal, setDateModal] = useCloseComponents(dateRef);

  const createFarmForm = useForm({
    defaultValues: {
      date: getDate ? new Date(getDate) : null,
      timeSlot: getSlot,
      guests: 7,
      paymentMethod: "",
    },
  });

  const { watch, setValue } = createFarmForm;
  const { date, timeSlot, guests } = watch();
  const { data: availabilityData } = useFarmAvailability(id, date);

  const occupiedSlots = availabilityData?.data || [];

  const availability = {
    morning:
      !occupiedSlots.includes("morning") && !occupiedSlots.includes("fullDay"),
    evening:
      !occupiedSlots.includes("evening") && !occupiedSlots.includes("fullDay"),
    fullDay:
      !occupiedSlots.includes("morning") &&
      !occupiedSlots.includes("evening") &&
      !occupiedSlots.includes("fullDay"),
  };

  useEffect(() => {
    if (!farm || !date || !timeSlot) return;
    const dayType = isWeekendDay(date) ? "weekend" : "weekday";
    setTotalPrice(farm.pricing?.[dayType]?.[timeSlot] || 0);
  }, [timeSlot, date, farm]);

  return (
    <div className={styles.container}>
      <FormProvider {...createFarmForm}>
        <CreateBookingForm
          farmName={farm?.farmName}
          setDateModal={setDateModal}
          setValue={setValue}
          availability={availability}
        />

        <SummaryBooking
          coverImage={farm?.coverImage}
          farmName={farm?.farmName}
          totalPrice={totalPrice}
          setPreviewOpen={setPreviewOpen}
        />
      </FormProvider>

      {previewOpen && (
        <Modal ref={previewRef} setOpen={setPreviewOpen}>
          <BookingPreview
            farmName={farm?.farmName}
            date={date}
            timeSlot={timeSlot}
            guests={guests}
            totalPrice={totalPrice}
            onClose={() => setPreviewOpen(false)}
          />
        </Modal>
      )}

      {dateModal && (
        <Modal ref={dateRef} setOpen={setDateModal}>
          <Calendar
            date={date}
            setValue={setValue}
            setDateModal={setDateModal}
          />
        </Modal>
      )}
    </div>
  );
}
