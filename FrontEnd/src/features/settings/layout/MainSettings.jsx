import Side from "@/ui/side/Side";
import { SETTINGS } from "../config/MainSettings";
import styles from "./Styles.module.css";
import { useRole } from "@/hooks/useRole";
import Title from "@/ui/title/Title";

export default function MainSettings() {
  const { role } = useRole();
  const items = SETTINGS.items.filter(
    (item) => !item.role || item.role === role,
  );
  
  return (
    <div className={styles.container}>
      <Title size="lg" mb="0">Settings</Title>
      <Side
        header={"Settings"}
        items={items.map((item) => ({
          ...item,
          path: `/app/settings/${item.path}`,
        }))}
      />
    </div>
  );
}
