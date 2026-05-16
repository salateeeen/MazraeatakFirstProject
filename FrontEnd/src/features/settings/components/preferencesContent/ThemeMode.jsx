import styles from "./ThemeMode.module.css";
import RadioOption from "@/ui/forms/radioOption/RadioOption";
import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";

export default function ThemeMode() {
  const { data: settings } = useSettings();
  const { mutate } = useUpdateSettings();
  const theme = settings?.data.ui.theme;

  const handleRadioChange = (key, value) => {
    mutate({
      [`ui.${key}`]: value,
    });
  };

  return (
    <div className={styles.container}>
      <RadioOption
        name="theme"
        value="light"
        title="Light"
        description="Bright mode for your app"
        checked={theme === "light"}
        onChange={() => handleRadioChange("theme", "light")}
      />

      <RadioOption
        name="theme"
        value="dark"
        title="Dark"
        description="Dark mode for your app"
        checked={theme === "dark"}
        onChange={() => handleRadioChange("theme", "dark")}
      />

      <RadioOption
        name="theme"
        value="system"
        title="Use system setting"
        description="Automatically match your device theme"
        checked={theme === "system"}
        onChange={() => handleRadioChange("theme", "system")}
      />
    </div>
  );
};
