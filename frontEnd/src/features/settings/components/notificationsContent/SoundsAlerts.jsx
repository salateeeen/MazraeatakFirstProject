import { useState } from "react";
import styles from "./SoundsAlerts.module.css";
import ToggleCard from "@/ui/forms/optionCard/ToggleCard";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { useSettings } from "../../hooks/useSettings";

export default function SoundsAlerts() {
  const { data: settings } = useSettings();
  const { mutate } = useUpdateSettings();
  const soundAlerts = settings?.data?.notifications?.soundAlerts;

  const toggleSound = (key, value) => {
    mutate({
      [`notifications.${key}`]: value,
    });
  };

  return (
    <div className={styles.container}>
      <ToggleCard
        title="Sound Alerts"
        description="Enable or disable sound notifications for messages and alerts."
        checked={soundAlerts}
        onChange={()=>toggleSound("soundAlerts",!soundAlerts)}
      />
    </div>
  );
};
