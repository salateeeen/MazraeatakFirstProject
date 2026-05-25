import { useState } from "react";
import styles from "./GeneralPreferences.module.css";
import ToggleOption from "@/ui/forms/toggleOption/ToggleOption";

export default function GeneralPreferences() {
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [showTips, setShowTips] = useState(true);

  return (
    <div className={styles.container}>
      <ToggleOption
        title="Auto save"
        description="Automatically save changes as you work"
        checked={autoSave}
        onChange={() => setAutoSave(!autoSave)}
      />

      <ToggleOption
        title="Compact mode"
        description="Reduce spacing to fit more content on screen"
        checked={compactMode}
        onChange={() => setCompactMode(!compactMode)}
      />

      <ToggleOption
        title="Show tips"
        description="Display helpful tips and suggestions"
        checked={showTips}
        onChange={() => setShowTips(!showTips)}
      />
    </div>
  );
};
