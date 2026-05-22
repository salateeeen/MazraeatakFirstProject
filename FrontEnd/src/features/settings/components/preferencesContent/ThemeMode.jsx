import styles from "./ThemeMode.module.css";
import RadioOption from "@/ui/forms/radioOption/RadioOption";
import { useSettings } from "../../hooks/useSettings";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import { useThemeMode } from "@/context/useThemeMode";

export default function ThemeMode() {
  const { themeMode, handleThemeMode } = useThemeMode();

  const handleRadioChange = (key, value) => {
    const modes = ["light", "dark", "system"];
    const validMode = modes.some((mode) => mode === value);

    if (!validMode) return;
    handleThemeMode(value);
  };

  return (
    <div className={styles.container}>
      <RadioOption
        name="theme"
        value="light"
        title="Light"
        description="Bright mode for your app"
        checked={themeMode === "light"}
        onChange={() => handleRadioChange("theme", "light")}
      />

      <RadioOption
        name="theme"
        value="dark"
        title="Dark"
        description="Dark mode for your app"
        checked={themeMode === "dark"}
        onChange={() => handleRadioChange("theme", "dark")}
      />

      <RadioOption
        name="theme"
        value="system"
        title="Use system setting"
        description="Automatically match your device theme"
        checked={themeMode === "system"}
        onChange={() => handleRadioChange("theme", "system")}
      />
    </div>
  );
}
