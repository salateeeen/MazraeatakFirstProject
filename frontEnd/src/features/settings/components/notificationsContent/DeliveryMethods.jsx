import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import styles from "./DeliveryMethods.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";

export default function DeliveryMethods() {
  const { data: settings } = useSettings();
  const { mutate } = useUpdateSettings();

  const delivery = settings?.data?.notifications?.deliveryMethods;

  const handleToggle = (key, value) => {
    mutate({
      [`notifications.deliveryMethods.${key}`]: value,
    });
  };

  if (!delivery) return null;

  return (
    <div className={styles.container}>
      <ToggleOption
        title="Email notifications"
        description="Receive updates via email"
        checked={delivery.email}
        onChange={() => handleToggle("email", !delivery.email)}
      />

      <ToggleOption
        title="Push notifications"
        description="Get notifications on your device"
        checked={delivery.push}
        onChange={() => handleToggle("push", !delivery.push)}
      />

      <ToggleOption
        title="SMS notifications"
        description="Receive text messages"
        checked={delivery.sms}
        onChange={() => handleToggle("sms", !delivery.sms)}
      />
    </div>
  );
};
