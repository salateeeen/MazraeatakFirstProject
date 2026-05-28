import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import styles from "./PrivacyOverview.module.css";
import ToggleCard from "@/ui/forms/optionCard/ToggleCard";

export default function PrivacyOverview() {
  const { data:settings } = useSettings();
  const { mutate } = useUpdateSettings();

  const privacy = settings?.data?.privacy;

  const handleToggle = (key, value) => {
    mutate({
      [`privacy.${key}`]: value,
    });
  };

  if (!privacy) return null;

  return (
    <div className={styles.container}>
      <ToggleCard
        title="Appear in listings/search"
        description="Allow your chalet or villa to appear in search results"
        checked={privacy.appearInSearch}
        onChange={() =>
          handleToggle("appearInSearch", !privacy.appearInSearch)
        }
      />
    </div>
  );
};
