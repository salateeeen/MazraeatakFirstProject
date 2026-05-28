import { useEffect, useState } from "react";
import styles from "./Appearance.module.css";
import ToggleCard from "@/ui/forms/optionCard/ToggleCard";
import SelectCard from "@/ui/forms/optionCard/SelectCard";
import { capitalizeFirstLetter } from "@/utils/handleStrings";
import { FaTextHeight } from "react-icons/fa6";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

export default function Appearance() {
  const [fontSize, setFontSize] = useLocalStorageState("medium", "fontSize");
  const [roundedUI, setRoundedUI] = useLocalStorageState(true, "roundedUI");
  const [animations, setAnimations] = useLocalStorageState(true, "animations");
  const fontSizes = ["small", "medium", "large"];

  const handleFontSize = (size) => {
    setFontSize(size);
  };

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("small-font", "medium-font", "large-font");

    html.classList.add(`${fontSize}-font`);

    if (roundedUI) {
      html.style.setProperty("--radius-base", "1");
    } else {
      html.style.setProperty("--radius-base", "0");
    }

    if (animations) {
      html.style.setProperty("--animation-duration", "0.3s");
    } else {
      html.style.setProperty("--animation-duration", "0s");
    }
  }, [fontSize, roundedUI, animations]);

  const handleRoundedUI = () => {
    const html = document.documentElement;

    if (roundedUI) {
      html.style.setProperty("--radius-base", "1");
    } else {
      html.style.setProperty("--radius-base", "0");
    }

    setRoundedUI(!roundedUI);
  };


  const handleAnimations = () => {
    const html = document.documentElement;

    if (animations) {
      html.style.setProperty("--animation-duration", "0.3s");
    } else {
      html.style.setProperty("--animation-duration", "0s");
    }
    setAnimations(!animations);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4 className={styles.title}>Font size</h4>
        <div className={styles.options}>
          {fontSizes.map((size) => (
            <SelectCard
              key={size}
              selected={fontSize === size}
              onClick={() => handleFontSize(size)}
              title={capitalizeFirstLetter(size)}
              icon={<FaTextHeight size={20} />}
            />
          ))}
        </div>
      </div>

      <ToggleCard
        title="Rounded corners"
        description="Use rounded corners across the interface"
        checked={roundedUI}
        onChange={handleRoundedUI}
      />

      <ToggleCard
        title="Animations"
        description="Enable smooth transitions and effects"
        checked={animations}
        onChange={handleAnimations}
      />
    </div>
  );
}
