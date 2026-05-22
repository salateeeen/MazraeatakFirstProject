import Side from "@/ui/side/Side";
import { HiChevronRight } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { SETTINGS_SECTIONS } from "../config/SectionSettings";
import styles from "./Styles.module.css";
import NotFound from "@/ui/notFound/NotFound";
import Title from "@/ui/title/Title";

export default function SectionSettings() {
  const { section } = useParams();

  if (!section) return null;

  if (!SETTINGS_SECTIONS[section]) return <NotFound />;

  return (
    <div className={styles.container}>
      <header><Title size="lg" mb="0.5rem">{SETTINGS_SECTIONS[section].title}</Title></header>
      <Side
        items={SETTINGS_SECTIONS[section].items.map((item) => ({
          ...item,
          icon: HiChevronRight,
          path: `/app/settings/${section}/${item.path}`,
        }))}
        iconIN="end"
        key={SETTINGS_SECTIONS[section].title}
      />
    </div>
  );
}
