import Button from "@/ui/button/Button";
import Input from "@/ui/forms/input/Input";
import Title from "@/ui/title/Title";
import { LuCalendarDays, LuSun, LuMoon, LuSunrise } from "react-icons/lu";
import styles from "./CreateBookingForm.module.css"; // تأكدي المسار صح حسب فولدراتك
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
        <Title mb="0.5rem">Booking Info</Title>
        <div className={styles.dateWrapper}>
          <label>Select Date & Slot</label>
          <Button
            type="button"
            onClick={() => setDateModal(true)}
            className={styles.dateBtn}
          >
            <LuCalendarDays size={20} />{" "}
            {date ? date.toLocaleDateString() : "Pick a date"}
          </Button>
        </div>

        <div className={styles.slotGrid}>
          {slots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              disabled={!availability[slot.value]}
              className={`${styles.slotCard} ${
                timeSlot === slot.value ? styles.active : ""
              }`}
              onClick={() => setValue("timeSlot", slot.value)}
            >
              {slot.icon} {slot.label}
            </button>
          ))}
        </div>
        <Input type="number" name="guests" label="Guests" min={1} />
      </div>
      <PaymentMethod />
    </form>
  );
}
