import Button from "@/ui/button/Button";
import styles from "./SummaryBooking.module.css";
import { LuCalendar, LuClock, LuUsers } from "react-icons/lu";
import { useFormContext } from "react-hook-form";
import Title from "@/ui/title/Title";

export default function SummaryBooking({
  coverImage,
  farmName,
  totalPrice,
  serviceFee = 5,
  setPreviewOpen,
  onSubmit,
  isPending,
}) {
  const basePrice = totalPrice ? totalPrice - serviceFee : 0;
  const { handleSubmit, watch } = useFormContext();
  const { date, timeSlot, guests } = watch();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={coverImage} alt={farmName} />
      </div>

      <div className={styles.info}>
        <header><Title>{farmName}</Title></header>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <LuCalendar size={16} />{" "}
            <span>{date ? date.toLocaleDateString() : "date"}</span>
          </div>
          <div className={styles.detailItem}>
            <LuClock size={16} /> <span>{timeSlot || "slot"}</span>
          </div>
          <div className={styles.detailItem}>
            <LuUsers size={16} /> <span>{guests || "guests"}</span>
          </div>
        </div>

        <div className={styles.price}>
          <div className={styles.priceRow}>
            <span>Base Price</span>
            <span>${basePrice}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Service Fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <div className={styles.actionBtns}>
          <Button type="submit" onClick={handleSubmit(onSubmit)} isPending={isPending}>
            Confirm Booking
          </Button>
          <Button secondary type="button" onClick={setPreviewOpen}>
            Preview Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
