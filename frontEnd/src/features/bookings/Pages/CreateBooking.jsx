import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./CreateBooking.module.css";
import { useFarm } from "@/features/farms/hooks/useFarm";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { isWeekendDay } from "@/utils/handleDate";
import SummaryBooking from "../components/SummaryBooking";
import CreateBookingForm from "../forms/CreateBookingForm";
import Modal from "@/ui/modal/Modal";
import { useCloseComponents } from "@/hooks/useCloseComponents";
import { useFarmAvailability } from "../hooks/useFarmAvailability";
import BookingPreview from "../components/BookingPreview";
import Calendar from "@/ui/forms/calendar/Calendar";
import { useCreateBooking } from "../hooks/useCreateBooking";
import Empty from "@/ui/empty/Empty";
import Spinner from "@/ui/spinner/Spinner";

export default function CreateBooking() {
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const previewRef = useRef(null);
  const dateRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { mutate: createBooking, isPending: createPending } =
    useCreateBooking();
  const { data: farmData, isPending: fetchingFarm } = useFarm(id);

  const [previewOpen, setPreviewOpen] = useCloseComponents(previewRef);
  const [dateModal, setDateModal] = useCloseComponents(dateRef);

  const getDate = searchParams.get("date");
  const getSlot = searchParams.get("slot");

  const createFarmForm = useForm({
    defaultValues: {
      date: getDate ? new Date(getDate) : null,
      timeSlot: getSlot,
      guests: 20,
      paymentMethod: "",
    },
  });

  const farm = farmData?.data?.farm;
  const ownerId = farm?.farmOwner?._id;

  const { watch, setValue } = createFarmForm;
  const { date, timeSlot, guests } = watch();

  const { data: availabilityData, isPending: fetchingAvailability } = useFarmAvailability(id, date);
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

  function onSubmit(formData) {
    const { date, timeSlot, guests, paymentMethod } = formData
    createBooking({ date, timeSlot, guests, paymentMethod, price: totalPrice, ownerId, farmId: id });
  }

  if (fetchingFarm || fetchingAvailability) return <Spinner />;
  if (!farm) return <Empty title="Farm not found" message="The farm you are looking for does not exist." />;

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
          onSubmit={onSubmit}
          isPending={createPending}
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
