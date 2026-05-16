import Title from "@/ui/title/Title";
import styles from "./Description.module.css";

export default function Description({description}) {
  return (
    <div className={styles.description}>
      <Title>description</Title>
      <div className={styles.textBox}>
        <p>{description}</p>
      </div>
    </div>
  );
}
