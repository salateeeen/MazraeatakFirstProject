import { MdInbox } from "react-icons/md";
import styles from "./Empty.module.css";
import Button from "@/ui/button/Button";

export default function Empty({ 
  title = "No data found", 
  message = "There is nothing to display here right now.", 
  actionLabel, 
  onAction 
}) {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <MdInbox size={56} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className={styles.action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
