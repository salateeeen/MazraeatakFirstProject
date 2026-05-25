import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import styles from "./AutoAccept.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";

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
      <ToggleOption
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
