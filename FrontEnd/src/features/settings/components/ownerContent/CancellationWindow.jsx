import Input from "@/ui/forms/input/Input";
import styles from "./CancellationWindow.module.css";
import { useState, useEffect } from "react";
import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";

export default function CancellationWindow() {
  const { data: settings } = useSettings();
  const { mutate } = useUpdateSettings();

  const owner = settings?.data?.ownerSettings;
  const [hours, setHours] = useState(owner?.cancellationWindowHours || 24);

  useEffect(() => {
    if (owner?.cancellationWindowHours != null) {
      setHours(owner.cancellationWindowHours);
    }
  }, [owner?.cancellationWindowHours]);

  if (!owner) return null;

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setHours(value);

    mutate({
      "ownerSettings.cancellationWindowHours": value,
    });
  };

  return (
    <div className={styles.form}>
      <Input
        type="number"
        label={`Cancellation Window (${hours})`}
        name="cancellationHours"
        value={hours}
        min={0}
        onChange={handleChange}
      />
    </div>
  );
};
