import Input from "@/ui/forms/input/Input";
import Title from "@/ui/title/Title";
import SelectCard from "@/ui/forms/optionCard/SelectCard";
import { LuCalendarDays, LuSun, LuMoon, LuSunrise } from "react-icons/lu";
import styles from "./CreateBookingForm.module.css";
import PaymentMethod from "./PaymentMethod";
import { useFormContext } from "react-hook-form";

const slots = [
  { value: "morning", label: "Morning", icon: <LuSun size={20} /> },
  { value: "evening", label: "Evening", icon: <LuMoon size={20} /> },
  { value: "fullDay", label: "Full Day", icon: <LuSunrise size={20} /> },
];

export default function CreateBookingForm({
  setDateModal,
  setValue,
  availability = {},
}) {

  const { watch } = useFormContext();
  const { date, timeSlot } = watch();

  return (
    <form className={styles.formContainer}>
      <div className={styles.formCard}>
        <header><Title mb="0.5rem">Booking Info</Title></header>

        <div className={styles.dateWrapper}>
          <label className={styles.label}>Select Date & Slot</label>
          <SelectCard
            className={styles.dateBtn}
            title={date ? date.toLocaleDateString() : "Pick a date"}
            icon={<LuCalendarDays size={20} />}
            onClick={() => setDateModal(true)}
            selected={date}
          />
        </div>

        <div className={styles.slotGrid}>
          {slots.map((slot) => (
            <SelectCard
              key={slot.value}
              disabled={!availability[slot.value]}
              selected={timeSlot === slot.value}
              onClick={() => setValue("timeSlot", slot.value)}
              title={slot.label}
              icon={slot.icon}
              className={styles.slot}
            />
          ))}
        </div>
        <Input type="number" name="guests" label="Guests" min={1} />
      </div>
      <PaymentMethod />
    </form>
  );
}
