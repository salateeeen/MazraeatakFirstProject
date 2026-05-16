import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import styles from "./PrivacyOverview.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";

export default function PrivacyOverview() {
  const { data:settings } = useSettings(); // جلب settings من السيرفر
  const { mutate } = useUpdateSettings();

  const privacy = settings.data?.privacy;

  const handleToggle = (key, value) => {
    mutate({
      [`privacy.${key}`]: value,
    });
  };

  if (!privacy) return null; // انتظار التحميل

  return (
    <div className={styles.container}>
      <ToggleOption
        title="Appear in listings/search"
        description="Allow your farm to appear in search results"
        checked={privacy.appearInSearch}
        onChange={() =>
          handleToggle("appearInSearch", !privacy.appearInSearch)
        }
      />
    </div>
  );
};
