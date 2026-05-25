import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import styles from "./InstantBooking.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";

export default function InstantBooking() {
  const { data:settings } = useSettings();
  const { mutate } = useUpdateSettings();

  const owner = settings?.data?.ownerSettings;
  if (!owner) return null;

  const handleToggle = (key, value) => {
    mutate({
      [`ownerSettings.${key}`]: value,
    });
  };

  return (
    <div className={styles.container}>
      <ToggleOption
        title="Allow Instant Booking"
        description="Allow guests to book your farm instantly."
        checked={owner.allowInstantBooking}
        onChange={() =>
          handleToggle("allowInstantBooking", !owner.allowInstantBooking)
        }
      />
    </div>
  );
};
