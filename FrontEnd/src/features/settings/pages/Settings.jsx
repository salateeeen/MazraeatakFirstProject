import styles from "./Settings.module.css";
import Container from "@/ui/container/Container";
import SettingsSidebar from "../layout/MainSettings";
import SettingsSectionMenu from "../layout/SectionSettings";
import SettingsContent from "../layout/ContentSettings";

export default function Settings() {
  return (
    <div className={styles.layout}>
      <SettingsSidebar />
      <SettingsSectionMenu />
      <SettingsContent />
    </div>
  );
}
