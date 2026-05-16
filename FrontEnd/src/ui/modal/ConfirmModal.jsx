import styles from "./ConfirmModal.module.css";
import Button from "@/ui/button/Button";
import { LuTriangleAlert } from "react-icons/lu";
import Modal from "./Modal";
import Spinner from "@/ui/spinner/Spinner";

export default function ConfirmModal({ 
  title = "Are you sure?", 
  message = "This action cannot be undone.", 
  onConfirm, 
  onCancel, 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel",
  isPending = false,
  danger = true,
  setOpen,
  ref
}) {
  return (
    <Modal setOpen={setOpen} ref={ref} danger>
      <div className={styles.container}>
        <div className={`${styles.iconBox} ${danger ? styles.danger : ""}`}>
          <LuTriangleAlert size={24} />
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.actions}>
          <Button secondary onClick={onCancel} className={styles.button}>
            {cancelLabel}
          </Button>
          <Button 
            onClick={onConfirm} 
            className={`${styles.button} ${danger ? styles.dangerBtn : ""}`}
            isPending={isPending}
          >
            {isPending ? <Spinner size="xs" />: confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
