import styles from "./NotificationTypes.module.css";
import ToggleCard from "@/ui/forms/optionCard/ToggleCard";
import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";

export default function NotificationTypes() {
   const { data:settings } = useSettings();
    const { mutate } = useUpdateSettings();
  
    const types = settings?.data?.notifications?.types;
  
    const handleToggle = (key, value) => {
      mutate({
        [`notifications.types.${key}`]: value,
      });
    };

  return (
    <div className={styles.container}>
      <ToggleCard
        title="Bookings"
        description="Updates about your bookings and reservations"
        checked={types?.bookingUpdates}
        onChange={() => handleToggle("bookingUpdates", !types?.bookingUpdates)}
      />

      <ToggleCard
        title="Promotions"
        description="Offers, discounts, and announcements"
        checked={types?.promotions}
        onChange={() => handleToggle("promotions", !types?.promotions)}
      />

      <ToggleCard
        title="Booking reminders"
        description="Reminders about your upcoming bookings"
        checked={types?.bookingReminders}
        onChange={() => handleToggle("bookingReminders", !types?.bookingReminders)}
      />

      <ToggleCard
        title="Payment updates"
        description="Updates about your payments and transactions"
        checked={types?.paymentUpdates}
        onChange={() => handleToggle("paymentUpdates", !types?.paymentUpdates)}
      />

      <ToggleCard
        title="Review reminders"
        description="Reminders about your upcoming bookings"
        checked={types?.reviewReminders}
        onChange={() => handleToggle("reviewReminders", !types?.reviewReminders)}
      />
    </div>
  );
};
