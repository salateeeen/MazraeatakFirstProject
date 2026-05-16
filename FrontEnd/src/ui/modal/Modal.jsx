import styles from "./Modal.module.css";
import CloseButton from "../icons/CloseButton";

export default function Modal({
  ref,
  setOpen,
  children,
  className = "",
  full = false,
  danger = false,
}) {
  return (
    <div className={`${styles.modalLayout}`}>
      <div
        className={`${styles.modalContent} ${full ? styles.full : ""} ${className} ${danger ? styles.danger : ""}`}
        ref={ref}
      >
        <CloseButton className={styles.close} onClick={() => setOpen(false)} danger={danger} />
        {children}
      </div>
    </div>
  );
}
