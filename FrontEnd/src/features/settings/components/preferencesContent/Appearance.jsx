import { useState } from "react";
import styles from "./Appearance.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";

export default function Appearance() {
  const [fontSize, setFontSize] = useState("medium");
  const [roundedUI, setRoundedUI] = useState(true);
  const [animations, setAnimations] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4>Font size</h4>
        <div className={styles.options}>
          <button
            className={fontSize === "small" ? styles.active : ""}
            onClick={() => setFontSize("small")}
          >
            Small
          </button>
          <button
            className={fontSize === "medium" ? styles.active : ""}
            onClick={() => setFontSize("medium")}
          >
            Medium
          </button>
          <button
            className={fontSize === "large" ? styles.active : ""}
            onClick={() => setFontSize("large")}
          >
            Large
          </button>
        </div>
      </div>

      <ToggleOption
        title="Rounded corners"
        description="Use rounded corners across the interface"
        checked={roundedUI}
        onChange={() => setRoundedUI(!roundedUI)}
      />

      <ToggleOption
        title="Animations"
        description="Enable smooth transitions and effects"
        checked={animations}
        onChange={() => setAnimations(!animations)}
      />
    </div>
  );
};
