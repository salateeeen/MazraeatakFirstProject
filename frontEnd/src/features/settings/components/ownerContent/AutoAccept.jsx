import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import styles from "./AutoAccept.module.css";
import ToggleCard from "@/ui/forms/optionCard/ToggleCard";

export default function AutoAccept() {
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
    <div className={styles.form}>
      <ToggleCard
        title="Auto Accept Bookings"
        description="Automatically accept booking requests from guests."
        checked={owner.autoAcceptBookings}
        onChange={() =>
          handleToggle("autoAcceptBookings", !owner.autoAcceptBookings)
        }
      />
    </div>
  );
};
