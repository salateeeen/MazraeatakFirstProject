import { useParams } from "react-router-dom";
import styles from "./Styles.module.css";
import { CONTENTS } from "../config/ContentSettings";
import NotFound from "@/ui/notFound/NotFound";
import Title from "@/ui/title/Title";

export default function ContentSettings() {
  const { subSection } = useParams();

  if (!subSection) return null;

  if (!CONTENTS[subSection]) return <NotFound />;
  const PageComponent = CONTENTS[subSection].component;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <header><Title size="lg" mb="0.2rem">{CONTENTS[subSection].title}</Title></header>
        <p className={styles.description}>{CONTENTS[subSection].description}</p>
      </div>
      <PageComponent />
    </div>
  );
}
