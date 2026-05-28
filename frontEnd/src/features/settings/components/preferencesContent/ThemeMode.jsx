import styles from "./ThemeMode.module.css";
import RadioCard from "@/ui/forms/optionCard/RadioCard";
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
      <RadioCard
        name="theme"
        value="light"
        title="Light"
        description="Bright mode for your app"
        checked={themeMode === "light"}
        onChange={() => handleRadioChange("theme", "light")}
      />

      <RadioCard
        name="theme"
        value="dark"
        title="Dark"
        description="Dark mode for your app"
        checked={themeMode === "dark"}
        onChange={() => handleRadioChange("theme", "dark")}
      />

      <RadioCard
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
