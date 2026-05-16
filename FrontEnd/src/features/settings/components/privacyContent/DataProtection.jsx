import styles from "./DataProtection.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";
import { useResetSettings } from "../../hooks/useResetSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { useSettings } from "../../hooks/useSettings";
import Spinner from "@/ui/spinner/Spinner";

export default function DataProtection() {
  const { data: settings } = useSettings();
  const { mutate: update } = useUpdateSettings();
  const { mutate: resetSettings, isPending } = useResetSettings();

  const security = settings?.data?.security || {}; 

  if (!settings) return null;

  const handleToggle = (key, value) => {
    update({
      [`security.${key}`]: value,
    });
  };

  return (
    <div className={styles.container}>
      <ToggleOption
        title="Two-factor authentication"
        description="Add an extra layer of security to your account"
        checked={security.twoFactorAuth || false}
        onChange={() =>
          handleToggle("twoFactorAuth", !security.twoFactorAuth)
        }
      />

      <div className={styles.actions}>
        <button
          className={styles.danger}
          onClick={() => resetSettings()}
          disabled={isPending}
        >
          {isPending ? <Spinner size="xs" /> : "Reset settings"}
        </button>
      </div>
    </div>
  );
};
